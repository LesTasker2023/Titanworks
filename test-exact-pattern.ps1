# Test the exact pattern matching for Dialog variants
$DialogContent = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

Write-Host "=== TESTING PATTERN MATCHING ===" -ForegroundColor Yellow

# Test different patterns
$patterns = @(
    "default\s*:\s*['"+'"]",
    "default\s*:\s*[\x27\x22]",
    "default\s*:"
)

foreach ($pattern in $patterns) {
    $match = $DialogContent -match $pattern
    Write-Host "Pattern: $pattern" -ForegroundColor Green
    Write-Host "  Match: $match" -ForegroundColor $(if ($match) { "Green" } else { "Red" })
    if ($match) {
        $actualMatch = [regex]::Match($DialogContent, $pattern)
        Write-Host "  Found: '$($actualMatch.Value)'" -ForegroundColor Gray
    }
    Write-Host ""
}

# Show the actual snippet around 'default:'
Write-Host "=== ACTUAL CONTENT AROUND DEFAULT ===" -ForegroundColor Yellow
$lines = $DialogContent -split "`n"
$defaultLine = $lines | Where-Object { $_ -match "default:" } | Select-Object -First 1
Write-Host "Line: '$defaultLine'" -ForegroundColor Gray

# Show the character codes around the colon
if ($defaultLine) {
    $colonIndex = $defaultLine.IndexOf(":")
    if ($colonIndex -ge 0 -and $colonIndex -lt $defaultLine.Length - 3) {
        $snippet = $defaultLine.Substring($colonIndex, 3)
        Write-Host "Around colon: '$snippet'" -ForegroundColor Gray
        for ($i = 0; $i -lt $snippet.Length; $i++) {
            $char = $snippet[$i]
            $code = [int][char]$char
            Write-Host "  Char $i`: '$char' (code: $code)" -ForegroundColor Gray
        }
    }
}
