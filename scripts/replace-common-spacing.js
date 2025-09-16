import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

/**
 * Replaces common hardcoded spacing values with design tokens
 */

const SPACING_REPLACEMENTS = {
  // Border and outline contexts - use border-width tokens
  'border: 1px ': 'border: var(--border-width-thin) ',
  'border: 2px ': 'border: var(--border-width-thick) ',
  'outline: 1px ': 'outline: var(--border-width-thin) ',
  'outline: 2px ': 'outline: var(--border-width-thick) ',
  'border-width: 1px': 'border-width: var(--border-width-thin)',
  'border-width: 2px': 'border-width: var(--border-width-thick)',
  'outline-width: 1px': 'outline-width: var(--border-width-thin)',
  'outline-width: 2px': 'outline-width: var(--border-width-thick)',

  // Border radius contexts - use radius tokens
  'border-radius: 2px': 'border-radius: var(--radius-xs)',
  'border-radius: 3px': 'border-radius: var(--radius-xs)',
  'border-radius: 4px': 'border-radius: var(--radius-sm)',

  // Outline offset
  'outline-offset: 2px': 'outline-offset: var(--border-width-thick)',
  'outline-offset: 1px': 'outline-offset: var(--border-width-thin)',
};

const COMPONENT_PATTERNS = ['src/components/ui/*/*.scss'];

async function replaceCommonSpacing() {
  console.log('🔧 Starting common spacing replacement...\n');

  // Find all component SCSS files
  const files = [];
  for (const pattern of COMPONENT_PATTERNS) {
    const matches = await glob(pattern, {
      ignore: ['**/node_modules/**'],
      cwd: process.cwd(),
    });
    files.push(...matches);
  }

  let totalReplacements = 0;
  let filesModified = 0;

  for (const filePath of files) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      let modifiedContent = content;
      let fileReplacements = 0;

      // Apply replacements
      for (const [oldValue, newValue] of Object.entries(SPACING_REPLACEMENTS)) {
        const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = modifiedContent.match(regex);
        if (matches) {
          modifiedContent = modifiedContent.replace(regex, newValue);
          fileReplacements += matches.length;
          console.log(
            `  ✓ ${path.basename(filePath)}: ${matches.length}x "${oldValue}" → "${newValue}"`
          );
        }
      }

      if (fileReplacements > 0) {
        await fs.writeFile(filePath, modifiedContent);
        filesModified++;
        totalReplacements += fileReplacements;
        console.log(`📝 Modified ${path.basename(filePath)} (${fileReplacements} replacements)\n`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  console.log('📊 Summary:');
  console.log(`  Files processed: ${files.length}`);
  console.log(`  Files modified: ${filesModified}`);
  console.log(`  Total replacements: ${totalReplacements}`);

  if (totalReplacements > 0) {
    console.log('\n🎯 Next steps:');
    console.log('1. Run yarn build to verify changes');
    console.log('2. Test components in browser');
    console.log('3. Continue with remaining spacing values');
  }
}

replaceCommonSpacing().catch(console.error);
