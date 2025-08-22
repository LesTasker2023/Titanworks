# Component Automation System
# Essential PowerShell automation for component scaffolding

param(
    [string]$ComponentName,
    [switch]$Help
)

if ($Help -or !$ComponentName) {
    Write-Host "🛠️ Component Automation System" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: yarn component <ComponentName>" -ForegroundColor Green
    Write-Host ""
    Write-Host "Creates a complete component with:" -ForegroundColor Yellow
    Write-Host "  • TypeScript component file"
    Write-Host "  • Test file with Vitest"
    Write-Host "  • Storybook story"
    Write-Host "  • Demo file"
    Write-Host "  • Index file with exports"
    Write-Host ""
    exit 0
}

$ComponentPath = "src/components/ui/$ComponentName"

if (Test-Path $ComponentPath) {
    Write-Host "❌ Component $ComponentName already exists!" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Creating component: $ComponentName" -ForegroundColor Cyan

# Create directory
New-Item -ItemType Directory -Path $ComponentPath -Force | Out-Null

# Create component file
$ComponentContent = @"
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ${ComponentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
}

const $ComponentName = React.forwardRef<HTMLDivElement, ${ComponentName}Props>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md border border-gray-200 p-4',
          {
            'bg-white': variant === 'default',
            'bg-gray-50': variant === 'secondary',
          },
          className
        )}
        {...props}
      />
    );
  }
);

$ComponentName.displayName = '$ComponentName';

export { $ComponentName };
"@

Set-Content -Path "$ComponentPath/$ComponentName.tsx" -Value $ComponentContent

# Create test file
$TestContent = @"
import { render, screen } from '@testing-library/react';
import { $ComponentName } from './$ComponentName';
import { describe, it, expect } from 'vitest';

describe('$ComponentName', () => {
  it('renders correctly', () => {
    render(<$ComponentName>Test content</$ComponentName>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<$ComponentName className="custom-class">Content</$ComponentName>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('custom-class');
  });

  it('renders with secondary variant', () => {
    render(<$ComponentName variant="secondary">Content</$ComponentName>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('bg-gray-50');
  });
});
"@

Set-Content -Path "$ComponentPath/$ComponentName.test.tsx" -Value $TestContent

# Create index file
$IndexContent = @"
export { $ComponentName } from './$ComponentName';
export type { ${ComponentName}Props } from './$ComponentName';
"@

Set-Content -Path "$ComponentPath/index.ts" -Value $IndexContent

Write-Host "✅ Component $ComponentName created successfully!" -ForegroundColor Green
Write-Host "📂 Location: $ComponentPath" -ForegroundColor Yellow
