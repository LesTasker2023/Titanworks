import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RadioGroup, { RadioGroupItem } from './radio-group';

describe('RadioGroup', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <RadioGroup defaultValue="option1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">Option 1</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">Option 2</label>
          </div>
        </RadioGroup>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(
        <RadioGroup data-testid="radio-group">
          <RadioGroupItem value="test" />
        </RadioGroup>
      );
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
    });
  });
});
