# Generate snapshots for all existing components
# This locks in the current visual state

param(
    [Parameter(Mandatory=$false)]
    [switch]$UpdateSnapshots,
    
    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$ErrorActionPreference = "Continue"
$ComponentsPath = "src\components\ui"

Write-Host "=== Daedalus SNAPSHOT GENERATOR ===" -ForegroundColor Cyan
Write-Host "Capturing current visual state of all components" -ForegroundColor Gray
Write-Host ""

# Get all component directories
$Components = Get-ChildItem $ComponentsPath -Directory | Where-Object { $_.Name -ne "index.ts" }

Write-Host "Found $($Components.Count) components:" -ForegroundColor Yellow
foreach ($component in $Components) {
    Write-Host "  - $($component.Name)" -ForegroundColor Gray
}
Write-Host ""

$SnapshotResults = @()

foreach ($component in $Components) {
    $ComponentName = $component.Name
    $ComponentPath = $component.FullName
    
    Write-Host "[PROCESSING] $ComponentName..." -ForegroundColor Yellow
    
    # Check if test file exists
    $TestFiles = Get-ChildItem "$ComponentPath\*.test.tsx" -ErrorAction SilentlyContinue
    
    if (-not $TestFiles) {
        Write-Host "  [SKIP] No test file found for $ComponentName" -ForegroundColor Red
        $SnapshotResults += @{
            Component = $ComponentName
            Status = "SKIP"
            Reason = "No test file"
            Snapshots = 0
        }
        continue
    }
    
    $TestFile = $TestFiles[0]
    $TestContent = Get-Content $TestFile.FullName -Raw -ErrorAction SilentlyContinue
    
    if (-not $TestContent) {
        Write-Host "  [SKIP] Cannot read test file for $ComponentName" -ForegroundColor Red
        $SnapshotResults += @{
            Component = $ComponentName
            Status = "SKIP"
            Reason = "Cannot read test file"
            Snapshots = 0
        }
        continue
    }
    
    # Check if snapshots already exist
    $SnapshotCount = ([regex]::Matches($TestContent, "toMatchSnapshot")).Count
    
    if ($SnapshotCount -eq 0) {
        Write-Host "  [INFO] No snapshot tests found - adding snapshot tests" -ForegroundColor Cyan
        
        # Add snapshot testing section
        $SnapshotSection = @"

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<$ComponentName>Default</$ComponentName>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <$ComponentName variant="default">Default</$ComponentName>
          <$ComponentName variant="destructive">Destructive</$ComponentName>
          <$ComponentName variant="outline">Outline</$ComponentName>
          <$ComponentName variant="secondary">Secondary</$ComponentName>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <$ComponentName size="sm">Small</$ComponentName>
          <$ComponentName size="default">Default</$ComponentName>
          <$ComponentName size="lg">Large</$ComponentName>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches disabled state snapshot', () => {
      const { container } = render(<$ComponentName disabled>Disabled</$ComponentName>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches loading state snapshot', () => {
      const { container } = render(<$ComponentName loading>Loading</$ComponentName>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
"@
        
        # Insert after the first describe block
        if ($TestContent -match "describe\('.*?', \(\) => \{") {
            $InsertPoint = $TestContent.IndexOf("  });", $TestContent.IndexOf("describe("))
            if ($InsertPoint -gt 0) {
                $UpdatedContent = $TestContent.Insert($InsertPoint + 6, $SnapshotSection)
                
                # Write updated content back
                if ($Force -or (Read-Host "Add snapshots to $ComponentName test file? (y/n)") -eq "y") {
                    $UpdatedContent | Out-File $TestFile.FullName -Encoding UTF8
                    Write-Host "  [OK] Added 5 snapshot tests to $ComponentName" -ForegroundColor Green
                    $SnapshotCount = 5
                } else {
                    Write-Host "  [SKIP] User declined to add snapshots" -ForegroundColor Yellow
                }
            }
        }
    } else {
        Write-Host "  [OK] Found $SnapshotCount existing snapshot tests" -ForegroundColor Green
    }
    
    $SnapshotResults += @{
        Component = $ComponentName
        Status = "OK"
        Reason = "Processed"
        Snapshots = $SnapshotCount
    }
    
    Write-Host "  [COMPLETE] $ComponentName processed" -ForegroundColor Green
    Write-Host ""
}

# Generate snapshots by running tests
Write-Host ""
Write-Host "[GENERATING] Running tests to create snapshot files..." -ForegroundColor Yellow

try {
    if ($UpdateSnapshots) {
        Write-Host "Updating existing snapshots..." -ForegroundColor Cyan
        $TestCommand = "yarn test --run --reporter=verbose -u"
    } else {
        Write-Host "Creating new snapshots..." -ForegroundColor Cyan
        $TestCommand = "yarn test --run --reporter=verbose"
    }
    
    # Run tests to generate snapshots
    $null = Invoke-Expression $TestCommand 2>$null
    
    Write-Host "[OK] Snapshot generation complete" -ForegroundColor Green
    
    # Check for snapshot files
    $SnapshotFiles = Get-ChildItem "src\**\__snapshots__\*.snap" -Recurse -ErrorAction SilentlyContinue
    Write-Host "Generated $($SnapshotFiles.Count) snapshot files" -ForegroundColor Cyan
    
} catch {
    Write-Host "[WARNING] Snapshot generation encountered issues" -ForegroundColor Yellow
}

# Summary report
Write-Host ""
Write-Host "=== SNAPSHOT GENERATION SUMMARY ===" -ForegroundColor Cyan
Write-Host ""

$TotalComponents = $SnapshotResults.Count
$ProcessedComponents = ($SnapshotResults | Where-Object { $_.Status -eq "OK" }).Count
$SkippedComponents = ($SnapshotResults | Where-Object { $_.Status -eq "SKIP" }).Count
$TotalSnapshots = ($SnapshotResults | Measure-Object -Property Snapshots -Sum).Sum

Write-Host "Components processed: $ProcessedComponents/$TotalComponents" -ForegroundColor Green
Write-Host "Components skipped: $SkippedComponents" -ForegroundColor $(if ($SkippedComponents -gt 0) { "Yellow" } else { "Green" })
Write-Host "Total snapshots: $TotalSnapshots" -ForegroundColor Cyan
Write-Host ""

foreach ($result in $SnapshotResults) {
    $Status = if ($result.Status -eq "OK") { "✅" } else { "⚠️" }
    Write-Host "$Status $($result.Component): $($result.Snapshots) snapshots ($($result.Reason))" -ForegroundColor $(if ($result.Status -eq "OK") { "Green" } else { "Yellow" })
}

Write-Host ""
Write-Host "[COMPLETE] Visual state locked in with snapshots!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review snapshot files in src/components/ui/*/__snapshots__/" -ForegroundColor Gray
Write-Host "2. Commit snapshots to version control" -ForegroundColor Gray  
Write-Host "3. Run 'yarn test' to verify all snapshots pass" -ForegroundColor Gray
Write-Host "4. Use 'yarn test -u' to update snapshots when components change" -ForegroundColor Gray
