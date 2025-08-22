#!/usr/bin/env node

/**
 * Shadcn/UI Component Analyzer
 * Essential tool for component architecture analysis
 */

import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

async function analyzeComponents() {
  console.log('🔍 Shadcn/UI Component Analysis\n');

  const componentDirs = await glob('src/components/ui/*', { onlyDirectories: true });
  const results = [];

  for (const dir of componentDirs) {
    const componentName = path.basename(dir);
    const analysis = {
      name: componentName,
      hasComponent: false,
      hasTest: false,
      hasStory: false,
      hasIndex: false,
      hasDemo: false,
      size: 'unknown',
    };

    // Check for component file
    const componentPath = path.join(dir, `${componentName}.tsx`);
    try {
      const stats = await fs.stat(componentPath);
      analysis.hasComponent = true;
      analysis.size = `${Math.round(stats.size / 1024)}KB`;
    } catch {}

    // Check for other files
    analysis.hasTest = await fileExists(path.join(dir, `${componentName}.test.tsx`));
    analysis.hasStory = await fileExists(path.join(dir, `${componentName}.stories.tsx`));
    analysis.hasIndex = await fileExists(path.join(dir, 'index.ts'));
    analysis.hasDemo = await fileExists(path.join(dir, 'demo.tsx'));

    results.push(analysis);
  }

  // Display results
  console.log('📊 Component Overview:');
  console.log(
    'Name'.padEnd(20) +
      'Component'.padEnd(12) +
      'Test'.padEnd(8) +
      'Story'.padEnd(8) +
      'Index'.padEnd(8) +
      'Demo'.padEnd(8) +
      'Size'
  );
  console.log('-'.repeat(70));

  for (const comp of results) {
    const line = [
      comp.name.padEnd(20),
      (comp.hasComponent ? '✅' : '❌').padEnd(12),
      (comp.hasTest ? '✅' : '❌').padEnd(8),
      (comp.hasStory ? '✅' : '❌').padEnd(8),
      (comp.hasIndex ? '✅' : '❌').padEnd(8),
      (comp.hasDemo ? '✅' : '❌').padEnd(8),
      comp.size,
    ].join('');
    console.log(line);
  }

  // Summary
  const totalComponents = results.length;
  const withTests = results.filter(r => r.hasTest).length;
  const withStories = results.filter(r => r.hasStory).length;
  const withIndex = results.filter(r => r.hasIndex).length;

  console.log('\n📈 Summary:');
  console.log(`Total components: ${totalComponents}`);
  console.log(
    `With tests: ${withTests}/${totalComponents} (${Math.round((withTests / totalComponents) * 100)}%)`
  );
  console.log(
    `With stories: ${withStories}/${totalComponents} (${Math.round((withStories / totalComponents) * 100)}%)`
  );
  console.log(
    `With index files: ${withIndex}/${totalComponents} (${Math.round((withIndex / totalComponents) * 100)}%)`
  );
}

async function fileExists(filePath) {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

analyzeComponents().catch(console.error);
