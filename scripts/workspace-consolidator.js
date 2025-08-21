#!/usr/bin/env node

/**
 * Documentation Consolidator
 * Gathers all scattered documentation, registries, and references into a unified index
 */

const fs = require('fs');
const path = require('path');

// File system exploration
function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md')) {
      files.push({
        name: item,
        path: fullPath,
        relativePath: path.relative(process.cwd(), fullPath),
        category: determineCategory(fullPath, item),
        size: stat.size,
        lastModified: stat.mtime,
      });
    }
  }

  return files;
}

function determineCategory(filePath, fileName) {
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

function findScriptFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findScriptFiles(fullPath, files);
    } else if (
      item.endsWith('.ps1') ||
      item.endsWith('.js') ||
      item.endsWith('.cjs') ||
      item.endsWith('.mjs')
    ) {
      files.push({
        name: item,
        path: fullPath,
        relativePath: path.relative(process.cwd(), fullPath),
        type: path.extname(item),
        category: determineScriptCategory(fullPath, item),
        size: stat.size,
        lastModified: stat.mtime,
      });
    }
  }

  return files;
}

function determineScriptCategory(filePath, fileName) {
  const nameLower = fileName.toLowerCase();

  if (nameLower.includes('automation') || nameLower.includes('pre-commit')) return 'Automation';
  if (nameLower.includes('fix') || nameLower.includes('cleanup') || nameLower.includes('container'))
    return 'Maintenance';
  if (nameLower.includes('generate') || nameLower.includes('create')) return 'Generators';
  if (nameLower.includes('audit') || nameLower.includes('analyzer') || nameLower.includes('config'))
    return 'Analysis';
  if (nameLower.includes('test') || nameLower.includes('debug')) return 'Testing';
  if (nameLower.includes('release') || nameLower.includes('build')) return 'Release';

  return 'Utilities';
}

function generateConsolidatedIndex() {
  console.log('🔍 Scanning workspace for documentation and scripts...');

  const rootDir = process.cwd();
  const markdownFiles = findMarkdownFiles(rootDir);
  const scriptFiles = findScriptFiles(rootDir);

  // Group by category
  const docsByCategory = markdownFiles.reduce((acc, file) => {
    if (!acc[file.category]) acc[file.category] = [];
    acc[file.category].push(file);
    return acc;
  }, {});

  const scriptsByCategory = scriptFiles.reduce((acc, file) => {
    if (!acc[file.category]) acc[file.category] = [];
    acc[file.category].push(file);
    return acc;
  }, {});

  // Generate consolidated index
  const index = {
    generated: new Date().toISOString(),
    summary: {
      totalDocuments: markdownFiles.length,
      totalScripts: scriptFiles.length,
      documentCategories: Object.keys(docsByCategory).length,
      scriptCategories: Object.keys(scriptsByCategory).length,
    },
    documentation: docsByCategory,
    scripts: scriptsByCategory,
    files: {
      markdown: markdownFiles,
      scripts: scriptFiles,
    },
  };

  // Write to file
  const outputPath = path.join(rootDir, 'WORKSPACE_INDEX.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

  console.log('✅ Workspace index generated successfully!');
  console.log(`📊 Found ${markdownFiles.length} documentation files`);
  console.log(`🔧 Found ${scriptFiles.length} script files`);
  console.log(`📁 ${Object.keys(docsByCategory).length} documentation categories`);
  console.log(`⚙️ ${Object.keys(scriptsByCategory).length} script categories`);
  console.log(`📄 Index saved to: ${outputPath}`);

  return index;
}

function generateMarkdownSummary(index) {
  const summaryPath = path.join(process.cwd(), 'WORKSPACE_SUMMARY.md');

  let markdown = `# 🚀 Triggerkings Workspace Summary

*Generated on ${new Date().toLocaleDateString()}*

## 📊 Overview

- **${index.summary.totalDocuments}** Documentation Files
- **${index.summary.totalScripts}** Script Files  
- **${index.summary.documentCategories}** Documentation Categories
- **${index.summary.scriptCategories}** Script Categories

---

## 📚 Documentation Registry

`;

  Object.entries(index.documentation).forEach(([category, files]) => {
    markdown += `### ${category}\n\n`;
    files.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(1);
      const lastMod = new Date(file.lastModified).toLocaleDateString();
      markdown += `- **[${file.name}](${file.relativePath})**\n`;
      markdown += `  - Size: ${sizeKB}KB | Last Modified: ${lastMod}\n\n`;
    });
  });

  markdown += `---

## 🔧 Script Registry

`;

  Object.entries(index.scripts).forEach(([category, files]) => {
    markdown += `### ${category}\n\n`;
    files.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(1);
      const lastMod = new Date(file.lastModified).toLocaleDateString();
      markdown += `- **[${file.name}](${file.relativePath})** \`${file.type}\`\n`;
      markdown += `  - Size: ${sizeKB}KB | Last Modified: ${lastMod}\n\n`;
    });
  });

  markdown += `---

## 🎯 Quick Actions

### Documentation
- [Component Registry](COMPONENT_REGISTRY.md) - Complete component inventory
- [Quick Reference](QUICK_REFERENCE.md) - Essential commands and shortcuts
- [Semantic Color System](docs/SEMANTIC_COLOR_SYSTEM.md) - Design token system

### Scripts
- [Pre-commit Automation](scripts/pre-commit-automation.ps1) - Quality checks
- [Component Automation](scripts/component-automation.ps1) - Component scaffolding
- [Shadcn Analyzer](scripts/shadcn-analyzer.js) - Component analysis

### Development
- \`yarn dev\` - Start development server
- \`yarn build\` - Build production
- \`yarn test\` - Run test suite
- \`yarn storybook\` - Launch Storybook

---

*This summary is automatically generated. Run \`node scripts/workspace-consolidator.js\` to update.*
`;

  fs.writeFileSync(summaryPath, markdown);
  console.log(`📄 Summary markdown saved to: ${summaryPath}`);
}

// Run the consolidation
if (require.main === module) {
  try {
    const index = generateConsolidatedIndex();
    generateMarkdownSummary(index);

    console.log('\n🎉 Workspace consolidation complete!');
    console.log('📋 Files generated:');
    console.log('   - WORKSPACE_INDEX.json (machine-readable)');
    console.log('   - WORKSPACE_SUMMARY.md (human-readable)');
  } catch (error) {
    console.error('❌ Error during consolidation:', error.message);
    process.exit(1);
  }
}

module.exports = { generateConsolidatedIndex, generateMarkdownSummary };
