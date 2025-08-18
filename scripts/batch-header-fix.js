#!/usr/bin/env node

// Batch Container Closing Tag Fixer
// Systematically fixes all header container patterns

import fs from 'fs';

const filePath = 'src/app/component-showcase/page.tsx';

console.log('⚡ BATCH CONTAINER CLOSING TAG FIXER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  // Fix all header container patterns
  // Pattern: Component name followed by </h3> and </div>
  const headerPattern = /(\s+)(\w+\s+Component)\s*\n(\s+)<\/h3>\s*\n(\s+)<\/div>/g;

  content = content.replace(headerPattern, (match, indent1, componentName, indent2, indent3) => {
    fixes++;
    return `${indent1}${componentName}\n${indent2}</h3>\n${indent3}</Container>`;
  });

  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`✅ Fixed ${fixes} header container closing tags`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 Header container fixes complete');

  // Show remaining issues
  const remainingDivs = (content.match(/<\/div>/g) || []).length;
  const containers = (content.match(/<Container/g) || []).length;
  const containerClosings = (content.match(/<\/Container>/g) || []).length;

  console.log(`\n📊 STATUS:`);
  console.log(`Container openings: ${containers}`);
  console.log(`Container closings: ${containerClosings}`);
  console.log(`Remaining </div> tags: ${remainingDivs}`);
  console.log(`Missing Container closings: ${containers - containerClosings}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n🚀 Next: Fix remaining main container closing tags!');
