# 📦 Repository Setup & Architecture

_Master the foundation: Understanding how TriggerKings is structured for enterprise-scale development_

---

## 🎯 What You'll Learn

- Complete repository architecture understanding
- Development environment setup
- Core dependencies and their purposes
- Build system configuration
- Quality tooling integration

---

## 🏗️ Architecture Overview

TriggerKings follows **enterprise-grade patterns** designed for scalability, maintainability, and developer experience.

### **🎨 Design Philosophy**

```typescript
// Our core principles
const PRINCIPLES = {
  consistency: 'CVA patterns everywhere',
  quality: '100% test coverage + quality gates',
  performance: 'Optimized for scale',
  dx: 'Developer experience first',
  accessibility: 'WCAG 2.1 AA compliance',
  typescript: 'Type-safe everything',
} as const;
```

---

## 📁 Project Structure

```
triggerkings/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 component-showcase/ # Live component demo
│   │   ├── globals.css           # Global styles
│   │   └── layout.tsx            # Root layout
│   ├── 📁 components/
│   │   └── 📁 ui/                # Core component library
│   │       ├── 📁 Button/        # Folder-per-component
│   │       │   ├── index.tsx     # Clean exports
│   │       │   ├── button.tsx    # Main component
│   │       │   ├── Button.test.tsx    # Comprehensive tests
│   │       │   ├── Button.stories.tsx # Storybook stories
│   │       │   └── README.md     # Component docs
│   │       ├── 📁 Dialog/
│   │       ├── 📁 DataTable/
│   │       └── index.tsx         # Library exports
│   └── 📁 lib/
│       └── utils.ts              # Shared utilities
├── 📁 docs/
│   ├── 📁 tutorials/             # This tutorial series
│   └── VALIDATION.md            # Quality standards
├── 📁 scripts/
│   └── deductive-audit.ps1      # Quality automation
├── 📁 reports/                  # Quality reports
├── ⚙️  next.config.ts           # Next.js config
├── ⚙️  package.json             # Dependencies & scripts
├── ⚙️  tsconfig.json            # TypeScript config
├── ⚙️  eslint.config.mjs        # Linting rules
└── ⚙️  vitest.config.ts         # Test configuration
```

---

## 🚀 Quick Setup

### **1. Prerequisites**

```bash
# Required versions
node --version  # v18.0.0+
yarn --version  # v1.22.0+
git --version   # v2.40.0+

# Recommended VS Code extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
```

### **2. Clone & Install**

```bash
# Clone the repository
git clone https://github.com/LesTasker2023/triggerkings.git
cd triggerkings

# Install dependencies (uses Yarn for consistency)
yarn install

# Verify setup
yarn build    # Should complete without errors
yarn test     # Should pass all tests
yarn lint     # Should have no issues
```

### **3. Development Server**

```bash
# Start Next.js development server
yarn dev
# ✅ Ready on http://localhost:3000

# Start Storybook (separate terminal)
yarn storybook
# ✅ Ready on http://localhost:6006

# Run quality audit
yarn quality-audit
# ✅ Should show 100/100 quality score
```

---

## 📦 Core Dependencies

### **🏗️ Framework & Build**

```json
{
  "next": "^15.0.0", // React framework with App Router
  "react": "^18.0.0", // UI library
  "typescript": "^5.0.0", // Type safety
  "tailwindcss": "^3.4.0" // Utility-first CSS
}
```

**Why these choices?**

- **Next.js 15**: Latest features, App Router, excellent DX
- **React 18**: Concurrent features, better performance
- **TypeScript**: Catches bugs at compile time
- **Tailwind**: Consistent design system, excellent performance

### **🎨 Component Architecture**

```json
{
  "class-variance-authority": "^0.7.0", // Component variants
  "@radix-ui/react-*": "^1.0.0", // Accessible primitives
  "lucide-react": "^0.400.0", // Consistent icons
  "clsx": "^2.0.0" // Conditional classes
}
```

**Why CVA?**

```typescript
// Before CVA (inconsistent)
const buttonClass = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${size === 'lg' ? 'btn-lg' : ''}`;

// With CVA (consistent, type-safe)
const buttonVariants = cva('btn', {
  variants: {
    variant: { primary: 'btn-primary', secondary: 'btn-secondary' },
    size: { sm: 'btn-sm', lg: 'btn-lg' },
  },
});
```

### **🧪 Testing Stack**

```json
{
  "vitest": "^1.0.0", // Fast test runner
  "@testing-library/react": "^14.0.0", // Component testing
  "@testing-library/jest-dom": "^6.0.0", // Better assertions
  "jsdom": "^23.0.0" // DOM simulation
}
```

**Why Vitest over Jest?**

- **Speed**: 10x faster test execution
- **ES Modules**: Native support, no transpilation
- **TypeScript**: Built-in support
- **Watch Mode**: Instant feedback

### **📖 Documentation & Stories**

```json
{
  "@storybook/react": "^8.0.0", // Component documentation
  "@storybook/addon-essentials": "^8.0.0" // Core addons
}
```

---

## ⚙️ Configuration Deep Dive

### **🔧 TypeScript Configuration**

```typescript
// tsconfig.json - Key settings explained
{
  "compilerOptions": {
    "strict": true,                 // Maximum type safety
    "noUncheckedIndexedAccess": true, // Prevent undefined array access
    "exactOptionalPropertyTypes": true, // Stricter optional props
    "baseUrl": ".",                 // Absolute imports
    "paths": {
      "@/*": ["./src/*"]           // Clean import paths
    }
  }
}
```

### **🎨 Tailwind Configuration**

```javascript
// tailwind.config.js - Design system
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Scan all components
  theme: {
    extend: {
      colors: {
        // Custom color system
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        success: 'hsl(var(--success))', // CVA variant colors
        warning: 'hsl(var(--warning))',
        destructive: 'hsl(var(--destructive))',
      },
    },
  },
};
```

### **🧪 Test Configuration**

```typescript
// vitest.config.ts - Optimized for component testing
export default defineConfig({
  test: {
    environment: 'jsdom', // DOM simulation
    setupFiles: './src/test-setup.ts', // Global test setup
    globals: true, // Global expect, describe, it
    coverage: {
      threshold: {
        // Quality gates
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

---

## 🔄 Development Workflow

### **📝 Daily Development**

```bash
# Morning routine
yarn dev          # Start development server
yarn test --watch # Continuous testing
yarn storybook    # Component playground

# Before committing
yarn build        # Verify build works
yarn lint --fix   # Auto-fix issues
yarn quality-audit # Check component quality
```

### **🎯 Component Development Cycle**

```bash
# 1. Create component structure
mkdir src/components/ui/MyComponent
cd src/components/ui/MyComponent

# 2. Create core files
touch index.tsx MyComponent.tsx MyComponent.test.tsx MyComponent.stories.tsx

# 3. Develop with TDD
yarn test MyComponent.test.tsx --watch

# 4. Document in Storybook
yarn storybook

# 5. Integrate in showcase
# Add to src/app/component-showcase/page.tsx

# 6. Validate quality
yarn quality-audit

# 7. Commit when 100% quality
git add . && git commit -m "feat: add MyComponent with 100% quality"
```

### **🚀 Quality Gates**

Every component must pass:

```typescript
interface QualityGate {
  build: 'PASS'; // yarn build ✅
  typecheck: 'PASS'; // tsc --noEmit ✅
  lint: 'PASS'; // eslint ✅
  test: 'PASS'; // vitest ✅
  coverage: '>80%'; // Component coverage ✅
  qualityScore: '100/100'; // Full CVA compliance ✅
}
```

---

## 🎯 Key Scripts Explained

```json
{
  "scripts": {
    "dev": "next dev", // Development server
    "build": "next build", // Production build
    "test": "vitest", // Run tests
    "test:watch": "vitest --watch", // Continuous testing
    "test:coverage": "vitest --coverage", // Coverage report
    "lint": "eslint src/ --ext .ts,.tsx", // Linting
    "lint:fix": "eslint src/ --ext .ts,.tsx --fix", // Auto-fix
    "storybook": "storybook dev -p 6006", // Component docs
    "quality-audit": "powershell scripts/deductive-audit.ps1" // Quality check
  }
}
```

---

## 🛠️ IDE Setup

### **VS Code Configuration**

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
```

### **Recommended Extensions**

```bash
# Essential for TriggerKings development
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.test-adapter-converter
code --install-extension ZixuanChen.vitest-explorer
```

---

## 🔍 Troubleshooting

### **Common Issues**

**Build Errors:**

```bash
# Clear Next.js cache
rm -rf .next
yarn build

# Clear node_modules
rm -rf node_modules yarn.lock
yarn install
```

**Test Failures:**

```bash
# Run specific test file
yarn test Button.test.tsx

# Debug with UI
yarn test --ui

# Check coverage
yarn test --coverage
```

**Quality Score Issues:**

```bash
# Run detailed audit
yarn quality-audit

# Check specific component
powershell scripts/validate-quick.ps1 -ComponentPath "src/components/ui/Button"
```

---

## 🎉 Next Steps

Now that your environment is set up:

1. **📖 Explore**: Check out the [Development Workflow](./02-development-workflow.md)
2. **🧩 Build**: Create [Your First Component](./04-first-component.md)
3. **🎨 Style**: Master [CVA Patterns](./03-cva-patterns.md)
4. **🧪 Test**: Learn [Testing Strategies](./06-testing-strategy.md)

---

## 💡 Pro Tips

- **Use the quality audit**: It catches issues before they become problems
- **Follow the folder structure**: Consistency enables team scalability
- **Write tests first**: TDD leads to better component APIs
- **Check Storybook regularly**: Visual feedback prevents regressions
- **Monitor bundle size**: Keep performance in mind

---

_Ready to build enterprise-grade components? Let's move to the next tutorial!_ 🚀
