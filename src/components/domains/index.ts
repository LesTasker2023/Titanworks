// Dynamic domain component loader
import dynamic from 'next/dynamic';

// Component registry for domain-specific components
const componentRegistry = {
  // Hero components
  EnterpriseHero: dynamic(() =>
    import('./daedalus').then(mod => ({ default: mod.EnterpriseHero }))
  ),
  ProductHero: dynamic(() => import('./airpods').then(mod => ({ default: mod.ProductHero }))),
  DefaultHero: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultHero }))),

  // Navigation components
  DefaultNav: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultNav }))),

  // Footer components
  DefaultFooter: dynamic(() => import('./shared').then(mod => ({ default: mod.DefaultFooter }))),
};

// Get a domain component dynamically
export function getDomainComponent(componentName: string) {
  const Component = componentRegistry[componentName as keyof typeof componentRegistry];
  return Component || componentRegistry.DefaultHero;
}

// Preload critical components for current domain
export function preloadDomainComponents(domain: string) {
  // This could be expanded to preload components based on domain
  // For now, we'll let Next.js handle dynamic imports
}

// Export all components for direct import if needed
export * from './airpods';
export * from './daedalus';
export * from './shared';
