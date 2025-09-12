// Dependency gate script
// Signal: Inspects new dependencies for size/depth; requires justification if thresholds exceeded (Unified Guide §1.1)

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const YARN_LOCK = path.join(__dirname, '../yarn.lock');
const PACKAGE_JSON = path.join(__dirname, '../package.json');
const SIZE_THRESHOLD_KB = 500; // Example: 500KB unpacked
const DEPTH_THRESHOLD = 3; // Example: max 3 levels deep

function getFileSizeKb(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function getDependencyDepth() {
  // Use 'yarn list' to get dependency tree depth
  const output = execSync('yarn list --depth=99', { encoding: 'utf8' });
  const lines = output.split('\n');
  let maxDepth = 0;
  for (const line of lines) {
    const depth = line.search(/[^ ]/);
    if (depth > maxDepth) maxDepth = depth;
  }
  return Math.floor(maxDepth / 2); // Each indent is 2 spaces
}

function checkJustification() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const deps = Object.keys(pkg.dependencies || {});
  for (const dep of deps) {
    if (pkg[dep] && pkg[dep].justification) {
      console.log(`Justification for ${dep}: ${pkg[dep].justification}`);
    }
  }
}

function main() {
  const sizeKb = getFileSizeKb(YARN_LOCK);
  const depth = getDependencyDepth();
  console.log(`yarn.lock size: ${sizeKb} KB`);
  console.log(`Dependency tree max depth: ${depth}`);
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
