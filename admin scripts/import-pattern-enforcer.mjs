#!/usr/bin/env node

/**
 * Import Pattern Enforcer
 * Ensures all imports use clean index file architecture
 * Essential for maintaining scalable component organization
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

const COMPONENT_IMPORT_PATTERN = /@\/components\/ui\/(\w+)\/\w+/g;

async function findAllFiles() {
  const patterns = ['src/**/*.{ts,tsx,js,jsx}'];
  const files = [];

  for (const pattern of patterns) {
    const matches = await glob(pattern, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
      absolute: true,
    });
    files.push(...matches);
  }

  return [...new Set(files)];
}

function analyzeFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const violations = [];

    let match;
    const regex = new RegExp(COMPONENT_IMPORT_PATTERN.source, 'g');

    while ((match = regex.exec(content)) !== null) {
      const fullMatch = match[0];
      const componentName = match[1];
      const line = content.substring(0, match.index).split('\n').length;

      if (fullMatch.includes('/demo')) continue;

      violations.push({
        line,
        match: fullMatch,
        componentName,
        shouldBe: `@/components/ui/${componentName}`,
      });
    }

    return violations;
  } catch (error) {
    return [];
  }
}

function fixFile(filePath, violations) {
  if (violations.length === 0) return false;

  try {
    let content = readFileSync(filePath, 'utf8');
    let changed = false;

    for (const violation of violations) {
      const oldPattern = new RegExp(violation.match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const newContent = content.replace(oldPattern, violation.shouldBe);

      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('🔍 Import Pattern Enforcer - Cleaning architecture...\n');

  const files = await findAllFiles();
  let totalViolations = 0;
  let fixedFiles = 0;

  for (const filePath of files) {
    const violations = analyzeFile(filePath);
    if (violations.length > 0) {
      totalViolations += violations.length;
      const fixed = fixFile(filePath, violations);
      if (fixed) {
        fixedFiles++;
        const relativePath = path.relative(process.cwd(), filePath);
        console.log(`✅ Fixed ${violations.length} violation(s) in ${relativePath}`);
      }
    }
  }

  console.log(`\n📊 Summary: ${totalViolations} violations found, ${fixedFiles} files fixed`);
  console.log(totalViolations === 0 ? '🎉 Architecture is clean!' : '🚀 Import patterns enforced!');
}

main().catch(error => {
  console.error('💥 Import Pattern Enforcer failed:', error);
  process.exit(1);
});
