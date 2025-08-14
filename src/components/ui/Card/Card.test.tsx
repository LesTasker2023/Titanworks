import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card Components', () => {
  describe('Card - Rendering', () => {
    it('renders without crashing', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('displays correct content', () => {
      render(<Card>Hello World</Card>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Card className="custom-class">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Test</Card>);
      expect(ref.current).toBeInTheDocument();
    });
  });

  describe('Card - Variants', () => {
    it('renders default variant', () => {
      render(<Card variant="default">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('border-border', 'bg-card');
    });

    it('renders success variant', () => {
      render(<Card variant="success">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('border-green-200', 'bg-green-50');
    });

    it('renders warning variant', () => {
      render(<Card variant="warning">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('border-yellow-200', 'bg-yellow-50');
    });

    it('renders danger variant', () => {
      render(<Card variant="danger">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('border-red-200', 'bg-red-50');
    });
  });

  describe('Card - Sizes', () => {
    it('renders small size', () => {
      render(<Card size="sm">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('text-sm');
    });

    it('renders default size', () => {
      render(<Card size="default">Test</Card>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(<Card size="lg">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('text-lg');
    });

    it('renders extra large size', () => {
      render(<Card size="xl">Test</Card>);
      expect(screen.getByText('Test')).toHaveClass('text-xl');
    });
  });

  describe('Card - States', () => {
    it('renders loading state', () => {
      render(<Card loading>Test</Card>);
      const card = screen.getByText('Test');
      expect(card).toHaveClass('relative');
      // Check for loading spinner
      expect(card.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('renders disabled state', () => {
      render(<Card disabled>Test</Card>);
      const card = screen.getByText('Test');
      expect(card).toHaveClass('opacity-50', 'pointer-events-none');
    });
  });

  describe('Card - Events', () => {
    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Test</Card>);
      fireEvent.click(screen.getByText('Test'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Card - Accessibility', () => {
    it('supports aria-label', () => {
      render(<Card aria-label="Test card">Test</Card>);
      expect(screen.getByLabelText('Test card')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders without crashing', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>);
      expect(screen.getByText('Header')).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('renders without crashing', () => {
      render(<CardTitle>Title Content</CardTitle>);
      expect(screen.getByText('Title Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      expect(screen.getByText('Title')).toHaveClass('custom-title');
    });
  });

  describe('CardDescription', () => {
    it('renders without crashing', () => {
      render(<CardDescription>Description Content</CardDescription>);
      expect(screen.getByText('Description Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardDescription className="custom-description">Description</CardDescription>);
      expect(screen.getByText('Description')).toHaveClass('custom-description');
    });
  });

  describe('CardContent', () => {
    it('renders without crashing', () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>);
      expect(screen.getByText('Content')).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    it('renders without crashing', () => {
      render(<CardFooter>Footer Content</CardFooter>);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>);
      expect(screen.getByText('Footer')).toHaveClass('custom-footer');
    });
  });

  describe('Complete Card with all components', () => {
    it('renders full card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Test Content</p>
          </CardContent>
          <CardFooter>
            <p>Test Footer</p>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('renders card with variant and size', () => {
      render(
        <Card variant="success" size="lg">
          <CardHeader>
            <CardTitle>Success Card</CardTitle>
          </CardHeader>
          <CardContent>Success content</CardContent>
        </Card>
      );

      const card = screen.getByText('Success Card').closest('[class*="border-green-200"]');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('text-lg');
    });
  });

  describe('Snapshots', () => {
    it('matches default card snapshot', () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>This is a default card</CardDescription>
          </CardHeader>
          <CardContent>Card content goes here</CardContent>
          <CardFooter>Card footer</CardFooter>
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches all variants snapshot', () => {
      const { container } = render(
        <div>
          <Card variant="default">
            <CardContent>Default variant</CardContent>
          </Card>
          <Card variant="success">
            <CardContent>Success variant</CardContent>
          </Card>
          <Card variant="warning">
            <CardContent>Warning variant</CardContent>
          </Card>
          <Card variant="danger">
            <CardContent>Danger variant</CardContent>
          </Card>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches all sizes snapshot', () => {
      const { container } = render(
        <div>
          <Card size="sm">
            <CardContent>Small card</CardContent>
          </Card>
          <Card size="default">
            <CardContent>Default card</CardContent>
          </Card>
          <Card size="lg">
            <CardContent>Large card</CardContent>
          </Card>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches complete card structure snapshot', () => {
      const { container } = render(
        <Card variant="success" size="lg">
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
            <CardDescription>Full card structure with all components</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card demonstrates all possible card components working together.</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches card components individually snapshot', () => {
      const { container } = render(
        <div>
          <CardHeader>Header Component</CardHeader>
          <CardTitle>Title Component</CardTitle>
          <CardDescription>Description Component</CardDescription>
          <CardContent>Content Component</CardContent>
          <CardFooter>Footer Component</CardFooter>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
