# =========================================
# Vercel Multi-Tenant Environment Setup Script
# =========================================
# Sets up environment variables for all domain projects

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("clear", "deploy", "list", "backup")]
    [string]$Action = "deploy"
)

# Project mappings (project-name -> env-file)
$Projects = @{
    "triggerkings" = ".env.triggerkings.example"
    "titanworks" = ".env.titanworks.example"
    "project-snatch" = ".env.project-snatch.example"
    "bbcwoira" = ".env.bbcwoira.example"
    "olympuscomps" = ".env.olympuscomps.example"
    "strongsalts" = ".env.strongsalts.example"
    "till-death" = ".env.till-death.example"
    "portfolio" = ".env.lestasker.example"
}

function Write-Header($message) {
    Write-Host ""
    Write-Host "TARGET: $message" -ForegroundColor Cyan
    Write-Host ("=" * 50) -ForegroundColor Gray
}

function Clear-ProjectEnvs($projectName) {
    Write-Host "CLEAR: Clearing env vars for: $projectName" -ForegroundColor Yellow
    
    # Note: Vercel CLI doesn't support --project flag for env commands
    # User will need to switch context or use dashboard
    Write-Host "WARNING: To clear env vars for $projectName" -ForegroundColor Red
    Write-Host "   1. Go to https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   2. Select project: $projectName" -ForegroundColor White
    Write-Host "   3. Settings -> Environment Variables" -ForegroundColor White
    Write-Host "   4. Delete variables manually (no bulk delete available)" -ForegroundColor White
    Write-Host ""
}

function Deploy-ProjectEnvs($projectName, $envFile) {
    if (!(Test-Path $envFile)) {
        Write-Host "ERROR: Env file not found: $envFile" -ForegroundColor Red
        return
    }
    
    Write-Host "DEPLOY: Setting up env vars for: $projectName" -ForegroundColor Green
    Write-Host "   Using: $envFile" -ForegroundColor Gray
    
    # Read env file and extract variables
    $envVars = Get-Content $envFile | Where-Object { 
        $_ -match "^NEXT_PUBLIC_" -and $_ -notmatch "^#" 
    }
    
    Write-Host "   Found $($envVars.Count) environment variables:" -ForegroundColor Gray
    
    foreach ($line in $envVars) {
        if ($line -match "^([^=]+)=(.+)$") {
            $key = $matches[1]
            $value = $matches[2].Trim("'`"")
            Write-Host "   - $key" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "WARNING: Manual steps required:" -ForegroundColor Yellow
    Write-Host "   1. Go to https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "   2. Select project: $projectName" -ForegroundColor White
    Write-Host "   3. Settings -> Environment Variables" -ForegroundColor White
    Write-Host "   4. Add each variable shown above" -ForegroundColor White
    Write-Host "   5. Set environment to: Production, Preview, Development" -ForegroundColor White
    Write-Host ""
}

function List-Projects() {
    Write-Header "Available Projects"
    
    foreach ($project in $Projects.Keys) {
        $envFile = $Projects[$project]
        $exists = Test-Path $envFile
        $status = if ($exists) { "OK" } else { "MISSING" }
        
        Write-Host "$status $project" -ForegroundColor $(if ($exists) { "Green" } else { "Red" })
        Write-Host "   File: $envFile" -ForegroundColor Gray
    }
}

function Backup-CurrentEnvs() {
    Write-Header "Backing Up Environment Variables"
    Write-Host "WARNING: Vercel CLI doesn't support cross-project env backup." -ForegroundColor Yellow
    Write-Host "   You'll need to backup each project manually from dashboard." -ForegroundColor White
}

# Main execution
switch ($Action) {
    "clear" {
        Write-Header "Clearing Environment Variables"
        foreach ($project in $Projects.Keys) {
            Clear-ProjectEnvs $project
        }
    }
    
    "deploy" {
        Write-Header "Deploying Environment Variables"
        foreach ($project in $Projects.Keys) {
            $envFile = $Projects[$project]
            Deploy-ProjectEnvs $project $envFile
        }
    }
    
    "list" {
        List-Projects
    }
    
    "backup" {
        Backup-CurrentEnvs
    }
}

Write-Host ""
Write-Host "COMPLETE: Script finished!" -ForegroundColor Cyan
Write-Host "TIP: Use Vercel dashboard for actual env var management" -ForegroundColor Yellow