'use client';

import { getCurrentDomain, getDomainConfig } from '@/lib/domain';
import React, { useEffect, useState } from 'react';

export default function DomainNavigation() {
  const [NavigationComponent, setNavigationComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadDomainComponent = async () => {
      const domain = getCurrentDomain();
      const config = getDomainConfig(domain);

      try {
        let component;
        if (config.components.navigation === 'DefaultNav') {
          const { DefaultNav } = await import('@/components/domains/shared');
          component = DefaultNav;
        } else if (config.components.navigation === 'EnterpriseNav') {
          // For now, use DefaultNav for all
          const { DefaultNav } = await import('@/components/domains/shared');
          component = DefaultNav;
        } else {
          const { DefaultNav } = await import('@/components/domains/shared');
          component = DefaultNav;
        }

        setNavigationComponent(component);
      } catch (error) {
        console.error('Failed to load navigation component:', error);
        // Fallback to default
        const { DefaultNav } = await import('@/components/domains/shared');
        setNavigationComponent(DefaultNav);
      }
    };

    loadDomainComponent();
  }, []);

  if (!NavigationComponent) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return React.createElement(NavigationComponent);
}
