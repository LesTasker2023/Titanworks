const fs = require('fs');

// Files that need specific element fixes based on their render patterns
const testFiles = [
  'src/components/ui/Alert/Alert.test.tsx',
  'src/components/ui/Avatar/Avatar.test.tsx',
  'src/components/ui/Badge/Badge.test.tsx',
  'src/components/ui/Breadcrumb/Breadcrumb.test.tsx',
  'src/components/ui/Calendar/Calendar.test.tsx',
  'src/components/ui/Card/Card.test.tsx',
  'src/components/ui/Carousel/Carousel.test.tsx',
  'src/components/ui/Collapsible/Collapsible.test.tsx',
  'src/components/ui/Command/Command.test.tsx',
  'src/components/ui/Form/Form.test.tsx',
  'src/components/ui/Label/Label.test.tsx',
  'src/components/ui/Menubar/Menubar.test.tsx',
  'src/components/ui/Pagination/Pagination.test.tsx',
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

testFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Pattern 1: Files using renderBasicXXX() pattern without container destructuring
    if (content.includes('renderBasic') && content.includes('expect(element)')) {
      // Fix calls that don't destructure container
      content = content.replace(
        /(\s+)renderBasic\w+\([^)]*\);\s*\n(\s+)(?:\/\/ const element[^\n]*\n\s*)?expect\(element\)/g,
        '$1const { container } = renderBasic' +
          filePath
            .split('/')
            .pop()
            .replace('.test.tsx', '')
            .replace(/([A-Z])/g, '$1') +
          '();\n$2const element = container.firstChild as HTMLElement;\n$2expect(element)'
      );

      // Simpler approach - just replace each renderBasicXXX() call with proper destructuring
      const componentName = filePath.split('/').pop().replace('.test.tsx', '');
      const renderFunctionName = `renderBasic${componentName}`;

      // Replace renderBasicXXX() calls that don't already destructure container
      const renderPattern = new RegExp(
        `(\\s+)${renderFunctionName}\\(([^)]*)\\);\\s*\\n(\\s*)(?:\\/\\/ const element[^\\n]*\\n\\s*)?expect\\(element\\)`,
        'g'
      );

      content = content.replace(renderPattern, (match, indent, args, expectIndent) => {
        return `${indent}const { container } = ${renderFunctionName}(${args});\n${expectIndent}const element = container.firstChild as HTMLElement;\n${expectIndent}expect(element)`;
      });

      changed = true;
    }

    // Pattern 2: Files using screen.getByTestId pattern
    if (content.includes('screen.getByTestId') && content.includes('expect(element)')) {
      // Find the test ID being used
      const testIdMatch = content.match(/screen\.getByTestId\('([^']+)'\)/);
      if (testIdMatch) {
        const testId = testIdMatch[1];

        // Replace expect(element) with proper element declaration
        content = content.replace(/([\s\S]*?)expect\(element\)/g, (match, before) => {
          if (!before.includes('const element =')) {
            const lines = before.split('\n');
            const lastLine = lines[lines.length - 1];
            const indent = lastLine.match(/^(\s*)/)[1];
            return (
              before + `const element = screen.getByTestId('${testId}');\n${indent}expect(element)`
            );
          }
          return match;
        });
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed element declarations in ${filePath}`);
    }
  }
});

console.log('Targeted element fix completed!');
