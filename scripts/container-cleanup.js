#!/usr/bin/env node

// Clinical Container Cleanup - UTF-8 Safe Replacement
// Surgical precision for component showcase DRY cleanup

import fs from 'fs';

const filePath = 'src/app/component-showcase/page.tsx';

console.log('🏥 CLINICAL CONTAINER CLEANUP - UTF-8 Safe');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  // Read file with proper UTF-8 encoding
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;

  // Define replacement patterns
  const patterns = [
    {
      name: 'Border Container Divs',
      find: '<div className="border border-border rounded-lg p-8 space-y-8">',
      replace:
        '<Container size="7xl" padding="lg" className="border border-border rounded-lg space-y-8">',
    },
    {
      name: 'BG-Card Container Divs',
      find: '<div className="bg-card border border-border rounded-lg p-8 space-y-8">',
      replace:
        '<Container size="7xl" padding="lg" className="bg-card border border-border rounded-lg space-y-8">',
    },
    {
      name: 'Text-Center Header Divs',
      find: '<div className="text-center">',
      replace: '<Container size="none" padding="none" className="text-center">',
    },
  ];

  // Apply replacements
  patterns.forEach(pattern => {
    const matches = content.split(pattern.find).length - 1;
    if (matches > 0) {
      content = content.replaceAll(pattern.find, pattern.replace);
      console.log(`✅ ${pattern.name}: ${matches} replacements`);
      replacements += matches;
    }
  });

  // Write back with UTF-8 encoding
  fs.writeFileSync(filePath, content, 'utf8');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎯 SURGICAL SUCCESS: ${replacements} total replacements`);
  console.log('💉 UTF-8 encoding preserved');
  console.log('⚠️  Next: Manual closing tag fixes needed');

  // Check remaining patterns
  const remaining = (content.match(/border border-border rounded-lg p-8 space-y-8/g) || []).length;
  const bgRemaining = (
    content.match(/bg-card border border-border rounded-lg p-8 space-y-8/g) || []
  ).length;

  console.log(`\n📊 STATUS:`);
  console.log(`Remaining border patterns: ${remaining}`);
  console.log(`Remaining bg-card patterns: ${bgRemaining}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n🚀 Ready for manual closing tag fixes!');
