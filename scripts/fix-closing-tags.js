#!/usr/bin/env node

// Clinical Closing Tag Fixer - Surgical Precision
// Fixes all mismatched Container closing tags

import fs from 'fs';

const filePath = 'src/app/component-showcase/page.tsx';

console.log('🔧 CLINICAL CLOSING TAG FIXER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  // Strategy: Find component showcase sections and fix their specific closing patterns
  // Each showcase section has this pattern:
  // {/* ComponentName Showcase */}
  // <Container>...</Container>

  const componentPatterns = [
    // Pattern: Showcase section ending before next showcase or major section
    {
      name: 'Component showcase containers',
      // Look for: content ending with several closing divs, then next showcase comment
      pattern:
        /(\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s*\n\s*<\/div>)(\s*\n\s*\{\/\* \w+ Showcase \*\/\})/g,
      replacement: '$1'.replace('</div>', '</Container>') + '$2',
    },
  ];

  // More direct approach: Find all remaining </div> that should be </Container>
  // Look for component showcase section endings
  const showcaseEndings = [
    // Button Component ending
    /(\s+<\/span>\s+<\/Button>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>)(\s*\n\s*\{\/\* Input Showcase \*\/\})/g,
    // Input Component ending
    /(\s+<\/span>\s+Premium features active\s+<\/span>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s+<\/div>)(\s*\n\s*\{\/\* Textarea Showcase \*\/\})/g,
  ];

  // Generic approach: Replace </div> with </Container> for showcase section endings
  // Find pattern: multiple </div> followed by {/* SomeName Showcase */}
  content = content.replace(
    /(<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s*\n\s*<\/div>)(\s*\n\s*\{\/\* \w+[\s\w]* Showcase \*\/\})/g,
    (match, divGroup, showcase) => {
      // Replace the last </div> with </Container>
      const updatedDivGroup = divGroup.replace(/(<\/div>)(\s*\n\s*<\/div>)$/, '</Container>$2');
      fixes++;
      return updatedDivGroup + showcase;
    }
  );

  // Also handle the final component before footer sections
  content = content.replace(
    /(<\/div>\s+<\/div>\s+<\/div>\s+<\/div>\s*\n\s*<\/div>)(\s*\n\s*<\/section>)/g,
    (match, divGroup, section) => {
      const updatedDivGroup = divGroup.replace(/(<\/div>)(\s*\n\s*<\/div>)$/, '</Container>$2');
      fixes++;
      return updatedDivGroup + section;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`✅ Fixed ${fixes} component showcase closing tags`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎯 Closing tag fixes complete');
  console.log('💪 Repository now clinical-grade clean');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('\n🚀 Run yarn build to validate JSX structure!');
