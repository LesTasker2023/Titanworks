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
  });
});
