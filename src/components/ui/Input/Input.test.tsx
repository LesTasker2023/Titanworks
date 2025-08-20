import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Input placeholder="Default input" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(<Input data-testid="input" placeholder="Test input" />);
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('handles disabled state', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('accepts placeholder', () => {
      render(<Input placeholder="Enter text" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('accepts different input types', () => {
      render(<Input type="email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });
  });
});
