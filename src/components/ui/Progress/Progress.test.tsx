import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from './progress';

describe('Progress', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Progress value={50} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(<Progress value={50} data-testid="progress" />);
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });

    it('supports variant prop', () => {
      render(<Progress value={75} variant="success" data-testid="progress" />);
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });

    it('supports size prop', () => {
      render(<Progress value={25} size="lg" data-testid="progress" />);
      expect(screen.getByTestId('progress')).toBeInTheDocument();
    });
  });
});
