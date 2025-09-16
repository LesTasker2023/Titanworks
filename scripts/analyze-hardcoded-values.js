#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';

// Common hardcoded patterns to look for and their token replacements
const HARDCODED_PATTERNS = [
  // Colors
  { pattern: /#[0-9a-fA-F]{3,6}/g, type: 'color', severity: 'high' },
  { pattern: /rgb\([^)]+\)/g, type: 'color', severity: 'high' },
  { pattern: /rgba\([^)]+\)/g, type: 'color', severity: 'medium' },
  { pattern: /hsl\(\s*\d+/g, type: 'color', severity: 'medium' },

  // Spacing (but exclude design token calc expressions)
  {
    pattern: /(?<!calc\([^)]*)\b\d+(\.\d+)?rem(?!\s*\*|\s*\/)/g,
    type: 'spacing',
    severity: 'medium',
  },
  { pattern: /(?<!calc\([^)]*)\b\d+px(?!\s*\*|\s*\/)/g, type: 'spacing', severity: 'high' },

  // Font weights
  { pattern: /font-weight:\s*\d{3}/g, type: 'typography', severity: 'medium' },

  // Z-index values
  { pattern: /z-index:\s*\d+/g, type: 'layout', severity: 'low' },
];

// Design token replacement suggestions
const TOKEN_SUGGESTIONS = {
  // Common hardcoded values and their token equivalents
  color: {
    '#ffffff': 'hsl(var(--surface-primary))',
    '#000000': 'hsl(0 0% 0%)',
    white: 'hsl(var(--content-inverse))',
    black: 'hsl(var(--content-primary))',
  },
  spacing: {
    '0.25rem': '$spacing-xs',
    '0.5rem': '$spacing-sm',
    '1rem': '$spacing-md',
    '1.5rem': '$spacing-lg',
    '2rem': '$spacing-xl',
    '3rem': '$spacing-2xl',
  },
  typography: {
    'font-weight: 400': 'font-weight: $font-weight-normal',
    'font-weight: 500': 'font-weight: $font-weight-medium',
    'font-weight: 600': 'font-weight: $font-weight-semibold',
    'font-weight: 700': 'font-weight: $font-weight-bold',
  },
};

async function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    HARDCODED_PATTERNS.forEach(({ pattern, type, severity }) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;
          issues.push({
            file: filePath,
            line: lineNumber,
            match: match.trim(),
            type,
            severity,
            suggestion: TOKEN_SUGGESTIONS[type]?.[match.trim()] || `Use design token for ${type}`,
          });
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return [];
  }
}

async function main() {
  // Find all component SCSS files
  const scssFiles = glob.sync('src/components/ui/**/*.scss', { cwd: process.cwd() });

  console.log(`🔍 Analyzing ${scssFiles.length} SCSS files for hardcoded values...\n`);

  let totalIssues = 0;
  const issuesByFile = {};

  for (const filePath of scssFiles) {
    const issues = await analyzeFile(filePath);
    if (issues.length > 0) {
      issuesByFile[filePath] = issues;
      totalIssues += issues.length;
    }
  }

  // Report findings
  console.log(`📊 Analysis Results:`);
  console.log(`- Files analyzed: ${scssFiles.length}`);
  console.log(`- Files with issues: ${Object.keys(issuesByFile).length}`);
  console.log(`- Total issues found: ${totalIssues}\n`);

  // Detailed report
  Object.entries(issuesByFile).forEach(([filePath, issues]) => {
    console.log(`📄 ${filePath}:`);
    issues.forEach(issue => {
      const severity = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
      console.log(`  ${severity} Line ${issue.line}: ${issue.match} (${issue.type})`);
      console.log(`     Suggestion: ${issue.suggestion}`);
    });
    console.log();
  });

  // Summary by type
  const issuesByType = {};
  Object.values(issuesByFile)
    .flat()
    .forEach(issue => {
      issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
    });

  console.log(`📈 Issues by type:`);
  Object.entries(issuesByType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  // Recommendations
  console.log(`\n💡 Next steps:`);
  console.log(`1. Focus on 🔴 high-severity issues first (hardcoded colors and px values)`);
  console.log(`2. Replace hardcoded values with design token variables from design-tokens.scss`);
  console.log(`3. Use mixins like @include surface-primary, @include content-primary`);
  console.log(`4. Test changes by modifying values in .env.local`);
}

main().catch(console.error);
