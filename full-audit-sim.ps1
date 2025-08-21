# Simulate the exact audit script flow for Dialog component
$ComponentSpecs = @{
    "Dialog" = @{ 
        Variants = @("default", "success", "warning", "danger"); 
        Sizes = @("sm", "md", "lg", "xl"); 
        Props = @(); 
        Context = "Modal dialogs" 
        TestsFor = @("variant", "size")
    }
}

$component = Get-ChildItem "src\components\ui\Dialog" -Directory
$Name = $component.Name
$Spec = $ComponentSpecs[$Name]

Write-Host "=== FULL AUDIT SIMULATION ===" -ForegroundColor Yellow
Write-Host "Component: $Name" -ForegroundColor Gray
Write-Host "Spec variants: $($Spec.Variants -join ', ')" -ForegroundColor Gray
Write-Host "Spec sizes: $($Spec.Sizes -join ', ')" -ForegroundColor Gray

# File finding logic
$MainFiles = Get-ChildItem "$($component.FullName)\*.tsx" | Where-Object { 
    $_.Name -match "^[a-z-]+\.tsx$" -and $_.Name -ne "index.tsx" -and $_.Name -ne "index.ts"
}
if (-not $MainFiles) { 
    # Fallback to any .tsx file that's not index
    $MainFiles = Get-ChildItem "$($component.FullName)\*.tsx" | Where-Object { $_.Name -ne "index.tsx" -and $_.Name -ne "index.ts" }
}

Write-Host "Main files found: $($MainFiles.Count)" -ForegroundColor Gray
if ($MainFiles) {
    Write-Host "First file: $($MainFiles[0].Name)" -ForegroundColor Gray
    
    $MainFile = $MainFiles | Select-Object -First 1
    $Content = Get-Content $MainFile.FullName -Raw
    
    Write-Host "Content loaded: $($Content.Length) chars" -ForegroundColor Gray
    
    $Score = 100
    $Issues = @()
    
    # CVA validation
    if (($Spec.Variants.Count -gt 0 -or $Spec.Sizes.Count -gt 0) -and $Content -notmatch "cva\s*\(") {
        $Score -= 10; $Issues += "Should use CVA for variants/sizes"
        Write-Host "CVA issue added" -ForegroundColor Red
    } else {
        Write-Host "CVA check passed" -ForegroundColor Green
    }
    
    # Variant validation
    if ($Spec.Variants.Count -gt 0) {
        $MissingVariants = @()
        foreach ($variant in $Spec.Variants) {
            if ($Content -notmatch "$variant\s*:\s*'") {
                $MissingVariants += $variant
            }
        }
        if ($MissingVariants.Count -gt 0) {
            $Score -= ($MissingVariants.Count * 3)
            $Issues += "Missing variants: $($MissingVariants -join ', ')"
            Write-Host "Missing variants: $($MissingVariants -join ', ')" -ForegroundColor Red
        } else {
            Write-Host "All variants found" -ForegroundColor Green
        }
    }
    
    # Size validation
    if ($Spec.Sizes.Count -gt 0) {
        $MissingSizes = @()
        foreach ($size in $Spec.Sizes) {
            if ($Content -notmatch "$size\s*:\s*'") {
                $MissingSizes += $size
            }
        }
        if ($MissingSizes.Count -gt 0) {
            $Score -= ($MissingSizes.Count * 2)
            $Issues += "Missing sizes: $($MissingSizes -join ', ')"
            Write-Host "Missing sizes: $($MissingSizes -join ', ')" -ForegroundColor Red
        } else {
            Write-Host "All sizes found" -ForegroundColor Green
        }
    }
    
    Write-Host "`nFinal Score: $Score" -ForegroundColor $(if ($Score -ge 80) { "Green" } else { "Yellow" })
    Write-Host "Issues: [$($Issues -join '; ')]" -ForegroundColor $(if ($Issues.Count -gt 0) { "Red" } else { "Green" })
}
