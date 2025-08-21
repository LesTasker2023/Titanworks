$DialogContent = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

Write-Host "=== PATTERN TEST ===" -ForegroundColor Yellow

# Simple pattern - just look for 'default:'
$hasDefault = $DialogContent -match "default:"
Write-Host "Has 'default:': $hasDefault" -ForegroundColor Green

# Pattern with quotes
$pattern1 = "default\s*:\s*'"
$match1 = $DialogContent -match $pattern1
Write-Host "Pattern 'default\s*:\s*'': $match1" -ForegroundColor Green

# Extract the actual line
$lines = $DialogContent -split "`n"
$defaultLine = $lines | Where-Object { $_ -match "default:" } | Select-Object -First 1
Write-Host "Default line: $defaultLine" -ForegroundColor Gray

# Character analysis
if ($defaultLine) {
    $colonIndex = $defaultLine.IndexOf(":")
    if ($colonIndex -ge 0) {
        $afterColon = $defaultLine.Substring($colonIndex + 1).Trim()
        Write-Host "After colon (trimmed): '$afterColon'" -ForegroundColor Yellow
        if ($afterColon.Length -gt 0) {
            $firstChar = $afterColon[0]
            Write-Host "First char after spaces: '$firstChar' (ASCII: $([int][char]$firstChar))" -ForegroundColor Yellow
        }
    }
}
