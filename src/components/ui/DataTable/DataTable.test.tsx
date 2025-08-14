import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DataTable from './DataTable';

const mockData = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

const mockColumns = [
  { key: 'name', accessorKey: 'name', header: 'Name' },
  { key: 'email', accessorKey: 'email', header: 'Email' },
];

describe('DataTable', () => {
  describe('Functionality', () => {
    it('renders with data', () => {
      render(<DataTable data={mockData} columns={mockColumns} data-testid="datatable" />);
      expect(screen.getByTestId('datatable')).toBeInTheDocument();
    });
  });
});
