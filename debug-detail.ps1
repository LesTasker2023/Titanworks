# Debug Dialog component CVA detection step by step
$MainFile = "src\components\ui\Dialog\Dialog.tsx"
$Content = Get-Content $MainFile -Raw

Write-Host "=== STEP BY STEP DEBUG FOR DIALOG ==="
Write-Host ""

# 1. Check file exists and content
Write-Host "1. File exists: $(Test-Path $MainFile)"
Write-Host "2. Content length: $($Content.Length) chars"
Write-Host ""

# 2. Check CVA
$hasCVA = $Content -match "cva\s*\("
Write-Host "3. CVA check: $hasCVA"
$containsCVA = $Content.Contains('cva(')
Write-Host "   Content contains 'cva(': $containsCVA"
Write-Host ""

# 3. Check each variant individually
$Variants = @("default", "success", "warning", "danger")
Write-Host "4. Variant checks:"
foreach ($variant in $Variants) {
    $pattern = "$variant\s*:\s*['""]"
    $match = $Content -match $pattern
    Write-Host "   $variant pattern '$pattern': $match"
    
    # Also check without quotes
    $simplePattern = "$variant\s*:"
    $simpleMatch = $Content -match $simplePattern
    Write-Host "   $variant simple '$simplePattern': $simpleMatch"
}
Write-Host ""

# 4. Check each size individually
$Sizes = @("sm", "md", "lg", "xl")
Write-Host "5. Size checks:"
foreach ($size in $Sizes) {
    $pattern = "$size\s*:\s*['""]"
    $match = $Content -match $pattern
    Write-Host "   $size pattern '$pattern': $match"
    
    # Also check without quotes
    $simplePattern = "$size\s*:"
    $simpleMatch = $Content -match $simplePattern
    Write-Host "   $size simple '$simplePattern': $simpleMatch"
}
Write-Host ""

# 5. Show actual spec from audit script
Write-Host "6. Checking actual spec from audit script..."
. "scripts\deductive-audit.ps1" -ComponentFilter Dialog -WhatIf 2>$null
