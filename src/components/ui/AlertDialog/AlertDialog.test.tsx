import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';

describe('AlertDialog', () => {
  it('renders without crashing', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button data-testid="trigger">Open Dialog</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Test Title</AlertDialogTitle>
            <AlertDialogDescription>Test Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>Open</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Default Title</AlertDialogTitle>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches complete dialog snapshot', () => {
      const { container } = render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>Open Complete Dialog</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Complete Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This is a complete alert dialog with all components.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders trigger button correctly', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button data-testid="dialog-trigger">Click me</button>
        </AlertDialogTrigger>
      </AlertDialog>
    );

    expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-trigger')).toHaveTextContent('Click me');
  });

  it('renders with custom className', () => {
    const { container } = render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="custom-trigger">Custom Trigger</button>
        </AlertDialogTrigger>
        <AlertDialogContent className="custom-content">
          <AlertDialogTitle>Custom Dialog</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(container.querySelector('.custom-trigger')).toBeInTheDocument();
  });
});
