/**
 * Test script to verify intelligence system is working correctly
 */

const testIntelligenceSystem = async () => {
  console.log('🧠 Testing Intelligence System...\n');

  try {
    // Test API endpoint
    console.log('📡 Testing API endpoint...');
    const response = await fetch('http://localhost:3001/api/data');

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ API endpoint working');
    console.log(`📊 Report version: ${data.metadata.version}`);
    console.log(`🕐 Generated: ${data.metadata.timestamp}`);
    console.log(`📦 Components analyzed: ${data.componentInventory.total}`);
    console.log(`⚡ Overall health score: ${data.summary.overallHealthScore}%`);
    console.log(`🏗️ Build status: ${data.codebase.pipeline.overall.status}\n`);

    // Test data structure
    console.log('🔍 Validating data structure...');
    const requiredFields = [
      'metadata',
      'componentInventory',
      'codebase',
      'summary',
      'bestPractices',
    ];
    const missingFields = requiredFields.filter(field => !(field in data));

    if (missingFields.length > 0) {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ All required fields present');
    }

    // Test component inventory
    if (data.componentInventory?.items?.length > 0) {
      const sampleComponent = data.componentInventory.items[0];
      console.log(`📱 Sample component: ${sampleComponent.name}`);
      console.log(`   Quality: ${sampleComponent.quality.overall}`);
      console.log(`   Tests: ${sampleComponent.tests ? '✅' : '❌'}`);
      console.log(`   Story: ${sampleComponent.story ? '✅' : '❌'}`);
    }

    console.log('\n🎉 Intelligence system test completed successfully!');
    console.log('🌐 Dashboard available at: http://localhost:3001/intelligence');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Ensure dev server is running: yarn dev');
    console.log('2. Check if public/REPO_INTELLIGENCE.json exists');
    console.log('3. Verify API route at /api/data');
  }
};

// Run the test
if (typeof window === 'undefined') {
  // Node.js environment
  testIntelligenceSystem();
} else {
  // Browser environment
  console.log('Run this script in Node.js or check the network tab');
}

export { testIntelligenceSystem };
