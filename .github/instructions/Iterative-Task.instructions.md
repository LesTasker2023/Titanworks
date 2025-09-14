---
applyTo: '**'
---

# Iterative Task Instructions

## Single Repeatable Ta121314151617.1819. [x] DataTable

20. [x] DatePicker[x] ContextMenu
21. [x] DataTablex] Command

22. [x] ContextMenu[x] Combobox
23. [x] Command[x] ColorPicker
24. [x] Combobox[x] Collapsible
25. [x] ColorPicker[x] Checkbox
26. [x] Collapsible[x] Chart
27. [x] Checkbox

**Task:** Remove Tailwind classes and convert to BEM-style SCSS

## Instructions for AI Assistant

This file contains a single task that should be repeated iteratively across all UI components. The AI assistant should:

1. Execute the defined task on one component
2. Verify build passes
3. Move to the next component
4. Continue until all components are converted

**PROCEED UNIMPEDED**: Continue iterating through components automatically without waiting for user confirmation. Process each component systematically until all 52 components are converted or an error blocks progress.

## Task Parameters

- **Scope:** Remove all Tailwind CSS classes from components
- **Target Files:** `src/components/ui/*` (all component directories)
- **Success Criteria:** No Tailwind classes remain, SCSS file created, build passes
- **Iteration Method:** Process one component at a time, line by line

## Detailed Method

For each component in `src/components/ui/*`:

1. **Create/Modify SCSS File**: Create or modify `ComponentName.scss` in the component directory
2. **Import SCSS**: Add `import './ComponentName.scss'` to the `ComponentName.tsx` file
3. **Line-by-Line Analysis**: Check each line of the component file one by one
4. **Tailwind Detection**: If Tailwind classes are found on any element
5. **Add className**: Add a BEM-style className to the element (e.g., `className="componentName__element"`)
6. **Add SCSS Selector**: Add the corresponding selector in the SCSS file with relevant styles converted from Tailwind classes
7. **Next Line**: Move to the next line and repeat

## Rules

- **BEM Methodology**: Use Block\_\_Element--Modifier naming convention
- **Regular SCSS**: Use standard SCSS files (not CSS Modules)
- **Design Tokens**: Reference design tokens from `design-tokens-css-modules.scss`

## Finalized Rules

- **Design System Integration**: Everything must be dynamic to the design system - always use design tokens
- **BEM Class Naming**: Component names must match BEM class names exactly
- **Systematic Conversion**: Use design token variables for all Tailwind mappings
- **Hard Classnames**: Use verbose, explicit classnames (no responsive variants like `md:flex`)
- **Build Testing**: Always verify build passes after each component conversion

## Progress Tracking

- [ ] Task defined ✅
- [ ] Parameters set ✅
- [ ] Component inventory created ✅
- [ ] Execution begun
- [ ] Iterations completed

## Component Catalog

Target components in `src/components/ui/*` for Tailwind removal:

1. [x] Accordion
2. [x] Alert
3. [x] AlertDialog
4. [x] AspectRatio
5. [x] Avatar
6. [x] Badge
7. [x] Breadcrumb
8. [x] Button
9. [x] Calendar
10. [x] Card
11. [x] Carousel
12. [x] Chart
13. [ ] Checkbox
14. [ ] Collapsible
15. [ ] ColorPicker
16. [ ] Combobox
17. [ ] Command
18. [ ] ContextMenu
19. [ ] DataTable
20. [ ] DatePicker
21. [x] Dialog
22. [x] DropdownMenu
23. [x] Form
24. [x] HoverCard
25. [x] Input
26. [x] Label
27. [ ] Menubar
28. [ ] Modal
29. [ ] NavigationMenu
30. [ ] Pagination
31. [ ] Popover
32. [ ] Progress
33. [ ] RadioGroup
34. [ ] Resizable
35. [ ] ScrollArea
36. [ ] Select
37. [ ] Separator
38. [ ] Sheet
39. [ ] SimpleChart
40. [ ] Skeleton
41. [ ] Slider
42. [ ] Sonner
43. [ ] Switch
44. [ ] Table
45. [ ] Tabs
46. [ ] Textarea
47. [ ] ThemeToggle
48. [ ] Toast
49. [ ] Toggle
50. [ ] TomTomMap
51. [ ] Tooltip
52. [ ] VideoPlayer

**Total Components: 52**

## Notes

This instruction file is designed for systematic Tailwind class removal and BEM-style SCSS conversion across all UI components.

## Ready for Execution

All rules confirmed and finalized. The iterative task is ready to begin with systematic Tailwind class removal and BEM-style SCSS conversion across all UI components.
