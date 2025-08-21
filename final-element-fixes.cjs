const fs = require('fs');

// Specific remaining fixes needed
const fixes = [
  // Calendar component - remove children prop
  {
    file: 'src/components/ui/Calendar/Calendar.test.tsx',
    replacements: [
      {
        from: `      <Calendar data-testid="calendar" {...props}>
        Test calendar
      </Calendar>`,
        to: `      <Calendar data-testid="calendar" {...props} />`,
      },
      {
        from: `        <Calendar data-testid="calendar">
          <span>Child content</span>
        </Calendar>`,
        to: `        <Calendar data-testid="calendar" />`,
      },
      {
        from: `        <Calendar data-testid="calendar">
          <span>Child 1</span>
          <span>Child 2</span>
        </Calendar>`,
        to: `        <Calendar data-testid="calendar" />`,
      },
    ],
  },
];

// Apply specific fixes
fixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    let content = fs.readFileSync(fix.file, 'utf8');
    let changed = false;

    fix.replacements.forEach(replacement => {
      if (content.includes(replacement.from)) {
        content = content.replace(replacement.from, replacement.to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(fix.file, content);
      console.log(`Fixed ${fix.file}`);
    }
  }
});

// Fix remaining element declarations - very targeted approach
const elementFixes = [
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

elementFixes.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Very specific patterns to fix remaining element issues

    // Pattern: rerender call followed by expect(element)
    if (content.includes('rerender(') && content.includes('expect(element)')) {
      content = content.replace(
        /(rerender\([^)]+\);\s*\n\s*)expect\(element\)/g,
        '$1const element = container.firstChild as HTMLElement;\n      expect(element)'
      );
      changed = true;
    }

    // Pattern: Some specific tests that still need element declaration
    content = content.replace(
      /(\s+)expect\(element\)\.toHaveClass\('class2'\);/g,
      (match, indent) => {
        // Check if this line is missing element declaration
        const lines = content.split('\n');
        const currentLineIndex =
          content.substring(0, content.indexOf(match)).split('\n').length - 1;

        // Look backwards to see if element is declared in this test
        for (let i = currentLineIndex - 1; i >= 0; i--) {
          const line = lines[i];
          if (line.includes('const element =')) {
            return match; // Already has declaration
          }
          if (line.includes('it(') || line.includes('test(')) {
            // This is the start of the test block, add element declaration
            return `${indent}const element = container.firstChild as HTMLElement;\n${match}`;
          }
        }
        return match;
      }
    );

    // Fix element.focus() calls
    content = content.replace(/(\s+)element\.focus\(\);/g, (match, indent) => {
      const lines = content.split('\n');
      const currentLineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;

      // Look backwards to see if element is declared in this test
      for (let i = currentLineIndex - 1; i >= 0; i--) {
        const line = lines[i];
        if (line.includes('const element =')) {
          return match; // Already has declaration
        }
        if (line.includes('it(') || line.includes('test(')) {
          // This is the start of the test block, add element declaration
          return `${indent}const element = container.firstChild as HTMLElement;\n${match}`;
        }
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed remaining elements in ${filePath}`);
    }
  }
});

console.log('Final element fixes completed!');
