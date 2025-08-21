const fs = require('fs');

// Target the exact remaining TypeScript errors
const filesToFix = [
  { file: 'src/components/ui/Avatar/Avatar.test.tsx', line: 157 },
  { file: 'src/components/ui/Badge/Badge.test.tsx', lines: [70, 155] },
  { file: 'src/components/ui/Breadcrumb/Breadcrumb.test.tsx', line: 135 },
  { file: 'src/components/ui/Card/Card.test.tsx', line: 149 },
  { file: 'src/components/ui/Carousel/Carousel.test.tsx', line: 125 },
  { file: 'src/components/ui/Collapsible/Collapsible.test.tsx', line: 113 },
  { file: 'src/components/ui/Command/Command.test.tsx', line: 135 },
  { file: 'src/components/ui/Form/Form.test.tsx', line: 113 },
  { file: 'src/components/ui/Label/Label.test.tsx', line: 125 },
  { file: 'src/components/ui/Menubar/Menubar.test.tsx', line: 145 },
  { file: 'src/components/ui/Popover/Popover.test.tsx', line: 135 },
  { file: 'src/components/ui/Progress/Progress.test.tsx', line: 113 },
  { file: 'src/components/ui/ScrollArea/ScrollArea.test.tsx', line: 113 },
  { file: 'src/components/ui/Skeleton/Skeleton.test.tsx', line: 113 },
  { file: 'src/components/ui/Slider/Slider.test.tsx', line: 165 },
  { file: 'src/components/ui/Switch/Switch.test.tsx', lines: [65, 66, 142] },
  { file: 'src/components/ui/Table/Table.test.tsx', line: 135 },
  { file: 'src/components/ui/Tabs/Tabs.test.tsx', line: 159 },
  { file: 'src/components/ui/Textarea/Textarea.test.tsx', lines: [117, 118, 194] },
  { file: 'src/components/ui/ThemeToggle/ThemeToggle.test.tsx', line: 127 },
];

// Process each file
const allFiles = [...new Set(filesToFix.map(item => item.file))];

allFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Target specific patterns for rerender tests with missing element declarations

    // Pattern 1: rerender() followed by expect(element) without element declaration
    const rerenderPattern =
      /([ \t]+rerender\([^)]+\);\s*\n)([ \t]*)(\/\/ const element[^\n]*\n[ \t]*)?expect\(element\)/g;
    content = content.replace(rerenderPattern, (match, rerender, indent, comment) => {
      changed = true;
      return `${rerender}${indent}const element = container.firstChild as HTMLElement;\n${indent}expect(element)`;
    });

    // Pattern 2: Generic expect(element) in tests without element declaration
    const lines = content.split('\n');
    const newLines = [];
    let inTest = false;
    let testHasElementDeclaration = false;
    let testHasRender = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track test boundaries
      if (line.includes('it(') || line.includes('test(')) {
        inTest = true;
        testHasElementDeclaration = false;
        testHasRender = false;
      }

      if (inTest) {
        // Track if test has render and element declaration
        if (line.includes('render') && !line.includes('//')) {
          testHasRender = true;
        }
        if (line.includes('const element =')) {
          testHasElementDeclaration = true;
        }

        // If we find expect(element) or element.focus() without declaration, add it
        if (
          (line.includes('expect(element)') || line.includes('element.focus()')) &&
          testHasRender &&
          !testHasElementDeclaration
        ) {
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

      // Ensure container is imported if we added element declarations
      if (
        !content.includes('const { container }') &&
        content.includes('const element = container.firstChild')
      ) {
        content = content.replace(
          /const { ([^}]+) } = render/g,
          'const { $1, container } = render'
        );
      }

      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed missing element declarations in ${filePath}`);
    }
  }
});

console.log('\n🎯 Final TypeScript cleanup completed!');
console.log('All 25 remaining element declaration errors should now be resolved.');
