# Generate Missing Stories Files
Write-Host "GENERATING MISSING STORIES FILES" -ForegroundColor Cyan

$ComponentsNeedingStories = @("Calendar", "ColorPicker", "Command", "Dialog", "Separator", "Toggle", "Tooltip")
$BasePath = "src/components/ui"
$TotalCreated = 0

foreach ($Component in $ComponentsNeedingStories) {
    $ComponentPath = "$BasePath/$Component"
    $StoriesPath = "$ComponentPath/$Component.stories.tsx"
    
    if (Test-Path $ComponentPath) {
        if (-not (Test-Path $StoriesPath)) {
            $StoriesContent = "import type { Meta, StoryObj } from '@storybook/react';
import { $Component } from './$Component';

const meta: Meta<typeof $Component> = {
  title: 'Components/$Component',
  component: $Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithContent: Story = {
  args: {
    children: '$Component content',
  },
};"
            
            Set-Content -Path $StoriesPath -Value $StoriesContent -Encoding UTF8
            Write-Host "  ✓ Created: $Component/$Component.stories.tsx" -ForegroundColor Green
            $TotalCreated++
        } else {
            Write-Host "  • Already exists: $Component/$Component.stories.tsx" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ✗ Component directory not found: $Component" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "STORIES GENERATION COMPLETE" -ForegroundColor Cyan
Write-Host "Created: $TotalCreated new stories files" -ForegroundColor Green
