'use client';

import { Homepage1, Homepage2 } from '@/components/pages';
import { useState } from 'react';
import './page.scss';

export default function HomePage() {
  const [currentHomepage, setCurrentHomepage] = useState<1 | 2>(1);

  return (
    <div className="homepage-switcher">
      <div className="homepage-switcher__controls">
        <button
          className={`homepage-switcher__button ${
            currentHomepage === 1 ? 'homepage-switcher__button--active' : ''
          }`}
          onClick={() => setCurrentHomepage(1)}
        >
          Homepage 1
        </button>
        <button
          className={`homepage-switcher__button ${
            currentHomepage === 2 ? 'homepage-switcher__button--active' : ''
          }`}
          onClick={() => setCurrentHomepage(2)}
        >
          Homepage 2
        </button>
      </div>

      {currentHomepage === 1 ? <Homepage1 /> : <Homepage2 />}
    </div>
  );
}
