import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button data-testid="button">Test Button</Button>);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Button>Default Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches variants snapshot', () => {
      const { container } = render(
        <div data-testid="variants-container">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches sizes snapshot', () => {
      const { container } = render(
        <div data-testid="sizes-container">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">Icon</Button>
        </div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches disabled state snapshot', () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches loading state snapshot', () => {
      const { container } = render(<Button loading>Loading Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders children correctly', () => {
    render(<Button>Test Content</Button>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(
      <Button variant="destructive" data-testid="button">
        Test
      </Button>
    );
    const element = screen.getByTestId('button');
    expect(element).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(
      <Button size="lg" data-testid="button">
        Test
      </Button>
    );
    const element = screen.getByTestId('button');
    expect(element).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    render(
      <Button disabled data-testid="button">
        Disabled
      </Button>
    );
    const element = screen.getByTestId('button');
    expect(element).toBeDisabled();
  });

  it('handles loading state correctly', () => {
    render(
      <Button loading data-testid="button">
        Loading
      </Button>
    );
    const element = screen.getByTestId('button');
    expect(element).toBeInTheDocument();
  });

  it('renders as child when asChild is true', () => {
    render(
      <Button asChild data-testid="button-as-child">
        <a href="#test">Link Button</a>
      </Button>
    );
    expect(screen.getByTestId('button-as-child')).toBeInTheDocument();
  });
});
