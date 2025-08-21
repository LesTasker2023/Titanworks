# Debug CVA detection for Dialog component
$ComponentName = "Dialog"
$MainFile = "src\components\ui\Dialog\Dialog.tsx"
$Content = Get-Content $MainFile -Raw

Write-Host "=== DEBUGGING CVA DETECTION FOR $ComponentName ==="
Write-Host ""

# Check CVA usage
$hasCVA = $Content -match "cva\s*\("
Write-Host "Has CVA: $hasCVA"

# Check variants
$Variants = @("default", "success", "warning", "danger")
Write-Host ""
Write-Host "Checking variants:"
foreach ($variant in $Variants) {
    $pattern = "$variant\s*:\s*['""]"
    $hasVariant = $Content -match $pattern
    Write-Host "  $variant : $hasVariant"
}

# Check sizes  
$Sizes = @("sm", "md", "lg", "xl")
Write-Host ""
Write-Host "Checking sizes:"
foreach ($size in $Sizes) {
    $pattern = "$size\s*:\s*['""]"
    $hasSize = $Content -match $pattern
    Write-Host "  $size : $hasSize"
}

# Show relevant content sections
Write-Host ""
Write-Host "=== CVA CONTENT ==="
$lines = $Content -split "`n"
$inVariants = $false
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    if ($line -match "variants:\s*\{") {
        $inVariants = $true
        Write-Host "Line $($i+1): $line"
        continue
    }
    if ($inVariants) {
        Write-Host "Line $($i+1): $line"
        if ($line -match "^\s*\}") {
            if ($lines[$i+1].Trim() -notmatch "^\s*\w+:") {
                break
            }
        }
    }
}
