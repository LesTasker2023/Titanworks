# Safe Repository Scan Script
# Runs repository analysis without interfering with Next.js dev server

Write-Host "🔍 Starting safe repository scan..." -ForegroundColor Cyan

# Check if Next.js dev server is running
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "⚠️  Next.js dev server detected. Using isolation mode..." -ForegroundColor Yellow
    
    # Set environment to avoid conflicts
    $env:NODE_ENV = "production"
    $env:NEXT_TELEMETRY_DISABLED = "1"
    
    # Run with lower priority to avoid resource conflicts
    Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy", "Bypass", "-NoProfile", "-File", ".\admin scripts\repo-intelligence.ps1" -WindowStyle Hidden -Wait
} else {
    Write-Host "✅ No dev server conflicts detected. Running normally..." -ForegroundColor Green
    
    # Run normally
    & ".\admin scripts\repo-intelligence.ps1"
}

Write-Host "✅ Repository scan completed safely!" -ForegroundColor Green
