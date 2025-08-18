import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Container from './Container';

describe('Container', () => {
  it('renders a div with container classes', () => {
    const { container } = render(<Container />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div).toHaveClass('container');
    expect(div).toHaveClass('mx-auto');
    expect(div).toHaveClass('px-4');
  });
});
