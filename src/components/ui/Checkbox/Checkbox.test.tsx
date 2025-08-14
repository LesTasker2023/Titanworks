import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Checkbox />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(<Checkbox data-testid="checkbox" />);
      expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    });

    it('handles checked state', () => {
      render(<Checkbox checked data-testid="checkbox" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('handles disabled state', () => {
      render(<Checkbox disabled data-testid="checkbox" />);
      const checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });
});
