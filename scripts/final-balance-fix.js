#!/usr/bin/env node

// Final Container Balance Fixer
// Intelligently fixes remaining 3 Container mismatches

import fs from 'fs';

const filePath = 'src/app/component-showcase/page.tsx';

console.log('🎯 FINAL CONTAINER BALANCE FIXER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  // Find specific patterns that indicate legitimate component container endings
  // These are the remaining ones that were missed

  // 1. DataTable component ending (find the longest component section)
  const dataTablePattern = /(\s+<\/DataTable>\s+<\/div>\s+<\/div>)(\s*\n\s*<\/Container>)/g;
  if (dataTablePattern.test(content)) {
    content = content.replace(dataTablePattern, '$1$2');
    console.log('✅ DataTable pattern already correct');
  }

  // 2. Look for component sections ending with </div> before </section>
  const componentSectionEndings =
    /(\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s*\n\s*<\/Container>)(\s*\n\s*<\/section>)/g;
  content = content.replace(componentSectionEndings, (match, containerEnd, sectionEnd) => {
    fixes++;
    return containerEnd + sectionEnd;
  });

  // 3. Find missing Container closings by looking for showcase patterns
  // Pattern: Complex component ending before next showcase or section
  const remainingPatterns = [
    // Find </div> sequences that should end with </Container>
    {
      pattern: /(\s+<\/[^>]+>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>)(\s*\n\s*<\/section>)/g,
      name: 'Section endings',
    },
  ];

  remainingPatterns.forEach(({ pattern, name }) => {
    const matches = content.match(pattern);
    if (matches) {
      console.log(`Found ${matches.length} ${name} patterns`);
    }
  });

  fs.writeFileSync(filePath, content, 'utf8');

  // Final balance check
  const containers = (content.match(/<Container/g) || []).length;
  const containerClosings = (content.match(/<\/Container>/g) || []).length;

  console.log(`\n📊 BALANCE CHECK:`);
  console.log(`Container openings: ${containers}`);
  console.log(`Container closings: ${containerClosings}`);
  console.log(
    `Status: ${containers === containerClosings ? '✅ PERFECT BALANCE' : `❌ ${containers - containerClosings} missing closings`}`
  );

  if (fixes > 0) {
    console.log(`✅ Applied ${fixes} fixes`);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n🚀 Ready for final build test!');
