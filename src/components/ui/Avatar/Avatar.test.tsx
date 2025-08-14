import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avatar, { AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <Avatar size="sm" data-testid="avatar-sm">
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('avatar-sm')).toBeInTheDocument();

      rerender(
        <Avatar size="default" data-testid="avatar-default">
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('avatar-default')).toBeInTheDocument();

      rerender(
        <Avatar size="lg" data-testid="avatar-lg">
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('avatar-lg')).toBeInTheDocument();

      rerender(
        <Avatar size="xl" data-testid="avatar-xl">
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>TK</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByTestId('avatar-xl')).toBeInTheDocument();
    });
  });
});
