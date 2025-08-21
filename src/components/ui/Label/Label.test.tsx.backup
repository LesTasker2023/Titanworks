import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(<Label>Default</Label>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches with htmlFor attribute snapshot', () => {
      const { container } = render(<Label htmlFor="test-input">Form Label</Label>);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches with custom className snapshot', () => {
      const { container } = render(<Label className="custom-label">Custom Label</Label>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('renders as a label element', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label.tagName.toLowerCase()).toBe('label');
  });

  it('handles custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  // Accessibility tests
  it('has proper accessibility attributes', () => {
    render(<Label aria-label="Test label">Test Label</Label>);
    const label = screen.getByLabelText('Test label');
    expect(label).toHaveAttribute('aria-label', 'Test label');
  });

  it('can be associated with form controls', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" type="text" />
      </div>
    );
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('applies base styling classes', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none');
  });
});
