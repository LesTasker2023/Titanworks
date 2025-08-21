import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Textarea placeholder="Default textarea" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(<Textarea data-testid="textarea" placeholder="Test textarea" />);
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });

    it('handles disabled state', () => {
      render(<Textarea disabled data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
    });

    it('accepts placeholder', () => {
      render(<Textarea placeholder="Enter text" data-testid="textarea" />);
      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    });
  });
});
