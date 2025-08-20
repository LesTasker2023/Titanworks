const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the mapping of default imports to named imports
const importMappings = {
  Badge: { from: '@/components/ui/Badge', to: '{ Badge }' },
  Button: { from: '@/components/ui/Button', to: '{ Button }' },
  Checkbox: { from: '@/components/ui/Checkbox', to: '{ Checkbox }' },
  Dialog: { from: '@/components/ui/Dialog', to: '{ Dialog }' },
  Input: { from: '@/components/ui/Input', to: '{ Input }' },
  RadioGroup: { from: '@/components/ui/RadioGroup', to: '{ RadioGroup }' },
  Textarea: { from: '@/components/ui/Textarea', to: '{ Textarea }' },
};

// Also handle relative imports
const relativeImportMappings = {
  Badge: { from: './badge', to: '{ Badge }' },
  Button: { from: './button', to: '{ Button }' },
  Checkbox: { from: './checkbox', to: '{ Checkbox }' },
  Dialog: { from: './dialog', to: '{ Dialog }' },
  Input: { from: './input', to: '{ Input }' },
  RadioGroup: { from: './radio-group', to: '{ RadioGroup }' },
  Textarea: { from: './textarea', to: '{ Textarea }' },
};

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix absolute imports
    for (const [component, mapping] of Object.entries(importMappings)) {
      const defaultImportRegex = new RegExp(
        `import\\s+${component}\\s+from\\s+['"]${mapping.from.replace(/[/\\]/g, '[/\\\\]')}['"];?`,
        'g'
      );
      if (defaultImportRegex.test(content)) {
        content = content.replace(
          defaultImportRegex,
          `import ${mapping.to} from '${mapping.from}';`
        );
        modified = true;
        console.log(`Fixed ${component} import in ${filePath}`);
      }
    }

    // Fix relative imports
    for (const [component, mapping] of Object.entries(relativeImportMappings)) {
      const defaultImportRegex = new RegExp(
        `import\\s+${component}\\s+from\\s+['"]${mapping.from}['"];?`,
        'g'
      );
      if (defaultImportRegex.test(content)) {
        content = content.replace(
          defaultImportRegex,
          `import ${mapping.to} from '${mapping.from}';`
        );
        modified = true;
        console.log(`Fixed ${component} relative import in ${filePath}`);
      }
    }

    // Fix mixed imports like "import Dialog, { DialogContent }"
    const mixedDialogRegex = /import\s+Dialog,\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"];?/g;
    if (mixedDialogRegex.test(content)) {
      content = content.replace(mixedDialogRegex, (match, namedImports, fromPath) => {
        return `import { Dialog, ${namedImports} } from '${fromPath}';`;
      });
      modified = true;
      console.log(`Fixed mixed Dialog import in ${filePath}`);
    }

    // Fix mixed imports for RadioGroup
    const mixedRadioGroupRegex =
      /import\s+RadioGroup,\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"];?/g;
    if (mixedRadioGroupRegex.test(content)) {
      content = content.replace(mixedRadioGroupRegex, (match, namedImports, fromPath) => {
        return `import { RadioGroup, ${namedImports} } from '${fromPath}';`;
      });
      modified = true;
      console.log(`Fixed mixed RadioGroup import in ${filePath}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Find all TypeScript and TSX files
const files = glob.sync('src/**/*.{ts,tsx}', { cwd: process.cwd() });

console.log(`Processing ${files.length} files...`);

files.forEach(filePath => {
  fixImportsInFile(filePath);
});

console.log('Import fixing complete!');
