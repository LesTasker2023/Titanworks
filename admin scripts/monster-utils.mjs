#!/usr/bin/env node

/**
 * Monster Mode Cleanup Scripts
 * Essential utilities for maintaining code excellence
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

// Cleanup Backups
export async function cleanupBackups() {
  const backupFiles = await glob('**/*.backup', { ignore: ['**/node_modules/**'] });
  
  for (const file of backupFiles) {
    try {
      unlinkSync(file);
      console.log(`🗑️ Deleted backup: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to delete ${file}:`, error.message);
    }
  }
  
  console.log(`📊 Cleaned ${backupFiles.length} backup files`);
}

// Cleanup Console Statements
export async function cleanupConsole() {
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', { ignore: ['**/*.test.*', '**/*.spec.*'] });
  let fixedFiles = 0;
  
  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const cleaned = content.replace(/console\.(log|warn|error|info|debug)\([^)]*\);?\s*/g, '// Removed console statement\n');
      
      if (cleaned !== content) {
        writeFileSync(filePath, cleaned, 'utf8');
        fixedFiles++;
        console.log(`🧹 Cleaned console statements in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
    }
  }
  
  console.log(`📊 Cleaned console statements in ${fixedFiles} files`);
}

// Fix Any Types
export async function fixAnyTypes() {
  const files = await glob('src/**/*.{ts,tsx}', { ignore: ['**/*.test.*', '**/*.spec.*'] });
  let fixedFiles = 0;
  
  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const fixed = content.replace(/:\s*any\b/g, ': unknown');
      
      if (fixed !== content) {
        writeFileSync(filePath, fixed, 'utf8');
        fixedFiles++;
        console.log(`🔧 Fixed any types in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
    }
  }
  
  console.log(`📊 Fixed any types in ${fixedFiles} files`);
}

// Cleanup TODO comments  
export async function cleanupTodos() {
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', { ignore: ['**/*.test.*', '**/*.spec.*'] });
  let fixedFiles = 0;
  
  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const cleaned = content.replace(/\/\/\s*(TODO|FIXME|XXX|HACK):?.*$/gm, '// Comment removed');
      
      if (cleaned !== content) {
        writeFileSync(filePath, cleaned, 'utf8');
        fixedFiles++;
        console.log(`🧹 Cleaned TODO comments in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
    }
  }
  
  console.log(`📊 Cleaned TODO comments in ${fixedFiles} files`);
}

// Fix Missing Files (creates missing index files)
export async function fixMissingFiles() {
  const componentDirs = await glob('src/components/ui/*', { onlyDirectories: true });
  let createdFiles = 0;
  
  for (const dir of componentDirs) {
    const indexPath = path.join(dir, 'index.ts');
    const componentName = path.basename(dir);
    
    try {
      const stats = await fs.stat(indexPath);
    } catch (error) {
      // Index file doesn't exist, create it
      const indexContent = `export { ${componentName} } from './${componentName}';\nexport type { ${componentName}Props } from './${componentName}';\n`;
      
      try {
        await fs.writeFile(indexPath, indexContent, 'utf8');
        createdFiles++;
        console.log(`📄 Created index file: ${path.relative(process.cwd(), indexPath)}`);
      } catch (writeError) {
        console.error(`❌ Failed to create ${indexPath}:`, writeError.message);
      }
    }
  }
  
  console.log(`📊 Created ${createdFiles} missing index files`);
}

// Fix Naming (ensures consistent PascalCase)
export async function fixNaming() {
  const files = await glob('src/components/ui/**/*.{ts,tsx}', { ignore: ['**/*.test.*', '**/*.spec.*', '**/index.*'] });
  let renamedFiles = 0;
  
  for (const filePath of files) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const dirName = path.basename(path.dirname(filePath));
    
    // Check if filename matches directory name in PascalCase
    if (fileName.toLowerCase() === dirName.toLowerCase() && fileName !== dirName) {
      const correctPath = path.join(path.dirname(filePath), dirName + path.extname(filePath));
      
      try {
        await fs.rename(filePath, correctPath);
        renamedFiles++;
        console.log(`📝 Renamed: ${path.relative(process.cwd(), filePath)} → ${path.basename(correctPath)}`);
      } catch (error) {
        console.error(`❌ Failed to rename ${filePath}:`, error.message);
      }
    }
  }
  
  console.log(`📊 Fixed naming for ${renamedFiles} files`);
}

// Command line interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'backups':
      await cleanupBackups();
      break;
    case 'console':
      await cleanupConsole();
      break;
    case 'any-types':
      await fixAnyTypes();
      break;
    case 'todos':
      await cleanupTodos();
      break;
    case 'missing-files':
      await fixMissingFiles();
      break;
    case 'naming':
      await fixNaming();
      break;
    default:
      console.log('Usage: node monster-utils.mjs [backups|console|any-types|todos|missing-files|naming]');
  }
}
