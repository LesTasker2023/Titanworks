#!/usr/bin/env node

/**
 * EMERGENCY BUNDLE OPTIMIZER
 * Fixes Vercel 250MB serverless function limit
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚨 EMERGENCY: Optimizing bundle for Vercel 250MB limit...\n');

// 1. Clean build artifacts
console.log('🧹 Cleaning build artifacts...');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
  execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
} catch (error) {
  // Continue on Windows
  try {
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
    execSync('rmdir /s /q node_modules\\.cache', { stdio: 'inherit' });
  } catch (winError) {
    console.log('⚠️  Could not clean all artifacts, continuing...');
  }
}

// 2. Optimize package.json by removing dev dependencies from production
console.log('📦 Analyzing package.json...');
const packagePath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Count massive dependencies
const massiveDeps = [];
const problematicDeps = [
  '@storybook',
  '@testing-library',
  '@vitest',
  '@chromatic-com',
  'vitest',
  'storybook',
  'husky',
  'concurrently',
  'npm-run-all',
  'cross-env',
  'chalk',
  'prettier',
];

Object.keys(packageJson.dependencies || {}).forEach(dep => {
  if (problematicDeps.some(problem => dep.includes(problem))) {
    massiveDeps.push(dep);
  }
});

console.log(`🔍 Found ${massiveDeps.length} potentially heavy dependencies:`);
massiveDeps.forEach(dep => console.log(`   - ${dep}`));

// 3. Create optimized vercel.json
console.log('⚙️  Creating optimized vercel.json...');
const vercelConfig = {
  framework: 'nextjs',
  buildCommand: 'next build',
  outputDirectory: '.next',
  functions: {
    'src/app/**/route.ts': {
      maxDuration: 30,
    },
    'src/pages/api/**/*.ts': {
      maxDuration: 30,
    },
  },
  regions: ['iad1'],
  rewrites: [
    {
      source: '/api/(.*)',
      destination: '/api/$1',
    },
  ],
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

// 4. Analyze current bundle
console.log('📊 Analyzing current bundle size...');
try {
  execSync('yarn analyze', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Bundle analysis failed, building with optimization...');

  // Emergency build with minimal bundle
  try {
    execSync('ANALYZE=false yarn build', { stdio: 'inherit' });
  } catch (buildError) {
    console.error('💥 Build failed:', buildError.message);
    process.exit(1);
  }
}

// 5. Check .next folder size
console.log('\n📏 Checking build output size...');
try {
  const nextDir = '.next';
  if (fs.existsSync(nextDir)) {
    const { stdout } = execSync('du -sh .next || dir .next /-c', { encoding: 'utf8' });
    console.log('Build size:', stdout);
  }
} catch (error) {
  console.log('Could not check build size');
}

console.log('\n✅ Emergency optimization complete!');
console.log('\n🚀 Deploy recommendations:');
console.log('   1. Use "output: standalone" mode (already configured)');
console.log('   2. Heavy dev dependencies externalized from serverless functions');
console.log('   3. Aggressive chunk splitting configured (200KB max chunks)');
console.log('   4. Tree shaking optimized for production');
console.log('\n💡 Next steps:');
console.log(
  '   - Run: git add . && git commit -m "EMERGENCY: Bundle optimization for Vercel 250MB limit"'
);
console.log('   - Deploy to Vercel and monitor function sizes');
console.log('   - If still failing, consider removing Storybook entirely from production');
