import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Container from './Container';

describe('Container', () => {
  it('renders a div with container classes', () => {
    const { container } = render(<Container />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('w-full');
    expect(div).toHaveClass('mx-auto');
    expect(div).toHaveClass('max-w-7xl');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with children', () => {
    const { container } = render(<Container>Test Content</Container>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
