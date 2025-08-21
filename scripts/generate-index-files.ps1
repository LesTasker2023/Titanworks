# Generate Missing Index Files - Enterprise Quality Enhancement
# This script creates barrel export files for all components missing index.ts

Write-Host "GENERATING MISSING INDEX FILES" -ForegroundColor Cyan
Write-Host "Creating barrel exports for enterprise architecture..." -ForegroundColor Gray

# List of components missing index.ts files (from quality audit)
$ComponentsNeedingIndex = @(
    "AlertDialog",
    "AspectRatio", 
    "Badge",
    "Breadcrumb",
    "Calendar",
    "Carousel",
    "Chart",
    "Collapsible",
    "Combobox",
    "ContextMenu",
    "DatePicker",
    "DropdownMenu",
    "Form",
    "HoverCard",
    "Label",
    "Menubar",
    "Modal",
    "Pagination",
    "Popover",
    "Resizable",
    "ScrollArea",
    "Sheet",
    "Sonner",
    "Switch",
    "Table",
    "Toast"
)

$BasePath = "src/components/ui"
$TotalCreated = 0

foreach ($Component in $ComponentsNeedingIndex) {
    $ComponentPath = "$BasePath/$Component"
    $IndexPath = "$ComponentPath/index.ts"
    
    # Check if component directory exists
    if (Test-Path $ComponentPath) {
        # Check if index.ts already exists
        if (-not (Test-Path $IndexPath)) {
            # Find the main component file
            $MainFile = Get-ChildItem -Path $ComponentPath -Filter "*.tsx" | Where-Object { $_.Name -notlike "*.test.*" -and $_.Name -notlike "*.stories.*" } | Select-Object -First 1
            
            if ($MainFile) {
                $ComponentName = $MainFile.BaseName
                
                # Generate index.ts content
                $IndexContent = @"
// Auto-generated barrel export for $Component component
// This file provides clean imports and maintains enterprise architecture standards

export * from './$ComponentName';
export { default } from './$ComponentName';
"@
                
                # Create the index.ts file
                Set-Content -Path $IndexPath -Value $IndexContent -Encoding UTF8
                Write-Host "  ✓ Created: $Component/index.ts" -ForegroundColor Green
                $TotalCreated++
            } else {
                Write-Host "  ⚠ No main component file found in $Component" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  • Already exists: $Component/index.tsx" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ✗ Component directory not found: $Component" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "INDEX FILE GENERATION COMPLETE" -ForegroundColor Cyan
Write-Host "Created: $TotalCreated new index.tsx files" -ForegroundColor Green
Write-Host "This enables clean imports and enterprise-grade component architecture." -ForegroundColor Gray
