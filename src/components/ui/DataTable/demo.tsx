'use client';

import { DataTable } from '.';

export default function DataTableDemo() {
  const columns = [
    {
      key: 'name',
      accessorKey: 'name',
      header: 'Name',
    },
    {
      key: 'email',
      accessorKey: 'email',
      header: 'Email',
    },
    {
      key: 'role',
      accessorKey: 'role',
      header: 'Role',
    },
    {
      key: 'status',
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">DataTable Component</h1>
        <p className="text-muted-foreground">Advanced data tables with sorting and filtering</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <DataTable columns={columns} data={data} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With Pagination</h3>
          <div className="border rounded-lg p-4 bg-background">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
