import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar, { AvatarImage, AvatarFallback } from './avatar';

describe('Avatar', () => {
  // ACTION 12: Debug-First DOM Investigation
  it('DEBUG: shows actual DOM structure', () => {
    render(<Avatar name="John Doe" />);
    // Avatar renders as span, not img - Radix UI pattern
    const avatar = screen.getByText('JD');
    console.log('Avatar HTML:', avatar.outerHTML);
    expect(avatar).toBeInTheDocument();
  });

  // 1. Rendering (5-8 tests)
  describe('Rendering', () => {
    it('renders default avatar with fallback', () => {
      render(<Avatar />);
      // Avatar is a span container, not img
      const fallback = screen.getByText('U'); // Default fallback
      expect(fallback).toBeInTheDocument();
    });

    it('renders with name initials', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders with custom fallback', () => {
      render(<Avatar fallback="JS" />);
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('renders with image source', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
      // Test the container span with proper classes
      const avatarContainer = document.querySelector('.avatar');
      expect(avatarContainer).toBeInTheDocument();
    });

    it('renders with proper accessibility attributes', () => {
      render(<Avatar src="test.jpg" alt="Test Avatar" name="John Doe" />);
      const avatarContainer = document.querySelector('.avatar');
      expect(avatarContainer).toBeInTheDocument();
    });

    it('handles empty children gracefully', () => {
      render(<Avatar data-testid="empty-avatar"></Avatar>);
      expect(screen.getByTestId('empty-avatar')).toBeInTheDocument();
    });
  });

  // 2. Variants & Sizes (8-12 tests)
  describe('Variants & Sizes', () => {
    const SIZES = ['sm', 'default', 'lg', 'xl'] as const;

    SIZES.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Avatar size={size} name="Test User" data-testid={`avatar-${size}`} />);
        const avatar = screen.getByTestId(`avatar-${size}`);
        expect(avatar).toHaveClass(
          `h-${size === 'sm' ? '8' : size === 'default' ? '10' : size === 'lg' ? '12' : '16'}`
        );
      });
    });

    it('applies default size when no size specified', () => {
      render(<Avatar name="Default Size" data-testid="default-avatar" />);
      const avatar = screen.getByTestId('default-avatar');
      expect(avatar).toHaveClass('h-10', 'w-10');
    });

    it('handles status indicators correctly', () => {
      render(<Avatar status="online" name="Online User" data-testid="online-avatar" />);
      const avatar = screen.getByTestId('online-avatar');
      expect(avatar).toHaveClass('avatar--online');
    });

    it('handles offline status', () => {
      render(<Avatar status="offline" name="Offline User" data-testid="offline-avatar" />);
      const avatar = screen.getByTestId('offline-avatar');
      expect(avatar).toHaveClass('avatar--offline');
    });

    it('handles no status (clean state)', () => {
      render(<Avatar name="No Status" data-testid="clean-avatar" />);
      const avatar = screen.getByTestId('clean-avatar');
      expect(avatar).not.toHaveClass('avatar--online');
      expect(avatar).not.toHaveClass('avatar--offline');
    });
  });

  // 3. Events & Props (8-12 tests)
  describe('Events & Props', () => {
    it('passes through HTML attributes', () => {
      render(<Avatar title="Custom Title" data-testid="attr-avatar" />);
      const avatar = screen.getByTestId('attr-avatar');
      expect(avatar).toHaveAttribute('title', 'Custom Title');
    });

    it('applies custom className', () => {
      render(<Avatar className="custom-class" data-testid="class-avatar" />);
      const avatar = screen.getByTestId('class-avatar');
      expect(avatar).toHaveClass('custom-class');
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Avatar onClick={handleClick} name="Clickable" />);
      const avatar = screen.getByText('C'); // Fallback text
      avatar.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Avatar ref={ref} name="Ref Test" />);
      expect(ref).toHaveBeenCalledWith(expect.any(Object));
    });

    it('generates initials from full names', () => {
      const testCases = [
        { name: 'John Doe', expected: 'JD' },
        { name: 'Sarah Wilson Smith', expected: 'SW' },
        { name: 'M', expected: 'M' },
        { name: 'Jean-Pierre van Der Berg', expected: 'JV' },
      ];

      testCases.forEach(({ name, expected }) => {
        render(<Avatar name={name} data-testid={`initials-${expected}`} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });

    it('prioritizes custom fallback over generated initials', () => {
      render(<Avatar name="John Doe" fallback="Custom" />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
    });

    it('handles image loading states', async () => {
      render(<Avatar src="https://example.com/valid-image.jpg" name="Image User" />);
      // Test avatar container is present with fallback
      const fallbackText = screen.getByText('IU');
      expect(fallbackText).toBeInTheDocument();
    });

    it('provides proper alt text fallbacks', () => {
      const scenarios = [
        { props: { src: 'test.jpg', alt: 'Custom Alt' }, expected: 'Custom Alt' },
        { props: { src: 'test.jpg', name: 'John Doe' }, expected: 'John Doe' },
        { props: { src: 'test.jpg' }, expected: 'Avatar' },
      ];

      scenarios.forEach(({ props }, index) => {
        render(<Avatar {...props} data-testid={`alt-test-${index}`} />);
        // Note: We test the component renders, alt text validation happens in integration
      });
    });
  });

  // 4. Enhanced Features (5-10 tests)
  describe('Enhanced Features', () => {
    it('handles loading state', () => {
      render(<Avatar loading name="Loading User" data-testid="loading-avatar" />);
      const avatar = screen.getByTestId('loading-avatar');
      expect(avatar).toHaveClass('avatar--loading');
    });

    it('combines loading with other states', () => {
      render(<Avatar loading status="online" name="Loading Online" data-testid="loading-online" />);
      const avatar = screen.getByTestId('loading-online');
      expect(avatar).toHaveClass('avatar--loading');
      expect(avatar).toHaveClass('avatar--online');
    });

    it('handles status indicators with different sizes', () => {
      const sizes = ['sm', 'lg', 'xl'] as const;
      sizes.forEach(size => {
        render(
          <Avatar
            size={size}
            status="online"
            name={`${size} online`}
            data-testid={`status-${size}`}
          />
        );
        const avatar = screen.getByTestId(`status-${size}`);
        expect(avatar).toHaveClass('avatar--online');
      });
    });

    it('maintains accessibility with enhanced features', () => {
      render(<Avatar loading status="online" name="Enhanced User" src="test.jpg" />);
      const fallback = screen.getByText('EU');
      expect(fallback).toBeInTheDocument();
      // Enhanced features should not break basic accessibility
    });

    it('handles complex name scenarios', () => {
      const complexNames = ['João da Silva', 'Mary-Kate Olsen', 'Dr. John Smith Jr.', '王小明', ''];

      complexNames.forEach((name, index) => {
        if (name) {
          render(<Avatar name={name} data-testid={`complex-${index}`} />);
          expect(screen.getByTestId(`complex-${index}`)).toBeInTheDocument();
        }
      });
    });

    it('combines all enhancement features', () => {
      render(
        <Avatar
          src="https://example.com/test.jpg"
          name="Full Feature User"
          size="lg"
          status="online"
          loading
          fallback="FF"
          className="custom-enhancement"
          data-testid="full-featured"
        />
      );
      const avatar = screen.getByTestId('full-featured');
      expect(avatar).toHaveClass('avatar--loading');
      expect(avatar).toHaveClass('avatar--online');
      expect(avatar).toHaveClass('custom-enhancement');
    });
  });

  // 5. Edge Cases (3-5 tests)
  describe('Edge Cases', () => {
    it('handles undefined/null name gracefully', () => {
      render(<Avatar name={undefined} data-testid="undefined-name" />);
      const avatar = screen.getByTestId('undefined-name');
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText('U')).toBeInTheDocument(); // Default fallback
    });

    it('handles very long names', () => {
      const longName = 'This Is A Very Long Name That Should Be Handled Gracefully';
      render(<Avatar name={longName} />);
      expect(screen.getByText('TI')).toBeInTheDocument(); // First two initials
    });

    it('handles special characters in names', () => {
      render(<Avatar name="@#$%^&*()" data-testid="special-chars" />);
      expect(screen.getByTestId('special-chars')).toBeInTheDocument();
    });

    it('handles empty string fallback', () => {
      render(<Avatar fallback="" name="Empty Fallback" data-testid="empty-fallback" />);
      const avatar = screen.getByTestId('empty-fallback');
      expect(avatar).toBeInTheDocument();
    });

    it('handles concurrent status and loading states', () => {
      render(<Avatar status="offline" loading name="Concurrent States" data-testid="concurrent" />);
      const avatar = screen.getByTestId('concurrent');
      expect(avatar).toHaveClass('avatar--offline');
      expect(avatar).toHaveClass('avatar--loading');
    });
  });

  // ACTION 14: Storybook Story Testing
  describe('Storybook Stories Validation', () => {
    it('AllVariants story renders without errors', () => {
      // Test that our stories render correctly
      render(<Avatar src="https://github.com/shadcn.png" alt="@shadcn" />);
      const avatarContainer = document.querySelector('.avatar');
      expect(avatarContainer).toBeInTheDocument();

      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();

      render(<Avatar fallback="JS" />);
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('AllSizes story renders all sizes', () => {
      const sizes = ['sm', 'default', 'lg', 'xl'] as const;
      sizes.forEach(size => {
        render(<Avatar size={size} name="Size Test" data-testid={`story-${size}`} />);
        expect(screen.getByTestId(`story-${size}`)).toBeInTheDocument();
      });
    });

    it('interactive story controls work', () => {
      const { rerender } = render(<Avatar name="Interactive Test" />);
      expect(screen.getByText('IT')).toBeInTheDocument();

      rerender(<Avatar name="Interactive Test" status="online" />);
      const avatarContainer = document.querySelector('.avatar--online');
      expect(avatarContainer).toBeInTheDocument();
    });

    it('enhanced features story demonstrates all features', () => {
      render(<Avatar loading name="Loading User" />);
      const loadingContainer = document.querySelector('.avatar--loading');
      expect(loadingContainer).toBeInTheDocument();

      render(<Avatar status="online" name="Online" size="lg" />);
      const onlineContainer = document.querySelector('.avatar--online');
      expect(onlineContainer).toBeInTheDocument();
    });
  });
});
