# =========================================
# Generate Vercel Environment Variable Instructions
# =========================================

param(
    [Parameter(Mandatory=$false)]
    [string]$Project = "all"
)

# Project mappings
$Projects = @{
    "triggerkings" = @{
        "envFile" = ".env.triggerkings.example"
        "projectName" = "triggerkings"
        "description" = "TRIGGER KINGS - Mobile Paintball"
    }
    "titanworks" = @{
        "envFile" = ".env.titanworks.example"
        "projectName" = "titanworks"
        "description" = "TITANWORKS - 3D Printing Services"
    }
    "project-snatch" = @{
        "envFile" = ".env.project-snatch.example"
        "projectName" = "project-snatch"
        "description" = "PROJECT SNATCH - Private R&D"
    }
    "bbcwoira" = @{
        "envFile" = ".env.bbcwoira.example"
        "projectName" = "bbcwoira"
        "description" = "BBC WOIRA - Knowledge Base"
    }
    "olympuscomps" = @{
        "envFile" = ".env.olympuscomps.example"
        "projectName" = "olympuscomps"
        "description" = "OLYMPUS COMPETITIONS - Premium Raffles"
    }
    "strongsalts" = @{
        "envFile" = ".env.strongsalts.example"
        "projectName" = "strongsalts"
        "description" = "STRONG SALTS - Gym Supplements"
    }
    "till-death" = @{
        "envFile" = ".env.till-death.example"
        "projectName" = "till-death"
        "description" = "TILL DEATH - Alternative Weddings"
    }
    "portfolio" = @{
        "envFile" = ".env.lestasker.example"
        "projectName" = "portfolio"
        "description" = "LES TASKER - Portfolio"
    }
}

function Generate-EnvInstructions($projectKey, $projectInfo) {
    $envFile = $projectInfo.envFile
    $projectName = $projectInfo.projectName
    $description = $projectInfo.description
    
    if (!(Test-Path $envFile)) {
        Write-Host "ERROR: Environment file not found: $envFile" -ForegroundColor Red
        return
    }
    
    $outputFile = "scripts/vercel-envs-$projectKey.txt"
    
    $content = @"
# =========================================
# Vercel Environment Variables for $description
# =========================================
# Copy these values into Vercel Dashboard
# Project: $projectName
# URL: https://vercel.com/dashboard -> $projectName -> Settings -> Environment Variables

# Instructions:
# 1. Go to: https://vercel.com/dashboard
# 2. Select project: $projectName
# 3. Go to: Settings -> Environment Variables
# 4. For each variable below, click "Add New"
# 5. Set Environment: Production, Preview, Development (all three)
# 6. Copy Key and Value exactly as shown

"@

    # Read environment file and parse variables
    $envVars = Get-Content $envFile | Where-Object { 
        $_ -match "^NEXT_PUBLIC_" -and $_ -notmatch "^#" 
    }
    
    $varCount = 0
    foreach ($line in $envVars) {
        if ($line -match "^([^=]+)=(.+)$") {
            $key = $matches[1]
            $value = $matches[2].Trim("'`"")  # Remove quotes
            $varCount++
            
            # Add some categorization based on variable name
            if ($key -match "SITE_NAME|SITE_TITLE|SITE_DESCRIPTION|SITE_URL") {
                if ($varCount -eq 1) {
                    $content += "`n# Core Site Metadata"
                }
            } elseif ($key -match "BRAND_") {
                $content += "`n# Brand Customization"
            } elseif ($key -match "THEME_") {
                $content += "`n# Theme Colors"
            }
            
            $content += "`nKey: $key"
            $content += "`nValue: $value"
            $content += ""
        }
    }
    
    $content += @"

# =========================================
# TOTAL: $varCount environment variables
# NEXT STEP: After adding all variables, trigger a new deployment
# =========================================
"@

    # Write to file
    $content | Out-File -FilePath $outputFile -Encoding UTF8
    
    Write-Host "GENERATED: $outputFile" -ForegroundColor Green
    Write-Host "   Project: $projectName" -ForegroundColor Gray
    Write-Host "   Variables: $varCount" -ForegroundColor Gray
}

# Main execution
if ($Project -eq "all") {
    Write-Host "Generating Vercel environment instructions for all projects..." -ForegroundColor Cyan
    Write-Host ("=" * 60) -ForegroundColor Gray
    
    foreach ($projectKey in $Projects.Keys) {
        Generate-EnvInstructions $projectKey $Projects[$projectKey]
    }
    
    Write-Host ""
    Write-Host "COMPLETE: All instruction files generated in scripts/ directory" -ForegroundColor Cyan
    Write-Host "NEXT: Open each .txt file and copy environment variables to Vercel dashboard" -ForegroundColor Yellow
    
} else {
    if ($Projects.ContainsKey($Project)) {
        Generate-EnvInstructions $Project $Projects[$Project]
    } else {
        Write-Host "ERROR: Unknown project: $Project" -ForegroundColor Red
        Write-Host "Available projects: $($Projects.Keys -join ', ')" -ForegroundColor Yellow
    }
}