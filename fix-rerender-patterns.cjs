const fs = require('fs');

const filesToFix = [
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

    // Fix rerender pattern: const { rerender } = ... followed by container usage
    content = content.replace(
      /(const { rerender }) = (renderBasic\w+\([^)]*\));/g,
      '$1, container } = $2;'
    );
    changed = true;

    // Fix element.focus() calls by ensuring element is declared
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

      if (inTest) {
        if (line.includes('const element =')) {
          testHasElementDeclaration = true;
        }

        // If we find element.focus() without declaration, add it
        if (line.includes('element.focus()') && !testHasElementDeclaration) {
          const indent = line.match(/^(\s*)/)[1];
          newLines.push(`${indent}const element = container.firstChild as HTMLElement;`);
          testHasElementDeclaration = true;
          changed = true;
        }
      }

      newLines.push(line);

      // Reset when leaving test
      if (line.trim() === '});' && inTest) {
        inTest = false;
      }
    }

    if (changed) {
      content = newLines.join('\n');
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed rerender and element patterns in ${filePath}`);
    }
  }
});

console.log('\n🎯 Final rerender pattern fixes completed!');
