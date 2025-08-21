#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

console.log('🚀 TriggerKings Repository Intelligence Gathering');
console.log('================================================\n');

// Utility functions
function getWordCount(content) {
  return content.split(/\s+/).filter(word => word.length > 0).length;
}

function categorizeDoc(filePath, fileName) {
  const lowPath = filePath.toLowerCase();
  const lowName = fileName.toLowerCase();

  if (lowPath.includes('component') || lowName.includes('component')) return 'Components';
  if (lowPath.includes('script') || lowName.includes('script')) return 'Scripts';
  if (lowPath.includes('guide') || lowName.includes('guide')) return 'Guides';
  if (lowPath.includes('api') || lowName.includes('api')) return 'API';
  if (lowName.includes('readme')) return 'Overview';
  if (lowPath.includes('docs/')) return 'Documentation';
  return 'General';
}

function categorizeScript(fileName) {
  const name = fileName.toLowerCase();
  if (name.includes('fix') || name.includes('repair')) return 'Maintenance';
  if (name.includes('test') || name.includes('spec')) return 'Testing';
  if (name.includes('build') || name.includes('deploy')) return 'Build';
  if (name.includes('generate') || name.includes('create')) return 'Generation';
  if (name.includes('analyze') || name.includes('audit')) return 'Analysis';
  return 'Utility';
}

function getComponentStatus(componentPath) {
  // Check for common patterns that indicate production readiness
  const hasTests = fs
    .access(path.join(componentPath, '__tests__'))
    .then(() => true)
    .catch(() => false);
  const hasStories = fs
    .access(path.join(componentPath, 'stories'))
    .then(() => true)
    .catch(() => false);

  return 'stable'; // Default for now
}

async function getFiles(patterns) {
  const allFiles = [];
  for (const pattern of patterns) {
    try {
      const files = glob.sync(pattern, { cwd: process.cwd() });
      allFiles.push(...files);
    } catch (error) {
      console.log(`Warning: Pattern ${pattern} failed: ${error.message}`);
    }
  }
  return [...new Set(allFiles)]; // Remove duplicates
}

async function analyzeComponents() {
  console.log('📦 Analyzing components...');

  try {
    const componentFiles = await getFiles([
      'src/components/**/*.tsx',
      'src/components/**/*.ts',
      'components/**/*.tsx',
      'components/**/*.ts',
    ]);

    const components = {};
    let totalComponents = 0;

    for (const file of componentFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const stat = await fs.stat(file);
        const componentName = path.basename(file, path.extname(file));
        const componentDir = path.dirname(file);

        // Check for associated files
        const hasTest = componentFiles.some(
          f => f.includes(componentName) && (f.includes('.test.') || f.includes('.spec.'))
        );

        const hasStory = await fs
          .access(path.join(componentDir, `${componentName}.stories.tsx`))
          .then(() => true)
          .catch(() => false);

        components[componentName] = {
          name: componentName,
          path: file,
          size: stat.size,
          lines: content.split('\n').length,
          hasTests: hasTest,
          hasStories: hasStory,
          status: getComponentStatus(componentDir),
          lastModified: stat.mtime,
          exports: content.includes('export default') ? 'default' : 'named',
        };

        totalComponents++;
      } catch (error) {
        console.log(`Warning: Failed to analyze ${file}: ${error.message}`);
      }
    }

    return { components, totalComponents };
  } catch (error) {
    console.error('Error analyzing components:', error.message);
    return { components: {}, totalComponents: 0 };
  }
}

async function analyzeScripts() {
  console.log('🔧 Analyzing scripts...');

  try {
    const scriptFiles = await getFiles([
      'scripts/**/*.js',
      'scripts/**/*.cjs',
      'scripts/**/*.mjs',
      'scripts/**/*.ps1',
      '*.js',
      '*.mjs',
    ]);

    const scripts = {};
    const categories = {};
    let totalScripts = 0;

    for (const file of scriptFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const stat = await fs.stat(file);
        const scriptName = path.basename(file);
        const category = categorizeScript(scriptName);

        const script = {
          name: scriptName,
          path: file,
          category,
          size: stat.size,
          lines: content.split('\n').length,
          lastModified: stat.mtime,
          executable: file.endsWith('.ps1') || content.includes('#!/'),
        };

        if (!categories[category]) categories[category] = [];
        categories[category].push(script);
        scripts[scriptName] = script;
        totalScripts++;
      } catch (error) {
        console.log(`Warning: Failed to analyze ${file}: ${error.message}`);
      }
    }

    return { scripts, categories, totalScripts };
  } catch (error) {
    console.error('Error analyzing scripts:', error.message);
    return { scripts: {}, categories: {}, totalScripts: 0 };
  }
}

async function analyzeDocs() {
  console.log('📚 Analyzing documentation...');

  try {
    const docFiles = await getFiles(['docs/**/*.md', '*.md', 'src/**/*.md']);

    const docs = {};
    const categories = {};
    let totalDocs = 0;

    for (const file of docFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const stat = await fs.stat(file);
        const fileName = path.basename(file);
        const category = categorizeDoc(file, fileName);

        const doc = {
          name: fileName,
          path: file,
          category,
          size: stat.size,
          wordCount: getWordCount(content),
          lastModified: stat.mtime,
          lines: content.split('\n').length,
        };

        if (!categories[category]) categories[category] = [];
        categories[category].push(doc);
        docs[file] = doc;
        totalDocs++;
      } catch (error) {
        console.log(`Warning: Failed to analyze ${file}: ${error.message}`);
      }
    }

    return { docs, categories, totalDocs };
  } catch (error) {
    console.error('Error analyzing docs:', error.message);
    return { docs: {}, categories: {}, totalDocs: 0 };
  }
}

async function getGitStats() {
  console.log('📊 Gathering git statistics...');

  try {
    const commitCount = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
    const contributors = execSync('git shortlog -sn', { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const match = line.trim().match(/(\d+)\s+(.+)/);
        return match ? { commits: parseInt(match[1]), name: match[2] } : null;
      })
      .filter(Boolean);

    const lastCommit = execSync('git log -1 --format="%H|%an|%ad|%s"', { encoding: 'utf8' }).trim();
    const [hash, author, date, message] = lastCommit.split('|');

    return {
      totalCommits: parseInt(commitCount),
      contributors: contributors.slice(0, 10), // Top 10
      lastCommit: {
        hash: hash.substring(0, 7),
        author,
        date: new Date(date).toISOString(),
        message,
      },
      branch: execSync('git branch --show-current', { encoding: 'utf8' }).trim(),
    };
  } catch (error) {
    console.log('Warning: Git stats unavailable:', error.message);
    return {
      totalCommits: 0,
      contributors: [],
      lastCommit: null,
      branch: 'unknown',
    };
  }
}

async function getBuildMetrics() {
  console.log('🏗️ Analyzing build metrics...');

  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));

    const dependencies = Object.keys(packageJson.dependencies || {}).length;
    const devDependencies = Object.keys(packageJson.devDependencies || {}).length;

    // Check for build artifacts
    const buildArtifacts = await getFiles([
      '.next/**/*',
      'dist/**/*',
      'build/**/*',
      'storybook-static/**/*',
    ]);

    return {
      dependencies,
      devDependencies,
      totalDependencies: dependencies + devDependencies,
      scripts: Object.keys(packageJson.scripts || {}),
      buildArtifacts: buildArtifacts.length,
      nodeVersion: packageJson.engines?.node || 'not specified',
      framework: packageJson.dependencies?.next ? 'Next.js' : 'Unknown',
    };
  } catch (error) {
    console.log('Warning: Build metrics unavailable:', error.message);
    return {
      dependencies: 0,
      devDependencies: 0,
      totalDependencies: 0,
      scripts: [],
      buildArtifacts: 0,
      nodeVersion: 'unknown',
      framework: 'Unknown',
    };
  }
}

async function getQualityMetrics() {
  console.log('✅ Calculating quality metrics...');

  try {
    const tsConfigExists = await fs
      .access('tsconfig.json')
      .then(() => true)
      .catch(() => false);
    const eslintConfigExists = await fs
      .access('eslint.config.mjs')
      .then(() => true)
      .catch(() => false);

    const testFiles = await getFiles([
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
    ]);

    const sourceFiles = await getFiles(['src/**/*.ts', 'src/**/*.tsx']);

    const testCoverage =
      sourceFiles.length > 0 ? Math.round((testFiles.length / sourceFiles.length) * 100) : 0;

    return {
      hasTypeScript: tsConfigExists,
      hasESLint: eslintConfigExists,
      testFiles: testFiles.length,
      sourceFiles: sourceFiles.length,
      testCoverage: `${testCoverage}%`,
      maintainabilityScore: Math.min(
        100,
        (tsConfigExists ? 25 : 0) +
          (eslintConfigExists ? 25 : 0) +
          (testCoverage > 50 ? 25 : testCoverage / 2) +
          (testFiles.length > 10 ? 25 : testFiles.length * 2.5)
      ),
    };
  } catch (error) {
    console.log('Warning: Quality metrics unavailable:', error.message);
    return {
      hasTypeScript: false,
      hasESLint: false,
      testFiles: 0,
      sourceFiles: 0,
      testCoverage: '0%',
      maintainabilityScore: 0,
    };
  }
}

async function main() {
  try {
    console.log('Starting comprehensive repository analysis...\n');

    // Run all analyses
    const [componentAnalysis, scriptAnalysis, docAnalysis, gitStats, buildMetrics, qualityMetrics] =
      await Promise.all([
        analyzeComponents(),
        analyzeScripts(),
        analyzeDocs(),
        getGitStats(),
        getBuildMetrics(),
        getQualityMetrics(),
      ]);

    // Compile the comprehensive report
    const intelligence = {
      meta: {
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        repository: path.basename(process.cwd()),
      },

      overview: {
        totalComponents: componentAnalysis.totalComponents,
        totalScripts: scriptAnalysis.totalScripts,
        totalDocs: docAnalysis.totalDocs,
        totalCommits: gitStats.totalCommits,
        maintainabilityScore: Math.round(qualityMetrics.maintainabilityScore),
      },

      components: {
        summary: {
          total: componentAnalysis.totalComponents,
          withTests: Object.values(componentAnalysis.components).filter(c => c.hasTests).length,
          withStories: Object.values(componentAnalysis.components).filter(c => c.hasStories).length,
          stable: Object.values(componentAnalysis.components).filter(c => c.status === 'stable')
            .length,
        },
        inventory: componentAnalysis.components,
      },

      scripts: {
        summary: {
          total: scriptAnalysis.totalScripts,
          categories: Object.keys(scriptAnalysis.categories).length,
          executable: Object.values(scriptAnalysis.scripts).filter(s => s.executable).length,
        },
        categories: scriptAnalysis.categories,
        inventory: scriptAnalysis.scripts,
      },

      documentation: {
        summary: {
          total: docAnalysis.totalDocs,
          categories: Object.keys(docAnalysis.categories).length,
          totalWords: Object.values(docAnalysis.docs).reduce((sum, doc) => sum + doc.wordCount, 0),
        },
        categories: docAnalysis.categories,
        inventory: docAnalysis.docs,
      },

      git: gitStats,
      build: buildMetrics,
      quality: qualityMetrics,
    };

    // Write the intelligence report
    const outputFile = 'REPO_INTELLIGENCE.json';
    await fs.writeFile(outputFile, JSON.stringify(intelligence, null, 2));

    console.log('\n✨ Repository Intelligence Complete!');
    console.log('=====================================');
    console.log(`📊 Components: ${intelligence.overview.totalComponents}`);
    console.log(`🔧 Scripts: ${intelligence.overview.totalScripts}`);
    console.log(`📚 Documentation: ${intelligence.overview.totalDocs}`);
    console.log(`📈 Commits: ${intelligence.overview.totalCommits}`);
    console.log(`🎯 Maintainability: ${intelligence.overview.maintainabilityScore}%`);
    console.log(`\n💾 Report saved to: ${outputFile}`);

    return intelligence;
  } catch (error) {
    console.error('❌ Intelligence gathering failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
