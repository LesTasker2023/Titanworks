import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

/**
 * Replaces hardcoded font-weight values with design tokens
 */

const FONT_WEIGHT_REPLACEMENTS = {
  'font-weight: 400': 'font-weight: var(--font-weight-normal)',
  'font-weight: 500': 'font-weight: var(--font-weight-medium)',
  'font-weight: 600': 'font-weight: var(--font-weight-semibold)',
  'font-weight: 700': 'font-weight: var(--font-weight-bold)',
};

const COMPONENT_PATTERNS = ['src/components/ui/*/*.scss'];

async function replaceFontWeights() {
  console.log('🔧 Starting font-weight replacement...\n');

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
      for (const [oldValue, newValue] of Object.entries(FONT_WEIGHT_REPLACEMENTS)) {
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
    console.log('2. Test typography in browser');
    console.log('3. Continue with remaining hardcoded values');
  }
}

replaceFontWeights().catch(console.error);
