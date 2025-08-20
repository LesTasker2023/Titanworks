'use client';

import {
  Clock,
  Database,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  RefreshCw,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Pagination } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';

export default function PaginationDemo() {
  // Basic pagination states
  const [basicPage, setBasicPage] = useState(1);
  const [sizePage, setSizePage] = useState(5);
  const [loadingPage, setLoadingPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Page size controls
  const [pageSize, setPageSize] = useState(10);
  const [searchPageSize, setSearchPageSize] = useState(25);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Recent activity tracking
  const [recentActions, setRecentActions] = useState<string[]>([]);

  // Sample data for different use cases
  const sampleUsers = Array.from({ length: 1247 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'User', 'Editor', 'Viewer'][i % 4],
    status: ['Active', 'Inactive', 'Pending'][i % 3],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  }));

  const sampleProducts = Array.from({ length: 2847 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'][i % 5],
    price: Math.round((Math.random() * 500 + 10) * 100) / 100,
    stock: Math.floor(Math.random() * 100),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    sales: Math.floor(Math.random() * 1000),
  }));

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const handleLoadingDemo = async (page: number) => {
    setIsLoading(true);
    addRecentAction(`Loading page ${page}`);
    // Simulate API call
    setTimeout(() => {
      setLoadingPage(page);
      setIsLoading(false);
      addRecentAction(`Loaded page ${page}`);
    }, 1500);
  };

  const handlePageChange = (page: number, context: string) => {
    addRecentAction(`Navigated to ${context} page ${page}`);
  };

  // Filter users based on search and status
  const filteredUsers = useMemo(() => {
    return sampleUsers.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [sampleUsers, searchQuery, statusFilter]);

  // Calculate pagination for filtered results
  const paginatedUsers = useMemo(() => {
    const startIndex = (searchPage - 1) * searchPageSize;
    return filteredUsers.slice(startIndex, startIndex + searchPageSize);
  }, [filteredUsers, searchPage, searchPageSize]);

  const totalSearchPages = Math.ceil(filteredUsers.length / searchPageSize);

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Pagination Component</h1>
        <p className="text-muted-foreground">
          Enterprise pagination with smart truncation, loading states, and flexible configuration
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Navigation:</span>
            <div className="flex gap-2">
              {recentActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Basic Pagination Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic Pagination Types</h3>
            <p className="text-sm text-muted-foreground">
              Different pagination configurations and sizes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Standard Pagination</h4>
              <div className="border rounded-lg p-4 bg-background space-y-4">
                <Pagination
                  currentPage={basicPage}
                  totalPages={15}
                  onPageChange={page => {
                    setBasicPage(page);
                    handlePageChange(page, 'Basic');
                  }}
                  showPageInfo
                  totalItems={150}
                  itemsPerPage={10}
                />
                <div className="text-sm text-muted-foreground">
                  Current: <Badge variant="outline">Page {basicPage} of 15</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Large Dataset (Smart Truncation)</h4>
              <div className="border rounded-lg p-4 bg-background space-y-4">
                <Pagination
                  currentPage={sizePage}
                  totalPages={100}
                  onPageChange={page => {
                    setSizePage(page);
                    handlePageChange(page, 'Large Dataset');
                  }}
                  siblingCount={2}
                  showPageInfo
                  totalItems={1000}
                  itemsPerPage={10}
                />
                <div className="text-sm text-muted-foreground">
                  Current: <Badge variant="outline">Page {sizePage} of 100</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Small Size</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={1} totalPages={8} onPageChange={() => {}} size="sm" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Default Size</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={3} totalPages={8} onPageChange={() => {}} size="default" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Large Size</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={5} totalPages={8} onPageChange={() => {}} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Advanced Features</h3>
            <p className="text-sm text-muted-foreground">
              Loading states, custom configurations, and behavior options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Loading State Demo
              </h4>
              <div className="border rounded-lg p-4 bg-background space-y-4">
                <Pagination
                  currentPage={loadingPage}
                  totalPages={20}
                  onPageChange={handleLoadingDemo}
                  loading={isLoading}
                  showPageInfo
                  totalItems={200}
                  itemsPerPage={10}
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadingDemo(Math.floor(Math.random() * 20) + 1)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Random Page'
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Configuration Options</h4>
              <div className="border rounded-lg p-4 bg-background space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="page-size">Items per page:</Label>
                    <Select
                      value={pageSize.toString()}
                      onValueChange={value => setPageSize(Number(value))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Pagination
                    currentPage={1}
                    totalPages={Math.ceil(250 / pageSize)}
                    onPageChange={() => {}}
                    showPageInfo
                    totalItems={250}
                    itemsPerPage={pageSize}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Minimal Configuration</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination
                  currentPage={2}
                  totalPages={5}
                  onPageChange={() => {}}
                  showNavigation={false}
                  showFirstLast={false}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Only page numbers, no navigation buttons
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Navigation Only</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination
                  currentPage={3}
                  totalPages={10}
                  onPageChange={() => {}}
                  siblingCount={0}
                  showFirstLast={true}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  First/Last + Prev/Next only, minimal page numbers
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table Integration */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">User Management Table</h3>
              <p className="text-sm text-muted-foreground">
                Complete data table with pagination, search, and filtering
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Users className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={searchPageSize.toString()}
                onValueChange={value => setSearchPageSize(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>
                Showing {filteredUsers.length} of {sampleUsers.length} users
                {searchQuery && ` matching "${searchQuery}"`}
                {statusFilter !== 'all' && ` with status "${statusFilter}"`}
              </span>
            </div>
            {selectedItems.length > 0 && (
              <Badge variant="secondary">{selectedItems.length} selected</Badge>
            )}
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">
                      <Checkbox
                        checked={
                          selectedItems.length === paginatedUsers.length &&
                          paginatedUsers.length > 0
                        }
                        onCheckedChange={checked => {
                          if (checked) {
                            setSelectedItems(paginatedUsers.map(user => user.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Role</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Last Login</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedUsers.map(user => (
                    <tr key={user.id} className="hover:bg-muted/50">
                      <td className="p-3">
                        <Checkbox
                          checked={selectedItems.includes(user.id)}
                          onCheckedChange={() => toggleItemSelection(user.id)}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                            {user.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{user.role}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            user.status === 'Active'
                              ? 'default'
                              : user.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                      <td className="p-3">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Page {searchPage} of {totalSearchPages} • {filteredUsers.length} total results
            </div>
            <Pagination
              currentPage={searchPage}
              totalPages={totalSearchPages}
              onPageChange={page => {
                setSearchPage(page);
                handlePageChange(page, 'User Table');
              }}
              showPageInfo
              totalItems={filteredUsers.length}
              itemsPerPage={searchPageSize}
            />
          </div>
        </div>
      </Card>

      {/* Product Catalog Example */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Product Catalog</h3>
            <p className="text-sm text-muted-foreground">
              E-commerce product listing with grid view and pagination
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleProducts.slice((productsPage - 1) * 12, productsPage * 12).map(product => (
              <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-md mb-3 flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium truncate">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${product.price}</span>
                    <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
                  </div>
                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Product Pagination */}
          <div className="flex flex-col items-center gap-4">
            <Pagination
              currentPage={productsPage}
              totalPages={Math.ceil(sampleProducts.length / 12)}
              onPageChange={page => {
                setProductsPage(page);
                handlePageChange(page, 'Product Catalog');
              }}
              siblingCount={2}
              showPageInfo
              totalItems={sampleProducts.length}
              itemsPerPage={12}
            />
            <div className="text-sm text-muted-foreground text-center">
              Displaying {(productsPage - 1) * 12 + 1}-
              {Math.min(productsPage * 12, sampleProducts.length)} of {sampleProducts.length}{' '}
              products
            </div>
          </div>
        </div>
      </Card>

      {/* Pagination Behavior Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Pagination Behavior Examples</h3>
            <p className="text-sm text-muted-foreground">
              Different truncation patterns and edge cases
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Small Dataset (No Truncation)</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
                <p className="text-xs text-muted-foreground mt-2">
                  All pages visible when total ≤ 7
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Beginning of Large Dataset</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={3} totalPages={50} onPageChange={() => {}} />
                <p className="text-xs text-muted-foreground mt-2">Right ellipsis only</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Middle of Large Dataset</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={25} totalPages={50} onPageChange={() => {}} />
                <p className="text-xs text-muted-foreground mt-2">Both ellipses visible</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">End of Large Dataset</h4>
              <div className="border rounded-lg p-4 bg-background">
                <Pagination currentPage={48} totalPages={50} onPageChange={() => {}} />
                <p className="text-xs text-muted-foreground mt-2">Left ellipsis only</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pagination Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Performance</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use server-side pagination for large datasets</p>
                <p>• Implement loading states for better UX</p>
                <p>• Cache frequently accessed pages</p>
                <p>• Consider infinite scroll for mobile</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Show total results and current position</p>
                <p>• Provide page size options</p>
                <p>• Maintain filters across page changes</p>
                <p>• Include jump-to-page functionality</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use proper ARIA labels and roles</p>
                <p>• Support keyboard navigation</p>
                <p>• Announce page changes to screen readers</p>
                <p>• Ensure sufficient color contrast</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
