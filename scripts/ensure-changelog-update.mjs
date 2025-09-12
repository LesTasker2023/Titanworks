#!/usr/bin/env node
import { execSync } from 'node:child_process';

// Simple guard: if there are staged changes touching src/ or package.json but CHANGELOG.md
// was not staged in this commit, fail. Allows pure docs or config tweaks to skip if they
// only touch non-runtime files (can refine later).

function getStaged() {
  const raw = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  return raw.split(/\r?\n/).filter(Boolean);
}

const staged = getStaged();
const touchesRuntime = staged.some(f =>
  /^(src\/|package.json|vitest.config|next.config|tailwind.config|tsconfig)/.test(f)
);
const changelogStaged = staged.includes('CHANGELOG.md');

if (touchesRuntime && !changelogStaged) {
  console.error('\n⛔ CHANGELOG.md update required (runtime-impacting changes detected).');
  console.error('Staged files:', staged.join(', '));
  console.error('Add an entry to CHANGELOG.md (top, unreleased section) and stage it.');
  process.exit(1);
}

console.log('✅ Changelog guard passed.');
