#!/usr/bin/env node

// Main Container Closing Tag Fixer
// Fixes all main component container closing tags that appear before showcase comments

import fs from 'fs';

const filePath = 'src/app/component-showcase/page.tsx';

console.log('🔧 MAIN CONTAINER CLOSING TAG FIXER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  // Pattern: </div> followed by showcase comment
  // This indicates the end of a main component container
  const mainContainerPattern = /(\s+<\/div>)(\s*\n\s*\{\/\* \w+[\s\w&]* Showcase \*\/\})/g;

  content = content.replace(mainContainerPattern, (match, divClosing, showcaseComment) => {
    fixes++;
    return divClosing.replace('</div>', '</Container>') + showcaseComment;
  });

  // Also handle the final component before sections end
  const finalPattern = /(\s+<\/div>)(\s*\n\s*<\/section>)/g;
  content = content.replace(finalPattern, (match, divClosing, sectionEnd) => {
    fixes++;
    return divClosing.replace('</div>', '</Container>') + sectionEnd;
  });

  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`✅ Fixed ${fixes} main container closing tags`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 Main container fixes complete');

  // Show final status
  const containers = (content.match(/<Container/g) || []).length;
  const containerClosings = (content.match(/<\/Container>/g) || []).length;

  console.log(`\n📊 FINAL STATUS:`);
  console.log(`Container openings: ${containers}`);
  console.log(`Container closings: ${containerClosings}`);
  console.log(`Balance: ${containers === containerClosings ? '✅ PERFECT' : '❌ MISMATCH'}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n🚀 Run yarn build to validate complete cleanup!');
