# 🎯 Z-Index Hierarchy Documentation

## Current Z-Index Stack (Highest to Lowest)

### Maximum Priority Level (9999)

- **Sheet** (`z-[9999]`) - Side panels/drawers - **MAXIMUM PRIORITY** ⚡
  - Overlay: `z-[9999]`
  - Content: `z-[9999]`

### System Level (100+)

- **Toast** (`z-[100]`) - System notifications, highest priority

### Standard Modal Level (50-59)

- **Dialog** (`z-50`) - Modal dialogs
- **Modal** (`z-50`) - Custom modal component
- **Tooltip** (`z-50`) - Hover tooltips
- **Select** (`z-50`) - Dropdown selects
- **Popover** (`z-50`) - Floating content panels
- **Menubar** (`z-50`) - Application menu bars
- **HoverCard** (`z-50`) - Hover information cards
- **DropdownMenu** (`z-50`) - Contextual dropdown menus
- **ContextMenu** (`z-50`) - Right-click context menus
- **ColorPicker** (`z-50`) - Brand color picker dropdown

### Navigation Level (10-49)

- **NavigationMenu** (`z-10`) - Main navigation menus
- **DataTable sticky headers** (`z-10`) - Sticky table headers
- **Resizable handles** (`z-10`) - Resize handlers

### Content Level (1-9)

- **NavigationMenu indicators** (`z-[1]`) - Menu indicators/arrows

## 🚀 Recent Changes (Sheet Enhancement)

### Problem Solved

Sheet components needed to appear above navigation and all UI elements but weren't guaranteed to do so with the standard `z-50` value.

### Solution Applied

- **Sheet Overlay**: `z-50` → `z-[9999]`
- **Sheet Content**: `z-50` → `z-[9999]`

### Benefits

✅ **Maximum visibility** - Sheet appears above EVERYTHING including system UI  
✅ **Absolute priority** - No possible z-index conflicts with any component  
✅ **Future-proof** - Highest practical z-index ensures permanent top-level display  
✅ **Critical overlay priority** - Perfect for blocking UI interactions when needed

## 💡 Z-Index Best Practices

### Guidelines for New Components

1. **System notifications**: `z-[100]+` (toasts, alerts)
2. **Critical overlays**: `z-[60-99]` (sheets, full-screen modals)
3. **Standard overlays**: `z-[50-59]` (dropdowns, popovers, dialogs)
4. **Navigation elements**: `z-[10-49]` (headers, menus, sticky elements)
5. **Content layer**: `z-[1-9]` (indicators, badges, floating elements)

### When to Use Higher Z-Index

- Component must appear above navigation
- Component serves as a full-screen or side overlay
- Component blocks user interaction with underlying content
- Component is critical for user workflow

### Testing Z-Index Changes

```bash
# Build verification
yarn build

# Component tests
npx vitest run --reporter=verbose src/components/ui/[ComponentName]

# Visual verification in browser
yarn dev
# Test Sheet with navigation visible
```

---

_Last updated: Sheet z-index enhancement for navigation overlay priority_
