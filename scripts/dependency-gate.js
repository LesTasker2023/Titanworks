// Dependency gate script
// Signal: Inspects new dependencies for size/depth; requires justification if thresholds exceeded (Unified Guide §1.1)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const YARN_LOCK = path.join(__dirname, '../yarn.lock');
const PACKAGE_JSON = path.join(__dirname, '../package.json');
const SIZE_THRESHOLD_KB = 500; // Example: 500KB unpacked
const DEPTH_THRESHOLD = 3; // Example: max 3 levels deep
const YARN_LIST_DEPTH = 5; // Limit depth for performance and reliability

function getFileSizeKb(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function getDependencyDepth() {
  // Use 'yarn list' to get dependency tree depth, but limit depth for performance
  const output = execSync(`yarn list --depth=${YARN_LIST_DEPTH}`, { encoding: 'utf8' });
  const lines = output.split('\n');
  let maxDepth = 0;
  for (const line of lines) {
    // Match leading tree structure (│, ├─, └─, and spaces)
    if (depth !== -1 && depth > maxDepth) maxDepth = depth;
    let depth = 0;
    if (match && match[1]) {
      // Each level is represented by two characters (│ or space)
      depth = match[1].length / 2;
    }
    let pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
    } catch (err) {
      console.error(`Error reading or parsing package.json: ${err.message}`);
      process.exit(1);
    }
  }
  return maxDepth;
}

function checkJustification() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const deps = Object.keys(pkg.dependencies || {});
  const justifications = pkg.dependencyJustifications || {};
  // Print justification for each dependency if present in package.json (Unified Guide §1.1)
  for (const dep of deps) {
    if (justifications[dep]) {
      console.log(`Justification for ${dep}: ${justifications[dep]}`);
    }
  }
}

function main() {
  const sizeKb = getFileSizeKb(YARN_LOCK);
  const depth = getDependencyDepth();
  console.log(`yarn.lock size: ${sizeKb} KB`);
  console.log(`Dependency tree max depth (limited to ${YARN_LIST_DEPTH}): ${depth}`);
  if (sizeKb > SIZE_THRESHOLD_KB || depth > DEPTH_THRESHOLD) {
    console.warn(
      'Dependency threshold exceeded. Please add justification to package.json for new/large deps.'
    );
    checkJustification();
    process.exit(1);
  } else {
    console.log('Dependency gate passed.');
  }
}

if (require.main === module) {
  main();
}
