$DialogContent = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

Write-Host "=== SIMPLE PATTERN TESTS ===" -ForegroundColor Yellow

# Test if the simple pattern actually works
$hasPattern = $DialogContent -match "default\s*:\s*'"
Write-Host "Direct test 'default\s*:\s*'': $hasPattern"

# Test a version without any spaces
$simpleTest = $DialogContent -match "default:"
Write-Host "Direct test 'default:': $simpleTest"

# Test with variable (mimicking audit script)
$variant = "default"
$testWithVar = $DialogContent -match "$variant\s*:\s*'"
Write-Host "With variable '$variant\s*:\s*'': $testWithVar"

# Show the exact line again for reference
$lines = $DialogContent -split "`n"
$line = $lines | Where-Object { $_ -match "default:" } | Select-Object -First 1
Write-Host "Line content: '$line'"

# Test NOT match (this is what audit script uses)
$notMatch = $DialogContent -notmatch "$variant\s*:\s*'"
Write-Host "NOT match result: $notMatch"
Write-Host "This means the pattern is " -NoNewline
if ($notMatch) {
    Write-Host "NOT FOUND" -ForegroundColor Red
} else {
    Write-Host "FOUND" -ForegroundColor Green
}
