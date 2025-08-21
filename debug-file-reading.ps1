# Debug what content the audit script is actually reading
$Name = "Dialog"
$ComponentPath = "src\components\ui\$Name"

Write-Host "Component Name: $Name"
Write-Host "Component Path: $ComponentPath"

# Test the main file finding logic - updated to match fixed audit script
$MainFiles = Get-ChildItem $ComponentPath -File | Where-Object { 
    $_.Name -eq "$($Name.ToLower()).tsx"
}
if (-not $MainFiles) { 
    # Fallback to pattern match but exclude demo files
    $MainFiles = Get-ChildItem $ComponentPath -File | Where-Object { 
        $_.Name -match "^[a-z-]+\.tsx$" -and $_.Name -ne "index.tsx" -and $_.Name -ne "index.ts" -and $_.Name -ne "demo.tsx"
    }
}
if (-not $MainFiles) { 
    # Final fallback to any .tsx file that's not index or demo
    $MainFiles = Get-ChildItem $ComponentPath -File | Where-Object { $_.Name -ne "index.tsx" -and $_.Name -ne "index.ts" -and $_.Name -ne "demo.tsx" }
}

Write-Host "`nMain files found: $($MainFiles.Count)"
foreach ($file in $MainFiles) {
    Write-Host "  - $($file.Name)"
}

if ($MainFiles.Count -gt 0) {
    $MainFile = $MainFiles[0].FullName
    Write-Host "`nUsing main file: $MainFile"
    
    $Content = Get-Content $MainFile -Raw
    Write-Host "Content length: $($Content.Length) characters"
    
    # Test CVA pattern
    $HasCVA = $Content -match "cva\s*\("
    Write-Host "Has CVA: $HasCVA"
    
    # Test component spec variants
    $SpecVariants = @("default", "success", "warning", "danger")
    Write-Host "`nSpec Variants: $($SpecVariants -join ', ')"
    
    $MissingVariants = @()
    foreach ($variant in $SpecVariants) {
        if ($Content -notmatch "$variant\s*:\s*'") {
            $MissingVariants += $variant
        }
    }
    Write-Host "Missing Variants: $($MissingVariants -join ', ')"
    
    # Test component spec sizes
    $SpecSizes = @("sm", "md", "lg", "xl")
    Write-Host "Spec Sizes: $($SpecSizes -join ', ')"
    
    $MissingSizes = @()
    foreach ($size in $SpecSizes) {
        if ($Content -notmatch "$size\s*:\s*'") {
            $MissingSizes += $size
        }
    }
    Write-Host "Missing Sizes: $($MissingSizes -join ', ')"
}
