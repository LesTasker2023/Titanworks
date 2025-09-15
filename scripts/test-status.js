#!/usr/bin/env node

/**
 * Test Status Runner - Cross-platform version
 * Comprehensive quality check with beautiful reporting
 * MuskMode-aligned: Signal-focused output with clear pass/fail indicators
 */

import { spawn } from 'child_process';
import { performance } from 'perf_hooks';

// Configuration
const config = {
  skipBuild: process.argv.includes('--skip-build'),
  skipCoverage: process.argv.includes('--skip-coverage'),
  verbose: process.argv.includes('--verbose'),
  ci: process.env.CI === 'true' || process.argv.includes('--ci'),
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

// Test results storage
const results = {
  typeCheck: { status: 'pending', duration: 0, output: '' },
  lint: { status: 'pending', duration: 0, output: '' },
  format: { status: 'pending', duration: 0, output: '' },
  tests: { status: 'pending', duration: 0, output: '', stats: {} },
  coverage: { status: 'pending', duration: 0, output: '', stats: {} },
  build: { status: 'pending', duration: 0, output: '', stats: {} },
  warnings: { status: 'pending', duration: 0, output: '', stats: {} },
  totalDuration: 0,
};

// Helper functions
function colorize(text, color) {
  if (config.ci) return text;
  return `${colors[color] || ''}${text}${colors.reset}`;
}

function log(text, color = 'white') {
  console.log(colorize(text, color));
}

function section(title) {
  const line = '='.repeat(60);
  log(`\n${line}`, 'blue');
  log(` ${title}`, 'blue');
  log(line, 'blue');
}

function runCommand(command, args = []) {
  return new Promise(resolve => {
    const startTime = performance.now();
    const child = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
    });

    let output = '';
    let error = '';

    child.stdout.on('data', data => {
      output += data.toString();
    });

    child.stderr.on('data', data => {
      error += data.toString();
    });

    child.on('close', code => {
      const duration = (performance.now() - startTime) / 1000;
      resolve({
        exitCode: code,
        output: output + error,
        duration: duration,
      });
    });
  });
}

async function runTestStep(name, command, outputParser = null, required = true) {
  log(`\n🔄 Running ${name}...`, 'yellow');

  const result = await runCommand('yarn', [command]);
  const status = result.exitCode === 0 ? 'passed' : 'failed';
  const color = status === 'passed' ? 'green' : 'red';

  // Store results
  results[name.toLowerCase().replace(/\s+/g, '')] = {
    status,
    duration: result.duration,
    output: result.output,
  };

  // Parse output if parser provided
  if (outputParser) {
    const stats = outputParser(result.output);
    results[name.toLowerCase().replace(/\s+/g, '')].stats = stats;
  }

  // Show immediate result
  const icon = status === 'passed' ? '✅' : '❌';
  log(`${icon} ${name} - ${status} (${result.duration.toFixed(1)}s)`, color);

  if (status === 'failed' && required) {
    const errorLines = result.output.split('\n').slice(0, 3).join('\n');
    log(`   Error: ${errorLines}`, 'red');
  }

  return status === 'passed';
}

// Output parsers
function parseTestOutput(output) {
  const stats = {};

  const testMatch = output.match(/Tests\s+(\d+)\s+passed\s+\((\d+)\)/);
  if (testMatch) {
    stats.passed = parseInt(testMatch[1]);
    stats.total = parseInt(testMatch[2]);
    stats.failed = stats.total - stats.passed;
    stats.passRate = Math.round((stats.passed / stats.total) * 100 * 10) / 10;
  }

  const durationMatch = output.match(/Duration\s+([0-9.]+)s/);
  if (durationMatch) {
    stats.testDuration = parseFloat(durationMatch[1]);
  }

  return stats;
}

function parseCoverageOutput(output) {
  const stats = {};

  const coverageMatch = output.match(
    /All files\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)/
  );
  if (coverageMatch) {
    stats.statements = parseFloat(coverageMatch[1]);
    stats.branches = parseFloat(coverageMatch[2]);
    stats.functions = parseFloat(coverageMatch[3]);
    stats.lines = parseFloat(coverageMatch[4]);
    stats.average =
      Math.round(((stats.statements + stats.branches + stats.functions + stats.lines) / 4) * 10) /
      10;
  }

  return stats;
}

function parseBuildOutput(output) {
  const stats = {};

  const sizeMatch = output.match(/First Load JS shared by all\s+([0-9.]+)\s*(kB|MB)/);
  if (sizeMatch) {
    const size = parseFloat(sizeMatch[1]);
    const unit = sizeMatch[2];
    stats.bundleSize = unit === 'MB' ? size * 1024 : size;
  }

  const routeCount = (output.match(/├|└/g) || []).length;
  stats.routes = routeCount;

  return stats;
}

// Main execution
async function main() {
  section('🚀 TITANWORKS QUALITY GATE - COMPREHENSIVE TEST SUITE');
  log('Running comprehensive quality checks with detailed reporting...', 'cyan');
  log(`Start time: ${new Date().toISOString()}`, 'gray');

  const overallStart = performance.now();
  let allPassed = true;

  // Run all tests
  try {
    allPassed = (await runTestStep('Type Check', 'type-check')) && allPassed;
    allPassed = (await runTestStep('Lint', 'lint')) && allPassed;
    allPassed = (await runTestStep('Format', 'format:check')) && allPassed;
    allPassed = (await runTestStep('Tests', 'test:run', parseTestOutput)) && allPassed;

    if (!config.skipCoverage) {
      allPassed =
        (await runTestStep('Coverage', 'test:coverage', parseCoverageOutput, false)) && allPassed;
    }

    if (!config.skipBuild) {
      allPassed = (await runTestStep('Build', 'build', parseBuildOutput)) && allPassed;
    }

    allPassed = (await runTestStep('Warnings', 'track-warnings', null, false)) && allPassed;
  } catch (error) {
    log(`Error running tests: ${error.message}`, 'red');
    allPassed = false;
  }

  const overallEnd = performance.now();
  results.totalDuration = (overallEnd - overallStart) / 1000;

  // Generate Beautiful Summary Report
  section('📊 COMPREHENSIVE TEST RESULTS SUMMARY');

  // Overall Status
  const overallStatus = allPassed ? 'ALL SYSTEMS GO ✅' : 'ATTENTION REQUIRED ❌';
  const overallColor = allPassed ? 'green' : 'red';

  log(`\n🎯 OVERALL STATUS: ${overallStatus}`, overallColor);
  log(`⏱️  Total Execution Time: ${results.totalDuration.toFixed(1)} seconds`, 'cyan');
  log(`📅 Completed: ${new Date().toISOString()}`, 'gray');

  // Detailed Results Table
  log('\n📋 DETAILED RESULTS:', 'blue');
  log('-'.repeat(80), 'gray');
  log('| Check        | Status | Duration | Details', 'white');
  log('-'.repeat(80), 'gray');

  const checks = ['typecheck', 'lint', 'format', 'tests', 'coverage', 'build', 'warnings'];

  for (const check of checks) {
    const result = results[check];
    if (result.status === 'pending') continue;

    const statusIcon = result.status === 'passed' ? '✅' : '❌';
    const duration = `${result.duration.toFixed(1)}s`;

    let details = '';
    if (check === 'tests' && result.stats.total) {
      details = `${result.stats.passed}/${result.stats.total} passed (${result.stats.passRate}%)`;
    } else if (check === 'coverage' && result.stats.average) {
      details = `Avg: ${result.stats.average}%`;
    } else if (check === 'build' && result.stats.bundleSize) {
      details = `Bundle: ${Math.round(result.stats.bundleSize)}kB`;
    }

    log(
      `| ${check.padEnd(12)} | ${statusIcon} ${result.status.padEnd(6)} | ${duration.padStart(8)} | ${details}`,
      'white'
    );
  }

  log('-'.repeat(80), 'gray');

  // Key Metrics
  if (results.tests.stats.total) {
    log('\n🧪 TEST METRICS:', 'blue');
    log(`   • Total Tests: ${results.tests.stats.total}`, 'white');
    log(`   • Passed: ${results.tests.stats.passed} (${results.tests.stats.passRate}%)`, 'green');
    if (results.tests.stats.failed > 0) {
      log(`   • Failed: ${results.tests.stats.failed}`, 'red');
    }
    if (results.tests.stats.testDuration) {
      log(`   • Test Execution: ${results.tests.stats.testDuration.toFixed(1)}s`, 'cyan');
    }
  }

  if (results.coverage.stats.average) {
    log('\n📈 COVERAGE METRICS:', 'blue');
    log(`   • Overall: ${results.coverage.stats.average}%`, 'white');
    log(`   • Statements: ${results.coverage.stats.statements}%`, 'white');
    log(`   • Branches: ${results.coverage.stats.branches}%`, 'white');
    log(`   • Functions: ${results.coverage.stats.functions}%`, 'white');
    log(`   • Lines: ${results.coverage.stats.lines}%`, 'white');
  }

  if (results.build.stats.bundleSize) {
    log('\n📦 BUILD METRICS:', 'blue');
    log(`   • Bundle Size: ${Math.round(results.build.stats.bundleSize)}kB`, 'white');
    log(`   • Routes: ${results.build.stats.routes}`, 'white');
    log(`   • Build Duration: ${results.build.duration.toFixed(1)}s`, 'cyan');
  }

  // Performance Assessment
  log('\n⚡ PERFORMANCE ASSESSMENT:', 'blue');
  let perf;
  if (results.totalDuration < 30) {
    perf = { rating: '🚀 EXCELLENT', color: 'green', note: 'Sub-30s execution time' };
  } else if (results.totalDuration < 60) {
    perf = { rating: '✅ GOOD', color: 'yellow', note: 'Under 1 minute' };
  } else if (results.totalDuration < 120) {
    perf = { rating: '⚠️  ACCEPTABLE', color: 'yellow', note: 'Under 2 minutes' };
  } else {
    perf = { rating: '🐌 NEEDS OPTIMIZATION', color: 'red', note: 'Over 2 minutes' };
  }

  log(`   • Speed Rating: ${perf.rating}`, perf.color);
  log(`   • Note: ${perf.note}`, 'gray');

  // Final Actions
  if (allPassed) {
    log('\n🎉 ALL QUALITY GATES PASSED!', 'green');
    log('   Ready for commit and deployment. ✈️', 'green');
    process.exit(0);
  } else {
    log('\n🚨 QUALITY ISSUES DETECTED!', 'red');
    log('   Please review and fix issues before committing.', 'red');

    // Show failed checks
    const failed = Object.entries(results)
      .filter(([_, result]) => result.status === 'failed')
      .map(([check]) => check);

    if (failed.length > 0) {
      log(`\n   Failed checks: ${failed.join(', ')}`, 'yellow');
    }
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
