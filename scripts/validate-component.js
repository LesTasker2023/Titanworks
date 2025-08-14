#!/usr/bin/env node

/**
 * 🎯 Component Style Guide Validator
 * 
 * This script validates that components follow our style guide standards.
 * Run this before shipping any component to ensure consistency.
 */

const fs = require('fs');
const path = require('path');

class StyleGuideValidator {
  constructor(componentPath) {
    this.componentPath = componentPath;
    this.componentName = path.basename(componentPath);
    this.errors = [];
    this.warnings = [];
    this.score = 0;
    this.maxScore = 100;
  }

  /**
   * Run all validation checks
   */
  validate() {
    console.log(`🔍 Validating ${this.componentName} against style guide...`);
    
    this.validateFileStructure();
    this.validateComponentInterface();
    this.validateVariants();
    this.validateStates();
    this.validateAccessibility();
    this.validateTesting();
    this.validateDocumentation();
    this.validateStyling();
    
    this.generateReport();
    return this.score >= 80; // Pass threshold
  }

  /**
   * Validate required file structure
   */
  validateFileStructure() {
    const requiredFiles = [
      'index.tsx',
      `${this.componentName.toLowerCase()}.tsx`,
      `${this.componentName}.stories.tsx`,
      `${this.componentName}.test.tsx`
    ];

    let structureScore = 0;
    
    requiredFiles.forEach(file => {
      const filePath = path.join(this.componentPath, file);
      if (fs.existsSync(filePath)) {
        structureScore += 5;
      } else {
        this.errors.push(`❌ Missing required file: ${file}`);
      }
    });

    // Check for README.md (optional but recommended)
    const readmePath = path.join(this.componentPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      structureScore += 5;
    } else {
      this.warnings.push(`⚠️  Missing README.md (recommended)`);
    }

    this.score += Math.min(structureScore, 25);
    console.log(`📁 File Structure: ${structureScore}/25`);
  }

  /**
   * Validate component interface follows standards
   */
  validateComponentInterface() {
    const mainFile = this.getMainComponentFile();
    if (!mainFile) {
      this.errors.push(`❌ Cannot find main component file`);
      return;
    }

    const content = fs.readFileSync(mainFile, 'utf8');
    let interfaceScore = 0;

    // Check for CVA usage
    if (content.includes('cva') && content.includes('VariantProps')) {
      interfaceScore += 5;
    } else {
      this.errors.push(`❌ Component must use CVA for variant management`);
    }

    // Check for required variant types
    const requiredVariants = ['variant', 'size'];
    requiredVariants.forEach(variant => {
      if (content.includes(`${variant}:`)) {
        interfaceScore += 3;
      } else {
        this.errors.push(`❌ Missing required variant: ${variant}`);
      }
    });

    // Check for standard props
    const requiredProps = ['loading', 'disabled', 'className'];
    requiredProps.forEach(prop => {
      if (content.includes(`${prop}?:`) || content.includes(`${prop}:`)) {
        interfaceScore += 2;
      } else {
        this.warnings.push(`⚠️  Missing recommended prop: ${prop}`);
      }
    });

    // Check for forwardRef
    if (content.includes('forwardRef')) {
      interfaceScore += 3;
    } else {
      this.errors.push(`❌ Component must use forwardRef for proper ref handling`);
    }

    this.score += Math.min(interfaceScore, 20);
    console.log(`⚙️  Component Interface: ${interfaceScore}/20`);
  }

  /**
   * Validate required variants are implemented
   */
  validateVariants() {
    const mainFile = this.getMainComponentFile();
    if (!mainFile) return;

    const content = fs.readFileSync(mainFile, 'utf8');
    let variantScore = 0;

    // Required color variants
    const colorVariants = ['default', 'success', 'warning', 'danger'];
    colorVariants.forEach(variant => {
      if (content.includes(`${variant}:`)) {
        variantScore += 2;
      } else {
        this.errors.push(`❌ Missing required color variant: ${variant}`);
      }
    });

    // Required size variants
    const sizeVariants = ['sm', 'default', 'lg', 'xl'];
    sizeVariants.forEach(variant => {
      if (content.includes(`${variant}:`)) {
        variantScore += 2;
      } else {
        this.errors.push(`❌ Missing required size variant: ${variant}`);
      }
    });

    this.score += Math.min(variantScore, 16);
    console.log(`🎨 Variants: ${variantScore}/16`);
  }

  /**
   * Validate component states
   */
  validateStates() {
    const mainFile = this.getMainComponentFile();
    if (!mainFile) return;

    const content = fs.readFileSync(mainFile, 'utf8');
    let stateScore = 0;

    // Required states
    const requiredStates = ['loading', 'disabled'];
    requiredStates.forEach(state => {
      if (content.includes(state) && content.includes(`${state} =`)) {
        stateScore += 4;
      } else {
        this.errors.push(`❌ Missing required state handling: ${state}`);
      }
    });

    // Check for loading state implementation
    if (content.includes('loading') && content.includes('spinner')) {
      stateScore += 4;
    } else {
      this.warnings.push(`⚠️  Loading state should show spinner`);
    }

    this.score += Math.min(stateScore, 12);
    console.log(`🚦 States: ${stateScore}/12`);
  }

  /**
   * Validate accessibility implementation
   */
  validateAccessibility() {
    const mainFile = this.getMainComponentFile();
    if (!mainFile) return;

    const content = fs.readFileSync(mainFile, 'utf8');
    let a11yScore = 0;

    // ARIA attributes
    const ariaAttributes = ['aria-label', 'aria-disabled', 'role'];
    ariaAttributes.forEach(attr => {
      if (content.includes(attr)) {
        a11yScore += 2;
      }
    });

    // Keyboard support
    if (content.includes('onKeyDown') || content.includes('tabIndex')) {
      a11yScore += 3;
    } else {
      this.warnings.push(`⚠️  Consider adding keyboard support`);
    }

    // Focus management
    if (content.includes('focus') || content.includes('Focus')) {
      a11yScore += 3;
    }

    this.score += Math.min(a11yScore, 12);
    console.log(`♿ Accessibility: ${a11yScore}/12`);
  }

  /**
   * Validate testing coverage
   */
  validateTesting() {
    const testFile = path.join(this.componentPath, `${this.componentName}.test.tsx`);
    if (!fs.existsSync(testFile)) {
      this.errors.push(`❌ Missing test file`);
      return;
    }

    const content = fs.readFileSync(testFile, 'utf8');
    let testScore = 0;

    // Required test categories
    const testCategories = ['Rendering', 'Variants', 'Events', 'Enhanced Features', 'Edge Cases'];
    testCategories.forEach(category => {
      if (content.includes(category)) {
        testScore += 2;
      } else {
        this.warnings.push(`⚠️  Missing test category: ${category}`);
      }
    });

    // Count test cases (rough estimate)
    const testCount = (content.match(/it\(/g) || []).length;
    if (testCount >= 30) {
      testScore += 5;
    } else if (testCount >= 20) {
      testScore += 3;
    } else {
      this.warnings.push(`⚠️  Consider adding more tests (current: ${testCount}, target: 30+)`);
    }

    this.score += Math.min(testScore, 15);
    console.log(`🧪 Testing: ${testScore}/15 (${testCount} test cases)`);
  }

  /**
   * Validate documentation
   */
  validateDocumentation() {
    const storiesFile = path.join(this.componentPath, `${this.componentName}.stories.tsx`);
    if (!fs.existsSync(storiesFile)) {
      this.errors.push(`❌ Missing stories file`);
      return;
    }

    const content = fs.readFileSync(storiesFile, 'utf8');
    let docScore = 0;

    // Required story types
    const storyTypes = ['Default', 'AllVariants', 'AllSizes', 'LoadingState', 'DisabledState'];
    storyTypes.forEach(story => {
      if (content.includes(story)) {
        docScore += 2;
      } else {
        this.warnings.push(`⚠️  Missing story type: ${story}`);
      }
    });

    this.score += Math.min(docScore, 10);
    console.log(`📚 Documentation: ${docScore}/10`);
  }

  /**
   * Validate styling follows design tokens
   */
  validateStyling() {
    const mainFile = this.getMainComponentFile();
    if (!mainFile) return;

    const content = fs.readFileSync(mainFile, 'utf8');
    let styleScore = 0;

    // Check for consistent class naming
    if (content.includes('cn(') || content.includes('clsx(')) {
      styleScore += 2;
    }

    // Check for design token usage (hsl colors)
    if (content.includes('hsl(') || content.includes('var(--')) {
      styleScore += 2;
    } else {
      this.warnings.push(`⚠️  Consider using design tokens for colors`);
    }

    // Check for responsive classes
    if (content.includes('sm:') || content.includes('md:') || content.includes('lg:')) {
      styleScore += 2;
    }

    this.score += Math.min(styleScore, 6);
    console.log(`🎨 Styling: ${styleScore}/6`);
  }

  /**
   * Get the main component file path
   */
  getMainComponentFile() {
    const possibleNames = [
      `${this.componentName.toLowerCase()}.tsx`,
      `${this.componentName}.tsx`,
      'index.tsx'
    ];

    for (const name of possibleNames) {
      const filePath = path.join(this.componentPath, name);
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }

    return null;
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('\n📊 VALIDATION REPORT');
    console.log('='.repeat(50));
    
    const percentage = Math.round((this.score / this.maxScore) * 100);
    console.log(`📈 Overall Score: ${this.score}/${this.maxScore} (${percentage}%)`);
    
    // Grade assignment
    let grade, emoji;
    if (percentage >= 90) {
      grade = 'A+'; emoji = '🏆';
    } else if (percentage >= 80) {
      grade = 'A'; emoji = '✅';
    } else if (percentage >= 70) {
      grade = 'B'; emoji = '⚠️';
    } else if (percentage >= 60) {
      grade = 'C'; emoji = '😐';
    } else {
      grade = 'F'; emoji = '❌';
    }
    
    console.log(`${emoji} Grade: ${grade}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (Must Fix):');
      this.errors.forEach(error => console.log(`  ${error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (Recommended):');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    console.log('\n🎯 NEXT STEPS:');
    if (percentage >= 80) {
      console.log('  ✅ Component meets style guide standards!');
      console.log('  🚀 Ready to ship!');
    } else {
      console.log('  🔧 Fix errors above before shipping');
      console.log('  📖 Review style guide: docs/COMPONENT_STYLE_GUIDE.md');
      console.log(`  🎯 Target: 80% (current: ${percentage}%)`);
    }
    
    console.log('\n' + '='.repeat(50));
  }
}

/**
 * CLI Usage
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node validate-component.js <component-path>');
    console.log('Example: node validate-component.js src/components/ui/Button');
    process.exit(1);
  }
  
  const componentPath = args[0];
  
  if (!fs.existsSync(componentPath)) {
    console.error(`❌ Component path not found: ${componentPath}`);
    process.exit(1);
  }
  
  const validator = new StyleGuideValidator(componentPath);
  const passed = validator.validate();
  
  process.exit(passed ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { StyleGuideValidator };
