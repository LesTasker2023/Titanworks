const fs = require('fs');
const path = require('path');

// Fix component prop tests across all UI components
const componentDirs = [
  'src/components/ui/Alert',
  'src/components/ui/Avatar',
  'src/components/ui/Badge',
  'src/components/ui/Breadcrumb',
  'src/components/ui/Calendar',
  'src/components/ui/Card',
  'src/components/ui/Carousel',
  'src/components/ui/Collapsible',
  'src/components/ui/Command',
  'src/components/ui/Form',
  'src/components/ui/Label',
  'src/components/ui/Menubar',
  'src/components/ui/Pagination',
  'src/components/ui/Popover',
  'src/components/ui/Progress',
  'src/components/ui/ScrollArea',
  'src/components/ui/Skeleton',
  'src/components/ui/Slider',
  'src/components/ui/Switch',
  'src/components/ui/Table',
  'src/components/ui/Tabs',
  'src/components/ui/Textarea',
  'src/components/ui/ThemeToggle',
];

componentDirs.forEach(dir => {
  const testFilePath = `${dir}/${path.basename(dir)}.test.tsx`;

  if (fs.existsSync(testFilePath)) {
    let content = fs.readFileSync(testFilePath, 'utf8');
    let changed = false;

    // Fix "accepts custom className" test
    const customClassNamePattern =
      /it\('accepts custom className', \(\) => \{\s*const \{ container \} = render[^(]+\(\);\s*const element = container\.firstChild as HTMLElement;\s*expect\(element\)\.toHaveClass\('custom-class'\);/g;

    content = content.replace(customClassNamePattern, match => {
      const renderFunctionMatch = match.match(/render([A-Za-z]+)\(\)/);
      if (renderFunctionMatch) {
        const renderFunction = renderFunctionMatch[0].replace('()', '');
        return match.replace(
          `${renderFunction}();`,
          `${renderFunction}({ className: 'custom-class' });`
        );
      }
      return match;
    });

    // Fix "spreads additional props" test
    const additionalPropsPattern =
      /it\('spreads additional props', \(\) => \{\s*const \{ container \} = render[^(]+\(\);\s*const element = container\.firstChild as HTMLElement;\s*expect\(element\)\.toHaveAttribute\('data-custom', 'test-value'\);/g;

    content = content.replace(additionalPropsPattern, match => {
      const renderFunctionMatch = match.match(/render([A-Za-z]+)\(\)/);
      if (renderFunctionMatch) {
        const renderFunction = renderFunctionMatch[0].replace('()', '');
        return match.replace(
          `${renderFunction}();`,
          `${renderFunction}({ 'data-custom': 'test-value' });`
        );
      }
      return match;
    });

    // Fix "handles rapid prop changes" test (for Table component specifically)
    if (testFilePath.includes('Table')) {
      const rapidChangesPattern =
        /rerender\(<[A-Za-z]+ data-testid="[^"]+" className="class2" \/>\);/g;
      content = content.replace(rapidChangesPattern, match => {
        // This pattern is already correct, just ensure we're testing the right thing
        return match;
      });
    }

    // Check if any changes were made
    const originalContent = fs.readFileSync(testFilePath, 'utf8');
    if (content !== originalContent) {
      fs.writeFileSync(testFilePath, content);
      console.log(`Fixed prop tests in ${testFilePath}`);
      changed = true;
    }
  }
});

console.log('Component prop tests fix completed!');
