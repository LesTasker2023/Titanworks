const fs = require('fs');

// Files that still have missing element issues after previous fixes
const elementFixFiles = [
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

elementFixFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Find all lines that use 'element' without declaring it
    const lines = content.split('\n');
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // If this line expects element but previous lines in same block don't declare it
      if (line.includes('expect(element)') && !line.includes('const element') && i > 0) {
        // Look backwards to see if element is declared in this test block
        let hasElementDeclaration = false;
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].includes('it(') || lines[j].includes('describe(')) break;
          if (lines[j].includes('const element = screen.getByTestId')) {
            hasElementDeclaration = true;
            break;
          }
        }

        if (!hasElementDeclaration) {
          // Get component name from file path
          const componentMatch = file.match(/\/([A-Z][a-zA-Z]+)\/[A-Z][a-zA-Z]+\.test\.tsx$/);
          if (componentMatch) {
            const componentName = componentMatch[1].toLowerCase();
            const indent = line.match(/^(\s*)/)[1];
            newLines.push(`${indent}const element = screen.getByTestId('${componentName}');`);
          }
        }
      }

      newLines.push(line);
    }

    const newContent = newLines.join('\n');
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log(`Fixed remaining element issues: ${file}`);
    }
  }
});

console.log('Final element fixes complete!');
