'use client';

import { ColorShowcase } from '@/components/examples';
import './page.scss';

export default function HomePage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Titanworks';
  const brandName = process.env.NEXT_PUBLIC_BRAND_DISPLAY_NAME || 'Titanworks';
  const tagline = process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Engineering Excellence';
  const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Building the future with precision and innovation.';

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="homepage__hero">
        <div className="homepage__hero-background">
          <div className="homepage__hero-overlay"></div>
        </div>
        <div className="homepage__hero-content">
          <div className="homepage__hero-badge">
            <span className="homepage__hero-badge-text">Welcome to {brandName}</span>
          </div>
          <h1 className="homepage__hero-title">{siteName}</h1>
          <p className="homepage__hero-tagline">{tagline}</p>
          <p className="homepage__hero-description">{siteDescription}</p>
          <div className="homepage__hero-actions">
            <button className="homepage__hero-button homepage__hero-button--primary">
              Get Started
            </button>
            <button className="homepage__hero-button homepage__hero-button--secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="homepage__features">
        <div className="homepage__container">
          <div className="homepage__section-header">
            <h2 className="homepage__section-title">Why Choose {brandName}?</h2>
            <p className="homepage__section-description">
              Experience the power of environment-controlled design that adapts to your brand
            </p>
          </div>
          <div className="homepage__features-grid">
            <div className="homepage__feature">
              <div className="homepage__feature-icon">🎨</div>
              <h3 className="homepage__feature-title">Dynamic Theming</h3>
              <p className="homepage__feature-description">
                Brand colors and styling controlled entirely through environment variables
              </p>
            </div>
            <div className="homepage__feature">
              <div className="homepage__feature-icon">⚡</div>
              <h3 className="homepage__feature-title">Lightning Fast</h3>
              <p className="homepage__feature-description">
                Built with Next.js 15 and optimized for performance across all platforms
              </p>
            </div>
            <div className="homepage__feature">
              <div className="homepage__feature-icon">🛡️</div>
              <h3 className="homepage__feature-title">Production Ready</h3>
              <p className="homepage__feature-description">
                Comprehensive design system with systematic tokens and proven architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Showcase Section */}
      <section className="homepage__showcase">
        <div className="homepage__container">
          <ColorShowcase />
        </div>
      </section>

      {/* Stats Section */}
      <section className="homepage__stats">
        <div className="homepage__container">
          <div className="homepage__stats-grid">
            <div className="homepage__stat">
              <div className="homepage__stat-number">53</div>
              <div className="homepage__stat-label">UI Components</div>
            </div>
            <div className="homepage__stat">
              <div className="homepage__stat-number">43</div>
              <div className="homepage__stat-label">Design Tokens</div>
            </div>
            <div className="homepage__stat">
              <div className="homepage__stat-number">725</div>
              <div className="homepage__stat-label">Hardcoded Values Eliminated</div>
            </div>
            <div className="homepage__stat">
              <div className="homepage__stat-number">100%</div>
              <div className="homepage__stat-label">Environment Controlled</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="homepage__cta">
        <div className="homepage__container">
          <div className="homepage__cta-content">
            <h2 className="homepage__cta-title">Ready to Experience {brandName}?</h2>
            <p className="homepage__cta-description">
              See how our environment-controlled design system adapts to your brand across all platforms
            </p>
            <div className="homepage__cta-actions">
              <button className="homepage__cta-button homepage__cta-button--primary">
                Deploy Now
              </button>
              <button className="homepage__cta-button homepage__cta-button--secondary">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
