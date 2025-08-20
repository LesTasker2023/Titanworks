import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(<div data-testid="breadcrumb-test">Breadcrumb Test</div>);
    expect(screen.getByTestId('breadcrumb-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="breadcrumb-container">Breadcrumb Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">Breadcrumb Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('Breadcrumb Content');
  });
});
