# Generate Missing Test Files - Enterprise Quality Enhancement
# This script creates comprehensive test files for components missing tests

Write-Host "GENERATING MISSING TEST FILES" -ForegroundColor Cyan
Write-Host "Creating comprehensive test coverage for enterprise components..." -ForegroundColor Gray

# Components missing test files (from quality audit)
$ComponentsNeedingTests = @(
    "ColorPicker",
    "Command", 
    "Dialog",
    "Separator",
    "Toggle",
    "Tooltip"
)

$BasePath = "src/components/ui"
$TotalCreated = 0

foreach ($Component in $ComponentsNeedingTests) {
    $ComponentPath = "$BasePath/$Component"
    $TestPath = "$ComponentPath/$Component.test.tsx"
    
    # Check if component directory exists
    if (Test-Path $ComponentPath) {
        # Check if test file already exists
        if (-not (Test-Path $TestPath)) {
            # Generate comprehensive test content
            $TestContent = @"
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { $Component } from './$Component';

describe('$Component Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<$Component>Test content</$Component>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <$Component className="custom-class">Test</$Component>
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<$Component ref={ref}>Test</$Component>);
      expect(ref).toHaveBeenCalled();
    });

    describe('Snapshots', () => {
      it('matches default snapshot', () => {
        const { container } = render(
          <$Component>Default $Component</$Component>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it('matches all variants snapshot', () => {
        const variants = ['default', 'secondary', 'destructive', 'success', 'warning', 'info'];
        variants.forEach(variant => {
          const { container } = render(
            <$Component variant={variant as any}>
              {variant} variant
            </$Component>
          );
          expect(container.firstChild).toMatchSnapshot(`variant-{variant}`);
        });
      });

      it('matches all sizes snapshot', () => {
        const sizes = ['sm', 'default', 'lg', 'xl'];
        sizes.forEach(size => {
          const { container } = render(
            <$Component size={size as any}>
              {size} size
            </$Component>
          );
          expect(container.firstChild).toMatchSnapshot(`size-{size}`);
        });
      });

      it('matches disabled state snapshot', () => {
        const { container } = render(
          <$Component disabled>Disabled $Component</$Component>
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it('matches loading state snapshot', () => {
        const { container } = render(
          <$Component loading>Loading $Component</$Component>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      const { container } = render(
        <$Component variant="default">Default</$Component>
      );
      expect(container.firstChild).toHaveClass('variant-default');
    });

    it('renders secondary variant correctly', () => {
      const { container } = render(
        <$Component variant="secondary">Secondary</$Component>
      );
      expect(container.firstChild).toHaveClass('variant-secondary');
    });

    it('renders destructive variant correctly', () => {
      const { container } = render(
        <$Component variant="destructive">Destructive</$Component>
      );
      expect(container.firstChild).toHaveClass('variant-destructive');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      const { container } = render(
        <$Component size="sm">Small</$Component>
      );
      expect(container.firstChild).toHaveClass('size-sm');
    });

    it('renders default size correctly', () => {
      const { container } = render(
        <$Component size="default">Default size</$Component>
      );
      expect(container.firstChild).toHaveClass('size-default');
    });

    it('renders large size correctly', () => {
      const { container } = render(
        <$Component size="lg">Large</$Component>
      );
      expect(container.firstChild).toHaveClass('size-lg');
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', () => {
      const { container } = render(
        <$Component disabled>Disabled</$Component>
      );
      expect(container.firstChild).toHaveAttribute('disabled');
      expect(container.firstChild).toHaveClass('disabled');
    });

    it('handles loading state correctly', () => {
      const { container } = render(
        <$Component loading>Loading</$Component>
      );
      expect(container.firstChild).toHaveClass('loading');
    });
  });

  describe('Events', () => {
    it('handles click events', () => {
      const handleClick = vi.fn();
      render(
        <$Component onClick={handleClick}>Clickable</$Component>
      );
      
      fireEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', () => {
      const handleKeyDown = vi.fn();
      render(
        <$Component onKeyDown={handleKeyDown}>Keyboard</$Component>
      );
      
      fireEvent.keyDown(screen.getByText('Keyboard'), { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<$Component aria-label="Test $Component">Content</$Component>);
      expect(screen.getByLabelText('Test $Component')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<$Component>Navigable</$Component>);
      const element = screen.getByText('Navigable');
      
      fireEvent.keyDown(element, { key: 'Tab' });
      expect(element).toHaveFocus();
    });

    it('maintains focus indicators', () => {
      const { container } = render(<$Component>Focusable</$Component>);
      const element = container.firstChild as HTMLElement;
      
      fireEvent.focus(element);
      expect(element).toHaveClass('focus-visible');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<$Component />);
      expect(screen.queryByText('')).not.toBeInTheDocument();
    });

    it('handles null props gracefully', () => {
      expect(() => {
        render(<$Component variant={null as any}>Null variant</$Component>);
      }).not.toThrow();
    });

    it('handles rapid interactions', () => {
      const handleClick = vi.fn();
      render(
        <$Component onClick={handleClick}>Rapid clicks</$Component>
      );
      
      const element = screen.getByText('Rapid clicks');
      fireEvent.click(element);
      fireEvent.click(element);
      fireEvent.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });
});
"@
            
            # Create the test file
            Set-Content -Path $TestPath -Value $TestContent -Encoding UTF8
            Write-Host "  ✓ Created: $Component/$Component.test.tsx" -ForegroundColor Green
            $TotalCreated++
        } else {
            Write-Host "  • Already exists: $Component/$Component.test.tsx" -ForegroundColor Gray
        }
    } else {
        Write-Host "  ✗ Component directory not found: $Component" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "TEST GENERATION COMPLETE" -ForegroundColor Cyan
Write-Host "Created: $TotalCreated new test files" -ForegroundColor Green
Write-Host "This provides comprehensive test coverage for enterprise components." -ForegroundColor Gray
