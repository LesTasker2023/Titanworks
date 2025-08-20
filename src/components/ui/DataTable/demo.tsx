'use client';

import {
  Building,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  Edit,
  Eye,
  Mail,
  MapPin,
  Package,
  Star,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

// Import types from the DataTable component
import type { DataTableColumn, SortConfig } from './DataTable';

// Sample enterprise data
interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  salary: number;
  hireDate: string;
  location: string;
  performance: number;
}

interface Sale {
  id: number;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  region: string;
  salesRep: string;
}

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  team: number;
}

const employeeData: Employee[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'active',
    salary: 95000,
    hireDate: '2022-03-15',
    location: 'New York',
    performance: 92,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'active',
    salary: 110000,
    hireDate: '2021-07-20',
    location: 'San Francisco',
    performance: 88,
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'UX Designer',
    department: 'Design',
    status: 'pending',
    salary: 78000,
    hireDate: '2023-01-10',
    location: 'Austin',
    performance: 85,
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'active',
    salary: 72000,
    hireDate: '2022-09-05',
    location: 'Chicago',
    performance: 94,
  },
  {
    id: 5,
    name: 'Alex Rodriguez',
    email: 'alex.r@company.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'inactive',
    salary: 88000,
    hireDate: '2020-11-30',
    location: 'Seattle',
    performance: 78,
  },
  {
    id: 6,
    name: 'Lisa Wong',
    email: 'lisa.wong@company.com',
    role: 'Marketing Manager',
    department: 'Marketing',
    status: 'active',
    salary: 85000,
    hireDate: '2021-12-12',
    location: 'Los Angeles',
    performance: 91,
  },
];

const salesData: Sale[] = [
  {
    id: 1,
    customer: 'Acme Corp',
    product: 'Enterprise Plan',
    amount: 15000,
    date: '2024-01-15',
    status: 'completed',
    region: 'North America',
    salesRep: 'John Doe',
  },
  {
    id: 2,
    customer: 'TechStart Inc',
    product: 'Pro Plan',
    amount: 5000,
    date: '2024-01-20',
    status: 'pending',
    region: 'Europe',
    salesRep: 'Jane Smith',
  },
  {
    id: 3,
    customer: 'Global Systems',
    product: 'Enterprise Plan',
    amount: 25000,
    date: '2024-01-25',
    status: 'completed',
    region: 'Asia Pacific',
    salesRep: 'Mike Johnson',
  },
  {
    id: 4,
    customer: 'Innovation Labs',
    product: 'Starter Plan',
    amount: 1200,
    date: '2024-02-01',
    status: 'cancelled',
    region: 'North America',
    salesRep: 'Sarah Davis',
  },
  {
    id: 5,
    customer: 'Future Tech',
    product: 'Pro Plan',
    amount: 8000,
    date: '2024-02-05',
    status: 'refunded',
    region: 'Europe',
    salesRep: 'Tom Wilson',
  },
];

const projectData: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'active',
    progress: 65,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    budget: 150000,
    team: 8,
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'planning',
    progress: 15,
    startDate: '2024-02-15',
    endDate: '2024-08-15',
    budget: 280000,
    team: 12,
  },
  {
    id: 3,
    name: 'API Integration',
    client: 'Global Systems',
    status: 'completed',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-01-15',
    budget: 95000,
    team: 5,
  },
  {
    id: 4,
    name: 'Data Migration',
    client: 'Innovation Labs',
    status: 'on-hold',
    progress: 40,
    startDate: '2024-01-20',
    endDate: '2024-05-20',
    budget: 75000,
    team: 6,
  },
];

export default function DataTableDemo() {
  const [selectedEmployees, setSelectedEmployees] = useState<(number | string)[]>([]);
  const [selectedSales, setSelectedSales] = useState<(number | string)[]>([]);
  const [employeeSort, setEmployeeSort] = useState<SortConfig | undefined>();
  const [salesSort, setSalesSort] = useState<SortConfig | undefined>();
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [salesSearch, setSalesSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string>('');

  const handleAction = (action: string, item?: string) => {
    setActionFeedback(`${action}${item ? ` for ${item}` : ''}`);
    setTimeout(() => setActionFeedback(''), 3000);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      completed: 'default',
      inactive: 'secondary',
      pending: 'outline',
      cancelled: 'destructive',
      refunded: 'destructive',
      'on-hold': 'secondary',
      planning: 'outline',
    } as const;

    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>;
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-blue-500" />;
    return <TrendingDown className="h-4 w-4 text-orange-500" />;
  };

  // Employee table columns
  const employeeColumns: DataTableColumn<Employee>[] = [
    {
      key: 'name',
      header: 'Employee',
      sortable: true,
      render: (value: unknown, row: Employee) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            {row.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')}
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role & Department',
      sortable: true,
      render: (value: unknown, row: Employee) => (
        <div>
          <p className="font-medium">{row.role}</p>
          <p className="text-xs text-muted-foreground">{row.department}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: unknown) => getStatusBadge(value as string),
    },
    {
      key: 'salary',
      header: 'Salary',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-mono">{(value as number).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'performance',
      header: 'Performance',
      sortable: true,
      render: (value: unknown, row: Employee) => (
        <div className="flex items-center gap-2">
          {getPerformanceIcon(row.performance)}
          <span className="font-medium">{row.performance}%</span>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'Actions',
      render: (value: unknown, row: Employee) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => handleAction('View profile', row.name)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction('Edit employee', row.name)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleAction('Send message', row.name)}>
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Sales table columns
  const salesColumns: DataTableColumn<Sale>[] = [
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      render: (value: unknown, row: Sale) => (
        <div>
          <p className="font-medium">{row.customer}</p>
          <p className="text-xs text-muted-foreground">{row.region}</p>
        </div>
      ),
    },
    {
      key: 'product',
      header: 'Product',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <Package className="h-3 w-3 text-muted-foreground" />
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1 font-mono">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span>{(value as number).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: unknown) => getStatusBadge(value as string),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span>{new Date(value as string).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'salesRep',
      header: 'Sales Rep',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <User className="h-3 w-3 text-muted-foreground" />
          <span>{value as string}</span>
        </div>
      ),
    },
  ];

  // Project table columns
  const projectColumns: DataTableColumn<Project>[] = [
    {
      key: 'name',
      header: 'Project',
      sortable: true,
      render: (value: unknown, row: Project) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.client}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: unknown) => getStatusBadge(value as string),
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (value: unknown) => (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{value as number}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${value as number}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'budget',
      header: 'Budget',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1 font-mono">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span>{(value as number).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'team',
      header: 'Team Size',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span>{value as number} members</span>
        </div>
      ),
    },
  ];

  const totalEmployees = employeeData.length;
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const completedProjects = projectData.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">DataTable Component</h1>
        <p className="text-muted-foreground">
          Enterprise-grade data tables with advanced features and real-world functionality
        </p>
      </div>

      {/* Action Feedback */}
      {actionFeedback && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              Action completed: <strong>{actionFeedback}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActionFeedback('')}
              className="ml-auto h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </Card>
      )}

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{totalEmployees}</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">${totalSales.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{completedProjects}</p>
              <p className="text-sm text-muted-foreground">Completed Projects</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple data table with sorting and basic features
          </p>

          <DataTable
            columns={employeeColumns.slice(0, 4) as unknown as DataTableColumn[]} // Show first 4 columns
            data={employeeData.slice(0, 3) as unknown as Record<string, unknown>[]} // Show first 3 rows
            sortable
            currentSort={employeeSort}
            onSort={(column, direction) => setEmployeeSort({ column, direction })}
          />
        </div>
      </Card>

      {/* Advanced Employee Management */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Employee Management System</h3>
              <p className="text-sm text-muted-foreground">
                Full-featured table with search, selection, and actions
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('Export employee data')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => handleAction('Add new employee')}>
                <User className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </div>

          <DataTable
            columns={employeeColumns as unknown as DataTableColumn[]}
            data={employeeData as unknown as Record<string, unknown>[]}
            sortable
            selectable
            filterable
            searchQuery={employeeSearch}
            onFilter={setEmployeeSearch}
            searchPlaceholder="Search employees..."
            selectedRows={selectedEmployees as number[]}
            onSelectionChange={setSelectedEmployees}
            currentSort={employeeSort}
            onSort={(column, direction) => setEmployeeSort({ column, direction })}
            onRowClick={row =>
              handleAction('View employee details', (row as unknown as Employee).name)
            }
            stickyHeader
            maxHeight="400px"
          />

          {selectedEmployees.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedEmployees.length} employees selected
              </span>
              <Button variant="outline" size="sm" onClick={() => handleAction('Bulk edit')}>
                Edit Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('Send message to selected')}
              >
                <Mail className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Sales Dashboard */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Sales Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Track sales performance with filtering and pagination
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsLoading(!isLoading)}>
              {isLoading ? 'Stop Loading' : 'Simulate Loading'}
            </Button>
          </div>

          <DataTable
            columns={salesColumns as unknown as DataTableColumn[]}
            data={salesData as unknown as Record<string, unknown>[]}
            loading={isLoading}
            sortable
            filterable
            pagination
            searchQuery={salesSearch}
            onFilter={setSalesSearch}
            searchPlaceholder="Search sales records..."
            selectedRows={selectedSales as number[]}
            onSelectionChange={setSelectedSales}
            currentSort={salesSort}
            onSort={(column, direction) => setSalesSort({ column, direction })}
            currentPage={currentPage}
            pageSize={3}
            totalPages={Math.ceil(salesData.length / 3)}
            onPageChange={setCurrentPage}
            selectable
          />
        </div>
      </Card>

      {/* Project Overview */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Project Overview</h3>
            <p className="text-sm text-muted-foreground">
              Project management with custom renderers and progress tracking
            </p>
          </div>

          <DataTable
            columns={projectColumns as unknown as DataTableColumn[]}
            data={projectData as unknown as Record<string, unknown>[]}
            sortable
            emptyMessage="No projects found"
            caption="Active and completed projects overview"
          />
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">HR Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Employee directory and profiles</p>
                <p>• Performance tracking and reviews</p>
                <p>• Payroll and benefits management</p>
                <p>• Department and role analytics</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Sales Analytics</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Revenue tracking and forecasting</p>
                <p>• Customer acquisition metrics</p>
                <p>• Regional performance analysis</p>
                <p>• Sales team productivity</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Project Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Project timeline and milestones</p>
                <p>• Resource allocation and budgets</p>
                <p>• Team collaboration tracking</p>
                <p>• Client relationship management</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Multi-column sorting</div>
              <div>• Global search filtering</div>
              <div>• Row selection and bulk actions</div>
              <div>• Custom cell rendering</div>
              <div>• Pagination and virtual scrolling</div>
              <div>• Loading and error states</div>
              <div>• Sticky headers</div>
              <div>• Keyboard navigation</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
