'use client';

import {
  ArrowLeft,
  Building,
  FileText,
  Folder,
  Home,
  Settings,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '.';
import { Button } from '../Button';

export default function BreadcrumbDemo() {
  const [currentPath, setCurrentPath] = useState([
    'Home',
    'Projects',
    'Website Redesign',
    'Components',
  ]);

  const navigationPaths = {
    ecommerce: ['Home', 'Products', 'Electronics', 'Laptops', 'Gaming Laptops'],
    docs: ['Documentation', 'API Reference', 'Authentication', 'OAuth2'],
    admin: ['Dashboard', 'User Management', 'Roles', 'Permissions', 'Edit Role'],
    files: ['Files', 'Documents', '2024', 'Projects', 'Final Report.pdf'],
  };

  const handleNavigate = (pathName: keyof typeof navigationPaths) => {
    setCurrentPath(navigationPaths[pathName]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(prev => prev.slice(0, index + 1));
  };

  const getIcon = (item: string, index: number) => {
    if (index === 0) {
      if (item === 'Home') return <Home className="h-4 w-4" />;
      if (item === 'Dashboard') return <Settings className="h-4 w-4" />;
      if (item === 'Documentation') return <FileText className="h-4 w-4" />;
      if (item === 'Files') return <Folder className="h-4 w-4" />;
    }

    if (item.includes('Management') || item.includes('Roles')) return <User className="h-4 w-4" />;
    if (item.includes('Products') || item.includes('Electronics'))
      return <ShoppingCart className="h-4 w-4" />;
    if (item.includes('Company') || item.includes('Office'))
      return <Building className="h-4 w-4" />;
    if (item.includes('.pdf') || item.includes('Report')) return <FileText className="h-4 w-4" />;
    if (item.includes('2024') || item.includes('Documents')) return <Folder className="h-4 w-4" />;

    return null;
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Breadcrumb Component</h1>
        <p className="text-muted-foreground">Navigation hierarchy and path indicators</p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">Simple breadcrumb navigation patterns</p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="font-medium mb-2">Simple Breadcrumb</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Components</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>
              <h4 className="font-medium mb-2">With Icons</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products" className="flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4" />
                      Products
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Featured
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Interactive breadcrumbs with dynamic paths and complex navigation
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Interactive Current Path */}
            <div>
              <h4 className="font-medium mb-3">Interactive Navigation</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPath(prev => prev.slice(0, -1))}
                    disabled={currentPath.length <= 1}
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Back
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Current depth: {currentPath.length}
                  </span>
                </div>

                <Breadcrumb>
                  <BreadcrumbList>
                    {currentPath.map((item, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          {index < currentPath.length - 1 ? (
                            <BreadcrumbLink
                              href="#"
                              onClick={e => {
                                e.preventDefault();
                                handleBreadcrumbClick(index);
                              }}
                              className="flex items-center gap-1"
                            >
                              {getIcon(item, index)}
                              {item}
                            </BreadcrumbLink>
                          ) : (
                            <BreadcrumbPage className="flex items-center gap-1">
                              {getIcon(item, index)}
                              {item}
                            </BreadcrumbPage>
                          )}
                        </BreadcrumbItem>
                        {index < currentPath.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(navigationPaths).map(([key]) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigate(key as keyof typeof navigationPaths)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)} Path
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Breadcrumb with Ellipsis */}
            <div>
              <h4 className="font-medium mb-3">Long Paths with Ellipsis</h4>
              <div className="space-y-3">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        <Home className="h-4 w-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/projects/website">Website</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/projects/website/components">
                        Components
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb.tsx</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <p className="text-xs text-muted-foreground">
                  Use ellipsis to collapse middle segments in very long paths
                </p>
              </div>
            </div>

            {/* Different Separators */}
            <div>
              <h4 className="font-medium mb-3">Custom Separators</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Slash separator</p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <span className="text-muted-foreground">/</span>
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <span className="text-muted-foreground">/</span>
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Article Title</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Bullet separator</p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Company</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <span className="text-muted-foreground">•</span>
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/departments">Departments</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <span className="text-muted-foreground">•</span>
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Engineering</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>

            {/* Real-world Examples */}
            <div>
              <h4 className="font-medium mb-3">Real-world Examples</h4>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-gray-50/50">
                  <p className="text-sm font-medium mb-2">E-commerce Product Page</p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="flex items-center gap-1">
                          <Home className="h-3 w-3" />
                          Store
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/electronics/computers">Computers</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/electronics/computers/laptops">
                          Laptops
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>MacBook Pro 16&quot;</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="p-3 border rounded-lg bg-gray-50/50">
                  <p className="text-sm font-medium mb-2">Documentation Site</p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/docs" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Docs
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/docs/api">API Reference</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/docs/api/components">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="p-3 border rounded-lg bg-gray-50/50">
                  <p className="text-sm font-medium mb-2">Admin Dashboard</p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin" className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          Admin
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/users">User Management</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/users/roles">Roles</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Edit Role</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
