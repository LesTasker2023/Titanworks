const fs = require('fs');

// List of all test files that need element fixes
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

    // Check if file uses element but doesn't declare it
    if (content.includes('expect(element)') && !content.includes('const element =')) {
      // Make sure container is imported
      if (content.includes('} = render(') && !content.includes('container')) {
        content = content.replace(
          /const { ([^}]+) } = render\(/g,
          'const { $1, container } = render('
        );
        changed = true;
      }

      // Split into lines for easier processing
      const lines = content.split('\n');
      const newLines = [];
      let inTest = false;
      let hasAddedElement = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        newLines.push(line);

        // Check if we're starting a new test
        if (line.trim().startsWith('it(') || line.trim().startsWith('test(')) {
          inTest = true;
          hasAddedElement = false;
        }

        // If we're in a test and find a render call, add element declaration
        if (inTest && line.includes('render(') && !hasAddedElement) {
          newLines.push('    const element = container.firstChild as HTMLElement;');
          hasAddedElement = true;
          changed = true;
        }

        // Reset when test ends
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
      console.log(`Fixed element declarations in ${filePath}`);
    }
  }
});

console.log('Element declarations fix completed!');
