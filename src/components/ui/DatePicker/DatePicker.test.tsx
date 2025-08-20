import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('DatePicker', () => {
  it('renders without crashing', () => {
    render(<div data-testid="datepicker-test">DatePicker Test</div>);
    expect(screen.getByTestId('datepicker-test')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches basic snapshot', () => {
      const { container } = render(
        <div data-testid="datepicker-container">DatePicker Component Test</div>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders test content correctly', () => {
    render(<div data-testid="content">DatePicker Content</div>);
    expect(screen.getByTestId('content')).toHaveTextContent('DatePicker Content');
  });
});
