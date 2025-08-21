const fs = require('fs');

// Fix file import case issues
const caseFixFiles = [
  { file: 'src/components/ui/Form/Form.test.tsx', from: './form', to: './Form' },
  { file: 'src/components/ui/Label/Label.test.tsx', from: './label', to: './Label' },
  { file: 'src/components/ui/Menubar/Menubar.test.tsx', from: './menubar', to: './Menubar' },
  { file: 'src/components/ui/Popover/Popover.test.tsx', from: './popover', to: './Popover' },
  {
    file: 'src/components/ui/ScrollArea/ScrollArea.test.tsx',
    from: './scrollarea',
    to: './ScrollArea',
  },
  {
    file: 'src/components/ui/Separator/Separator.test.tsx',
    from: './separator',
    to: './Separator',
  },
  { file: 'src/components/ui/Sheet/Sheet.test.tsx', from: './sheet', to: './Sheet' },
  { file: 'src/components/ui/Skeleton/Skeleton.test.tsx', from: './skeleton', to: './Skeleton' },
  { file: 'src/components/ui/Switch/Switch.test.tsx', from: './switch', to: './Switch' },
  { file: 'src/components/ui/Table/Table.test.tsx', from: './table', to: './Table' },
  {
    file: 'src/components/ui/ThemeToggle/ThemeToggle.test.tsx',
    from: './themetoggle',
    to: './ThemeToggle',
  },
];

// Fix import cases
caseFixFiles.forEach(({ file, from, to }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(
      new RegExp(`import.*from\\s+['"]${from.replace('./', '\\./').replace('/', '\\/')}['"]`, 'g'),
      match => match.replace(from, to)
    );
    fs.writeFileSync(file, content);
    console.log(`Fixed import case: ${file}`);
  }
});

// Fix missing element variable references by adding them back where needed
const elementFixes = [
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

elementFixes.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Add back element declarations where they're referenced but not declared
    const needsElement =
      /expect\(element\)/.test(content) && !/const element = screen\.getByTestId/.test(content);

    if (needsElement) {
      // Find the component name from the file path
      const componentMatch = file.match(/\/([A-Z][a-zA-Z]+)\/[A-Z][a-zA-Z]+\.test\.tsx$/);
      if (componentMatch) {
        const componentName = componentMatch[1].toLowerCase();

        // Add element declarations before expect(element) calls
        content = content.replace(
          /(\s+)(expect\(element\))/g,
          `$1const element = screen.getByTestId('${componentName}');\n$1$2`
        );
      }
    }

    fs.writeFileSync(file, content);
    console.log(`Fixed missing element references: ${file}`);
  }
});

console.log('TypeScript fixes applied!');
