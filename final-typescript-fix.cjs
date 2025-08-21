const fs = require('fs');
const path = require('path');

// Fix all remaining TypeScript issues
const fixes = [
  {
    // Fix case import issues
    files: [
      'src/components/ui/AspectRatio/AspectRatio.test.tsx',
      'src/components/ui/Breadcrumb/Breadcrumb.test.tsx',
      'src/components/ui/Calendar/Calendar.test.tsx',
      'src/components/ui/Carousel/Carousel.test.tsx',
      'src/components/ui/Collapsible/Collapsible.test.tsx',
      'src/components/ui/Command/Command.test.tsx',
    ],
    replacements: [
      { from: './aspectratio', to: './AspectRatio' },
      { from: './breadcrumb', to: './Breadcrumb' },
      { from: './calendar', to: './Calendar' },
      { from: './carousel', to: './Carousel' },
      { from: './collapsible', to: './Collapsible' },
      { from: './command', to: './Command' },
    ],
  },
  {
    // Fix Calendar component props (remove children)
    files: ['src/components/ui/Calendar/Calendar.test.tsx'],
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
  {
    // Add missing Storybook imports
    files: ['src/components/ui/Calendar/Calendar.stories.tsx'],
    replacements: [
      {
        from: `import { Calendar } from './Calendar';`,
        to: `import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';`,
      },
    ],
  },
];

// Apply fixes
fixes.forEach(fix => {
  fix.files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      fix.replacements.forEach(replacement => {
        if (content.includes(replacement.from)) {
          content = content.replace(
            new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            replacement.to
          );
          changed = true;
        }
      });

      if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
      }
    }
  });
});

// Now fix all the missing element declarations
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

    // Find all test functions that use 'element' but don't declare it
    const testBlocks = content.match(/it\([^{]*\{[^}]*expect\(element\)[^}]*\}/gs);

    if (testBlocks) {
      testBlocks.forEach(block => {
        // Check if this block already has element declaration
        if (!block.includes('const element =') && !block.includes('let element =')) {
          // Find the test ID or role to determine what element to get
          let elementGetter = '';

          if (block.includes('data-testid')) {
            const testIdMatch = block.match(/data-testid="([^"]+)"/);
            if (testIdMatch) {
              elementGetter = `const element = screen.getByTestId('${testIdMatch[1]}');`;
            }
          } else if (block.includes('getByRole')) {
            const roleMatch = block.match(/getByRole\('([^']+)'/);
            if (roleMatch) {
              elementGetter = `const element = screen.getByRole('${roleMatch[1]}');`;
            }
          } else {
            // Default fallback
            elementGetter = `const element = container.firstChild as HTMLElement;`;
          }

          if (elementGetter) {
            // Insert the element declaration after the render call
            const newBlock = block.replace(/(render\([^)]+\);)/, `$1\n    ${elementGetter}`);

            content = content.replace(block, newBlock);
            changed = true;
          }
        }
      });
    }

    // Also fix any remaining element usage with simple replacement patterns
    const elementPatterns = [
      {
        pattern: /(\s+)(expect\(element\))/g,
        replacement: (match, whitespace, expectCall) => {
          const lines = content.split('\n');
          const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;

          // Look backwards for element declaration in this test
          for (let i = lineIndex; i >= 0; i--) {
            const line = lines[i];
            if (line.includes('const element =') || line.includes('let element =')) {
              return match; // Already has declaration
            }
            if (line.includes('it(') || line.includes('test(')) {
              // Start of test block, need to add declaration
              const prevLine = lines[lineIndex - 1];
              if (!prevLine.includes('const element =')) {
                lines.splice(
                  lineIndex,
                  0,
                  `    const element = container.firstChild as HTMLElement;`
                );
                content = lines.join('\n');
                changed = true;
              }
              break;
            }
          }
          return match;
        },
      },
    ];

    // A simpler approach - just replace missing element declarations directly
    if (content.includes('expect(element)') && !content.includes('const element =')) {
      // Add import for container if not present
      if (!content.includes('const { container }')) {
        content = content.replace(
          /const { ([^}]+) } = render\(/g,
          'const { $1, container } = render('
        );
        changed = true;
      }

      // Find each test and add element declaration
      content = content.replace(
        /(it\([^{]*\{[^}]*?render\([^)]+\);)/g,
        '$1\n    const element = container.firstChild as HTMLElement;'
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Added element declarations to ${filePath}`);
    }
  }
});

console.log('All TypeScript fixes completed!');
