#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComponentStatsScanner {
  constructor() {
    this.componentDir = path.join(process.cwd(), 'src/components/ui');
  }

  /**
   * Count tests in a test file
   */
  countTests(testFilePath) {
    if (!fs.existsSync(testFilePath)) return 0;

    const content = fs.readFileSync(testFilePath, 'utf8');
    const matches = content.match(/it\(/g);
    return matches ? matches.length : 0;
  }

  /**
   * Count stories in a stories file
   */
  countStories(storiesFilePath) {
    if (!fs.existsSync(storiesFilePath)) return 0;

    const content = fs.readFileSync(storiesFilePath, 'utf8');
    // Count export patterns that typically indicate stories
    const exportMatches = content.match(/export\s+(const|function)\s+\w+/g);
    const metaMatch = content.match(/export\s+default/g);

    // Stories typically have exports minus the default meta export
    const storyCount = exportMatches ? Math.max(0, exportMatches.length - (metaMatch ? 1 : 0)) : 0;
    return storyCount;
  }

  /**
   * Get all component directories
   */
  getComponentDirectories() {
    return fs
      .readdirSync(this.componentDir)
      .filter(dir => {
        const fullPath = path.join(this.componentDir, dir);
        return fs.statSync(fullPath).isDirectory();
      })
      .sort();
  }

  /**
   * Scan a single component for stats
   */
  scanComponent(componentName) {
    const componentPath = path.join(this.componentDir, componentName);
    const files = fs.readdirSync(componentPath);

    const stats = {
      name: componentName,
      hasTests: false,
      hasStories: false,
      testCount: 0,
      storyCount: 0,
      testFile: null,
      storiesFile: null,
    };

    // Find test file
    const testFile = files.find(
      f => f.includes('.test.') && (f.endsWith('.tsx') || f.endsWith('.ts'))
    );

    if (testFile) {
      stats.hasTests = true;
      stats.testFile = testFile;
      stats.testCount = this.countTests(path.join(componentPath, testFile));
    }

    // Find stories file
    const storiesFile = files.find(
      f => f.includes('.stories.') && (f.endsWith('.tsx') || f.endsWith('.ts'))
    );

    if (storiesFile) {
      stats.hasStories = true;
      stats.storiesFile = storiesFile;
      stats.storyCount = this.countStories(path.join(componentPath, storiesFile));
    }

    return stats;
  }

  /**
   * Scan all components and generate report
   */
  async run() {
    console.log('🔍 Scanning components for real test and story counts...\n');

    const components = this.getComponentDirectories();
    const results = [];

    for (const component of components) {
      const stats = this.scanComponent(component);
      results.push(stats);

      console.log(`📊 ${component}:`);
      console.log(`   Tests: ${stats.hasTests ? stats.testCount : 'None'}`);
      console.log(`   Stories: ${stats.hasStories ? stats.storyCount : 'None'}`);
      console.log('');
    }

    // Generate JSON output for component showcase
    const componentShowcaseData = results.map(component => ({
      name: component.name,
      hasTests: component.hasTests,
      hasStories: component.hasStories,
      testCount: component.testCount,
      storyCount: component.storyCount,
    }));

    const outputPath = path.join(process.cwd(), 'component-stats.json');
    fs.writeFileSync(outputPath, JSON.stringify(componentShowcaseData, null, 2));

    console.log('✅ Component stats scan complete!');
    console.log(`📁 Results saved to: component-stats.json`);
    console.log(`\n📈 Summary:`);
    console.log(`   Total components: ${results.length}`);
    console.log(`   With tests: ${results.filter(c => c.hasTests).length}`);
    console.log(`   With stories: ${results.filter(c => c.hasStories).length}`);
    console.log(`   Total tests: ${results.reduce((sum, c) => sum + c.testCount, 0)}`);
    console.log(`   Total stories: ${results.reduce((sum, c) => sum + c.storyCount, 0)}`);

    return results;
  }
}

// Run the scanner
const scanner = new ComponentStatsScanner();
scanner.run().catch(console.error);
