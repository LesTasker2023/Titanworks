'use client';

import { ColorShowcase } from '@/components/examples';
import './Homepage1.scss';

export default function Homepage1() {
  return (
    <main className="homepage1">
      <div className="homepage1__container">
        <header className="homepage1__header">
          <h1 className="homepage1__title">Homepage 1</h1>
          <p className="homepage1__subtitle">Welcome to the first homepage variant</p>
        </header>

        <section className="homepage1__content">
          <div className="homepage1__hero">
            <h2 className="homepage1__hero-title">Hero Section</h2>
            <p className="homepage1__hero-description">
              This is the main content area for Homepage 1. You can customize this content based on
              your specific needs.
            </p>
          </div>

          <div className="homepage1__features">
            <div className="homepage1__feature">
              <h3 className="homepage1__feature-title">Feature 1</h3>
              <p className="homepage1__feature-description">Description of feature 1</p>
            </div>
            <div className="homepage1__feature">
              <h3 className="homepage1__feature-title">Feature 2</h3>
              <p className="homepage1__feature-description">Description of feature 2</p>
            </div>
            <div className="homepage1__feature">
              <h3 className="homepage1__feature-title">Feature 3</h3>
              <p className="homepage1__feature-description">Description of feature 3</p>
            </div>
          </div>

          <ColorShowcase />
        </section>
      </div>
    </main>
  );
}
