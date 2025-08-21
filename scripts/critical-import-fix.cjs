const fs = require('fs');
const path = require('path');

// Critical import fixes for the most problematic components
const criticalFixes = {
  // Modal needs proper import structure
  'src/components/ui/Modal/Modal.test.tsx': {
    pattern: /import \{ Modal \} from '.\/modal';/,
    replacement: `import { Modal, ModalContent, ModalTrigger } from './modal';`,
  },

  // Resizable needs complete import fix
  'src/components/ui/Resizable/Resizable.test.tsx': {
    pattern: /import \{ Resizable \} from '.\/resizable';/,
    replacement: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';`,
  },

  // These components need container destructuring fixes
  'src/components/ui/Slider/Slider.test.tsx': {
    pattern: /expect\(loadingContainer\)/g,
    replacement: `expect(container.firstChild)`,
  },

  // Fix container references in test files
  'src/components/ui/Select/Select.test.tsx': {
    pattern:
      /const element = container\.querySelector\("\.select-wrapper"\) \|\| container\.firstChild;/g,
    replacement: `const element = container.firstChild;`,
  },
};

console.log('🔧 Applying critical import and reference fixes...\n');

let totalFixed = 0;

Object.entries(criticalFixes).forEach(([filePath, fix]) => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} - File not found, skipping`);
    return;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    if (fix.pattern && fix.replacement) {
      content = content.replace(fix.pattern, fix.replacement);
    }

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ ${filePath} - Critical fixes applied`);
      totalFixed++;
    } else {
      console.log(`ℹ️  ${filePath} - No changes needed`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

// Additional systematic fixes for container issues
const containerFixes = [
  'src/components/ui/Modal/Modal.test.tsx',
  'src/components/ui/Select/Select.test.tsx',
  'src/components/ui/Slider/Slider.test.tsx',
];

containerFixes.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) return;

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Fix container destructuring issues
    if (content.includes('ReferenceError: container is not defined')) {
      content = content.replace(
        /expect\(container\.firstChild\)/g,
        'expect(screen.getByTestId("slider") || container?.firstChild)'
      );
      modified = true;
    }

    // Fix undefined variables
    const undefinedVars = ['loadingContainer', 'container'];
    undefinedVars.forEach(varName => {
      if (content.includes(`ReferenceError: ${varName} is not defined`)) {
        content = content.replace(
          new RegExp(`expect\\(${varName}\\)`, 'g'),
          'expect(container.firstChild)'
        );
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ ${filePath} - Container issues fixed`);
      totalFixed++;
    }
  } catch (error) {
    console.error(`❌ Error fixing containers in ${filePath}:`, error.message);
  }
});

console.log(`\n🎯 Critical fixes complete! ${totalFixed} files updated.`);
console.log('These fixes target the most common import and reference errors.');
