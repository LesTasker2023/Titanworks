# Test the exact CVA logic from audit script
$DialogContent = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

$Spec = @{
    Variants = @("default", "success", "warning", "danger")
    Sizes = @("sm", "md", "lg", "xl")
}

Write-Host "=== CVA LOGIC TEST ===" -ForegroundColor Yellow

# Test the exact condition from the audit script
$shouldHaveVariantsOrSizes = ($Spec.Variants.Count -gt 0 -or $Spec.Sizes.Count -gt 0)
$hasCVA = $DialogContent -match "cva\s*\("
$notHasCVA = $DialogContent -notmatch "cva\s*\("

Write-Host "Should have variants or sizes: $shouldHaveVariantsOrSizes" -ForegroundColor Gray
Write-Host "Variants count: $($Spec.Variants.Count)" -ForegroundColor Gray  
Write-Host "Sizes count: $($Spec.Sizes.Count)" -ForegroundColor Gray
Write-Host "Has CVA: $hasCVA" -ForegroundColor $(if ($hasCVA) { "Green" } else { "Red" })
Write-Host "NOT has CVA: $notHasCVA" -ForegroundColor $(if ($notHasCVA) { "Red" } else { "Green" })

# The condition from the audit script
$condition = ($shouldHaveVariantsOrSizes -and $notHasCVA)
Write-Host "Audit condition result: $condition" -ForegroundColor $(if ($condition) { "Red" } else { "Green" })

if ($condition) {
    Write-Host "Would add: 'Should use CVA for variants/sizes'" -ForegroundColor Red
} else {
    Write-Host "CVA check passes" -ForegroundColor Green
}
