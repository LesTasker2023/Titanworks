import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dialog, { DialogContent, DialogTrigger } from './dialog';

describe('Dialog', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">Open</DialogTrigger>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
    });
  });
});
