import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SimpleChart } from './SimpleChart';

// Test data
const defaultData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 390 },
];

const renderBasicChart = (props = {}) => {
  return render(<SimpleChart data={defaultData} {...props} />);
};

describe('SimpleChart', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = renderBasicChart();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches bar type snapshot', () => {
      const { container } = renderBasicChart({ type: 'bar' });
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches pie type snapshot', () => {
      const { container } = renderBasicChart({ type: 'pie' });
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Basic Functionality', () => {
    it('renders correctly', () => {
      renderBasicChart();
      expect(screen.getByText('Jan')).toBeInTheDocument();
      expect(screen.getByText('400')).toBeInTheDocument();
    });

    it('displays all data items', () => {
      renderBasicChart();
      defaultData.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(item.value.toString())).toBeInTheDocument();
      });
    });
  });

  describe('Chart Types', () => {
    it('renders bar chart by default', () => {
      const { container } = renderBasicChart();
      expect(container.querySelector('.space-y-2')).toBeInTheDocument();
    });

    it('renders bar chart when type is bar', () => {
      const { container } = renderBasicChart({ type: 'bar' });
      expect(container.querySelector('.space-y-2')).toBeInTheDocument();
    });

    it('renders pie chart when type is pie', () => {
      const { container } = renderBasicChart({ type: 'pie' });
      expect(container.querySelector('.w-3.h-3.rounded-full')).toBeInTheDocument();
    });

    it('renders line chart when type is line', () => {
      renderBasicChart({ type: 'line' });
      expect(screen.getByText('Line charts coming soon')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('handles className prop correctly', () => {
      const { container } = renderBasicChart({ className: 'custom-chart' });
      expect(container.firstChild).toHaveClass('custom-chart');
    });

    it('handles custom colors in data', () => {
      const colorData = [
        { name: 'Red', value: 100, color: '#ff0000' },
        { name: 'Blue', value: 200, color: '#0000ff' },
      ];
      const { container } = renderBasicChart({ data: colorData });
      expect(
        container.querySelector('[style*="background-color: rgb(255, 0, 0)"]')
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
      const { container } = renderBasicChart({ data: [] });
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles single data item', () => {
      const singleData = [{ name: 'Single', value: 100 }];
      renderBasicChart({ data: singleData });
      expect(screen.getByText('Single')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('handles zero values', () => {
      const zeroData = [
        { name: 'Zero', value: 0 },
        { name: 'Positive', value: 100 },
      ];
      renderBasicChart({ data: zeroData });
      expect(screen.getByText('Zero')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles component unmounting cleanly', () => {
      const { unmount } = renderBasicChart();
      expect(() => unmount()).not.toThrow();
    });

    it('preserves functionality after remounting', () => {
      const { unmount } = renderBasicChart();
      unmount();

      renderBasicChart();
      expect(screen.getByText('Jan')).toBeInTheDocument();
    });
  });
});
