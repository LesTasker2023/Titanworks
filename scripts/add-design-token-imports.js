#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

// Find all component SCSS files
const scssFiles = glob.sync('src/components/ui/**/*.scss', { cwd: process.cwd() });

console.log(`Found ${scssFiles.length} SCSS files to check...`);

let updatedFiles = 0;

scssFiles.forEach(filePath => {
  try {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Check if file already has design tokens import
    if (content.includes('@import') && content.includes('design-tokens')) {
      console.log(`✓ ${filePath} already has design tokens import`);
      return;
    }

    // Skip if file is empty or has no meaningful content
    if (content.trim().length < 10) {
      console.log(`⚠ ${filePath} is too small, skipping`);
      return;
    }

    // Add design tokens import at the top
    const importLine = "@import '../../../styles/design-tokens';\n\n";
    const updatedContent = importLine + content;

    fs.writeFileSync(fullPath, updatedContent);
    console.log(`✅ Added design tokens import to ${filePath}`);
    updatedFiles++;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Updated ${updatedFiles} files with design token imports`);
