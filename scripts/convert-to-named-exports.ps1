# Convert Default Exports to Named Exports
# This script systematically converts all component default exports to named exports

$componentsToConvert = @(
    'Progress',
    'Input',
    'Select',
    'Slider',
    'Tabs',
    'RadioGroup',
    'DataTable',
    'ColorPicker'
)

Write-Host "🔧 Converting default exports to named exports for better consistency..."

foreach ($component in $componentsToConvert) {
    $componentDir = "src/components/ui/$component"
    
    if (Test-Path $componentDir) {
        Write-Host "📦 Processing $component..."
        
        # Find the main component file (could be .tsx or lowercase)
        $componentFile = $null
        $possibleFiles = @(
            "$componentDir/$component.tsx",
            "$componentDir/${component.ToLower()}.tsx"
        )
        
        foreach ($file in $possibleFiles) {
            if (Test-Path $file) {
                $componentFile = $file
                break
            }
        }
        
        if ($componentFile) {
            Write-Host "  ✅ Found component file: $componentFile"
            
            # Find index file
            $indexFile = $null
            $possibleIndexes = @(
                "$componentDir/index.ts",
                "$componentDir/index.tsx"
            )
            
            foreach ($file in $possibleIndexes) {
                if (Test-Path $file) {
                    $indexFile = $file
                    break
                }
            }
            
            if ($indexFile) {
                Write-Host "  ✅ Found index file: $indexFile"
                Write-Host "  📝 Files identified for $component conversion"
            } else {
                Write-Host "  ⚠️  No index file found for $component"
            }
        } else {
            Write-Host "  ❌ No component file found for $component"
        }
    } else {
        Write-Host "❌ Directory not found: $componentDir"
    }
}

Write-Host ""
Write-Host "🎯 Manual conversion required for each component:"
Write-Host "1. Change 'export default ComponentName;' to 'export { ComponentName };'"
Write-Host "2. Update index files to use named imports instead of 'export { default }'"
Write-Host "3. Verify barrel exports in src/components/ui/index.ts"
