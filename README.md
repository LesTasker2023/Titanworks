# Titanworks

> **Modern Next.js 15 platform with TypeScript, comprehensive component library, and automated development workflow.**

A production-ready web application built with Next.js App Router, featuring a complete design system, automated testing pipeline, and professional development tooling.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Environment setup
cp .env.example .env.local

# Start development server
yarn dev
```

Visit `http://localhost:3000` to see the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS with design tokens system
- **Components**: 52+ production-ready UI components
- **Testing**: Vitest + Testing Library
- **Quality**: ESLint, Prettier, automated pre-commit hooks
- **Build**: Modern bundling with optimization

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Core UI components (52+)
│   └── layout/            # Layout components
├── lib/                   # Utility functions
├── styles/                # Global styles and design tokens
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions

docs/                      # Documentation
scripts/                   # Development utilities
```

## 🧩 Component System

The platform includes 52+ professionally crafted components:

- **Form Controls**: Button, Input, Select, Checkbox, etc.
- **Data Display**: Table, Card, Badge, Avatar, etc.
- **Navigation**: Menu, Breadcrumb, Tabs, etc.
- **Feedback**: Alert, Toast, Modal, etc.
- **Layout**: Container, Grid, Spacer, etc.

All components feature:

- TypeScript definitions
- SCSS styling with design tokens
- Comprehensive test coverage
- Storybook documentation (where applicable)

## 🔧 Development Commands

### Core Development

```bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint
yarn lint:fix         # Fix linting issues
yarn type-check       # TypeScript validation
```

### Testing & Quality

```bash
yarn test             # Run tests in watch mode
yarn test:run         # Run all tests once
yarn test:coverage    # Generate coverage report
yarn quality:check    # Run full quality pipeline
```

### Component Development

```bash
yarn storybook        # Start Storybook server (if configured)
```

## 🎨 Design System

The project implements a comprehensive design system with:

- **Design Tokens**: Centralized color, typography, spacing variables
- **Component Variants**: Consistent styling patterns across components
- **SCSS Architecture**: Modular stylesheets with BEM methodology
- **Responsive Design**: Mobile-first approach with consistent breakpoints

## 🧪 Testing Strategy

- **Unit Tests**: Component behavior and utility functions
- **Integration Tests**: Component interactions and data flow
- **TypeScript Validation**: Compile-time error prevention
- **Automated Quality Gates**: Pre-commit hooks ensure code quality

## 🔄 Development Workflow

1. **Feature Development**: Create components with TypeScript + SCSS
2. **Quality Assurance**: Automated linting, formatting, type checking
3. **Testing**: Comprehensive test coverage with Vitest
4. **Documentation**: Component documentation and usage examples

## 📋 Scripts Reference

### Maintenance

```bash
yarn clean            # Clean build artifacts
yarn format           # Format code with Prettier
yarn format:check     # Check formatting without changes
```

### Development Utilities

```bash
yarn analyze          # Bundle size analysis (if configured)
yarn audit:deps       # Security audit of dependencies
```

## 🚀 Deployment

The application is optimized for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Self-hosted** environments

### Build Optimization

- Static page generation where applicable
- Image optimization with Next.js Image component
- Bundle splitting and code optimization
- Modern JavaScript output with polyfills

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the established patterns
4. Ensure tests pass (`yarn test:run`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ using modern web technologies**
