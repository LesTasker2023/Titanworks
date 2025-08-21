const fs = require('fs');

// Fix specific remaining issues
const specificFixes = [
  {
    file: 'src/components/ui/Chart/Chart.test.tsx',
    fixes: [
      {
        from: /const container = render\([^)]+\);/g,
        to: '// const container = render(<Component />);',
      },
    ],
  },
  {
    file: 'src/components/ui/Checkbox/Checkbox.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);\s*renderBasicCheckbox\(\);\s*const element = screen\.getByTestId\('checkbox'\);/g,
        to: "// const user = userEvent.setup();\n      renderBasicCheckbox();\n      // const element = screen.getByTestId('checkbox');",
      },
    ],
  },
  {
    file: 'src/components/ui/DataTable/DataTable.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);/g,
        to: '// const user = userEvent.setup();',
      },
    ],
  },
  {
    file: 'src/components/ui/DatePicker/DatePicker.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);/g,
        to: '// const user = userEvent.setup();',
      },
      {
        from: /const container = render\([^)]+\);/g,
        to: '// const container = render(<Component />);',
      },
    ],
  },
  {
    file: 'src/components/ui/Input/Input.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);\s*renderBasicInput\(\);\s*const element = screen\.getByTestId\('input'\);/g,
        to: "// const user = userEvent.setup();\n      renderBasicInput();\n      // const element = screen.getByTestId('input');",
      },
    ],
  },
  {
    file: 'src/components/ui/Pagination/Pagination.test.tsx',
    fixes: [
      {
        from: /import.*PaginationItem.*from.*;\n/g,
        to: "// import { PaginationItem } from './pagination';\n",
      },
      {
        from: /const user = userEvent\.setup\(\);/g,
        to: '// const user = userEvent.setup();',
      },
    ],
  },
  {
    file: 'src/components/ui/RadioGroup/RadioGroup.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);\s*renderBasicRadioGroup\(\);\s*const element = screen\.getByTestId\('radio-group'\);/g,
        to: "// const user = userEvent.setup();\n      renderBasicRadioGroup();\n      // const element = screen.getByTestId('radio-group');",
      },
    ],
  },
  {
    file: 'src/components/ui/Slider/Slider.test.tsx',
    fixes: [
      {
        from: /const element = screen\.getByTestId\('slider'\);/g,
        to: "// const element = screen.getByTestId('slider');",
      },
    ],
  },
  {
    file: 'src/components/ui/Switch/Switch.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);\s*renderBasicSwitch\(\);\s*const element = screen\.getByTestId\('switch'\);/g,
        to: "// const user = userEvent.setup();\n      renderBasicSwitch();\n      // const element = screen.getByTestId('switch');",
      },
    ],
  },
  {
    file: 'src/components/ui/Textarea/Textarea.test.tsx',
    fixes: [
      {
        from: /const user = userEvent\.setup\(\);\s*renderBasicTextarea\(\);\s*const element = screen\.getByTestId\('textarea'\);/g,
        to: "// const user = userEvent.setup();\n      renderBasicTextarea();\n      // const element = screen.getByTestId('textarea');",
      },
    ],
  },
];

specificFixes.forEach(({ file, fixes }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    fixes.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(file, content);
    console.log(`Fixed specific issues: ${file}`);
  }
});

console.log('Specific fixes complete!');
