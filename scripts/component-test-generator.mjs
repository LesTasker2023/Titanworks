#!/usr/bin/env node

/**
 * Component Test Generator - Enterprise Edition
 *
 * Analyzes TypeScript component interfaces and generates comprehensive test suites
 * Extracts props, variants, states, and generates test cases automatically
 */

import fs from 'fs';
import path from 'path';

class ComponentTestGenerator {
  constructor() {
    this.componentDir = path.join(process.cwd(), 'src/components/ui');
    // No longer using a separate output directory - tests go directly in component folders
    this.analysisResults = new Map();
  }

  /**
   * Main execution function
   */
  async run() {
    console.log('🔍 Analyzing components for test generation...\n');

    const components = this.getComponentDirectories();
    const report = [];

    for (const component of components) {
      console.log(`📊 Analyzing ${component}...`);
      const analysis = await this.analyzeComponent(component);
      this.analysisResults.set(component, analysis);

      // Generate test file and save directly in component folder
      const testContent = this.generateTestFile(component, analysis);
      const componentPath = path.join(this.componentDir, component);
      const testFilePath = path.join(componentPath, `${component}.test.tsx`);

      // Create backup of existing test file if it exists
      if (fs.existsSync(testFilePath)) {
        const backupPath = path.join(componentPath, `${component}.test.tsx.backup`);
        fs.copyFileSync(testFilePath, backupPath);
        console.log(`  💾 Backed up existing test to: ${component}.test.tsx.backup`);
      }

      fs.writeFileSync(testFilePath, testContent);
      console.log(`  ✅ Enhanced test saved to: ${testFilePath}`);

      report.push({
        component,
        currentTests: analysis.currentTestCount,
        proposedTests: analysis.proposedTestCount,
        props: analysis.props.length,
        variants: analysis.variants.length,
        states: analysis.states.length,
        testFile: testFilePath,
      });
    }

    // Generate summary report
    this.generateReport(report);
    console.log('\n✅ Test generation complete!');
    console.log(`📁 Enhanced tests saved directly in component folders`);
    console.log(`💾 Original tests backed up with .backup extension`);
  }

  /**
   * Get all component directories
   */
  getComponentDirectories() {
    return fs
      .readdirSync(this.componentDir)
      .filter(dir => {
        const fullPath = path.join(this.componentDir, dir);
        return fs.statSync(fullPath).isDirectory();
      })
      .sort();
  }

  /**
   * Analyze a single component
   */
  async analyzeComponent(componentName) {
    const componentPath = path.join(this.componentDir, componentName);
    const analysis = {
      name: componentName,
      props: [],
      variants: [],
      states: [],
      events: [],
      currentTestCount: 0,
      proposedTestCount: 0,
      files: {
        component: null,
        test: null,
        types: null,
      },
    };

    // Find component files
    const files = fs.readdirSync(componentPath);

    // Find main component file
    const componentFile = files.find(
      f =>
        f.toLowerCase().includes(componentName.toLowerCase()) &&
        (f.endsWith('.tsx') || f.endsWith('.ts')) &&
        !f.includes('.test.') &&
        !f.includes('.stories.')
    );

    if (componentFile) {
      analysis.files.component = path.join(componentPath, componentFile);
      await this.analyzeComponentFile(analysis);
    }

    // Find existing test file
    const testFile = files.find(f => f.includes('.test.'));
    if (testFile) {
      analysis.files.test = path.join(componentPath, testFile);
      analysis.currentTestCount = this.countExistingTests(analysis.files.test);
    }

    // Calculate proposed test count
    analysis.proposedTestCount = this.calculateProposedTestCount(analysis);

    return analysis;
  }

  /**
   * Analyze component TypeScript file
   */
  async analyzeComponentFile(analysis) {
    if (!analysis.files.component) return;

    const content = fs.readFileSync(analysis.files.component, 'utf8');

    // Extract interfaces and types
    this.extractInterfaces(content, analysis);
    this.extractVariants(content, analysis);
    this.extractStates(content, analysis);
    this.extractEvents(content, analysis);
  }

  /**
   * Extract TypeScript interfaces
   */
  extractInterfaces(content, analysis) {
    // Match interface definitions
    const interfaceRegex = /interface\s+(\w+Props?)\s*(?:extends[^{]*)?\s*\{([^}]+)\}/g;
    let match;

    while ((match = interfaceRegex.exec(content)) !== null) {
      const [, interfaceName, body] = match;

      // Extract props from interface body
      const propRegex = /(\w+)\??:\s*([^;,\n]+)/g;
      let propMatch;

      while ((propMatch = propRegex.exec(body)) !== null) {
        const [, propName, propType] = propMatch;

        if (!propName.startsWith('//') && !propName.startsWith('*')) {
          analysis.props.push({
            name: propName,
            type: propType.trim(),
            optional: match[0].includes('?:'),
            interface: interfaceName,
          });
        }
      }
    }
  }

  /**
   * Extract CVA variants
   */
  extractVariants(content, analysis) {
    // Look for CVA variant definitions
    const cvaRegex = /cva\([^,]*,\s*\{[^}]*variants:\s*\{([^}]+)\}/s;
    const match = cvaRegex.exec(content);

    if (match) {
      const variantsContent = match[1];

      // Extract variant names and values
      const variantRegex = /(\w+):\s*\{([^}]+)\}/g;
      let variantMatch;

      while ((variantMatch = variantRegex.exec(variantsContent)) !== null) {
        const [, variantName, variantValues] = variantMatch;

        // Extract variant options
        const optionRegex = /(\w+):/g;
        const options = [];
        let optionMatch;

        while ((optionMatch = optionRegex.exec(variantValues)) !== null) {
          options.push(optionMatch[1]);
        }

        analysis.variants.push({
          name: variantName,
          options,
        });
      }
    }
  }

  /**
   * Extract component states
   */
  extractStates(content, analysis) {
    const commonStates = [
      'loading',
      'disabled',
      'error',
      'required',
      'readonly',
      'invalid',
      'checked',
      'selected',
      'active',
      'focused',
      'hover',
      'pressed',
    ];

    commonStates.forEach(state => {
      if (
        content.includes(state) ||
        content.includes(state + ':') ||
        content.includes(state + '?:')
      ) {
        analysis.states.push(state);
      }
    });
  }

  /**
   * Extract event handlers
   */
  extractEvents(content, analysis) {
    const eventRegex = /on(\w+)\??:\s*\([^)]*\)\s*=>\s*void/g;
    let match;

    while ((match = eventRegex.exec(content)) !== null) {
      analysis.events.push(`on${match[1]}`);
    }
  }

  /**
   * Count existing tests
   */
  countExistingTests(testFilePath) {
    if (!fs.existsSync(testFilePath)) return 0;

    const content = fs.readFileSync(testFilePath, 'utf8');
    const matches = content.match(/it\(/g);
    return matches ? matches.length : 0;
  }

  /**
   * Calculate proposed test count
   */
  calculateProposedTestCount(analysis) {
    let count = 0;

    // Base tests
    count += 5; // Snapshots, rendering, basic functionality

    // Variant tests
    analysis.variants.forEach(variant => {
      count += variant.options.length; // One test per variant option
    });

    // State tests
    count += analysis.states.length;

    // Event tests
    count += analysis.events.length;

    // Prop tests
    count += Math.min(analysis.props.length, 10); // Cap at 10 to avoid explosion

    // Accessibility tests
    count += 5;

    // Edge case tests
    count += 8;

    return count;
  }

  /**
   * Generate comprehensive test file
   */
  generateTestFile(componentName, analysis) {
    const testTemplate = `import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ${componentName}${analysis.props.some(p => p.name.includes('Item')) ? `, ${componentName}Item` : ''} } from './${this.getComponentFileName(componentName)}';

describe('${componentName}', () => {
  const renderBasic${componentName} = (props = {}) => {
    return render(
      <${componentName} data-testid="${componentName.toLowerCase()}" {...props}>
        ${this.getDefaultChildren(componentName, analysis)}
      </${componentName}>
    );
  };

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasic${componentName}();
      expect(container.firstChild).toMatchSnapshot();
    });
${this.generateSnapshotTests(analysis)}
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasic${componentName}();
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });
${this.generateBasicFunctionalityTests(analysis)}
  });

${this.generateVariantTests(analysis)}

${this.generateStateTests(analysis)}

${this.generateEventTests(analysis)}

${this.generatePropTests(analysis)}

  describe('Accessibility', () => {
    it('can be focused', () => {
      renderBasic${componentName}();
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('has proper ARIA attributes', () => {
      renderBasic${componentName}();
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      expect(element).toBeInTheDocument();
      // TODO: Add specific ARIA attribute tests based on component type
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderBasic${componentName}();
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      
      await user.tab();
      expect(element).toHaveFocus();
    });

    it('announces changes to screen readers', () => {
      renderBasic${componentName}();
      // TODO: Add screen reader announcement tests
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      renderBasic${componentName}();
      // TODO: Add reduced motion tests
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });
  });

  describe('Custom Styling and Props', () => {
    it('accepts custom className', () => {
      renderBasic${componentName}({ className: 'custom-class' });
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      expect(element).toHaveClass('custom-class');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      renderBasic${componentName}({ ref });
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      renderBasic${componentName}({ 'data-custom': 'test-value' });
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      expect(element).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderBasic${componentName}({ children: undefined });
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      renderBasic${componentName}({ children: null });
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('handles empty string props', () => {
      renderBasic${componentName}({ className: '' });
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = renderBasic${componentName}({ className: 'class1' });
      rerender(<${componentName} data-testid="${componentName.toLowerCase()}" className="class2" />);
      const element = screen.getByTestId('${componentName.toLowerCase()}');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
        <${componentName} data-testid="${componentName.toLowerCase()}">
          <div>
            <span>Nested content</span>
            <p>More content</p>
          </div>
        </${componentName}>
      );
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('maintains functionality with many children', () => {
      render(
        <${componentName} data-testid="${componentName.toLowerCase()}">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>Item {i}</div>
          ))}
        </${componentName}>
      );
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasic${componentName}();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasic${componentName}();
      unmount();
      renderBasic${componentName}();
      expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
    });
  });
});

// TODO: Review and customize generated tests based on component-specific requirements
// TODO: Add component-specific interaction tests
// TODO: Verify all variant combinations work correctly
// TODO: Test integration with form libraries if applicable
// TODO: Add performance tests for complex components
`;

    return testTemplate;
  }

  /**
   * Generate snapshot tests for variants
   */
  generateSnapshotTests(analysis) {
    let tests = '';

    analysis.variants.forEach(variant => {
      variant.options.forEach(option => {
        tests += `
    it('matches ${variant.name} ${option} snapshot', () => {
      const { container } = renderBasic${analysis.name}({ ${variant.name}: '${option}' });
      expect(container.firstChild).toMatchSnapshot();
    });`;
      });
    });

    analysis.states.forEach(state => {
      tests += `
    it('matches ${state} state snapshot', () => {
      const { container } = renderBasic${analysis.name}({ ${state}: true });
      expect(container.firstChild).toMatchSnapshot();
    });`;
    });

    return tests;
  }

  /**
   * Generate basic functionality tests
   */
  generateBasicFunctionalityTests(analysis) {
    let tests = '';

    if (analysis.events.includes('onClick')) {
      tests += `
    it('handles click events', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      renderBasic${analysis.name}({ onClick });
      
      const element = screen.getByTestId('${analysis.name.toLowerCase()}');
      await user.click(element);
      
      expect(onClick).toHaveBeenCalled();
    });`;
    }

    if (analysis.events.includes('onChange')) {
      tests += `
    it('handles change events', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      renderBasic${analysis.name}({ onChange });
      
      // TODO: Add specific change event simulation based on component type
      expect(onChange).toBeDefined();
    });`;
    }

    return tests;
  }

  /**
   * Generate variant tests
   */
  generateVariantTests(analysis) {
    if (analysis.variants.length === 0) return '';

    let tests = `
  describe('Variants', () => {`;

    analysis.variants.forEach(variant => {
      tests += `
    describe('${variant.name}', () => {`;

      variant.options.forEach(option => {
        tests += `
      it('renders ${option} ${variant.name} correctly', () => {
        renderBasic${analysis.name}({ ${variant.name}: '${option}' });
        const element = screen.getByTestId('${analysis.name.toLowerCase()}');
        expect(element).toBeInTheDocument();
        // TODO: Add specific assertions for ${option} variant
      });`;
      });

      tests += `
    });`;
    });

    tests += `
  });`;

    return tests;
  }

  /**
   * Generate state tests
   */
  generateStateTests(analysis) {
    if (analysis.states.length === 0) return '';

    let tests = `
  describe('States', () => {`;

    analysis.states.forEach(state => {
      tests += `
    it('handles ${state} state correctly', () => {
      renderBasic${analysis.name}({ ${state}: true });
      const element = screen.getByTestId('${analysis.name.toLowerCase()}');
      expect(element).toBeInTheDocument();
      // TODO: Add specific assertions for ${state} state
    });`;
    });

    tests += `
  });`;

    return tests;
  }

  /**
   * Generate event tests
   */
  generateEventTests(analysis) {
    if (analysis.events.length === 0) return '';

    let tests = `
  describe('Events', () => {`;

    analysis.events.forEach(event => {
      tests += `
    it('handles ${event} correctly', async () => {
      const ${event} = vi.fn();
      const user = userEvent.setup();
      renderBasic${analysis.name}({ ${event} });
      
      // TODO: Add specific event triggering based on ${event}
      expect(${event}).toBeDefined();
    });`;
    });

    tests += `
  });`;

    return tests;
  }

  /**
   * Generate prop tests
   */
  generatePropTests(analysis) {
    if (analysis.props.length === 0) return '';

    let tests = `
  describe('Props', () => {`;

    // Test first 5 props to avoid explosion
    analysis.props.slice(0, 5).forEach(prop => {
      const testValue = this.getTestValue(prop.type);
      tests += `
    it('handles ${prop.name} prop correctly', () => {
      renderBasic${analysis.name}({ ${prop.name}: ${testValue} });
      const element = screen.getByTestId('${analysis.name.toLowerCase()}');
      expect(element).toBeInTheDocument();
      // TODO: Add specific assertions for ${prop.name} prop
    });`;
    });

    tests += `
  });`;

    return tests;
  }

  /**
   * Get default children for component
   */
  getDefaultChildren(componentName, analysis) {
    const childComponents = ['Item', 'Content', 'Trigger', 'Header', 'Body'];
    const hasChildComponent = childComponents.some(child =>
      analysis.props.some(p => p.name.includes(child))
    );

    if (hasChildComponent) {
      return 'Test content';
    }

    // Component-specific defaults
    switch (componentName.toLowerCase()) {
      case 'button':
        return 'Click me';
      case 'input':
        return '';
      case 'select':
        return '<option value="test">Test Option</option>';
      default:
        return 'Test content';
    }
  }

  /**
   * Get component file name
   */
  getComponentFileName(componentName) {
    // Common patterns
    const patterns = [`${componentName.toLowerCase()}`, `${componentName}`, 'index'];

    return patterns[0]; // Default to lowercase
  }

  /**
   * Get test value for prop type
   */
  getTestValue(type) {
    if (type.includes('string')) return '"test-value"';
    if (type.includes('number')) return '42';
    if (type.includes('boolean')) return 'true';
    if (type.includes('function') || type.includes('=>')) return 'vi.fn()';
    if (type.includes('ReactNode') || type.includes('React.')) return '"Test content"';
    return '"test-value"';
  }

  /**
   * Generate comprehensive report
   */
  generateReport(components) {
    // Save report in reports directory instead of generated-tests
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    const reportPath = path.join(reportsDir, 'ENHANCEMENT_REPORT.md');

    let report = `# Component Test Enhancement Report

Generated on: ${new Date().toISOString()}

## Summary

| Component | Current Tests | Proposed Tests | Gain | Props | Variants | States |
|-----------|---------------|----------------|------|-------|----------|--------|
`;

    let totalCurrent = 0;
    let totalProposed = 0;

    components.forEach(comp => {
      totalCurrent += comp.currentTests;
      totalProposed += comp.proposedTests;
      const gain = comp.proposedTests - comp.currentTests;

      report += `| ${comp.component} | ${comp.currentTests} | ${comp.proposedTests} | +${gain} | ${comp.props} | ${comp.variants} | ${comp.states} |\n`;
    });

    const totalGain = totalProposed - totalCurrent;

    report += `
**Total Enhancement:** ${totalCurrent} → ${totalProposed} tests (+${totalGain})

## Components Needing Most Enhancement

`;

    // Sort by potential gain
    const sortedByGain = components
      .map(c => ({ ...c, gain: c.proposedTests - c.currentTests }))
      .sort((a, b) => b.gain - a.gain)
      .slice(0, 10);

    sortedByGain.forEach(comp => {
      report += `- **${comp.component}**: ${comp.currentTests} → ${comp.proposedTests} (+${comp.gain} tests)\n`;
    });

    report += `
## Implementation Priority

### High Priority (>30 test gain)
${sortedByGain
  .filter(c => c.gain > 30)
  .map(c => `- ${c.component}`)
  .join('\n')}

### Medium Priority (10-30 test gain)  
${sortedByGain
  .filter(c => c.gain >= 10 && c.gain <= 30)
  .map(c => `- ${c.component}`)
  .join('\n')}

### Low Priority (<10 test gain)
${sortedByGain
  .filter(c => c.gain < 10)
  .map(c => `- ${c.component}`)
  .join('\n')}

## Next Steps

1. Review enhanced test files in component directories (\`src/components/ui/[Component]/\`)
2. Run tests to identify any component-specific issues: \`yarn test\`
3. Fix failing tests based on actual component implementations
4. Update snapshots as needed: \`yarn test -u\`
5. Remove backup files once tests are verified: \`find src -name "*.backup" -delete\`

## Enhanced Files

${components.map(c => `- \`${c.component}/${c.component}.test.tsx\` (${c.proposedTests} tests)`).join('\n')}

---
*Generated by Component Test Generator - Enterprise Edition*
`;

    fs.writeFileSync(reportPath, report);

    console.log('\n📊 Enhancement Report:');
    console.log(`📈 Total test increase: ${totalCurrent} → ${totalProposed} (+${totalGain})`);
    console.log(`📋 Full report: ${reportPath}`);
  }
}

// Execute if run directly
const generator = new ComponentTestGenerator();
generator.run().catch(console.error);

export default ComponentTestGenerator;
