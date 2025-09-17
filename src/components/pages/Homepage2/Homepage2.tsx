'use client';

import { ColorShowcase } from '@/components/examples';
import './Homepage2.scss';

export default function Homepage2() {
  return (
    <main className="homepage2">
      <div className="homepage2__container">
        <div className="homepage2__sidebar">
          <nav className="homepage2__nav">
            <h2 className="homepage2__nav-title">Navigation</h2>
            <ul className="homepage2__nav-list">
              <li className="homepage2__nav-item">
                <a href="#section1" className="homepage2__nav-link">
                  Section 1
                </a>
              </li>
              <li className="homepage2__nav-item">
                <a href="#section2" className="homepage2__nav-link">
                  Section 2
                </a>
              </li>
              <li className="homepage2__nav-item">
                <a href="#section3" className="homepage2__nav-link">
                  Section 3
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="homepage2__main">
          <header className="homepage2__header">
            <h1 className="homepage2__title">Homepage 2</h1>
            <p className="homepage2__subtitle">
              A different layout approach with sidebar navigation
            </p>
          </header>

          <section id="section1" className="homepage2__section">
            <h2 className="homepage2__section-title">Section 1</h2>
            <p className="homepage2__section-content">
              This is the first section of Homepage 2. It features a sidebar layout that provides
              better navigation for content-heavy pages.
            </p>
          </section>

          <section id="section2" className="homepage2__section">
            <h2 className="homepage2__section-title">Section 2</h2>
            <p className="homepage2__section-content">
              The second section demonstrates how multiple content areas can be organized
              effectively with this layout approach.
            </p>
          </section>

          <section id="section3" className="homepage2__section">
            <h2 className="homepage2__section-title">Section 3</h2>
            <p className="homepage2__section-content">
              The final section shows the consistency of the design system across different content
              blocks.
            </p>
          </section>

          <ColorShowcase />
        </div>
      </div>
    </main>
  );
}
