'use client';

import { ColorShowcase } from '@/components/examples';
import './page.scss';

export default function HomePage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Titanworks';
  const brandName = process.env.NEXT_PUBLIC_BRAND_DISPLAY_NAME || 'Titanworks';
  const tagline = process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Engineering Excellence';
  const siteDescription =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Building the future with precision and innovation.';

  const projects = [
    {
      title: 'Titanworks',
      subtitle: 'Design System Platform',
      description:
        'Environment-controlled design system with 53 UI components and systematic design tokens.',
      url: '/titanworks',
      external: false,
      featured: true,
      tech: ['Next.js 15', 'TypeScript', 'SCSS', 'Design Tokens'],
      image: '🏗️',
    },
    {
      title: 'Trigger Kings',
      subtitle: 'Mobile Paintball Platform',
      description: 'Professional mobile paintball shooting range services with event management.',
      url: 'https://triggerkings.co.uk',
      external: true,
      featured: true,
      tech: ['React', 'Next.js', 'Event Management'],
      image: '🎯',
    },
    {
      title: 'TomTom Route Optimizer',
      subtitle: 'Route Planning Demo',
      description: 'Interactive route optimization demonstration using TomTom Maps API.',
      url: '/tomtom-route-optimizer',
      external: false,
      featured: false,
      tech: ['TomTom API', 'Maps', 'Route Optimization'],
      image: '🗺️',
    },
    {
      title: 'Titan Digital',
      subtitle: 'Digital Solutions',
      description: 'Comprehensive digital transformation and web development services.',
      url: '/titandigital',
      external: false,
      featured: true,
      tech: ['Digital Strategy', 'Web Development'],
      image: '💻',
    },
    {
      title: 'Titan Media',
      subtitle: 'Media Production',
      description: 'Professional media production and content creation services.',
      url: '/titanmedia',
      external: false,
      featured: false,
      tech: ['Media Production', 'Content Creation'],
      image: '📺',
    },
    {
      title: 'Titan Labs',
      subtitle: 'Innovation Lab',
      description: 'Research and development laboratory for cutting-edge technologies.',
      url: '/titanlabs',
      external: false,
      featured: true,
      tech: ['R&D', 'Innovation', 'Prototyping'],
      image: '🧪',
    },
    {
      title: 'Titan Forge',
      subtitle: 'Manufacturing Solutions',
      description: 'Advanced manufacturing and engineering solutions for modern industry.',
      url: '/titanforge',
      external: false,
      featured: false,
      tech: ['Manufacturing', 'Engineering', 'CAD'],
      image: '⚒️',
    },
    {
      title: 'TitanWorksUK Store',
      subtitle: 'Precision Replacement Parts',
      description:
        'Premium replacement parts for Herman Miller, Eames, Stressless, and luxury furniture. 99.1% positive feedback, 593+ sales.',
      url: 'https://www.ebay.co.uk/str/titanworksuk',
      external: true,
      featured: true,
      tech: ['Precision Manufacturing', '3D Printing', 'CAD Design'],
      image: '🔧',
    },
    {
      title: 'Component Showcase',
      subtitle: 'UI Library Demo',
      description: 'Interactive showcase of all available UI components and design patterns.',
      url: '/component-showcase',
      external: false,
      featured: false,
      tech: ['UI Components', 'Storybook', 'Design System'],
      image: '🎨',
    },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="portfolio__hero">
        <div className="portfolio__hero-background">
          <div className="portfolio__hero-overlay"></div>
        </div>
        <div className="portfolio__hero-content">
          <div className="portfolio__hero-badge">
            <span className="portfolio__hero-badge-text">Portfolio</span>
          </div>
          <h1 className="portfolio__hero-title">{siteName}</h1>
          <p className="portfolio__hero-tagline">{tagline}</p>
          <p className="portfolio__hero-description">{siteDescription}</p>
          <div className="portfolio__hero-stats">
            <div className="portfolio__hero-stat">
              <span className="portfolio__hero-stat-number">{projects.length}</span>
              <span className="portfolio__hero-stat-label">Projects</span>
            </div>
            <div className="portfolio__hero-stat">
              <span className="portfolio__hero-stat-number">53</span>
              <span className="portfolio__hero-stat-label">Components</span>
            </div>
            <div className="portfolio__hero-stat">
              <span className="portfolio__hero-stat-number">100%</span>
              <span className="portfolio__hero-stat-label">Custom Built</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="portfolio__featured">
        <div className="portfolio__container">
          <div className="portfolio__section-header">
            <h2 className="portfolio__section-title">Featured Projects</h2>
            <p className="portfolio__section-description">
              Showcasing our most innovative and impactful work
            </p>
          </div>
          <div className="portfolio__projects-grid portfolio__projects-grid--featured">
            {featuredProjects.map((project, index) => (
              <div key={project.title} className="portfolio__project portfolio__project--featured">
                <div className="portfolio__project-image">
                  <span className="portfolio__project-emoji">{project.image}</span>
                  <div className="portfolio__project-overlay">
                    <div className="portfolio__project-actions">
                      {project.external ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio__project-button"
                        >
                          Visit Site →
                        </a>
                      ) : (
                        <a href={project.url} className="portfolio__project-button">
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="portfolio__project-content">
                  <div className="portfolio__project-header">
                    <h3 className="portfolio__project-title">{project.title}</h3>
                    <span className="portfolio__project-subtitle">{project.subtitle}</span>
                  </div>
                  <p className="portfolio__project-description">{project.description}</p>
                  <div className="portfolio__project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="portfolio__project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="portfolio__all-projects">
        <div className="portfolio__container">
          <div className="portfolio__section-header">
            <h2 className="portfolio__section-title">All Projects</h2>
            <p className="portfolio__section-description">
              Complete overview of our digital portfolio
            </p>
          </div>
          <div className="portfolio__projects-grid">
            {otherProjects.map(project => (
              <div key={project.title} className="portfolio__project">
                <div className="portfolio__project-image">
                  <span className="portfolio__project-emoji">{project.image}</span>
                  <div className="portfolio__project-overlay">
                    <div className="portfolio__project-actions">
                      {project.external ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio__project-button"
                        >
                          Visit Site →
                        </a>
                      ) : (
                        <a href={project.url} className="portfolio__project-button">
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="portfolio__project-content">
                  <div className="portfolio__project-header">
                    <h3 className="portfolio__project-title">{project.title}</h3>
                    <span className="portfolio__project-subtitle">{project.subtitle}</span>
                  </div>
                  <p className="portfolio__project-description">{project.description}</p>
                  <div className="portfolio__project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="portfolio__project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Showcase Section */}
      <section className="portfolio__showcase">
        <div className="portfolio__container">
          <ColorShowcase />
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="portfolio__contact">
        <div className="portfolio__container">
          <div className="portfolio__contact-content">
            <h2 className="portfolio__contact-title">Ready to Work Together?</h2>
            <p className="portfolio__contact-description">
              Let&apos;s create something amazing with our environment-controlled design system
            </p>
            <div className="portfolio__contact-actions">
              <a
                href="/component-showcase"
                className="portfolio__contact-button portfolio__contact-button--primary"
              >
                Explore Components
              </a>
              <a
                href="mailto:contact@titanworks.com"
                className="portfolio__contact-button portfolio__contact-button--secondary"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
