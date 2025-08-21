'use client';

import {
  AlertTriangle,
  Download,
  Edit,
  Eye,
  Filter,
  Mail,
  MoreHorizontal,
  Search,
  SortAsc,
  SortDesc,
  Star,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Input } from '../Input';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar: string;
  department: string;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  sales: number;
  status: 'active' | 'discontinued' | 'out-of-stock';
}

export default function TableDemo() {
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [userSort, setUserSort] = useState<{ field: keyof User; direction: 'asc' | 'desc' } | null>(
    null
  );
  const [orderSort, setOrderSort] = useState<{
    field: keyof Order;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [productSort, setProductSort] = useState<{
    field: keyof Product;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Memoize static data to prevent recreation on every render
  const users: User[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@company.com',
        role: 'Product Manager',
        status: 'active',
        joinDate: '2023-01-15',
        avatar: '👩‍💼',
        department: 'Product',
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@company.com',
        role: 'Developer',
        status: 'active',
        joinDate: '2023-02-20',
        avatar: '👨‍💻',
        department: 'Engineering',
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol@company.com',
        role: 'Designer',
        status: 'pending',
        joinDate: '2023-03-10',
        avatar: '👩‍🎨',
        department: 'Design',
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david@company.com',
        role: 'DevOps',
        status: 'active',
        joinDate: '2023-04-05',
        avatar: '👨‍🔧',
        department: 'Engineering',
      },
      {
        id: '5',
        name: 'Eve Brown',
        email: 'eve@company.com',
        role: 'Marketing Lead',
        status: 'inactive',
        joinDate: '2023-05-12',
        avatar: '👩‍💼',
        department: 'Marketing',
      },
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank@company.com',
        role: 'QA Engineer',
        status: 'active',
        joinDate: '2023-06-18',
        avatar: '👨‍🔬',
        department: 'Engineering',
      },
    ],
    []
  );

  const orders: Order[] = useMemo(
    () => [
      {
        id: 'ORD-001',
        customer: 'Tech Solutions Inc',
        product: 'Enterprise License',
        amount: 2999.99,
        status: 'delivered',
        date: '2024-01-15',
        quantity: 1,
      },
      {
        id: 'ORD-002',
        customer: 'Digital Agency Co',
        product: 'Premium Plan',
        amount: 899.99,
        status: 'shipped',
        date: '2024-01-16',
        quantity: 3,
      },
      {
        id: 'ORD-003',
        customer: 'Startup Hub',
        product: 'Basic Plan',
        amount: 299.99,
        status: 'pending',
        date: '2024-01-17',
        quantity: 5,
      },
      {
        id: 'ORD-004',
        customer: 'Global Corp',
        product: 'Enterprise License',
        amount: 4999.99,
        status: 'delivered',
        date: '2024-01-18',
        quantity: 2,
      },
      {
        id: 'ORD-005',
        customer: 'Local Business',
        product: 'Standard Plan',
        amount: 599.99,
        status: 'cancelled',
        date: '2024-01-19',
        quantity: 1,
      },
      {
        id: 'ORD-006',
        customer: 'Innovation Labs',
        product: 'Premium Plan',
        amount: 1299.99,
        status: 'shipped',
        date: '2024-01-20',
        quantity: 2,
      },
    ],
    []
  );

  const products: Product[] = useMemo(
    () => [
      {
        id: 'PRD-001',
        name: 'Enterprise License',
        category: 'Software',
        price: 2999.99,
        stock: 50,
        rating: 4.8,
        sales: 125,
        status: 'active',
      },
      {
        id: 'PRD-002',
        name: 'Premium Plan',
        category: 'Subscription',
        price: 899.99,
        stock: 200,
        rating: 4.6,
        sales: 340,
        status: 'active',
      },
      {
        id: 'PRD-003',
        name: 'Basic Plan',
        category: 'Subscription',
        price: 299.99,
        stock: 500,
        rating: 4.4,
        sales: 756,
        status: 'active',
      },
      {
        id: 'PRD-004',
        name: 'Standard Plan',
        category: 'Subscription',
        price: 599.99,
        stock: 300,
        rating: 4.5,
        sales: 445,
        status: 'active',
      },
      {
        id: 'PRD-005',
        name: 'Mobile App',
        category: 'Software',
        price: 199.99,
        stock: 0,
        rating: 4.2,
        sales: 892,
        status: 'out-of-stock',
      },
      {
        id: 'PRD-006',
        name: 'Legacy System',
        category: 'Software',
        price: 1999.99,
        stock: 10,
        rating: 3.8,
        sales: 45,
        status: 'discontinued',
      },
    ],
    []
  );

  const filteredUsers = useMemo(() => {
    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.role.toLowerCase().includes(userSearch.toLowerCase())
    );

    if (userSort) {
      filtered.sort((a, b) => {
        const aValue = a[userSort.field];
        const bValue = b[userSort.field];
        const direction = userSort.direction === 'asc' ? 1 : -1;
        return aValue > bValue ? direction : -direction;
      });
    }

    return filtered;
  }, [userSearch, userSort, users]);

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter(
      order =>
        order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.product.toLowerCase().includes(orderSearch.toLowerCase())
    );

    if (orderSort) {
      filtered.sort((a, b) => {
        const aValue = a[orderSort.field];
        const bValue = b[orderSort.field];
        const direction = orderSort.direction === 'asc' ? 1 : -1;
        return aValue > bValue ? direction : -direction;
      });
    }

    return filtered;
  }, [orderSearch, orderSort, orders]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearch.toLowerCase())
    );

    if (productSort) {
      filtered.sort((a, b) => {
        const aValue = a[productSort.field];
        const bValue = b[productSort.field];
        const direction = productSort.direction === 'asc' ? 1 : -1;
        return aValue > bValue ? direction : -direction;
      });
    }

    return filtered;
  }, [productSearch, productSort, products]);

  const handleSort = (field: string, currentSort: any, setSortFunction: any) => {
    if (currentSort?.field === field) {
      if (currentSort.direction === 'asc') {
        setSortFunction({ field, direction: 'desc' });
      } else {
        setSortFunction(null);
      }
    } else {
      setSortFunction({ field, direction: 'asc' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'cancelled':
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      case 'out-of-stock':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSortIcon = (field: string, currentSort: any) => {
    if (currentSort?.field === field) {
      return currentSort.direction === 'asc' ? (
        <SortAsc className="h-4 w-4" />
      ) : (
        <SortDesc className="h-4 w-4" />
      );
    }
    return <SortAsc className="h-4 w-4 opacity-30" />;
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Table Component</h1>
        <p className="text-muted-foreground text-lg">
          Data display and management interfaces for structured information
        </p>
      </div>

      {/* Basic Table */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Table</h2>
          <p className="text-muted-foreground">Simple data presentation</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Alice Johnson</TableCell>
                <TableCell>alice@company.com</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </TableCell>
                <TableCell>Product Manager</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bob Smith</TableCell>
                <TableCell>bob@company.com</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </TableCell>
                <TableCell>Developer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Carol Davis</TableCell>
                <TableCell>carol@company.com</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </TableCell>
                <TableCell>Designer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Advanced User Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">User Management</h2>
              <p className="text-muted-foreground">
                Advanced table with search, sorting, and actions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('role', userSort, setUserSort)}
                >
                  <div className="flex items-center gap-2">
                    Role
                    {getSortIcon('role', userSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('status', userSort, setUserSort)}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status', userSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('joinDate', userSort, setUserSort)}
                >
                  <div className="flex items-center gap-2">
                    Join Date
                    {getSortIcon('joinDate', userSort)}
                  </div>
                </TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Order Management</h2>
              <p className="text-muted-foreground">Track and manage customer orders</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('id', orderSort, setOrderSort)}
                >
                  <div className="flex items-center gap-2">
                    Order ID
                    {getSortIcon('id', orderSort)}
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('amount', orderSort, setOrderSort)}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    {getSortIcon('amount', orderSort)}
                  </div>
                </TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('status', orderSort, setOrderSort)}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status', orderSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('date', orderSort, setOrderSort)}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {getSortIcon('date', orderSort)}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Product Catalog</h2>
              <p className="text-muted-foreground">Manage product inventory and pricing</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>Add Product</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name', productSort, setProductSort)}
                >
                  <div className="flex items-center gap-2">
                    Product
                    {getSortIcon('name', productSort)}
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('price', productSort, setProductSort)}
                >
                  <div className="flex items-center gap-2">
                    Price
                    {getSortIcon('price', productSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('stock', productSort, setProductSort)}
                >
                  <div className="flex items-center gap-2">
                    Stock
                    {getSortIcon('stock', productSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('rating', productSort, setProductSort)}
                >
                  <div className="flex items-center gap-2">
                    Rating
                    {getSortIcon('rating', productSort)}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('sales', productSort, setProductSort)}
                >
                  <div className="flex items-center gap-2">
                    Sales
                    {getSortIcon('sales', productSort)}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.stock}</span>
                      {product.stock < 20 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Data Presentation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use consistent column widths and alignment</li>
              <li>• Implement hover states for better interactivity</li>
              <li>• Group related actions in the rightmost column</li>
              <li>• Use badges and icons for status indicators</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Performance</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Implement pagination for large datasets</li>
              <li>• Use virtual scrolling for thousands of rows</li>
              <li>• Debounce search and filter operations</li>
              <li>• Consider server-side sorting for large data</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
