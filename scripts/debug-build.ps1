# Simple test script to debug build validation
Write-Host "Testing build validation logic..." -ForegroundColor Cyan

$buildResult = & yarn build --no-lint 2>&1
$buildExitCode = $LASTEXITCODE

Write-Host "Build Exit Code: $buildExitCode" -ForegroundColor Yellow

$buildOutput = if ($buildResult -is [array]) { $buildResult -join "`n" } else { $buildResult.ToString() }

Write-Host "Build Output Length: $($buildOutput.Length)" -ForegroundColor Yellow
Write-Host "Contains 'Compiled successfully': $($buildOutput -match 'Compiled successfully')" -ForegroundColor Yellow

if ($buildExitCode -eq 0 -and $buildOutput -match "Compiled successfully") {
    Write-Host "BUILD VALIDATION PASSED!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "BUILD VALIDATION FAILED!" -ForegroundColor Red
    Write-Host "Exit Code: $buildExitCode" -ForegroundColor Red
    Write-Host "Output:" -ForegroundColor Red
    Write-Host $buildOutput -ForegroundColor Gray
    exit 1
}
