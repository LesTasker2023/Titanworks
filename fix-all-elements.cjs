const fs = require('fs');

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

    // Find and replace patterns where element is used but not defined

    // Pattern 1: renderBasicXXX(); followed by expect(element)
    const renderPattern =
      /([ \t]+)renderBasic\w+\([^)]*\);\s*\n([ \t]*)(?:\/\/ const element[^\n]*\n[ \t]*)?expect\(element\)/g;
    content = content.replace(renderPattern, (match, indent, expectIndent) => {
      changed = true;
      return `${indent}const { container } = renderBasic${filePath.split('/').pop().replace('.test.tsx', '')}();\n${expectIndent}const element = container.firstChild as HTMLElement;\n${expectIndent}expect(element)`;
    });

    // Pattern 2: More generic renderBasicXXX calls with props
    const componentName = filePath.split('/').pop().replace('.test.tsx', '');
    const renderFuncPattern = new RegExp(
      `([ \\t]+)renderBasic${componentName}\\(([^)]*)\\);\\s*\\n([ \\t]*)(?:\\/\\/ const element[^\\n]*\\n[ \\t]*)?expect\\(element\\)`,
      'g'
    );
    content = content.replace(renderFuncPattern, (match, indent, props, expectIndent) => {
      changed = true;
      return `${indent}const { container } = renderBasic${componentName}(${props});\n${expectIndent}const element = container.firstChild as HTMLElement;\n${expectIndent}expect(element)`;
    });

    // Pattern 3: Simple expect(element) without any render before it in the same test
    // This handles cases where render is called but element is not declared
    const lines = content.split('\n');
    const newLines = [];
    let insideTest = false;
    let hasRender = false;
    let hasElement = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track test boundaries
      if (line.includes('it(') || line.includes('test(')) {
        insideTest = true;
        hasRender = false;
        hasElement = false;
      }

      if (insideTest) {
        // Track if we have a render call
        if (line.includes('render') && !line.includes('//')) {
          hasRender = true;
        }

        // Track if we have element declaration
        if (line.includes('const element =')) {
          hasElement = true;
        }

        // If we find expect(element) without element declaration, add it
        if (line.includes('expect(element)') && hasRender && !hasElement) {
          const indent = line.match(/^(\s*)/)[1];
          newLines.push(`${indent}const element = container.firstChild as HTMLElement;`);
          hasElement = true;
          changed = true;
        }
      }

      newLines.push(line);

      // Reset when leaving test
      if (line.trim() === '});' && insideTest) {
        insideTest = false;
      }
    }

    if (changed) {
      content = newLines.join('\n');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${filePath}`);
    }
  }
});

console.log('Element declarations fixed!');
