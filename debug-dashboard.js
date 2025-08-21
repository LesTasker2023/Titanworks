const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'admin scripts', 'script-result.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(rawData);

  console.log('=== DASHBOARD DATA STRUCTURE ANALYSIS ===');
  console.log('1. Root keys:', Object.keys(data));

  if (data.systemHealth) {
    console.log('\n2. SystemHealth exists:', Object.keys(data.systemHealth));

    if (data.systemHealth.tests) {
      console.log('\n3. Tests structure:', Object.keys(data.systemHealth.tests));
      console.log('\n4. Test data values:');
      console.log('   - passed:', data.systemHealth.tests.passed);
      console.log('   - failed:', data.systemHealth.tests.failed);
      console.log('   - skipped:', data.systemHealth.tests.skipped);
      console.log('   - duration:', data.systemHealth.tests.duration);

      if (data.systemHealth.tests.rawOutput) {
        const rawOutput = data.systemHealth.tests.rawOutput;
        console.log('\n5. Raw output preview (first 500 chars):');
        console.log(rawOutput.substring(0, 500));

        // Test regex patterns
        console.log('\n6. Regex pattern matches:');
        const testFilesMatch = rawOutput.match(/Test Files\s+(\d+)\s+passed/);
        const testsPassedMatch = rawOutput.match(/Tests\s+(\d+)\s+passed/);
        const skippedMatch = rawOutput.match(/(\d+)\s+skipped/);
        const failedMatch = rawOutput.match(/(\d+)\s+failed/);

        console.log('   - Test Files match:', testFilesMatch);
        console.log('   - Tests passed match:', testsPassedMatch);
        console.log('   - Skipped match:', skippedMatch);
        console.log('   - Failed match:', failedMatch);
      }
    } else {
      console.log('\n3. No tests property in systemHealth');
    }
  } else {
    console.log('\n2. No systemHealth property found');
  }

  if (data.dashboard) {
    console.log('\n7. Dashboard data:', data.dashboard);
  }

  if (data.components) {
    console.log('\n8. Components metrics:', data.components.metrics);
  }
} catch (error) {
  console.error('Error reading or parsing data:', error.message);
}
