const fs = require('fs');

const filesToFix = [
  'src/components/ui/Avatar/Avatar.test.tsx',
  'src/components/ui/Badge/Badge.test.tsx',
  'src/components/ui/Breadcrumb/Breadcrumb.test.tsx',
  'src/components/ui/Card/Card.test.tsx',
  'src/components/ui/Carousel/Carousel.test.tsx',
  'src/components/ui/Collapsible/Collapsible.test.tsx',
  'src/components/ui/Command/Command.test.tsx',
  'src/components/ui/Form/Form.test.tsx',
  'src/components/ui/Label/Label.test.tsx',
  'src/components/ui/Menubar/Menubar.test.tsx',
  'src/components/ui/Popover/Popover.test.tsx',
  'src/components/ui/Progress/Progress.test.tsx',
  'src/components/ui/ScrollArea/ScrollArea.test.tsx',
  'src/components/ui/Skeleton/Skeleton.test.tsx',
  'src/components/ui/Slider/Slider.test.tsx',
  'src/components/ui/Switch/Switch.test.tsx',
  'src/components/ui/Table/Table.test.tsx',
  'src/components/ui/Tabs/Tabs.test.tsx',
  'src/components/ui/Textarea/Textarea.test.tsx',
  'src/components/ui/ThemeToggle/ThemeToggle.test.tsx',
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Check if file uses container but doesn't import it
    if (content.includes('container.firstChild') && !content.includes('container }')) {
      // Add container to the render destructuring
      content = content.replace(/const { ([^}]+) } = render/g, (match, imports) => {
        // Check if container is already in the imports
        if (!imports.includes('container')) {
          return `const { ${imports}, container } = render`;
        }
        return match;
      });
      changed = true;
    }

    // Handle specific cases for Switch and Textarea files that have element.focus()
    if (
      (filePath.includes('Switch') || filePath.includes('Textarea')) &&
      content.includes('element.focus()') &&
      !content.includes('const element =')
    ) {
      // Find lines with element.focus() and add element declaration before them
      const lines = content.split('\n');
      const newLines = [];
      let inTest = false;
      let testHasElementDeclaration = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Track test boundaries
        if (line.includes('it(') || line.includes('test(')) {
          inTest = true;
          testHasElementDeclaration = false;
        }

        if (inTest && line.includes('const element =')) {
          testHasElementDeclaration = true;
        }

        // If we find element.focus() without declaration, add it
        if (inTest && line.includes('element.focus()') && !testHasElementDeclaration) {
          const indent = line.match(/^(\s*)/)[1];
          newLines.push(`${indent}const element = container.firstChild as HTMLElement;`);
          testHasElementDeclaration = true;
          changed = true;
        }

        newLines.push(line);

        // Reset when leaving test
        if (line.trim() === '});' && inTest) {
          inTest = false;
        }
      }

      if (changed) {
        content = newLines.join('\n');
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed container imports in ${filePath}`);
    }
  }
});

console.log('\n🎯 Container import fixes completed!');
