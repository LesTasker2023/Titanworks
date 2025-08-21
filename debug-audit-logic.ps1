# Debug exact audit script logic for Dialog
$DialogContent = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

# Simulate the spec
$Spec = @{
    Variants = @("default", "success", "warning", "danger")
    Sizes = @("sm", "md", "lg", "xl")
}

Write-Host "=== DEBUGGING AUDIT SCRIPT LOGIC ===" -ForegroundColor Yellow
Write-Host "Content length: $($DialogContent.Length)" -ForegroundColor Gray

# CVA check
$hasCVA = $DialogContent -match "cva\s*\("
Write-Host "Has CVA: $hasCVA" -ForegroundColor $(if ($hasCVA) { "Green" } else { "Red" })

# Test variant logic exactly as in audit script
Write-Host "`n--- VARIANT TESTING ---" -ForegroundColor Yellow
if ($Spec.Variants.Count -gt 0) {
    $MissingVariants = @()
    foreach ($variant in $Spec.Variants) {
        $match = $DialogContent -match "$variant\s*:\s*'"
        $notMatch = $DialogContent -notmatch "$variant\s*:\s*'"
        Write-Host "Variant '$variant':" -ForegroundColor Gray
        Write-Host "  Match: $match" -ForegroundColor $(if ($match) { "Green" } else { "Red" })
        Write-Host "  NOT Match: $notMatch" -ForegroundColor $(if ($notMatch) { "Red" } else { "Green" })
        
        if ($notMatch) {
            $MissingVariants += $variant
            Write-Host "  -> ADDED TO MISSING" -ForegroundColor Red
        } else {
            Write-Host "  -> OK" -ForegroundColor Green
        }
    }
    Write-Host "Missing variants array: [$($MissingVariants -join ', ')]" -ForegroundColor $(if ($MissingVariants.Count -gt 0) { "Red" } else { "Green" })
}

# Test size logic exactly as in audit script
Write-Host "`n--- SIZE TESTING ---" -ForegroundColor Yellow
if ($Spec.Sizes.Count -gt 0) {
    $MissingSizes = @()
    foreach ($size in $Spec.Sizes) {
        $match = $DialogContent -match "$size\s*:\s*'"
        $notMatch = $DialogContent -notmatch "$size\s*:\s*'"
        Write-Host "Size '$size':" -ForegroundColor Gray
        Write-Host "  Match: $match" -ForegroundColor $(if ($match) { "Green" } else { "Red" })
        Write-Host "  NOT Match: $notMatch" -ForegroundColor $(if ($notMatch) { "Red" } else { "Green" })
        
        if ($notMatch) {
            $MissingSizes += $size
            Write-Host "  -> ADDED TO MISSING" -ForegroundColor Red
        } else {
            Write-Host "  -> OK" -ForegroundColor Green
        }
    }
    Write-Host "Missing sizes array: [$($MissingSizes -join ', ')]" -ForegroundColor $(if ($MissingSizes.Count -gt 0) { "Red" } else { "Green" })
}
