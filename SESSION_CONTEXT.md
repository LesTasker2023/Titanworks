# TriggerKings Development Session Context

## Project Overview

- **Project**: TriggerKings - Next.js 15.4.6 application with App Router
- **Tech Stack**: Next.js, TypeScript, SCSS, Vitest, React Testing Library, Storybook
- **Package Manager**: Yarn (NOT npm)
- **Testing Framework**: Vitest + React Testing Library
- **Component Library**: Building custom shadcn/ui components with enterprise patterns

## Development Philosophy - "Musk Mode"

- **Speed**: Fast iteration, quick responses, efficient problem-solving
- **Quality**: Enterprise-grade components with comprehensive testing
- **Patterns**: Consistent architecture across all components
- **Testing**: Every component gets full test coverage (30+ tests each)
- **Documentation**: Storybook stories for all components
- **No Fluff**: Direct implementation, minimal discussion unless clarification needed

## Titan Component System

### Component Types

#### **Shadcn Titan Component**

- **Command**: "Let's make a new shadcn titan component"
- **Process**:
  1. Install chosen shadcn/ui component
  2. Create complete Titan architecture (all files below)
  3. Enhance with enterprise patterns and comprehensive testing
- **Example**: Badge, Button, Card (what we've built)

#### **Normal Titan Component**

- **Command**: "Let's make a normal titan component"
- **Process**:
  1. Build from scratch (no shadcn install)
  2. Create complete Titan architecture
  3. Custom implementation with enterprise patterns
- **Use Case**: Custom business components, unique UI elements

## Current Architecture Patterns

### Titan Component Architecture (Enterprise Standard)

```
src/components/ui/{component}/
├── index.ts          # Clean exports
├── {Component}.tsx   # Main component with CVA variants
├── {Component}.scss  # Enhanced SCSS with prominent styling
├── {Component}.stories.tsx # Comprehensive Storybook stories
└── __tests__/
    ├── {Component}.test.tsx      # Core functionality tests
    ├── {Component}.variants.test.tsx # Variant testing
    ├── {Component}.accessibility.test.tsx # A11y testing
    └── {Component}.interactions.test.tsx # User interactions
```

### Titan Component Features (Standard)

- **CVA Variants**: Consistent variant system across all components
- **AsChild Support**: Radix UI Slot integration for composition
- **Enhanced SCSS**: Prominent styling with shadows, transitions, hover effects
- **Comprehensive Testing**: 30+ tests covering all functionality, variants, accessibility
- **Storybook Integration**: Complete documentation with interactive examples
- **TypeScript**: Full type safety and IntelliSense support

### Key Dependencies Per Component

- **class-variance-authority (CVA)**: Variant management
- **@radix-ui/react-slot**: asChild prop support
- **clsx**: Conditional class names
- **React 19**: Latest React features

### SCSS Architecture

- **Enhanced Styling**: Prominent visual effects, shadows, transitions
- **CSS Variables**: Consistent design tokens
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Focus states, high contrast support

## Completed Titan Components

### Button Titan Component ✅ (Shadcn)

- **Type**: Shadcn Titan Component
- **Location**: `src/components/ui/button/`
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Features**: Size variants (sm, default, lg), asChild support, loading states
- **Tests**: 49 comprehensive tests
- **Status**: Production ready

### Card Titan Component ✅ (Shadcn)

- **Type**: Shadcn Titan Component
- **Location**: `src/components/ui/card/`
- **Sub-components**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Features**: Flexible composition, semantic HTML
- **Tests**: Complete test coverage
- **Status**: Production ready

### Badge Titan Component ✅ (Shadcn)

- **Type**: Shadcn Titan Component
- **Location**: `src/components/ui/badge/`
- **Variants**: default, secondary, destructive, outline
- **Features**: Enhanced visual styling with shadows and hover effects
- **Tests**: 32 comprehensive tests
- **Status**: Production ready, currently testing Storybook presentation

## Current Test Status

- **Total Tests**: 81 passing
- **Coverage**: Comprehensive across all components
- **Test Types**: Functionality, variants, accessibility, interactions

## Storybook Configuration

- **Version**: 9.1.2
- **Framework**: @storybook/nextjs-vite
- **Current Issue**: Dark overlay from global styles bleeding into Storybook UI
- **Fix Applied**: Created `.storybook/storybook.css` with overrides
- **Status**: Testing fix with `yarn storybook` currently running

## Active Work Session

### Last Completed Tasks

1. Created Badge component following established patterns
2. Implemented comprehensive test suite (32 tests)
3. Enhanced SCSS styling for prominent visual effects
4. Created Storybook stories and documentation
5. Fixed SCSS compilation issues
6. Addressed Storybook dark overlay with CSS overrides

### Current Status

- **Storybook**: Running at http://localhost:6006/ (yarn storybook)
- **Testing**: All 81 tests passing
- **Focus**: Verifying Storybook dark overlay fix

### Known Issues & Solutions

- **Global Styles Bleeding**: Fixed with `.storybook/storybook.css` overrides
- **SCSS Selector Issues**: Fixed invalid `a&` selectors
- **Package Manager**: Always use `yarn`, not `npm`

## Development Commands (Yarn Only)

```bash
# Development
yarn dev              # Start Next.js dev server
yarn build            # Build for production
yarn start            # Start production server

# Testing
yarn test             # Run tests
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Run tests with coverage

# Storybook
yarn storybook        # Start Storybook dev server
yarn build-storybook  # Build Storybook for production

# Quality
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript checks
```

## Lessons Learned & Titan Component Insights

### Input Titan Component Development Lessons

#### **CSS Custom Properties Management**

- **Discovery**: Missing CSS variables caused SCSS compilation issues
- **Solution**: Added comprehensive color system with light/dark theme support
- **Pattern**: Always audit global styles for required custom properties before component creation
- **Added Variables**: `--color-border-hover`, `--color-muted-hover`, `--color-success-background`, `--color-warning-background`, `--color-destructive-background`

#### **Shadcn Integration Patterns**

- **Discovery**: `yarn dlx` doesn't exist, `npx` has PowerShell execution policy issues
- **Solution**: Use local binary path `node_modules/.bin/shadcn` after installing `@shadcn/ui` package
- **Pattern**: Install shadcn package first, then use local binary for component installation

#### **TypeScript Interface Conflicts**

- **Discovery**: HTML `size` attribute conflicts with CVA `size` variant
- **Solution**: Use `Omit<React.ComponentProps<"input">, "size">` to exclude conflicting properties
- **Pattern**: Always check for HTML attribute conflicts when creating form component variants

#### **Enhanced Input Component Architecture**

- **Discovery**: Input components need complex state management (error > success > default)
- **Implementation**: Smart state precedence system with automatic icon and wrapper rendering
- **Pattern**: Container → Wrapper → Input + Icons pattern for complex form inputs

#### **Test Suite Optimization**

- **Discovery**: User interaction tests can be flaky with exact string matching
- **Solution**: Focus on behavior validation over exact character-by-character matching
- **Achievement**: 44 comprehensive tests covering all variants, states, accessibility, and interactions

### Titan Component System Evolution

#### **Component Complexity Scaling**

1. **Button Titan** (Simple): 6 variants, 4 sizes, basic interactions
2. **Card Titan** (Compositional): Multiple sub-components, semantic structure
3. **Badge Titan** (Enhanced): Visual prominence, shadow effects
4. **Input Titan** (Complex): 4 variants × 3 sizes × 4 states + labels + icons + messages

#### **SCSS Architecture Maturity**

- **Progression**: From basic styling → prominent effects → complex state management
- **Pattern**: Base styles → Variants → Sizes → States → Icons → Responsive → Dark mode → High contrast
- **Best Practice**: Always include accessibility features (reduced motion, high contrast)

### Development Velocity Insights

#### **Musk Mode Optimization**

- **Pattern Recognition**: Titan components follow predictable structure, enabling rapid iteration
- **Parallel Development**: Create all test files simultaneously while component compiles
- **Quality Gates**: Run tests after each component completion to catch regressions early

#### **Toolchain Mastery**

- **Yarn vs NPM**: Consistent package manager usage critical for team development
- **PowerShell Limitations**: Execution policies require alternative approaches
- **Local Binaries**: More reliable than global CLI tools in restricted environments

### Next Component Predictions

#### **Complexity Forecast**

- **Dialog Titan**: High complexity (portals, focus management, animations)
- **Select Titan**: High complexity (dropdown logic, keyboard navigation, search)
- **Checkbox/Switch Titan**: Medium complexity (form states, indeterminate)
- **Avatar Titan**: Low complexity (image handling, fallbacks)

---

_Updated: August 13, 2025 - Input Titan Component Completion_
_Total Tests: 125 passing | Components: 4 Titan Components_

## Next Steps & Titan Component Opportunities

### Available Shadcn Titan Components (Updated Priority)

1. **Avatar Titan**: User profile images with fallbacks (Low complexity - good next choice)
2. **Checkbox Titan**: Form input with indeterminate states (Medium complexity)
3. **Switch Titan**: Toggle controls (Medium complexity)
4. **Alert Titan**: Contextual messages and notifications (Medium complexity)
5. **Tabs Titan**: Content organization (Medium complexity)
6. **Tooltip Titan**: Contextual information overlays (Medium complexity)
7. **Select Titan**: Dropdown selection with search (High complexity)
8. **Dialog Titan**: Modal overlays and popups (High complexity)

### Available Shadcn Titan Components

1. **Alert Titan**: Contextual messages and notifications
2. **Avatar Titan**: User profile images with fallbacks
3. **Checkbox Titan**: Form input with indeterminate states
4. **Dialog Titan**: Modal overlays and popups
5. **Input Titan**: Text input with validation states
6. **Select Titan**: Dropdown selection with search
7. **Switch Titan**: Toggle controls
8. **Tabs Titan**: Content organization
9. **Tooltip Titan**: Contextual information overlays

### Normal Titan Component Ideas

1. **Hero Titan**: Custom landing page sections
2. **Navigation Titan**: Site navigation components
3. **Dashboard Titan**: Data visualization widgets
4. **Form Titan**: Complex form layouts
5. **Timeline Titan**: Event sequences
6. **Pricing Titan**: Product pricing tables
7. **Testimonial Titan**: Customer feedback displays

## Command Reference

### Musk Mode Commands

- **"Let's make a new shadcn titan component"** → Install shadcn + create Titan architecture
- **"Let's make a normal titan component"** → Build from scratch with Titan architecture
- **"Musk Mode"** → Fast, efficient, no-fluff development approach

## File Locations Quick Reference

- **Components**: `src/components/ui/`
- **Global Styles**: `src/styles/globals.scss`
- **Tests**: `__tests__/` in each component directory
- **Storybook**: `.storybook/` configuration
- **Package Config**: `package.json` (yarn project)

---

_Last Updated: August 13, 2025_
_Session Context: Badge component completion + Storybook troubleshooting_
