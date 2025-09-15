'use client';

import { getCurrentDomain, getDomainConfig } from '@/lib/domain';
import React, { useEffect, useState } from 'react';

export default function DomainFooter() {
  const [FooterComponent, setFooterComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadDomainComponent = async () => {
      const domain = getCurrentDomain();
      const config = getDomainConfig(domain);

      try {
        let component;
        if (config.components.footer === 'DefaultFooter') {
          const { DefaultFooter } = await import('@/components/domains/shared');
          component = DefaultFooter;
        } else {
          const { DefaultFooter } = await import('@/components/domains/shared');
          component = DefaultFooter;
        }

        setFooterComponent(component);
      } catch (error) {
        console.error('Failed to load footer component:', error);
        // Fallback to default
        const { DefaultFooter } = await import('@/components/domains/shared');
        setFooterComponent(DefaultFooter);
      }
    };

    loadDomainComponent();
  }, []);

  if (!FooterComponent) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>Loading...</p>
        </div>
      </footer>
    );
  }

  return React.createElement(FooterComponent);
}
