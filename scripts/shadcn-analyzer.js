// Intelligent shadcn Component Analyzer
// Usage: node scripts/shadcn-analyzer.js

import fs from 'fs';
import path from 'path';

// Complete shadcn/ui component library inventory
const SHADCN_COMPONENTS = {
  // Form & Input Components
  Accordion: {
    complexity: 'medium',
    dependencies: ['Collapsible'],
    usage: 'high',
    description: 'Collapsible content sections',
  },
  Calendar: {
    complexity: 'high',
    dependencies: ['Button', 'Select'],
    usage: 'medium',
    description: 'Date picker with month/year navigation',
  },
  Command: {
    complexity: 'high',
    dependencies: ['Dialog', 'Input'],
    usage: 'medium',
    description: 'Command palette with search and keyboard navigation',
  },
  Combobox: {
    complexity: 'medium',
    dependencies: ['Command', 'Popover'],
    usage: 'high',
    description: 'Searchable select dropdown',
  },
  DatePicker: {
    complexity: 'high',
    dependencies: ['Calendar', 'Popover'],
    usage: 'high',
    description: 'Date selection with calendar popup',
  },
  Form: {
    complexity: 'medium',
    dependencies: ['Label', 'Input'],
    usage: 'high',
    description: 'Form validation and state management',
  },
  Label: {
    complexity: 'low',
    dependencies: [],
    usage: 'high',
    description: 'Accessible form labels',
  },
  Switch: {
    complexity: 'low',
    dependencies: [],
    usage: 'high',
    description: 'Toggle switch input',
  },

  // Layout & Navigation
  AspectRatio: {
    complexity: 'low',
    dependencies: [],
    usage: 'medium',
    description: 'Maintain aspect ratios for media',
  },
  Breadcrumb: {
    complexity: 'low',
    dependencies: [],
    usage: 'medium',
    description: 'Navigation breadcrumb trail',
  },
  Collapsible: {
    complexity: 'medium',
    dependencies: [],
    usage: 'medium',
    description: 'Expandable/collapsible content',
  },
  ContextMenu: {
    complexity: 'medium',
    dependencies: ['Menu'],
    usage: 'medium',
    description: 'Right-click context menus',
  },
  DropdownMenu: {
    complexity: 'medium',
    dependencies: ['Menu'],
    usage: 'high',
    description: 'Dropdown menus with submenus',
  },
  HoverCard: {
    complexity: 'medium',
    dependencies: ['Popover'],
    usage: 'medium',
    description: 'Hover-triggered card overlay',
  },
  Menubar: {
    complexity: 'medium',
    dependencies: ['Menu'],
    usage: 'low',
    description: 'Application menu bar',
  },
  Pagination: {
    complexity: 'medium',
    dependencies: ['Button'],
    usage: 'high',
    description: 'Page navigation controls',
  },
  Popover: {
    complexity: 'medium',
    dependencies: [],
    usage: 'high',
    description: 'Floating content overlay',
  },
  ScrollArea: {
    complexity: 'medium',
    dependencies: [],
    usage: 'high',
    description: 'Custom scrollbar styling',
  },
  Separator: {
    complexity: 'low',
    dependencies: [],
    usage: 'high',
    description: 'Visual content dividers',
  },
  Sheet: {
    complexity: 'medium',
    dependencies: ['Dialog'],
    usage: 'high',
    description: 'Slide-out panels',
  },

  // Feedback & Display
  AlertDialog: {
    complexity: 'medium',
    dependencies: ['Dialog'],
    usage: 'high',
    description: 'Confirmation and alert dialogs',
  },
  Skeleton: {
    complexity: 'low',
    dependencies: [],
    usage: 'high',
    description: 'Loading state placeholders',
  },
  Sonner: {
    complexity: 'medium',
    dependencies: [],
    usage: 'high',
    description: 'Modern toast notifications',
  },
  Tooltip: {
    complexity: 'low',
    dependencies: [],
    usage: 'high',
    description: 'Hover and focus tooltips',
  },

  // Data Display
  Table: {
    complexity: 'medium',
    dependencies: [],
    usage: 'high',
    description: 'Structured data tables',
  },

  // Advanced Components
  Chart: {
    complexity: 'high',
    dependencies: ['Recharts'],
    usage: 'medium',
    description: 'Data visualization charts',
  },
  Carousel: {
    complexity: 'medium',
    dependencies: ['Button'],
    usage: 'medium',
    description: 'Image and content carousels',
  },
  Resizable: {
    complexity: 'high',
    dependencies: [],
    usage: 'low',
    description: 'Resizable panels and layouts',
  },
};

// Get current Daedalus components
function getCurrentComponents() {
  const uiPath = 'src/components/ui';
  const components = [];

  if (!fs.existsSync(uiPath)) {
    return components;
  }

  const items = fs.readdirSync(uiPath);

  for (const item of items) {
    const itemPath = path.join(uiPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Check if it has a main component file
      const componentFile = path.join(itemPath, `${item}.tsx`);
      if (fs.existsSync(componentFile)) {
        components.push(item);
      }
    }
  }

  return components;
}

// Calculate component effectiveness score
function calculateEffectiveness(component, info, currentComponents) {
  let score = 0;

  // Usage frequency weight (40%)
  const usageWeight = {
    high: 40,
    medium: 25,
    low: 10,
  };
  score += usageWeight[info.usage] || 0;

  // Complexity weight - easier components get higher priority (30%)
  const complexityWeight = {
    low: 30,
    medium: 20,
    high: 10,
  };
  score += complexityWeight[info.complexity] || 0;

  // Dependency satisfaction (20%)
  let dependencySatisfied = 0;
  const totalDeps = info.dependencies.length;

  if (totalDeps === 0) {
    dependencySatisfied = 20; // No dependencies = full points
  } else {
    const satisfiedDeps = info.dependencies.filter(dep => currentComponents.includes(dep)).length;
    dependencySatisfied = Math.round((satisfiedDeps / totalDeps) * 20);
  }
  score += dependencySatisfied;

  // Foundation component bonus (10%)
  const foundationComponents = ['Label', 'Separator', 'Tooltip', 'Switch', 'Skeleton'];
  if (foundationComponents.includes(component)) {
    score += 10;
  }

  return score;
}

// Analyze and recommend next component
function analyzeNextComponent() {
  console.log('🔍 Analyzing Daedalus component inventory...');

  const currentComponents = getCurrentComponents();
  console.log(`\n📦 Current Daedalus Components (${currentComponents.length}):`);
  currentComponents.forEach(comp => console.log(`  ✅ ${comp}`));

  const missingComponents = Object.keys(SHADCN_COMPONENTS).filter(
    comp => !currentComponents.includes(comp)
  );

  console.log(`\n🎯 Missing shadcn Components (${missingComponents.length}):`);

  // Calculate effectiveness scores
  const recommendations = missingComponents
    .map(component => {
      const info = SHADCN_COMPONENTS[component];
      const score = calculateEffectiveness(component, info, currentComponents);

      return {
        component,
        score,
        ...info,
      };
    })
    .sort((a, b) => b.score - a.score);

  // Display top recommendations
  console.log(`\n🏆 Top 5 Recommendations:`);
  recommendations.slice(0, 5).forEach((rec, index) => {
    const deps =
      rec.dependencies.length > 0 ? ` (deps: ${rec.dependencies.join(', ')})` : ' (no deps)';

    console.log(`  ${index + 1}. ${rec.component} - Score: ${rec.score}/100`);
    console.log(`     ${rec.description}${deps}`);
    console.log(`     Complexity: ${rec.complexity}, Usage: ${rec.usage}`);
    console.log('');
  });

  // Return the top recommendation
  const topRecommendation = recommendations[0];
  console.log(`🚀 Selected: ${topRecommendation.component}`);
  console.log(`   Effectiveness Score: ${topRecommendation.score}/100`);
  console.log(`   Description: ${topRecommendation.description}`);
  console.log(`   Complexity: ${topRecommendation.complexity}`);
  console.log(`   Usage Priority: ${topRecommendation.usage}`);

  if (topRecommendation.dependencies.length > 0) {
    const satisfied = topRecommendation.dependencies.filter(dep => currentComponents.includes(dep));
    const missing = topRecommendation.dependencies.filter(dep => !currentComponents.includes(dep));

    if (satisfied.length > 0) {
      console.log(`   ✅ Dependencies Available: ${satisfied.join(', ')}`);
    }
    if (missing.length > 0) {
      console.log(`   ⚠️  Dependencies Needed: ${missing.join(', ')}`);
    }
  } else {
    console.log(`   ✅ No dependencies required`);
  }

  return topRecommendation;
}

// Generate component implementation plan
function generateImplementationPlan(recommendation) {
  console.log(`\n📋 Implementation Plan for ${recommendation.component}:`);

  const steps = [
    '1. 🏗️  Create folder-per-component structure',
    '2. 📦 Install shadcn component via CLI',
    '3. 🎨 Enhance with CVA variants and Daedalus styling',
    '4. 🔧 Add enterprise features (loading states, error handling)',
    '5. 📝 Create comprehensive TypeScript interfaces',
    '6. 🧪 Generate 25+ comprehensive tests',
    '7. 📚 Create interactive Storybook stories',
    '8. ♿ Ensure WCAG accessibility compliance',
    '9. 📖 Update component registry and documentation',
    '10. 🚀 Integrate into component showcase',
  ];

  steps.forEach(step => console.log(`   ${step}`));

  console.log(`\n⏱️  Estimated Complexity: ${recommendation.complexity}`);
  console.log(`📈 Usage Priority: ${recommendation.usage}`);
  console.log(`🎯 Effectiveness Score: ${recommendation.score}/100`);

  return {
    component: recommendation.component,
    plan: steps,
    complexity: recommendation.complexity,
    description: recommendation.description,
  };
}

// Main execution function
export function shadNext() {
  console.log('🎯 SHADCN NEXT - Intelligent Component Selection\n');
  console.log('================================================\n');

  try {
    // Step 1: Analyze current state
    const recommendation = analyzeNextComponent();

    // Step 2: Generate implementation plan
    const plan = generateImplementationPlan(recommendation);

    // Step 3: Return recommendation for execution
    return {
      success: true,
      recommendation: recommendation.component,
      score: recommendation.score,
      complexity: recommendation.complexity,
      description: recommendation.description,
      dependencies: recommendation.dependencies,
      plan,
    };
  } catch (error) {
    console.error('❌ Error in shadcn analysis:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Command line execution
if (process.argv[1].endsWith('shadcn-analyzer.js')) {
  const result = shadNext();
  if (result.success) {
    console.log(`\n✅ Recommendation: ${result.recommendation}`);
    console.log(`📊 Effectiveness Score: ${result.score}/100`);
  } else {
    console.error(`\n❌ Failed: ${result.error}`);
    process.exit(1);
  }
}

const shadcnAnalyzer = { shadNext, SHADCN_COMPONENTS };
export default shadcnAnalyzer;
