# Debug Progress CVA detection
$Content = Get-Content "C:\Users\les-t\Documents\GitHub\triggerkings\src\components\ui\Progress\progress.tsx" -Raw

Write-Host "=== CVA DETECTION DEBUG ==="
Write-Host "File exists:" (Test-Path "C:\Users\les-t\Documents\GitHub\triggerkings\src\components\ui\Progress\progress.tsx")
Write-Host "Content length:" $Content.Length
Write-Host ""

Write-Host "CVA Pattern (cva\s*\():       " ($Content -match "cva\s*\(")
Write-Host "Default variant pattern:      " ($Content -match "default\s*:\s*['""]")
Write-Host "Success variant pattern:      " ($Content -match "success\s*:\s*['""]")
Write-Host "Warning variant pattern:      " ($Content -match "warning\s*:\s*['""]")
Write-Host "Danger variant pattern:       " ($Content -match "danger\s*:\s*['""]")
Write-Host ""

Write-Host "sm size pattern:               " ($Content -match "sm\s*:\s*['""]")
Write-Host "default size pattern:          " ($Content -match "default\s*:\s*['""]")
Write-Host "lg size pattern:               " ($Content -match "lg\s*:\s*['""]")
Write-Host "xl size pattern:               " ($Content -match "xl\s*:\s*['""]")
Write-Host ""

# Show first 10 lines that contain variants
Write-Host "=== VARIANT LINES ==="
$Content -split "`n" | Where-Object { $_ -match "(default|success|warning|danger)\s*:" } | Select-Object -First 10
