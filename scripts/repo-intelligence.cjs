#!/usr/bin/env node

/**
 * Repository Intelligence Gatherer
 * Comprehensive data collection for unified dashboard
 * Gathers: components, scripts, docs, git stats, build metrics, quality data
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class RepoIntelligence {
  constructor() {
    this.rootDir = process.cwd();
    this.data = {
      generated: new Date().toISOString(),
      metadata: {
        name: 'Daedalus Design System',
        version: '1.0.0',
        repository: 'triggerkings',
        branch: 'main',
      },
      summary: {},
      components: {},
      scripts: {},
      documentation: {},
      git: {},
      build: {},
      quality: {},
      files: {},
    };
  }

  // ===== FILE SYSTEM SCANNING =====

  async scanComponents() {
    console.log('🔍 Scanning components...');
    const componentsDir = path.join(this.rootDir, 'src/components/ui');
    const components = {};
    let totalComponents = 0;
    let withTests = 0;
    let withStories = 0;
    let productionReady = 0;

    if (fs.existsSync(componentsDir)) {
      const dirs = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const componentName of dirs) {
        const componentPath = path.join(componentsDir, componentName);
        const component = {
          name: componentName,
          path: `src/components/ui/${componentName}`,
          files: [],
          hasDemo: false,
          hasTest: false,
          hasStories: false,
          hasIndex: false,
          status: 'unknown',
          size: 0,
          lastModified: null,
        };

        // Scan component files
        const files = fs.readdirSync(componentPath);
        for (const file of files) {
          const filePath = path.join(componentPath, file);
          const stat = fs.statSync(filePath);

          component.files.push({
            name: file,
            size: stat.size,
            lastModified: stat.mtime,
          });

          component.size += stat.size;
          if (!component.lastModified || stat.mtime > component.lastModified) {
            component.lastModified = stat.mtime;
          }

          // Check file types
          if (file.includes('demo') || file.includes('Demo')) component.hasDemo = true;
          if (file.includes('test') || file.includes('Test')) component.hasTest = true;
          if (file.includes('stories') || file.includes('Stories')) component.hasStories = true;
          if (file === 'index.ts' || file === 'index.tsx') component.hasIndex = true;
        }

        // Determine status
        if (component.hasDemo && component.hasTest && component.hasStories && component.hasIndex) {
          component.status = 'production-ready';
          productionReady++;
        } else if (component.hasDemo && (component.hasTest || component.hasStories)) {
          component.status = 'development';
        } else {
          component.status = 'draft';
        }

        components[componentName] = component;
        totalComponents++;
        if (component.hasTest) withTests++;
        if (component.hasStories) withStories++;
      }
    }

    this.data.components = {
      registry: components,
      stats: {
        total: totalComponents,
        withTests,
        withStories,
        productionReady,
        testCoverage: totalComponents > 0 ? ((withTests / totalComponents) * 100).toFixed(1) : 0,
        storyCoverage: totalComponents > 0 ? ((withStories / totalComponents) * 100).toFixed(1) : 0,
      },
    };
  }

  async scanScripts() {
    console.log('🔧 Scanning scripts...');
    const scriptsDir = path.join(this.rootDir, 'scripts');
    const scripts = {};
    const categories = {};
    let totalScripts = 0;

    if (fs.existsSync(scriptsDir)) {
      const files = fs.readdirSync(scriptsDir);

      for (const file of files) {
        const filePath = path.join(scriptsDir, file);
        const stat = fs.statSync(filePath);

        if (
          stat.isFile() &&
          (file.endsWith('.ps1') ||
            file.endsWith('.js') ||
            file.endsWith('.cjs') ||
            file.endsWith('.mjs'))
        ) {
          const script = {
            name: file,
            path: `scripts/${file}`,
            type: path.extname(file),
            size: stat.size,
            lastModified: stat.mtime,
            category: this.categorizeScript(file),
            description: await this.extractScriptDescription(filePath),
          };

          if (!categories[script.category]) categories[script.category] = [];
          categories[script.category].push(script);
          scripts[file] = script;
          totalScripts++;
        }
      }
    }

    this.data.scripts = {
      registry: scripts,
      categories,
      stats: {
        total: totalScripts,
        byType: this.countByProperty(Object.values(scripts), 'type'),
        byCategory: Object.keys(categories).reduce((acc, cat) => {
          acc[cat] = categories[cat].length;
          return acc;
        }, {}),
      },
    };
  }

  async scanDocumentation() {
    console.log('📚 Scanning documentation...');
    const docs = {};
    const categories = {};
    let totalDocs = 0;

    const scanDir = async (dir, basePath = '') => {
      if (!fs.existsSync(dir)) return;

      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          await scanDir(fullPath, path.join(basePath, item));
        } else if (item.endsWith('.md')) {
          const relativePath = path.join(basePath, item);
          const doc = {
            name: item,
            path: relativePath,
            size: stat.size,
            lastModified: stat.mtime,
            category: this.categorizeDoc(relativePath, item),
            wordCount: await this.getWordCount(fullPath),
          };

          if (!categories[doc.category]) categories[doc.category] = [];
          categories[doc.category].push(doc);
          docs[relativePath] = doc;
          totalDocs++;
        }
      }
    };

    await scanDir(this.rootDir);

    this.data.documentation = {
      registry: docs,
      categories,
      stats: {
        total: totalDocs,
        totalSize: Object.values(docs).reduce((sum, doc) => sum + doc.size, 0),
        byCategory: Object.keys(categories).reduce((acc, cat) => {
          acc[cat] = categories[cat].length;
          return acc;
        }, {}),
      },
    };
  }

  async gatherGitStats() {
    console.log('📊 Gathering git statistics...');
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      const lastCommit = execSync('git log -1 --format="%H|%an|%ad|%s"', {
        encoding: 'utf8',
      }).trim();
      const [hash, author, date, message] = lastCommit.split('|');

      const commitCount = parseInt(
        execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim()
      );
      const contributors = execSync('git shortlog -sn', { encoding: 'utf8' })
        .trim()
        .split('\n')
        .map(line => {
          const [commits, ...nameParts] = line.trim().split(/\s+/);
          return { name: nameParts.join(' '), commits: parseInt(commits) };
        });

      // Recent activity (last 10 commits)
      const recentCommits = execSync('git log -10 --format="%h|%an|%ar|%s"', { encoding: 'utf8' })
        .trim()
        .split('\n')
        .map(line => {
          const [hash, author, time, message] = line.split('|');
          return { hash, author, time, message };
        });

      this.data.git = {
        branch,
        lastCommit: {
          hash: hash.substring(0, 8),
          author,
          date: new Date(date),
          message,
        },
        stats: {
          totalCommits: commitCount,
          contributors: contributors.length,
          topContributor: contributors[0],
        },
        recentActivity: recentCommits,
      };
    } catch (error) {
      console.warn('⚠️ Git stats unavailable:', error.message);
      this.data.git = { error: 'Git not available or not a git repository' };
    }
  }

  async gatherBuildMetrics() {
    console.log('🏗️ Gathering build metrics...');
    try {
      // Package.json analysis
      const packagePath = path.join(this.rootDir, 'package.json');
      if (fs.existsSync(packagePath)) {
        const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        this.data.metadata.name = packageData.name || 'Unknown';
        this.data.metadata.version = packageData.version || '0.0.0';

        // Dependency analysis
        const deps = Object.keys(packageData.dependencies || {});
        const devDeps = Object.keys(packageData.devDependencies || {});

        this.data.build = {
          version: packageData.version,
          dependencies: {
            production: deps.length,
            development: devDeps.length,
            total: deps.length + devDeps.length,
          },
          scripts: Object.keys(packageData.scripts || {}),
          packageManager: fs.existsSync(path.join(this.rootDir, 'yarn.lock'))
            ? 'yarn'
            : fs.existsSync(path.join(this.rootDir, 'package-lock.json'))
              ? 'npm'
              : 'unknown',
        };
      }

      // Build artifacts
      const nextDir = path.join(this.rootDir, '.next');
      if (fs.existsSync(nextDir)) {
        this.data.build.artifacts = {
          nextBuild: true,
          buildSize: this.getDirSize(nextDir),
        };
      }
    } catch (error) {
      console.warn('⚠️ Build metrics error:', error.message);
      this.data.build = { error: error.message };
    }
  }

  async gatherQualityMetrics() {
    console.log('✅ Gathering quality metrics...');
    try {
      // TypeScript config
      const tsconfigPath = path.join(this.rootDir, 'tsconfig.json');
      const hasTypeScript = fs.existsSync(tsconfigPath);

      // ESLint config
      const eslintPath = path.join(this.rootDir, 'eslint.config.mjs');
      const hasESLint = fs.existsSync(eslintPath);

      // Test config
      const vitestPath = path.join(this.rootDir, 'vitest.config.ts');
      const hasTests = fs.existsSync(vitestPath);

      // Code metrics
      const srcDir = path.join(this.rootDir, 'src');
      let linesOfCode = 0;
      let fileCount = 0;

      if (fs.existsSync(srcDir)) {
        const countFiles = dir => {
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              countFiles(fullPath);
            } else if (
              item.endsWith('.ts') ||
              item.endsWith('.tsx') ||
              item.endsWith('.js') ||
              item.endsWith('.jsx')
            ) {
              fileCount++;
              const content = fs.readFileSync(fullPath, 'utf8');
              linesOfCode += content.split('\n').length;
            }
          }
        };
        countFiles(srcDir);
      }

      this.data.quality = {
        typescript: hasTypeScript,
        eslint: hasESLint,
        testing: hasTests,
        codeMetrics: {
          linesOfCode,
          fileCount,
          avgLinesPerFile: fileCount > 0 ? Math.round(linesOfCode / fileCount) : 0,
        },
        scores: {
          setup: (hasTypeScript ? 25 : 0) + (hasESLint ? 25 : 0) + (hasTests ? 25 : 0) + 25, // Base 25 for structure
          maintainability: this.calculateMaintainabilityScore(),
        },
      };
    } catch (error) {
      console.warn('⚠️ Quality metrics error:', error.message);
      this.data.quality = { error: error.message };
    }
  }

  // ===== HELPER METHODS =====

  categorizeScript(filename) {
    const name = filename.toLowerCase();
    if (name.includes('automation') || name.includes('pre-commit')) return 'Automation';
    if (name.includes('fix') || name.includes('cleanup') || name.includes('container'))
      return 'Maintenance';
    if (name.includes('generate') || name.includes('create')) return 'Generators';
    if (name.includes('audit') || name.includes('analyzer') || name.includes('config'))
      return 'Analysis';
    if (name.includes('test') || name.includes('debug')) return 'Testing';
    if (name.includes('release') || name.includes('build')) return 'Release';
    return 'Utilities';
  }

  categorizeDoc(filePath, fileName) {
    const pathLower = filePath.toLowerCase();
    const nameLower = fileName.toLowerCase();

    if (pathLower.includes('docs/') || nameLower.includes('documentation')) return 'Documentation';
    if (nameLower.includes('component') || nameLower.includes('registry')) return 'Components';
    if (nameLower.includes('script') || nameLower.includes('command')) return 'Scripts';
    if (nameLower.includes('audit') || nameLower.includes('report')) return 'Reports';
    if (nameLower.includes('quick') || nameLower.includes('reference')) return 'Reference';
    if (nameLower.includes('theme') || nameLower.includes('color') || nameLower.includes('design'))
      return 'Design System';
    if (nameLower === 'readme.md') return 'Overview';
    return 'Miscellaneous';
  }

  async extractScriptDescription(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').slice(0, 10); // First 10 lines

      // Look for description in comments
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.includes('Description:') || trimmed.includes('PURPOSE:')) {
          return trimmed
            .replace(/^[#\/*\s]*Description:\s*/i, '')
            .replace(/^[#\/*\s]*PURPOSE:\s*/i, '');
        }
        if (trimmed.startsWith('# ') && !trimmed.includes('!/usr/bin')) {
          return trimmed.substring(2);
        }
      }

      return 'No description available';
    } catch {
      return 'Error reading file';
    }
  }

  async getWordCount(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return content.split(/\s+/).filter(word => word.length > 0).length;
    } catch {
      return 0;
    }
  }

  getDirSize(dirPath) {
    let size = 0;
    try {
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          size += this.getDirSize(fullPath);
        } else {
          size += stat.size;
        }
      }
    } catch (error) {
      // Ignore errors
    }
    return size;
  }

  countByProperty(array, property) {
    return array.reduce((acc, item) => {
      const value = item[property];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  calculateMaintainabilityScore() {
    // Simple heuristic based on various factors
    let score = 0;

    // Component organization
    if (this.data.components.stats.productionReady > 20) score += 20;
    else if (this.data.components.stats.productionReady > 10) score += 15;
    else if (this.data.components.stats.productionReady > 5) score += 10;

    // Test coverage
    if (this.data.components.stats.testCoverage > 80) score += 25;
    else if (this.data.components.stats.testCoverage > 60) score += 20;
    else if (this.data.components.stats.testCoverage > 40) score += 15;

    // Documentation
    if (this.data.documentation.stats.total > 30) score += 20;
    else if (this.data.documentation.stats.total > 20) score += 15;
    else if (this.data.documentation.stats.total > 10) score += 10;

    // Automation
    if (this.data.scripts.stats.total > 20) score += 15;
    else if (this.data.scripts.stats.total > 10) score += 10;

    // Git activity
    if (this.data.git.stats && this.data.git.stats.totalCommits > 100) score += 20;
    else if (this.data.git.stats && this.data.git.stats.totalCommits > 50) score += 15;

    return Math.min(score, 100);
  }

  generateSummary() {
    this.data.summary = {
      components: this.data.components.stats,
      scripts: this.data.scripts.stats,
      documentation: this.data.documentation.stats,
      git: this.data.git.stats || {},
      build: this.data.build,
      quality: this.data.quality,
      health: {
        overall: this.calculateOverallHealth(),
        components:
          (this.data.components.stats.productionReady / this.data.components.stats.total) * 100,
        testing: this.data.components.stats.testCoverage,
        documentation:
          this.data.documentation.stats.total > 20
            ? 'Good'
            : this.data.documentation.stats.total > 10
              ? 'Fair'
              : 'Poor',
      },
    };
  }

  calculateOverallHealth() {
    let score = 0;
    let factors = 0;

    // Component health
    if (this.data.components.stats.total > 0) {
      score += (this.data.components.stats.productionReady / this.data.components.stats.total) * 30;
      factors++;
    }

    // Test coverage
    if (this.data.components.stats.testCoverage) {
      score += parseFloat(this.data.components.stats.testCoverage) * 0.25;
      factors++;
    }

    // Documentation
    score += Math.min((this.data.documentation.stats.total / 40) * 20, 20);
    factors++;

    // Build setup
    if (this.data.build && !this.data.build.error) {
      score += 15;
    }
    factors++;

    // Quality setup
    if (this.data.quality && !this.data.quality.error) {
      score += this.data.quality.scores.setup * 0.15;
    }
    factors++;

    return Math.round(score / factors);
  }

  // ===== MAIN EXECUTION =====

  async gather() {
    console.log('🚀 Starting comprehensive repository intelligence gathering...\n');

    try {
      await this.scanComponents();
      await this.scanScripts();
      await this.scanDocumentation();
      await this.gatherGitStats();
      await this.gatherBuildMetrics();
      await this.gatherQualityMetrics();

      this.generateSummary();

      // Save to file
      const outputPath = path.join(this.rootDir, 'REPO_INTELLIGENCE.json');
      fs.writeFileSync(outputPath, JSON.stringify(this.data, null, 2));

      console.log('\n✅ Repository intelligence gathering complete!');
      console.log(
        `📊 Components: ${this.data.components.stats.total} (${this.data.components.stats.productionReady} production-ready)`
      );
      console.log(
        `🔧 Scripts: ${this.data.scripts.stats.total} across ${Object.keys(this.data.scripts.categories).length} categories`
      );
      console.log(`📚 Documentation: ${this.data.documentation.stats.total} files`);
      console.log(`💚 Overall Health: ${this.data.summary.health.overall}%`);
      console.log(`📄 Data saved to: ${outputPath}`);

      return this.data;
    } catch (error) {
      console.error('❌ Error during intelligence gathering:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const intelligence = new RepoIntelligence();
  intelligence.gather();
}

module.exports = RepoIntelligence;
