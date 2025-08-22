/**
 * MONSTER TESTS - Adaptive Codebase Excellence Enforcement
 * These tests SCALE with your codebase and ADAPT to new components
 * Each failure blocks scaling - fix them all to unlock monster mode
 *
 * Usage:
 *   yarn audit:monster     - Run full audit
 *   yarn audit:watch       - Watch mode for development
 *   yarn harden           - Auto-fix what can be fixed
 *   yarn monster-mode     - Full pipeline with fixes
 *   yarn pre-scale        - Complete pre-deployment check
 */

import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { beforeAll, describe, expect, test } from 'vitest';

// Dynamic configuration - adapts to your project structure
let PROJECT_CONFIG: {
  componentPaths: string[];
  totalComponents: number;
  requiredFiles: string[];
  excludePatterns: string[];
} = {
  componentPaths: [],
  totalComponents: 0,
  requiredFiles: ['tsx', 'test.tsx', 'stories.tsx', 'index.ts'],
  excludePatterns: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
};

beforeAll(async () => {
  // Auto-discover your component structure
  PROJECT_CONFIG.componentPaths = await glob('src/components/ui/*/', {
    cwd: process.cwd(),
  });
  PROJECT_CONFIG.totalComponents = PROJECT_CONFIG.componentPaths.length;

  console.log(`� Discovered ${PROJECT_CONFIG.totalComponents} components`);
});

describe('�🔥 MONSTER MODE: DELETE FIRST', () => {
  test('CRITICAL: Zero backup files allowed', async () => {
    const backupPatterns = ['**/*.backup', '**/*.bak', '**/*.orig', '**/*.old', '**/*.tmp'];
    const allBackups: string[] = [];

    for (const pattern of backupPatterns) {
      const files = await glob(pattern, {
        cwd: process.cwd(),
        ignore: PROJECT_CONFIG.excludePatterns,
      });
      allBackups.push(...files);
    }

    if (allBackups.length > 0) {
      console.log('❌ BACKUP FILES FOUND:');
      allBackups.forEach(file => console.log(`  - ${file}`));
      console.log('\n🗑️  AUTO-FIX: yarn clean:backups');
    }

    expect(allBackups).toHaveLength(0);
  });

  test('CRITICAL: Zero any types allowed in production code', async () => {
    const tsFiles = await glob('src/**/*.{ts,tsx}', {
      cwd: process.cwd(),
      ignore: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*', ...PROJECT_CONFIG.excludePatterns],
    });

    const anyUsageFiles: string[] = [];

    for (const file of tsFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (/:\s*any\b|<any>|as any|any\[\]/.test(content)) {
        anyUsageFiles.push(file);
      }
    }

    if (anyUsageFiles.length > 0) {
      console.log('❌ ANY TYPES FOUND:');
      anyUsageFiles.forEach(file => console.log(`  - ${file}`));
      console.log('\n🔧 AUTO-FIX: yarn fix:any-types');
    }

    expect(anyUsageFiles).toHaveLength(0);
  });

  test('CRITICAL: Zero console statements in production', async () => {
    const prodFiles = await glob('src/**/*.{ts,tsx}', {
      cwd: process.cwd(),
      ignore: [
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.stories.*',
        '**/demo.tsx',
        'src/app/api/**', // API routes may need logging
        'src/test/**', // Test files can use console
        ...PROJECT_CONFIG.excludePatterns,
      ],
    });

    const consoleFiles: string[] = [];

    for (const file of prodFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (/console\.(log|warn|error|info|debug)/.test(content)) {
        consoleFiles.push(file);
      }
    }

    if (consoleFiles.length > 0) {
      console.log('❌ CONSOLE STATEMENTS FOUND:');
      consoleFiles.forEach(file => console.log(`  - ${file}`));
      console.log('\n🔧 AUTO-FIX: yarn clean:console');
    }

    expect(consoleFiles).toHaveLength(0);
  });
});

describe('🏗️ MONSTER MODE: TECH DEBT ELIMINATION', () => {
  test('WARNING: Minimize TODO/FIXME comments', async () => {
    const allFiles = await glob('src/**/*.{ts,tsx}', {
      cwd: process.cwd(),
      ignore: PROJECT_CONFIG.excludePatterns,
    });

    const todoFiles: string[] = [];
    let totalTodos = 0;

    for (const file of allFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const todos = content.match(/\/\/\s*(TODO|FIXME|HACK|XXX)/gi);
      if (todos) {
        todoFiles.push(file);
        totalTodos += todos.length;
      }
    }

    console.log(`📊 TECH DEBT: ${totalTodos} TODO/FIXME comments in ${todoFiles.length} files`);
    if (totalTodos > 50) {
      console.log('🔧 ANALYZE: yarn clean:todos');
    }

    // Dynamic threshold - scales with codebase size
    const maxAllowed = Math.max(50, Math.floor(PROJECT_CONFIG.totalComponents * 2));
    expect(totalTodos).toBeLessThan(maxAllowed);
  });

  test('WARNING: Reasonable script count', async () => {
    const scriptFiles = await glob('scripts/**/*.{ps1,js,mjs,cjs}', {
      cwd: process.cwd(),
    });

    console.log(`📊 SCRIPTS: ${scriptFiles.length} files`);

    // Dynamic threshold - more components = more scripts allowed
    const maxAllowed = Math.max(40, Math.floor(PROJECT_CONFIG.totalComponents * 1.5));

    if (scriptFiles.length > maxAllowed) {
      console.log('⚠️  Consider consolidating scripts');
    }

    expect(scriptFiles.length).toBeLessThan(maxAllowed);
  });
});

describe('🚀 MONSTER MODE: PRODUCTION READINESS', () => {
  test('All components have consistent naming', async () => {
    const namingIssues: string[] = [];

    for (const dir of PROJECT_CONFIG.componentPaths) {
      const dirName = path.basename(dir);
      const mainFile = path.join(dir, `${dirName}.tsx`);

      if (!fs.existsSync(mainFile)) {
        namingIssues.push(`Missing main file: ${mainFile}`);
        continue;
      }

      // Check PascalCase
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(dirName)) {
        namingIssues.push(`Non-PascalCase: ${dirName}`);
      }
    }

    if (namingIssues.length > 0) {
      console.log('❌ NAMING ISSUES:');
      namingIssues.forEach(issue => console.log(`  - ${issue}`));
      console.log('\n🔧 AUTO-FIX: yarn fix:naming --execute');
    }

    expect(namingIssues).toHaveLength(0);
  });

  test('All components have required files', async () => {
    const missingFiles: string[] = [];

    for (const dir of PROJECT_CONFIG.componentPaths) {
      const dirName = path.basename(dir);

      // Skip non-PascalCase for now
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(dirName)) continue;

      const requiredFiles = [
        `${dirName}.tsx`,
        `${dirName}.test.tsx`,
        `${dirName}.stories.tsx`,
        'index.tsx', // Updated: index files should be .tsx for JSX exports
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(dir, file);
        if (!fs.existsSync(filePath)) {
          missingFiles.push(filePath);
        }
      }
    }

    if (missingFiles.length > 0) {
      console.log('❌ MISSING FILES:');
      missingFiles.forEach(file => console.log(`  - ${file}`));
      console.log('\n🔧 AUTO-FIX: yarn fix:missing-files');
    }

    expect(missingFiles).toHaveLength(0);
  });
});

describe('🎯 MONSTER MODE: PERFORMANCE METRICS', () => {
  test('Reasonable file count for scaling', async () => {
    const stats = {
      totalFiles: (await glob('src/**/*', { cwd: process.cwd() })).length,
      tsxFiles: (await glob('src/**/*.tsx', { cwd: process.cwd() })).length,
      testFiles: (await glob('src/**/*.test.*', { cwd: process.cwd() })).length,
      storyFiles: (await glob('src/**/*.stories.*', { cwd: process.cwd() })).length,
      components: PROJECT_CONFIG.totalComponents,
    };

    console.log('📊 CODEBASE METRICS:');
    console.log(`  Components: ${stats.components}`);
    console.log(`  Total files: ${stats.totalFiles}`);
    console.log(`  TSX files: ${stats.tsxFiles}`);
    console.log(`  Test files: ${stats.testFiles}`);
    console.log(`  Story files: ${stats.storyFiles}`);

    // Dynamic scaling limits
    const maxFiles = stats.components * 50; // 50 files per component max
    expect(stats.totalFiles).toBeLessThan(maxFiles);
    expect(stats.tsxFiles).toBeGreaterThan(0);

    // Test coverage expectation - realistic thresholds based on component focus
    // For UI component libraries, we focus on component tests rather than all files
    const testCoverage = stats.testFiles / stats.tsxFiles;

    // More realistic thresholds: 25% minimum for large codebases, 35% for smaller ones
    const minCoverage = stats.components > 30 ? 0.25 : 0.35;

    console.log(`  Test coverage ratio: ${(testCoverage * 100).toFixed(1)}%`);
    console.log(`  Required minimum: ${(minCoverage * 100).toFixed(1)}%`);
    console.log(`  Components with quality tests (5+ tests): Focus on component test depth`);

    if (testCoverage < minCoverage) {
      console.log('\n🔧 AUTO-FIX: yarn fix:missing-files (generates missing tests)');
    }

    expect(testCoverage).toBeGreaterThan(minCoverage);
  });

  test('Component architecture consistency', async () => {
    const architectureIssues: string[] = [];

    for (const dir of PROJECT_CONFIG.componentPaths) {
      const dirName = path.basename(dir);
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(dirName)) continue;

      const files = fs.readdirSync(dir);
      const hasDemo = files.some(f => f.includes('demo.tsx'));
      const hasIndex = files.some(f => f === 'index.ts' || f === 'index.tsx');

      if (!hasIndex) {
        architectureIssues.push(`${dirName}: Missing index file`);
      }

      // Check for folder-per-component pattern
      const componentFiles = files.filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
      if (componentFiles.length < 3) {
        // Component + test + story minimum
        architectureIssues.push(`${dirName}: Incomplete component files`);
      }
    }

    if (architectureIssues.length > 0) {
      console.log('❌ ARCHITECTURE ISSUES:');
      architectureIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    // Allow some flexibility for growing codebases
    const maxIssues = Math.floor(PROJECT_CONFIG.totalComponents * 0.1); // 10% can have issues
    expect(architectureIssues.length).toBeLessThanOrEqual(maxIssues);
  });
});

describe('📈 MONSTER MODE: SCALING READINESS', () => {
  test('Build system optimization', async () => {
    // Check for potential build optimizations
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const deps = Object.keys(packageJson.dependencies || {});
    const devDeps = Object.keys(packageJson.devDependencies || {});

    console.log('📦 DEPENDENCY ANALYSIS:');
    console.log(`  Production deps: ${deps.length}`);
    console.log(`  Dev deps: ${devDeps.length}`);

    // Warn about excessive dependencies
    const totalDeps = deps.length + devDeps.length;
    const maxDeps = 100 + PROJECT_CONFIG.totalComponents * 2; // Scale with component count

    if (totalDeps > maxDeps) {
      console.log(`⚠️  High dependency count (${totalDeps}). Consider audit.`);
    }

    expect(totalDeps).toBeLessThan(maxDeps * 1.5); // Hard limit at 150%
  });

  test('Monster mode deployment readiness', async () => {
    const readinessChecks = {
      hasPackageJson: fs.existsSync('package.json'),
      hasNextConfig: fs.existsSync('next.config.ts') || fs.existsSync('next.config.js'),
      hasTailwindConfig: fs.existsSync('tailwind.config.js') || fs.existsSync('tailwind.config.ts'),
      hasTypeScript: fs.existsSync('tsconfig.json'),
      hasComponents: PROJECT_CONFIG.totalComponents > 0,
    };

    console.log('🚀 DEPLOYMENT READINESS:');
    Object.entries(readinessChecks).forEach(([check, passed]) => {
      console.log(`  ${passed ? '✅' : '❌'} ${check}`);
    });

    const passedChecks = Object.values(readinessChecks).filter(Boolean).length;
    const totalChecks = Object.keys(readinessChecks).length;

    console.log(
      `\n📊 Readiness Score: ${passedChecks}/${totalChecks} (${Math.round((passedChecks / totalChecks) * 100)}%)`
    );

    expect(passedChecks).toBe(totalChecks);
  });
});
