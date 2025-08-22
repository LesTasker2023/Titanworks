#!/usr/bin/env node

/**
 * 🧠 UNIFIED INTELLIGENCE ENGINE
 * Consolidated data gathering and analysis system
 * Combines repo intelligence, quality audit, and component analysis
 */

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

const INTELLIGENCE_OUTPUT = 'public/intelligence-report.json';

class IntelligenceEngine {
  constructor(options = {}) {
    this.startTime = Date.now();
    this.options = options;
    this.report = {
      metadata: {
        scanTime: new Date().toISOString(),
        version: this.generateVersion(),
        scanner: 'unified-intelligence-engine-v1',
        duration: 0,
      },
      repository: {
        structure: {},
        metrics: {},
        health: {},
        cleanup: {},
      },
      components: {
        inventory: {},
        metrics: {},
        quality: {},
        architecture: {},
      },
      codebase: {
        files: {},
        dependencies: {},
        tests: {},
        coverage: {},
        pipeline: {},
      },
      bestPractices: {
        score: 0,
        issues: [],
        categories: {},
      },
      recommendations: [],
    };
  }

  generateVersion() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  }

  async scan() {
    console.log('🧠 Unified Intelligence Engine - Starting comprehensive scan...\n');

    const phases = [
      { name: 'Repository Scanning', method: 'scanRepository', icon: '🔍' },
      {
        name: 'Cleanup & Maintenance',
        method: 'performCleanup',
        icon: '🧹',
        skipFlag: 'skipCleanup',
      },
      { name: 'Component Analysis', method: 'analyzeComponents', icon: '🔧' },
      { name: 'Pipeline Validation', method: 'validatePipeline', icon: '🔧' },
      { name: 'Best Practices Audit', method: 'validateBestPractices', icon: '🛡️' },
      { name: 'Quality Assessment', method: 'assessQuality', icon: '📊' },
      { name: 'Codebase Analysis', method: 'analyzeCodebase', icon: '🔬' },
      { name: 'Recommendation Generation', method: 'generateRecommendations', icon: '💡' },
      { name: 'Report Generation', method: 'saveReport', icon: '📝' },
    ];

    // Filter out skipped phases
    const activePhases = phases.filter(phase => {
      if (phase.skipFlag && this.options[phase.skipFlag]) {
        console.log(
          `⏭️  Skipping ${phase.name} (--${phase.skipFlag.replace(/([A-Z])/g, '-$1').toLowerCase()} flag)`
        );
        return false;
      }
      return true;
    });

    try {
      for (let i = 0; i < activePhases.length; i++) {
        const phase = activePhases[i];
        const phaseStart = Date.now();

        console.log(`${phase.icon} Phase ${i + 1}/${activePhases.length}: ${phase.name}...`);

        await this[phase.method]();

        const phaseDuration = Date.now() - phaseStart;
        console.log(`   ✅ ${phase.name} completed in ${phaseDuration}ms\n`);
      }

      this.report.metadata.duration = Date.now() - this.startTime;
      console.log(`🎯 Intelligence scan completed in ${this.report.metadata.duration}ms`);
      console.log(`📊 Report saved to: ${INTELLIGENCE_OUTPUT}`);
    } catch (error) {
      console.error('💥 Intelligence scan failed:', error);
      process.exit(1);
    }
  }

  async quickScan() {
    console.log('🧠 Quick Intelligence Scan...\n');

    try {
      await this.analyzeComponents();
      await this.assessQuality();
      await this.analyzeCodebase();
      await this.generateRecommendations();

      this.report.metadata.duration = Date.now() - this.startTime;
    } catch (error) {
      console.error('💥 Quick scan failed:', error);
      process.exit(1);
    }
  }

  async scanRepository() {
    console.log('   � Analyzing directory structure...');

    // Get directory structure
    const directories = await glob('*/', { ignore: ['node_modules/', '.git/', '.next/', 'dist/'] });
    this.report.repository.structure.directories = directories.length;
    this.report.repository.structure.layout = directories;
    console.log(`      Found ${directories.length} directories: ${directories.join(', ')}`);

    console.log('   📊 Counting files by type...');
    // Get file counts by type
    const allFiles = await glob('**/*', {
      ignore: ['node_modules/**', '.git/**', '.next/**', 'dist/**'],
      nodir: true,
    });

    this.report.repository.metrics.totalFiles = allFiles.length;
    this.report.repository.metrics.fileTypes = this.categorizeFiles(allFiles);
    console.log(`      Total files: ${allFiles.length}`);

    // Show top file types
    const sortedTypes = Object.entries(this.report.repository.metrics.fileTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    console.log(
      `      Top file types: ${sortedTypes.map(([ext, count]) => `${ext}(${count})`).join(', ')}`
    );

    console.log('   🔍 Checking essential configuration files...');
    // Check for essential files
    const essentialFiles = [
      'package.json',
      'tsconfig.json',
      'next.config.ts',
      'tailwind.config.js',
    ];
    this.report.repository.structure.essentials = {};

    for (const file of essentialFiles) {
      const exists = await this.fileExists(file);
      this.report.repository.structure.essentials[file] = exists;
      console.log(`      ${exists ? '✅' : '❌'} ${file}`);
    }
  }

  async performCleanup() {
    console.log('🧹 Performing cleanup & maintenance...');
    const cleanupResults = {
      emptyFiles: { found: 0, deleted: 0, skipped: 0 },
      issues: [],
    };

    // Find empty files (excluding node_modules and legitimate empty files)
    console.log('   🔍 Scanning for empty files...');

    try {
      const allFiles = await glob('**/*', {
        ignore: ['node_modules/**', '.git/**', 'storybook-static/**'],
        nodir: true,
      });

      const emptyFiles = [];
      const legitimateEmpty = [
        '.gitkeep',
        '.gitignore',
        '.nojekyll',
        'dummy.js', // vitest browser dummy
        'nothing.c', // node-addon-api placeholder
        'lint.log', // build artifacts
      ];

      for (const file of allFiles) {
        try {
          const stat = await fs.stat(file);
          if (stat.size === 0) {
            const fileName = path.basename(file);
            const isLegitimate = legitimateEmpty.some(
              pattern => fileName === pattern || fileName.endsWith(pattern)
            );

            if (!isLegitimate && !file.includes('node_modules')) {
              emptyFiles.push(file);
            }
          }
        } catch (error) {
          // File might have been deleted, skip
        }
      }

      cleanupResults.emptyFiles.found = emptyFiles.length;

      if (emptyFiles.length > 0) {
        console.log(`   🗑️  Found ${emptyFiles.length} empty files to clean:`);

        for (const file of emptyFiles) {
          try {
            await fs.unlink(file);
            cleanupResults.emptyFiles.deleted++;
            console.log(`      ✅ Deleted: ${file}`);
          } catch (error) {
            cleanupResults.emptyFiles.skipped++;
            cleanupResults.issues.push(`Failed to delete ${file}: ${error.message}`);
            console.log(`      ⚠️  Skipped: ${file} (${error.message})`);
          }
        }

        console.log(
          `   📊 Cleanup completed: ${cleanupResults.emptyFiles.deleted} deleted, ${cleanupResults.emptyFiles.skipped} skipped`
        );
      } else {
        console.log('   ✅ No empty files found - repository is clean!');
      }
    } catch (error) {
      cleanupResults.issues.push(`Cleanup scan failed: ${error.message}`);
      console.log(`   ❌ Cleanup failed: ${error.message}`);
    }

    // Store results in report
    this.report.repository.cleanup = cleanupResults;
  }

  async analyzeComponents() {
    console.log('🔧 Analyzing components...');
    console.log('   📁 Discovering component directories...');

    const componentDirs = await glob('src/components/ui/*', { onlyDirectories: true });
    console.log(`      Found ${componentDirs.length} component directories`);

    const components = {};
    let withTests = 0,
      withStories = 0,
      withIndex = 0,
      withDemo = 0,
      indexExtensionIssues = 0; // New: track index extension issues

    // New: Track test quality distribution
    let testQualityDistribution = {
      none: 0,
      fail: 0,
      pass: 0,
      excellent: 0,
    };

    console.log('   🔍 Analyzing individual components...');
    const validComponents = []; // Track only valid components

    for (let i = 0; i < componentDirs.length; i++) {
      const dir = componentDirs[i];
      const componentName = path.basename(dir);

      process.stdout.write(`      [${i + 1}/${componentDirs.length}] ${componentName}... `);

      const analysis = await this.analyzeComponent(dir, componentName);

      // Only count directories that have actual components (not just empty index directories)
      if (analysis.hasComponent || analysis.hasTest || analysis.hasStory || analysis.hasDemo) {
        components[componentName] = analysis;
        validComponents.push(analysis);

        // Count completeness for valid components only
        if (analysis.hasTest) withTests++;
        if (analysis.hasStory) withStories++;
        if (analysis.hasIndex) withIndex++;
        if (analysis.hasDemo) withDemo++;
        if (analysis.indexExtensionIssue) indexExtensionIssues++;

        // Track test quality distribution
        testQualityDistribution[analysis.testQuality]++;

        // Show status indicators
        const status = [];
        if (analysis.hasComponent) status.push('TSX');
        if (analysis.hasTest) {
          // Enhanced test status with quality indicator
          if (analysis.testQuality === 'excellent') status.push('TEST🌟');
          else if (analysis.testQuality === 'pass') status.push('TEST✅');
          else if (analysis.testQuality === 'fail') status.push('TEST⚠️');
          else status.push('TEST');
        }
        if (analysis.hasStory) status.push('STORY');
        if (analysis.hasIndex) {
          if (analysis.indexExtensionIssue) {
            status.push('INDEX⚠️'); // Warning for extension issue
          } else {
            status.push('INDEX');
          }
        }
        if (analysis.hasDemo) status.push('DEMO');

        console.log(`${status.join('|') || 'MINIMAL'}`);
      } else {
        // Skip empty directories entirely
        console.log(`EMPTY (skipped)`);
      }
    }

    console.log('   📊 Calculating coverage metrics...');
    this.report.components.inventory = components;
    this.report.components.metrics = {
      total: validComponents.length, // Use valid components count
      withTests,
      withStories,
      withIndex,
      withDemo,
      indexExtensionIssues, // New metric
      testQualityDistribution, // New: test quality breakdown
      testCoverage:
        validComponents.length > 0 ? Math.round((withTests / validComponents.length) * 100) : 0,
      storyCoverage:
        validComponents.length > 0 ? Math.round((withStories / validComponents.length) * 100) : 0,
      indexCoverage:
        validComponents.length > 0 ? Math.round((withIndex / validComponents.length) * 100) : 0,
      // New: Quality-weighted test coverage
      qualityTestCoverage:
        validComponents.length > 0
          ? Math.round(
              ((testQualityDistribution.pass + testQualityDistribution.excellent) /
                validComponents.length) *
                100
            )
          : 0,
    };

    const { metrics } = this.report.components;
    console.log(
      `      Test Coverage: ${metrics.testCoverage}% (${withTests}/${validComponents.length})`
    );
    console.log(
      `      Quality Test Coverage: ${metrics.qualityTestCoverage}% (5+ tests per component)`
    );
    console.log(
      `      Story Coverage: ${metrics.storyCoverage}% (${withStories}/${validComponents.length})`
    );
    console.log(
      `      Index Coverage: ${metrics.indexCoverage}% (${withIndex}/${validComponents.length})`
    );

    // Show test quality distribution
    console.log('   📊 Test Quality Distribution:');
    console.log(`      🌟 Excellent (15+ tests): ${testQualityDistribution.excellent} components`);
    console.log(`      ✅ Pass (5-14 tests): ${testQualityDistribution.pass} components`);
    console.log(`      ⚠️  Fail (1-4 tests): ${testQualityDistribution.fail} components`);
    console.log(`      ❌ None (0 tests): ${testQualityDistribution.none} components`);

    if (indexExtensionIssues > 0) {
      console.log(
        `      Index Extension Issues: ${indexExtensionIssues} components have index.ts that should be index.tsx`
      );
    }
  }

  async analyzeComponent(dir, componentName) {
    const analysis = {
      name: componentName,
      path: dir,
      hasComponent: false,
      hasTest: false,
      hasStory: false,
      hasIndex: false,
      hasDemo: false,
      size: 0,
      complexity: 'unknown',
      lastModified: null,
      indexExtensionIssue: false, // New: tracks if index.ts should be index.tsx
      testCount: 0, // New: count of tests in test file
      testQuality: 'none', // New: none, fail, pass, excellent
    };

    // Check for main component file
    const componentPath = path.join(dir, `${componentName}.tsx`);
    if (await this.fileExists(componentPath)) {
      analysis.hasComponent = true;
      const stats = await fs.stat(componentPath);
      analysis.size = Math.round(stats.size / 1024); // KB
      analysis.lastModified = stats.mtime;

      // Basic complexity analysis
      const content = await fs.readFile(componentPath, 'utf8');
      analysis.complexity = this.assessComplexity(content);
    }

    // Check for other files
    analysis.hasTest = await this.fileExists(path.join(dir, `${componentName}.test.tsx`));
    analysis.hasStory = await this.fileExists(path.join(dir, `${componentName}.stories.tsx`));

    // Analyze test quality if test file exists
    if (analysis.hasTest) {
      const testPath = path.join(dir, `${componentName}.test.tsx`);
      try {
        const testContent = await fs.readFile(testPath, 'utf8');
        analysis.testCount = this.countTests(testContent);

        // Apply your threshold logic: 0-5=fail, 5-15=pass, 15+=excellent
        if (analysis.testCount === 0) {
          analysis.testQuality = 'none';
        } else if (analysis.testCount < 5) {
          analysis.testQuality = 'fail';
        } else if (analysis.testCount < 15) {
          analysis.testQuality = 'pass';
        } else {
          analysis.testQuality = 'excellent';
        }
      } catch (error) {
        // If we can't read the test file, keep defaults
      }
    }

    // Check for index files and validate extension
    const indexTsPath = path.join(dir, 'index.ts');
    const indexTsxPath = path.join(dir, 'index.tsx');

    if (await this.fileExists(indexTsxPath)) {
      analysis.hasIndex = true;
    } else if (await this.fileExists(indexTsPath)) {
      analysis.hasIndex = true;

      // Check if index.ts contains JSX-related imports/exports that suggest it should be .tsx
      try {
        const indexContent = await fs.readFile(indexTsPath, 'utf8');
        if (this.shouldBeIndexTsx(indexContent)) {
          analysis.indexExtensionIssue = true;
        }
      } catch (error) {
        // Ignore file read errors
      }
    }

    analysis.hasDemo = await this.fileExists(path.join(dir, 'demo.tsx'));

    return analysis;
  }

  // New method to detect if index.ts should be index.tsx
  shouldBeIndexTsx(content) {
    // Check for patterns that suggest JSX usage
    const jsxPatterns = [
      /from\s+['"]\.\/demo['"]/, // imports demo (likely JSX)
      /export\s*{\s*default\s+as\s+\w+Demo\s*}/, // exports demo component
      /export.*Demo.*from/, // exports any Demo
      /<\w+/, // JSX tags
      /React\.createElement/, // React.createElement calls
      /\.tsx['"]/, // imports from .tsx files
    ];

    return jsxPatterns.some(pattern => pattern.test(content));
  }

  async assessQuality() {
    console.log('📊 Assessing codebase quality...');

    const quality = {
      score: 0,
      issues: [],
      strengths: [],
      metrics: {},
    };

    console.log('   📈 Calculating component completeness scores...');
    // Component completeness
    const { metrics } = this.report.components;
    quality.metrics.componentCompleteness = {
      tests: metrics.testCoverage,
      stories: metrics.storyCoverage,
      indexes: metrics.indexCoverage,
    };

    console.log(`      Test Coverage: ${metrics.testCoverage}%`);
    console.log(`      Story Coverage: ${metrics.storyCoverage}%`);
    console.log(`      Index Coverage: ${metrics.indexCoverage}%`);

    console.log('   🎯 Computing weighted quality score...');
    // Calculate overall quality score
    const testScore = metrics.testCoverage * 0.4;
    const storyScore = metrics.storyCoverage * 0.3;
    const indexScore = metrics.indexCoverage * 0.3;
    quality.score = Math.round(testScore + storyScore + indexScore);

    console.log(`      Test Impact: ${Math.round(testScore)} points (40% weight)`);
    console.log(`      Story Impact: ${Math.round(storyScore)} points (30% weight)`);
    console.log(`      Index Impact: ${Math.round(indexScore)} points (30% weight)`);
    console.log(`      Overall Score: ${quality.score}/100`);

    console.log('   🔍 Identifying quality issues and strengths...');
    // Generate quality insights with realistic thresholds
    if (metrics.testCoverage < 50) {
      const issue = `Test coverage too low: ${metrics.testCoverage}% (minimum: 50%)`;
      quality.issues.push(issue);
      console.log(`      ⚠️  ${issue}`);
    } else {
      const strength = `Strong test coverage: ${metrics.testCoverage}%`;
      quality.strengths.push(strength);
      console.log(`      ✅ ${strength}`);
    }

    // Enhanced quality assessment with your test quality thresholds
    const { testQualityDistribution, qualityTestCoverage } = metrics;
    if (qualityTestCoverage < 30) {
      const issue = `Low quality test coverage: ${qualityTestCoverage}% components with 5+ tests (target: 30%+)`;
      quality.issues.push(issue);
      console.log(`      ⚠️  ${issue}`);
    } else {
      const strength = `Good quality test coverage: ${qualityTestCoverage}% components with substantial tests`;
      quality.strengths.push(strength);
      console.log(`      ✅ ${strength}`);
    }

    if (metrics.indexCoverage < 90) {
      const issue = `Missing index files: ${100 - metrics.indexCoverage}% components`;
      quality.issues.push(issue);
      console.log(`      ⚠️  ${issue}`);
    } else {
      const strength = `Excellent component organization: ${metrics.indexCoverage}% have index files`;
      quality.strengths.push(strength);
      console.log(`      ✅ ${strength}`);
    }

    // Check for index extension issues
    if (metrics.indexExtensionIssues > 0) {
      const issue = `Index extension issues: ${metrics.indexExtensionIssues} components have index.ts that should be index.tsx`;
      quality.issues.push(issue);
      console.log(`      ⚠️  ${issue}`);
    } else {
      console.log(`      ✅ All index files have correct extensions`);
    }

    // Include best practices score if available
    if (this.report.bestPractices) {
      console.log(`   🛡️  Incorporating best practices score...`);
      const bestPracticesWeight = 0.2; // 20% weight for best practices
      const currentWeight = 0.8; // Reduce other weights to 80%

      const adjustedScore =
        quality.score * currentWeight + this.report.bestPractices.score * bestPracticesWeight;
      quality.score = Math.round(adjustedScore);

      console.log(`      Best Practices: ${this.report.bestPractices.score}% (20% weight)`);
      console.log(`      Adjusted Quality Score: ${quality.score}/100`);

      if (this.report.bestPractices.score < 70) {
        quality.issues.push(
          `Best practices score below threshold: ${this.report.bestPractices.score}%`
        );
      }
    }

    this.report.components.quality = quality;
  }

  async analyzeCodebase() {
    console.log('🔬 Analyzing codebase patterns...');

    console.log('   📁 Scanning TypeScript files...');
    // Get TypeScript files (excluding index files which are just re-exports)
    const tsFiles = await glob('src/**/*.{ts,tsx}', {
      ignore: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*', '**/index.{ts,tsx}'],
    });
    console.log(`      Found ${tsFiles.length} TypeScript source files (excluding index files)`);

    const testFiles = await glob('src/**/*.{test,spec}.{ts,tsx}');
    console.log(`      Found ${testFiles.length} test files`);

    const storyFiles = await glob('src/**/*.stories.{ts,tsx}');
    console.log(`      Found ${storyFiles.length} story files`);

    const testRatio = Math.round((testFiles.length / tsFiles.length) * 100);
    console.log(
      `      Test-to-Source Ratio: ${testRatio}% (${testFiles.length}/${tsFiles.length})`
    );

    this.report.codebase.files = {
      typescript: tsFiles.length,
      tests: testFiles.length,
      stories: storyFiles.length,
      testRatio,
    };

    console.log('   📦 Analyzing package dependencies...');
    // Analyze dependencies
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));

      const prodDeps = Object.keys(packageJson.dependencies || {}).length;
      const devDeps = Object.keys(packageJson.devDependencies || {}).length;
      const scripts = Object.keys(packageJson.scripts || {}).length;

      this.report.codebase.dependencies = {
        production: prodDeps,
        development: devDeps,
        scripts,
      };

      console.log(`      Production Dependencies: ${prodDeps}`);
      console.log(`      Development Dependencies: ${devDeps}`);
      console.log(`      NPM Scripts: ${scripts}`);
    } catch (error) {
      console.warn('      ⚠️  Could not analyze package.json');
      this.report.codebase.dependencies = {
        production: 0,
        development: 0,
        scripts: 0,
      };
    }
  }

  async validatePipeline() {
    console.log('🔧 Validating build pipeline...');

    const pipeline = {
      typescript: { status: 'unknown', duration: 0, errors: [] },
      linting: { status: 'unknown', duration: 0, errors: [] },
      testing: { status: 'unknown', duration: 0, errors: [] },
      building: { status: 'unknown', duration: 0, errors: [] },
      overall: { status: 'unknown', score: 0 },
    };

    // TypeScript Check
    const tscStart = Date.now();
    try {
      console.log('   📝 Running TypeScript check...');
      execSync('npx tsc --noEmit', { stdio: 'pipe', timeout: 30000 });
      pipeline.typescript.status = 'pass';
      pipeline.typescript.duration = Date.now() - tscStart;
      console.log(`   ✅ TypeScript: PASS (${pipeline.typescript.duration}ms)`);
    } catch (error) {
      pipeline.typescript.status = 'fail';
      pipeline.typescript.duration = Date.now() - tscStart;
      pipeline.typescript.errors = this.parseErrors(
        error.stdout?.toString() || error.stderr?.toString()
      );
      console.log(`   ❌ TypeScript: FAIL (${pipeline.typescript.errors.length} errors)`);
    }

    // Linting Check
    const lintStart = Date.now();
    try {
      console.log('   🔍 Running ESLint check...');
      execSync('npx eslint src --ext .ts,.tsx --max-warnings 0', { stdio: 'pipe', timeout: 30000 });
      pipeline.linting.status = 'pass';
      pipeline.linting.duration = Date.now() - lintStart;
      console.log(`   ✅ Linting: PASS (${pipeline.linting.duration}ms)`);
    } catch (error) {
      pipeline.linting.status = 'fail';
      pipeline.linting.duration = Date.now() - lintStart;
      pipeline.linting.errors = this.parseErrors(
        error.stdout?.toString() || error.stderr?.toString()
      );
      console.log(`   ❌ Linting: FAIL (${pipeline.linting.errors.length} issues)`);
    }

    // Test Check
    const testStart = Date.now();
    try {
      console.log('   🧪 Running test suite...');
      execSync('npx vitest run --reporter=basic', { stdio: 'pipe', timeout: 60000 });
      pipeline.testing.status = 'pass';
      pipeline.testing.duration = Date.now() - testStart;
      console.log(`   ✅ Testing: PASS (${pipeline.testing.duration}ms)`);
    } catch (error) {
      pipeline.testing.status = 'fail';
      pipeline.testing.duration = Date.now() - testStart;
      pipeline.testing.errors = this.parseErrors(
        error.stdout?.toString() || error.stderr?.toString()
      );
      console.log(`   ❌ Testing: FAIL (${pipeline.testing.errors.length} failures)`);
    }

    // Build Check
    const buildStart = Date.now();
    if (this.options.skipBuild) {
      pipeline.building.status = 'skipped';
      pipeline.building.duration = 0;
      console.log('   ⏭️  Building: SKIPPED (--skip-build flag)');
    } else {
      try {
        console.log('   🔨 Running build check...');
        execSync('npx next build --no-lint', { stdio: 'pipe', timeout: 120000 });
        pipeline.building.status = 'pass';
        pipeline.building.duration = Date.now() - buildStart;
        console.log(`   ✅ Building: PASS (${pipeline.building.duration}ms)`);
      } catch (error) {
        pipeline.building.status = 'fail';
        pipeline.building.duration = Date.now() - buildStart;
        pipeline.building.errors = this.parseErrors(
          error.stdout?.toString() || error.stderr?.toString()
        );
        console.log(`   ❌ Building: FAIL (${pipeline.building.errors.length} errors)`);
      }
    }

    // Calculate overall pipeline score
    const allSteps = [pipeline.typescript, pipeline.linting, pipeline.testing, pipeline.building];
    const passes = allSteps.filter(step => step.status === 'pass').length;
    const skipped = allSteps.filter(step => step.status === 'skipped').length;
    const totalSteps = allSteps.length - skipped; // Don't count skipped steps

    pipeline.overall.score = totalSteps > 0 ? Math.round((passes / totalSteps) * 100) : 0;
    pipeline.overall.status = pipeline.overall.score === 100 ? 'pass' : 'fail';

    const stepCount = this.options.skipBuild ? '3' : '4';
    console.log(
      `   🎯 Pipeline Score: ${pipeline.overall.score}% (${passes}/${totalSteps} steps passing)`
    );

    this.report.codebase.pipeline = pipeline;
  }

  async validateBestPractices() {
    console.log('🛡️ Validating best practices...');

    const practices = {
      score: 0,
      issues: [],
      warnings: [],
      passed: [],
      categories: {
        codeQuality: { score: 0, issues: [], checks: 0 },
        security: { score: 0, issues: [], checks: 0 },
        performance: { score: 0, issues: [], checks: 0 },
        maintainability: { score: 0, issues: [], checks: 0 },
        accessibility: { score: 0, issues: [], checks: 0 },
        testing: { score: 0, issues: [], checks: 0 },
      },
    };

    console.log('   🔍 Code Quality Checks...');
    await this.validateCodeQuality(practices.categories.codeQuality);

    console.log('   🔒 Security Checks...');
    await this.validateSecurity(practices.categories.security);

    console.log('   ⚡ Performance Checks...');
    await this.validatePerformance(practices.categories.performance);

    console.log('   🔧 Maintainability Checks...');
    await this.validateMaintainability(practices.categories.maintainability);

    console.log('   ♿ Accessibility Checks...');
    await this.validateAccessibility(practices.categories.accessibility);

    console.log('   🧪 Testing Best Practices...');
    await this.validateTestingPractices(practices.categories.testing);

    // Calculate overall score
    const categories = Object.values(practices.categories);
    const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
    const totalChecks = categories.reduce((sum, cat) => sum + cat.checks, 0);
    practices.score = totalChecks > 0 ? Math.round((totalScore / totalChecks) * 100) : 0;

    // Collect all issues
    categories.forEach(category => {
      practices.issues.push(...category.issues);
    });

    console.log(
      `   🎯 Best Practices Score: ${practices.score}% (${totalScore}/${totalChecks} checks passed)`
    );

    this.report.bestPractices = practices;
  }

  async validateCodeQuality(category) {
    let passed = 0;
    let total = 0;

    // Check for proper TypeScript usage
    total++;
    console.log('      📝 Checking TypeScript configuration...');
    try {
      const tsConfig = JSON.parse(await fs.readFile('tsconfig.json', 'utf8'));
      if (tsConfig.compilerOptions?.strict) {
        passed++;
        console.log('         ✅ Strict TypeScript mode enabled');
      } else {
        category.issues.push({
          severity: 'medium',
          type: 'typescript',
          message: 'Strict TypeScript mode not enabled',
          fix: 'Enable "strict": true in tsconfig.json',
        });
        console.log('         ⚠️  Strict TypeScript mode not enabled');
      }
    } catch (error) {
      category.issues.push({
        severity: 'high',
        type: 'typescript',
        message: 'Invalid or missing tsconfig.json',
        fix: 'Create valid tsconfig.json with proper configuration',
      });
      console.log('         ❌ Invalid or missing tsconfig.json');
    }

    // Check for consistent naming conventions
    total++;
    console.log('      🏷️  Checking naming conventions...');
    const componentFiles = await glob('src/components/ui/**/*.tsx');
    let namingIssues = 0;

    for (const file of componentFiles.slice(0, 10)) {
      // Sample check
      const fileName = path.basename(file, '.tsx');
      const content = await fs.readFile(file, 'utf8');

      // Check for PascalCase component names
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(fileName)) {
        namingIssues++;
      }

      // Check for proper export naming
      if (!content.includes(`export {`) && !content.includes(`export const ${fileName}`)) {
        namingIssues++;
      }
    }

    if (namingIssues === 0) {
      passed++;
      console.log('         ✅ Consistent PascalCase naming');
    } else {
      category.issues.push({
        severity: 'low',
        type: 'naming',
        message: `${namingIssues} naming convention issues detected`,
        fix: 'Use PascalCase for components and consistent exports',
      });
      console.log(`         ⚠️  ${namingIssues} naming convention issues`);
    }

    // Check for proper error handling
    total++;
    console.log('      🛡️  Checking error handling patterns...');
    const hasErrorBoundary =
      (await this.fileExists('src/components/ErrorBoundary.tsx')) ||
      (await this.fileExists('src/app/error.tsx'));
    if (hasErrorBoundary) {
      passed++;
      console.log('         ✅ Error boundary implementation found');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'error-handling',
        message: 'No error boundary implementation found',
        fix: 'Add error.tsx or ErrorBoundary component for proper error handling',
      });
      console.log('         ⚠️  No error boundary found');
    }

    category.score = passed;
    category.checks = total;
  }

  async validateSecurity(category) {
    let passed = 0;
    let total = 0;

    // Check for environment variable usage
    total++;
    console.log('      🔐 Checking environment variable security...');
    const envFiles = await glob('.env*');
    const hasEnvExample = await this.fileExists('.env.example');

    if (envFiles.length > 0 && hasEnvExample) {
      passed++;
      console.log('         ✅ Environment variables properly configured');
    } else if (envFiles.length > 0 && !hasEnvExample) {
      category.issues.push({
        severity: 'medium',
        type: 'security',
        message: 'Environment files found but no .env.example',
        fix: 'Create .env.example with safe default values',
      });
      console.log('         ⚠️  Missing .env.example file');
    } else {
      passed++; // No env files needed is also okay
      console.log('         ✅ No sensitive environment variables detected');
    }

    // Check for package vulnerabilities
    total++;
    console.log('      🔍 Checking for known vulnerabilities...');
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Check for known problematic packages (simplified check)
      const riskyPatterns = ['eval', 'dangerous', 'unsafe'];
      const hasRiskyDeps = Object.keys(deps).some(dep =>
        riskyPatterns.some(pattern => dep.includes(pattern))
      );

      if (!hasRiskyDeps) {
        passed++;
        console.log('         ✅ No obviously risky dependencies detected');
      } else {
        category.issues.push({
          severity: 'high',
          type: 'dependencies',
          message: 'Potentially risky dependencies detected',
          fix: 'Review and replace risky dependencies with safer alternatives',
        });
        console.log('         ❌ Risky dependencies found');
      }
    } catch (error) {
      console.log('         ⚠️  Could not analyze dependencies');
    }

    category.score = passed;
    category.checks = total;
  }

  async validatePerformance(category) {
    let passed = 0;
    let total = 0;

    // Check for Next.js optimizations
    total++;
    console.log('      ⚡ Checking Next.js performance optimizations...');
    try {
      const nextConfig = await fs.readFile('next.config.ts', 'utf8');
      if (nextConfig.includes('images') || nextConfig.includes('compress')) {
        passed++;
        console.log('         ✅ Next.js optimizations configured');
      } else {
        category.issues.push({
          severity: 'low',
          type: 'performance',
          message: 'Next.js performance optimizations not configured',
          fix: 'Configure image optimization and compression in next.config.ts',
        });
        console.log('         ⚠️  Basic Next.js optimizations missing');
      }
    } catch (error) {
      console.log('         ⚠️  Could not analyze Next.js config');
    }

    // Check for large bundle analysis
    total++;
    console.log('      📦 Checking bundle analysis setup...');
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const hasAnalyzer =
      packageJson.devDependencies?.['@next/bundle-analyzer'] || packageJson.scripts?.analyze;

    if (hasAnalyzer) {
      passed++;
      console.log('         ✅ Bundle analysis tools configured');
    } else {
      category.issues.push({
        severity: 'low',
        type: 'performance',
        message: 'No bundle analysis tools configured',
        fix: 'Add @next/bundle-analyzer for monitoring bundle size',
      });
      console.log('         ⚠️  No bundle analysis tools');
    }

    category.score = passed;
    category.checks = total;
  }

  async validateMaintainability(category) {
    let passed = 0;
    let total = 0;

    // Check for documentation
    total++;
    console.log('      📚 Checking documentation coverage...');
    const hasReadme = await this.fileExists('README.md');
    const hasChangelog = await this.fileExists('CHANGELOG.md');
    const hasContributing = await this.fileExists('CONTRIBUTING.md');

    if (hasReadme) {
      passed++;
      console.log('         ✅ README.md exists');
    } else {
      category.issues.push({
        severity: 'high',
        type: 'documentation',
        message: 'Missing README.md',
        fix: 'Create comprehensive README.md with setup and usage instructions',
      });
      console.log('         ❌ Missing README.md');
    }

    // Check for consistent code formatting
    total++;
    console.log('      🎨 Checking code formatting setup...');
    const hasPrettier =
      (await this.fileExists('.prettierrc')) || (await this.fileExists('prettier.config.js'));

    if (hasPrettier) {
      passed++;
      console.log('         ✅ Prettier configuration found');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'formatting',
        message: 'No Prettier configuration found',
        fix: 'Add Prettier configuration for consistent code formatting',
      });
      console.log('         ⚠️  No Prettier configuration');
    }

    // Check for component organization
    total++;
    console.log('      📁 Checking component organization...');
    const componentDirs = await glob('src/components/ui/*', { onlyDirectories: true });
    let wellOrganized = 0;

    for (const dir of componentDirs.slice(0, 5)) {
      // Sample check
      const componentName = path.basename(dir);
      const hasIndex =
        (await this.fileExists(path.join(dir, 'index.ts'))) ||
        (await this.fileExists(path.join(dir, 'index.tsx')));
      const hasComponent = await this.fileExists(path.join(dir, `${componentName}.tsx`));

      if (hasIndex && hasComponent) wellOrganized++;
    }

    const orgPercentage = (wellOrganized / Math.min(5, componentDirs.length)) * 100;
    if (orgPercentage >= 80) {
      passed++;
      console.log('         ✅ Components well organized');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'organization',
        message: 'Some components lack proper file organization',
        fix: 'Ensure each component has index file and follows folder structure',
      });
      console.log('         ⚠️  Component organization needs improvement');
    }

    category.score = passed;
    category.checks = total;
  }

  async validateAccessibility(category) {
    let passed = 0;
    let total = 0;

    // Check for accessibility linting
    total++;
    console.log('      ♿ Checking accessibility linting setup...');
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const hasA11yLinting = packageJson.devDependencies?.['eslint-plugin-jsx-a11y'];

    if (hasA11yLinting) {
      passed++;
      console.log('         ✅ JSX a11y ESLint plugin configured');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'accessibility',
        message: 'No accessibility linting configured',
        fix: 'Add eslint-plugin-jsx-a11y for accessibility checks',
      });
      console.log('         ⚠️  No accessibility linting');
    }

    // Check for semantic HTML usage in components (sample)
    total++;
    console.log('      🏷️  Checking semantic HTML usage...');
    const componentFiles = await glob('src/components/ui/*/*.tsx');
    let semanticIssues = 0;

    for (const file of componentFiles.slice(0, 5)) {
      // Sample check
      const content = await fs.readFile(file, 'utf8');

      // Check for proper ARIA patterns
      if (
        content.includes('aria-') ||
        content.includes('role=') ||
        content.includes('<button') ||
        content.includes('<label')
      ) {
        // Good semantic usage detected
      } else if (content.includes('<div') && content.includes('onClick')) {
        semanticIssues++; // Clickable div without proper semantics
      }
    }

    if (semanticIssues === 0) {
      passed++;
      console.log('         ✅ Good semantic HTML usage detected');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'accessibility',
        message: `${semanticIssues} potential semantic HTML issues`,
        fix: 'Use proper semantic elements and ARIA attributes',
      });
      console.log(`         ⚠️  ${semanticIssues} semantic HTML issues`);
    }

    category.score = passed;
    category.checks = total;
  }

  async validateTestingPractices(category) {
    let passed = 0;
    let total = 0;

    // Check for test configuration
    total++;
    console.log('      🧪 Checking test framework setup...');
    const hasVitest = await this.fileExists('vitest.config.ts');
    const hasJest = await this.fileExists('jest.config.js');

    if (hasVitest || hasJest) {
      passed++;
      console.log('         ✅ Test framework properly configured');
    } else {
      category.issues.push({
        severity: 'high',
        type: 'testing',
        message: 'No test framework configuration found',
        fix: 'Configure Vitest or Jest for component testing',
      });
      console.log('         ❌ No test framework configured');
    }

    // Check for testing utilities
    total++;
    console.log('      🔧 Checking testing utilities...');
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const hasTestingLibrary = packageJson.devDependencies?.['@testing-library/react'];

    if (hasTestingLibrary) {
      passed++;
      console.log('         ✅ React Testing Library configured');
    } else {
      category.issues.push({
        severity: 'medium',
        type: 'testing',
        message: 'No React Testing Library found',
        fix: 'Add @testing-library/react for better component testing',
      });
      console.log('         ⚠️  No React Testing Library');
    }

    // Check for test coverage setup
    total++;
    console.log('      📊 Checking test coverage configuration...');
    try {
      const vitestConfig = await fs.readFile('vitest.config.ts', 'utf8');
      if (vitestConfig.includes('coverage') || vitestConfig.includes('threshold')) {
        passed++;
        console.log('         ✅ Test coverage configured');
      } else {
        category.issues.push({
          severity: 'low',
          type: 'testing',
          message: 'Test coverage thresholds not configured',
          fix: 'Configure coverage thresholds in test configuration',
        });
        console.log('         ⚠️  No coverage thresholds');
      }
    } catch (error) {
      console.log('         ⚠️  Could not analyze test configuration');
    }

    category.score = passed;
    category.checks = total;
  }

  parseErrors(output) {
    if (!output) return [];

    // Extract meaningful error lines and test failures
    const lines = output.split('\n');
    const errors = [];

    // Look for various error patterns
    const patterns = [
      /error|Error|✗|FAIL|Failed/i,
      /Test Files\s+(\d+)\s+failed/i,
      /Tests\s+(\d+)\s+failed/i,
      /AssertionError:/i,
      /Snapshot.*mismatched/i,
      /Cannot resolve import/i,
    ];

    lines.forEach(line => {
      if (patterns.some(pattern => pattern.test(line))) {
        errors.push(line.trim());
      }
    });

    // Extract test failure summary if present
    const testFailureLine = lines.find(line => /Test Files\s+\d+\s+failed/.test(line));
    if (testFailureLine) {
      errors.unshift(`Test Summary: ${testFailureLine.trim()}`);
    }

    return errors.slice(0, 15); // Limit to first 15 errors for readability
  }

  async generateRecommendations() {
    console.log('💡 Generating recommendations...');

    const recommendations = [];
    const { metrics, quality } = this.report.components;
    const { files } = this.report.codebase;

    console.log('   🎯 Evaluating test coverage requirements...');
    // Test coverage recommendations with realistic thresholds
    if (metrics.testCoverage < 50) {
      const rec = {
        priority: 'high',
        category: 'testing',
        issue: `Test coverage too low at ${metrics.testCoverage}%`,
        action: 'Add basic tests for untested components',
        impact: 'Improves code reliability and development confidence',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  HIGH: ${rec.issue} → ${rec.action}`);
    } else if (metrics.qualityTestCoverage < 30) {
      const rec = {
        priority: 'medium',
        category: 'testing',
        issue: `Quality test coverage at ${metrics.qualityTestCoverage}% (components with 5+ tests)`,
        action: 'Enhance test depth for existing components - aim for 5+ tests per component',
        impact: 'Better component reliability and edge case coverage',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  MEDIUM: ${rec.issue} → ${rec.action}`);
    } else {
      console.log(`      ✅ Test coverage sufficient at ${metrics.testCoverage}%`);
      if (metrics.qualityTestCoverage >= 50) {
        console.log(
          `      🌟 Excellent quality test coverage: ${metrics.qualityTestCoverage}% components with substantial tests`
        );
      }
    }

    console.log('   📁 Checking component organization...');
    // Component organization
    if (metrics.indexCoverage < 90) {
      const rec = {
        priority: 'medium',
        category: 'organization',
        issue: `${100 - metrics.indexCoverage}% of components missing index files`,
        action: 'Run yarn fix:missing-files to create index files',
        impact: 'Improves import cleanliness and scalability',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  MEDIUM: ${rec.issue} → ${rec.action}`);
    } else {
      console.log(`      ✅ Component organization excellent at ${metrics.indexCoverage}%`);
    }

    console.log('   📊 Assessing overall quality threshold...');
    // Quality score
    if (quality.score < 75) {
      const rec = {
        priority: 'high',
        category: 'quality',
        issue: `Overall quality score: ${quality.score}/100`,
        action: 'Focus on test coverage and component completeness',
        impact: 'Achieves monster-ready status for scaling',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  HIGH: ${rec.issue} → ${rec.action}`);
    } else {
      console.log(`      ✅ Quality score meets threshold at ${quality.score}/100`);
    }

    console.log('   🧪 Checking test-to-code ratio...');
    // Test ratio
    if (files.testRatio < 60) {
      const rec = {
        priority: 'medium',
        category: 'testing',
        issue: `Test-to-code ratio: ${files.testRatio}%`,
        action: 'Add comprehensive tests for existing components',
        impact: 'Reduces technical debt and improves confidence',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  MEDIUM: ${rec.issue} → ${rec.action}`);
    } else {
      console.log(`      ✅ Test ratio adequate at ${files.testRatio}%`);
    }

    console.log('   📄 Checking index file extensions...');
    // Index extension issues
    if (metrics.indexExtensionIssues > 0) {
      const rec = {
        priority: 'low',
        category: 'organization',
        issue: `${metrics.indexExtensionIssues} components have index.ts that should be index.tsx`,
        action: 'Rename index.ts files to index.tsx for components that export JSX',
        impact: 'Improves TypeScript consistency and IDE support',
      };
      recommendations.push(rec);
      console.log(`      ⚠️  LOW: ${rec.issue} → ${rec.action}`);
    } else {
      console.log(`      ✅ All index files have appropriate extensions`);
    }

    console.log('   🛡️  Evaluating best practices compliance...');
    // Best practices recommendations
    if (this.report.bestPractices) {
      const { bestPractices } = this.report;

      // High priority best practices issues
      const highPriorityIssues = bestPractices.issues.filter(issue => issue.severity === 'high');
      highPriorityIssues.forEach(issue => {
        const rec = {
          priority: 'high',
          category: 'best-practices',
          issue: issue.message,
          action: issue.fix,
          impact: 'Critical for production readiness and maintainability',
        };
        recommendations.push(rec);
        console.log(`      ⚠️  HIGH: ${rec.issue} → ${rec.action}`);
      });

      // Medium priority best practices issues
      const mediumPriorityIssues = bestPractices.issues
        .filter(issue => issue.severity === 'medium')
        .slice(0, 3);
      mediumPriorityIssues.forEach(issue => {
        const rec = {
          priority: 'medium',
          category: 'best-practices',
          issue: issue.message,
          action: issue.fix,
          impact: 'Improves code quality and team productivity',
        };
        recommendations.push(rec);
        console.log(`      ⚠️  MEDIUM: ${rec.issue} → ${rec.action}`);
      });

      if (highPriorityIssues.length === 0 && mediumPriorityIssues.length === 0) {
        console.log(`      ✅ Best practices compliance excellent (${bestPractices.score}%)`);
      }
    }

    console.log(`   📋 Generated ${recommendations.length} recommendations`);
    this.report.recommendations = recommendations;
  }

  categorizeFiles(files) {
    const types = {};
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      types[ext] = (types[ext] || 0) + 1;
    });
    return types;
  }

  assessComplexity(content) {
    const lines = content.split('\n').length;
    const hooks = (content.match(/use[A-Z]\w+/g) || []).length;
    const props = (content.match(/interface \w+Props/g) || []).length;

    if (lines > 200 || hooks > 5) return 'high';
    if (lines > 100 || hooks > 3) return 'medium';
    return 'low';
  }

  countTests(testContent) {
    // Count test cases using various patterns:
    // - it('...', () => {})
    // - test('...', () => {})
    // - it.skip, it.only, etc.
    // - test.skip, test.only, etc.
    const testPatterns = [
      /\bit\s*\(\s*['"`]/g, // it('test name'
      /\btest\s*\(\s*['"`]/g, // test('test name'
      /\bit\.\w+\s*\(\s*['"`]/g, // it.skip('test name'
      /\btest\.\w+\s*\(\s*['"`]/g, // test.skip('test name'
    ];

    let totalTests = 0;
    testPatterns.forEach(pattern => {
      const matches = testContent.match(pattern) || [];
      totalTests += matches.length;
    });

    return totalTests;
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async saveReport() {
    // Save main report
    await fs.writeFile(INTELLIGENCE_OUTPUT, JSON.stringify(this.report, null, 2), 'utf8');

    // Save admin scripts result for backwards compatibility
    const adminResult = {
      scanTime: this.report.metadata.scanTime,
      componentCount: this.report.components.metrics.total,
      qualityScore: this.report.components.quality.score,
      recommendations: this.report.recommendations.length,
    };

    await fs.writeFile(
      'admin scripts/script-result.json',
      JSON.stringify(adminResult, null, 2),
      'utf8'
    );
  }

  printSummary() {
    const { metrics, quality } = this.report.components;
    const { files } = this.report.codebase;
    const { bestPractices, repository } = this.report;

    console.log('\n📋 INTELLIGENCE SUMMARY:');
    console.log(`   Components: ${metrics.total}`);
    console.log(`   Test Coverage: ${metrics.testCoverage}%`);
    console.log(`   Quality Score: ${quality.score}/100`);
    if (bestPractices && bestPractices.score !== undefined) {
      console.log(`   Best Practices: ${bestPractices.score}/100`);
    }
    console.log(`   TypeScript Files: ${files.typescript}`);
    if (repository.cleanup && repository.cleanup.emptyFiles) {
      const cleanup = repository.cleanup.emptyFiles;
      if (cleanup.found > 0) {
        console.log(`   Empty Files Cleaned: ${cleanup.deleted}/${cleanup.found}`);
      }
    }
    console.log(`   Recommendations: ${this.report.recommendations.length}`);

    if (this.report.recommendations.length > 0) {
      console.log('\n💡 Top Recommendations:');
      this.report.recommendations.slice(0, 3).forEach(rec => {
        const priorityIcon =
          rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`   ${priorityIcon} ${rec.issue} → ${rec.action}`);
      });
    }

    // Enhanced Monster-Ready assessment
    const isMonsterReady =
      quality.score >= 90 &&
      (!bestPractices || bestPractices.score >= 70) &&
      metrics.testCoverage >= 80;

    console.log(`\n🎯 Monster-Ready Status: ${isMonsterReady ? '✅ READY' : '🔄 IN PROGRESS'}`);

    if (!isMonsterReady && bestPractices) {
      console.log('   📋 Focus Areas:');
      if (quality.score < 90) console.log('   • Improve overall quality score');
      if (bestPractices.score < 70) console.log('   • Address best practices issues');
      if (metrics.testCoverage < 80) console.log('   • Increase test coverage');
    }
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const flags = args.slice(1);

  const options = {
    skipBuild: flags.includes('--skip-build'),
    skipCleanup: flags.includes('--skip-cleanup'),
  };

  if (command === 'help' || command === '--help') {
    console.log('🧠 Unified Intelligence Engine');
    console.log('');
    console.log('Commands:');
    console.log('  scan    - Full intelligence scan');
    console.log('  quick   - Quick component overview');
    console.log('  report  - Show latest report summary');
    console.log('');
    console.log('Flags:');
    console.log('  --skip-build    - Skip the build validation step for faster scans');
    console.log('  --skip-cleanup  - Skip the cleanup phase (keep empty files)');
    console.log('');
    return;
  }

  const engine = new IntelligenceEngine(options);

  switch (command) {
    case 'quick':
      await engine.quickScan();
      engine.printSummary();
      break;
    case 'report':
      try {
        const report = JSON.parse(await fs.readFile(INTELLIGENCE_OUTPUT, 'utf8'));
        console.log(`📊 Latest scan: ${report.metadata.scanTime}`);
        console.log(`🎯 Quality score: ${report.components.quality.score}/100`);
        console.log(`📋 Components: ${report.components.metrics.total}`);
      } catch {
        console.log('No report found. Run: yarn intel scan');
      }
      break;
    default:
      await engine.scan();
      engine.printSummary();
  }
}

main().catch(console.error);
