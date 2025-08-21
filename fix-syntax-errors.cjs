#!/usr/bin/env node

const fs = require('fs');

// Fix Chart.test.tsx - duplicate const declaration
console.log('Fixing Chart.test.tsx syntax error...');
const chartTestPath = 'src/components/ui/Chart/Chart.test.tsx';
let chartContent = fs.readFileSync(chartTestPath, 'utf8');

// Fix the duplicate const declaration
chartContent = chartContent.replace(
  'const { container } = const { container } = renderBasicChart();expect(container.firstChild).toMatchSnapshot();',
  'const { container } = renderBasicChart();\n        expect(container.firstChild).toMatchSnapshot();'
);

fs.writeFileSync(chartTestPath, chartContent);
console.log('✅ Chart.test.tsx fixed');

// Fix Sonner.test.tsx - same issue
console.log('Fixing Sonner.test.tsx syntax error...');
const sonnerTestPath = 'src/components/ui/Sonner/Sonner.test.tsx';
let sonnerContent = fs.readFileSync(sonnerTestPath, 'utf8');

// Fix the duplicate const declaration
sonnerContent = sonnerContent.replace(
  'const { container } = const { container } = renderBasicSonner();expect(container.firstChild).toMatchSnapshot();',
  'const { container } = renderBasicSonner();\n        expect(container.firstChild).toMatchSnapshot();'
);

fs.writeFileSync(sonnerTestPath, sonnerContent);
console.log('✅ Sonner.test.tsx fixed');

console.log('✅ Both syntax errors fixed successfully');
console.log('Next: Need to fix JSX syntax errors in AlertDialog, Dialog, HoverCard, Tooltip');
