# 📋 Complete Guide: Installing shadcn/ui with Next.js and Yarn

## 🎯 **Overview**

This guide documents the exact steps to install and configure shadcn/ui in a Next.js project using Yarn package manager, including specific version numbers and troubleshooting steps for PowerShell execution policy restrictions.

## 📌 **Prerequisites**

- **Next.js**: 15.4.6 or later
- **React**: 19.1.0 or later
- **Node.js**: Latest LTS version
- **Yarn**: v1.22.22 or later
- **PowerShell**: May have execution policy restrictions (handled in guide)

## 🧹 **Step 1: Clean Slate Setup**

### Remove Existing Dependencies (if any)

```powershell
# Remove any existing Tailwind/shadcn packages
yarn remove tailwindcss @tailwindcss/postcss shadcn @shadcn/ui autoprefixer postcss

# Clear Next.js build cache
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

# Remove config files (if they exist)
Remove-Item -Path "tailwind.config.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "postcss.config.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components.json" -Force -ErrorAction SilentlyContinue
```

## 🎨 **Step 2: Install Tailwind CSS**

### Install Tailwind CSS v3 (Stable Version)

```powershell
# Install Tailwind CSS v3.4.0 specifically (avoid v4 beta)
yarn add -D tailwindcss@^3.4.0 postcss@latest autoprefixer@latest
```

**Expected Versions:**

- `tailwindcss`: 3.4.0
- `postcss`: 8.4.38+
- `autoprefixer`: 10.4.21+

### Initialize Tailwind Configuration

```powershell
# ⚠️ Note: npx may fail due to PowerShell execution policy
npx tailwindcss init -p
```

**If npx fails with execution policy error:**

```powershell
# Alternative: Use local binary
./node_modules/.bin/tailwindcss init -p
```

This creates:

- `tailwind.config.js`
- `postcss.config.js`

### Configure Tailwind Content Paths

Edit `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 📄 **Step 3: Setup CSS Files**

### Create Dedicated Tailwind CSS File

Create `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Update Layout File

Edit `src/app/layout.tsx`:

```typescript
import '@/styles/globals.css'; // ← Add this for Tailwind
import '@/styles/globals.scss'; // ← Keep existing SCSS if you have it
import type { Metadata } from 'next';
```

**⚠️ Important:** Keep Tailwind directives in `.css` file, not `.scss`, to avoid compilation issues.

## 🚀 **Step 4: Initialize shadcn/ui**

### Run shadcn Initialization

```powershell
npx shadcn@latest init
```

**If npx fails:**

```powershell
# Alternative method
yarn dlx shadcn@latest init
```

### Interactive Configuration

When prompted, select:

1. **Style**: New York (Recommended)
2. **Base Color**: Slate (or your preference)
3. **CSS Variables**: Yes (default)

### Expected Output

```
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
✔ Writing components.json.
✔ Checking registry.
✔ Updating tailwind.config.js
✔ Updating CSS variables in src\styles\globals.css
✔ Installing dependencies.
✔ Updated 1 file: src\lib\utils.ts

Success! Project initialization completed.
```

## 📦 **Step 5: Verify Installation**

### Check Installed Dependencies

Your `package.json` should now include:

**Dependencies:**

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.539.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

**Dev Dependencies:**

```json
{
  "devDependencies": {
    "tailwindcss": "3.4.0",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.4.38"
  }
}
```

### Check Generated Files

Verify these files were created/updated:

- ✅ `components.json` - shadcn configuration
- ✅ `tailwind.config.js` - Updated with shadcn theme
- ✅ `src/styles/globals.css` - CSS variables added
- ✅ `src/lib/utils.ts` - Utility functions

## 🧩 **Step 6: Add Your First Component**

### Add a Button Component

```powershell
npx shadcn@latest add button
```

### Test the Component

Create a test page `src/app/test/page.tsx`:

```typescript
import { Button } from "@/components/ui/button"

export default function TestPage() {
  return (
    <div className="p-8">
      <Button>Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  )
}
```

## 🛠️ **Common Commands**

### Add More Components

```powershell
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add badge
npx shadcn@latest add alert
```

### View Available Components

```powershell
npx shadcn@latest add --help
```

### Update Components

```powershell
npx shadcn@latest update
```

## 🚨 **Troubleshooting**

### PowerShell Execution Policy Issues

**Error:** `cannot be loaded because running scripts is disabled`

**Solution 1:** Use local binaries

```powershell
./node_modules/.bin/shadcn add button
```

**Solution 2:** Use yarn dlx

```powershell
yarn dlx shadcn@latest add button
```

### Tailwind CSS Not Detected

**Error:** `No Tailwind CSS configuration found`

**Solutions:**

1. Ensure `tailwind.config.js` exists with proper content paths
2. Verify Tailwind CSS is installed: `yarn list tailwindcss`
3. Check CSS file has Tailwind directives

### SCSS Compilation Errors

**Error:** `Unknown at rule @tailwind`

**Solution:** Keep Tailwind directives in `.css` file, not `.scss`

### Version Conflicts

**Issue:** Tailwind CSS v4 causing issues

**Solution:** Force install v3:

```powershell
yarn remove tailwindcss
yarn add -D tailwindcss@^3.4.0
```

## 📊 **Final Configuration**

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## ✅ **Success Checklist**

- [ ] Tailwind CSS v3.4.0 installed
- [ ] PostCSS and Autoprefixer configured
- [ ] `tailwind.config.js` created with content paths
- [ ] `src/styles/globals.css` contains Tailwind directives
- [ ] shadcn/ui initialization completed
- [ ] `components.json` generated
- [ ] First component added and tested
- [ ] Development server runs without errors

## 🎯 **Next Steps**

After successful installation:

1. **Start Development Server:**

   ```powershell
   yarn dev
   ```

2. **Add Components as Needed:**
   - Only add components you actually use
   - Test each component after installation

3. **Customize Theme:**
   - Edit CSS variables in `globals.css`
   - Modify `tailwind.config.js` for custom styling

---

**📅 Last Updated:** August 13, 2025  
**🏷️ Tested Versions:** Next.js 15.4.6, React 19.1.0, Tailwind CSS 3.4.0, Yarn 1.22.22
