import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Progress from './progress';

describe('Progress Component', () => {
  // 1. Rendering Tests (7 tests)
  describe('Rendering', () => {
    it('renders progress with value', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders with default value of 0 when no value provided', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(<Progress value={50} className="custom-class" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('custom-class');
    });

    it('passes through HTML attributes', () => {
      render(<Progress value={50} data-testid="progress-test" aria-label="Test progress" />);
      const progress = screen.getByTestId('progress-test');
      expect(progress).toHaveAttribute('aria-label', 'Test progress');
    });

    it('renders with correct progress indicator transform', () => {
      render(<Progress value={75} />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-25%)');
    });

    it('displays correct displayName', () => {
      expect(Progress.displayName).toBe('Progress');
    });
  });

  // 2. Variants Tests (4 tests)
  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Progress value={50} variant="default" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('bg-primary/20');
    });

    it('renders success variant correctly', () => {
      render(<Progress value={50} variant="success" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('bg-green-100', 'dark:bg-green-900/20');
    });

    it('renders warning variant correctly', () => {
      render(<Progress value={50} variant="warning" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('bg-yellow-100', 'dark:bg-yellow-900/20');
    });

    it('renders danger variant correctly', () => {
      render(<Progress value={50} variant="danger" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('bg-red-100', 'dark:bg-red-900/20');
    });
  });

  // 3. Sizes Tests (4 tests)
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Progress value={50} size="sm" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-1');
    });

    it('renders default size correctly', () => {
      render(<Progress value={50} size="default" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-2');
    });

    it('renders large size correctly', () => {
      render(<Progress value={50} size="lg" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-3');
    });

    it('renders extra large size correctly', () => {
      render(<Progress value={50} size="xl" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-4');
    });
  });

  // 4. Enhanced Features Tests (12 tests)
  describe('Enhanced Features', () => {
    describe('Label functionality', () => {
      it('does not show label by default', () => {
        render(<Progress value={75} />);
        expect(screen.queryByText('75%')).not.toBeInTheDocument();
      });

      it('shows outside label when showLabel is true', () => {
        render(<Progress value={75} showLabel />);
        expect(screen.getByText('75%')).toBeInTheDocument();
        expect(screen.getByText('75%')).toHaveClass('progress__label--outside');
      });

      it('shows inside label when labelPosition is inside', () => {
        render(<Progress value={75} showLabel labelPosition="inside" />);
        expect(screen.getByText('75%')).toBeInTheDocument();
        expect(screen.getByText('75%')).toHaveClass('progress__label--inside');
      });

      it('renders wrapper div when outside label is shown', () => {
        render(<Progress value={75} showLabel labelPosition="outside" />);
        const wrapper = screen.getByText('75%').closest('.progress-wrapper');
        expect(wrapper).toBeInTheDocument();
      });

      it('does not render wrapper div when inside label is shown', () => {
        render(<Progress value={75} showLabel labelPosition="inside" />);
        const wrapper = document.querySelector('.progress-wrapper');
        expect(wrapper).not.toBeInTheDocument();
      });

      it('rounds percentage values correctly', () => {
        render(<Progress value={66.666} showLabel />);
        expect(screen.getByText('67%')).toBeInTheDocument();
      });
    });

    describe('Animation and styling features', () => {
      it('applies animated class when animated prop is true', () => {
        render(<Progress value={50} animated />);
        const progress = screen.getByRole('progressbar');
        expect(progress).toHaveClass('progress--animated');
      });

      it('applies striped class when striped prop is true', () => {
        render(<Progress value={50} striped />);
        const progress = screen.getByRole('progressbar');
        expect(progress).toHaveClass('progress--striped');
      });

      it('applies both animated and striped classes together', () => {
        render(<Progress value={50} animated striped />);
        const progress = screen.getByRole('progressbar');
        expect(progress).toHaveClass('progress--animated', 'progress--striped');
      });

      it('applies indicator animation class when animated', () => {
        render(<Progress value={50} animated />);
        const progress = screen.getByRole('progressbar');
        const indicator = progress.firstElementChild as HTMLElement;
        expect(indicator).toHaveClass('progress__indicator--animated');
      });

      it('applies correct indicator variant classes', () => {
        render(<Progress value={50} variant="success" />);
        const progress = screen.getByRole('progressbar');
        const indicator = progress.firstElementChild as HTMLElement;
        expect(indicator).toHaveClass('bg-green-500');
      });

      it('applies correct transition duration', () => {
        render(<Progress value={50} />);
        const progress = screen.getByRole('progressbar');
        const indicator = progress.firstElementChild as HTMLElement;
        expect(indicator).toHaveClass('duration-300', 'ease-in-out');
      });
    });
  });

  // 5. Value Handling Tests (8 tests)
  describe('Value Handling', () => {
    it('handles zero value correctly', () => {
      render(<Progress value={0} />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-100%)');
    });

    it('handles 100% value correctly', () => {
      render(<Progress value={100} />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-0%)');
    });

    it('handles mid-range values correctly', () => {
      render(<Progress value={45} />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-55%)');
    });

    it('handles undefined value as 0', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-100%)');
    });

    it('handles decimal values correctly', () => {
      render(<Progress value={33.33} showLabel />);
      expect(screen.getByText('33%')).toBeInTheDocument();
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-66.67%)');
    });

    it('handles negative values gracefully', () => {
      render(<Progress value={-10} showLabel />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-110%)');
      expect(screen.getByText('-10%')).toBeInTheDocument();
    });

    it('handles values over 100 gracefully', () => {
      render(<Progress value={150} showLabel />);
      const progress = screen.getByRole('progressbar');
      const indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(--50%)');
      expect(screen.getByText('150%')).toBeInTheDocument();
    });

    it('handles very small decimal values', () => {
      render(<Progress value={0.1} showLabel />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  // 6. Accessibility Tests (6 tests)
  describe('Accessibility', () => {
    it('has correct role attribute', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('role', 'progressbar');
    });

    it('has correct default aria-valuemin and aria-valuemax', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('supports custom aria attributes', () => {
      render(<Progress value={50} aria-label="File upload progress" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-label', 'File upload progress');
    });

    it('supports aria-describedby for detailed descriptions', () => {
      render(
        <div>
          <Progress value={60} aria-describedby="progress-desc" />
          <div id="progress-desc">Uploading document.pdf</div>
        </div>
      );
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-describedby', 'progress-desc');
    });

    it('label text is accessible to screen readers', () => {
      render(<Progress value={85} showLabel labelPosition="outside" />);
      const label = screen.getByText('85%');
      expect(label).toBeInTheDocument();
    });

    it('maintains focus accessibility', () => {
      render(<Progress value={50} tabIndex={0} />);
      const progress = screen.getByRole('progressbar');
      progress.focus();
      expect(progress).toHaveFocus();
    });
  });

  // 7. Edge Cases Tests (6 tests)
  describe('Edge Cases', () => {
    it('handles missing variant prop gracefully', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('bg-primary/20'); // default variant
    });

    it('handles missing size prop gracefully', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('h-2'); // default size
    });

    it('handles combination of all enhanced features', () => {
      render(
        <Progress
          value={65}
          variant="success"
          size="lg"
          showLabel
          labelPosition="inside"
          animated
          striped
        />
      );
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass(
        'bg-green-100',
        'h-3',
        'progress--animated',
        'progress--striped'
      );
      expect(screen.getByText('65%')).toHaveClass('progress__label--inside');
    });

    it('handles rapid value changes', () => {
      const { rerender } = render(<Progress value={0} />);

      rerender(<Progress value={50} />);
      let progress = screen.getByRole('progressbar');
      let indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-50%)');

      rerender(<Progress value={100} />);
      progress = screen.getByRole('progressbar');
      indicator = progress.firstElementChild as HTMLElement;
      expect(indicator).toHaveStyle('transform: translateX(-0%)');
    });

    it('handles very long custom classNames', () => {
      const longClassName =
        'very-long-custom-class-name-that-might-cause-issues-with-rendering-or-performance';
      render(<Progress value={50} className={longClassName} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass(longClassName);
    });

    it('handles boolean props correctly', () => {
      render(<Progress value={50} animated={false} striped={false} showLabel={false} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).not.toHaveClass('progress--animated', 'progress--striped');
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });
  });
});
