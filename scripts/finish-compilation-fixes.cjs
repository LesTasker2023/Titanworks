const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/ui/AlertDialog/AlertDialog.test.tsx',
  'src/components/ui/Chart/Chart.test.tsx',
  'src/components/ui/Dialog/Dialog.test.tsx',
  'src/components/ui/HoverCard/HoverCard.test.tsx',
  'src/components/ui/Sonner/Sonner.test.tsx',
  'src/components/ui/Tooltip/Tooltip.test.tsx',
];

console.log('🔧 FINISHING COMPILATION ERROR FIXES...\n');

filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  console.log(`🔍 Processing: ${filePath}`);

  // Fix Chart/Sonner duplicate const declarations
  if (content.includes('const { rerender } = const { container }')) {
    content = content.replace(
      /const { rerender } = const { container } = renderBasic\w+\({ className: 'class1' }\);rerender\(<(\w+) data-testid="\w+" className="class2" \/>\);/g,
      (match, componentName) => {
        const componentLower = componentName.toLowerCase();
        return `const { rerender } = renderBasic${componentName}({ className: 'class1' });
        rerender(<${componentName} data-testid="${componentLower}" className="class2" />);`;
      }
    );
    changed = true;
    console.log(`  ✅ Fixed duplicate const declaration`);
  }

  // Fix AlertDialog/Dialog/HoverCard/Tooltip JSX syntax errors
  const jsxPatterns = [
    // Fix malformed test structure
    {
      search:
        /it\('handles complex nested content', \(\) => \{\s*render\(\s*<(\w+)Provider>\s*<(\w+) data-testid="(\w+)">\s*<div>\s*Nested content\s*<\/div>\s*<\/\2>\s*<\/\1Provider>\s*\);\s*expect\(screen\.getByTestId\('\3'\)\)\.toBeInTheDocument\(\);\s*\}\);\s*\}\);/gs,
      replace: (match, provider, component, testid) => `it('handles complex nested content', () => {
        render(
          <${provider}>
            <${component} data-testid="${testid}">
              <div>Nested content</div>
            </${component}>
          </${provider}>
        );
        expect(screen.getByTestId('${testid}')).toBeInTheDocument();
      });
    });`,
    },

    // Fix broken JSX structure with missing closing braces
    {
      search:
        /(\s*const element = screen\.getByTestId\('\w+'\);\s*expect\(element\)\.toHaveClass\('class2'\);\s*)\}\);\s*it\('handles complex nested content', \(\) => \{\s*render\(\s*</gs,
      replace: "$1});\\n\\n    it('handles complex nested content', () => {\\n      render(",
    },
  ];

  jsxPatterns.forEach(({ search, replace }) => {
    if (content.match(search)) {
      content = content.replace(search, replace);
      changed = true;
      console.log(`  ✅ Fixed JSX syntax error`);
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log(`  ✅ Updated: ${filePath}\n`);
  } else {
    console.log(`  ℹ️  No changes needed for: ${filePath}\n`);
  }
});

console.log('🎯 COMPILATION FIXES COMPLETE!');
