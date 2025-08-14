'use client';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [sliderValue, setSliderValue] = useState([75]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#fff',
        fontFamily: "'Bebas Neue', sans-serif",
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {/* Navigation Links */}
      <div className="flex gap-4 mb-8">
        <Link href="/component-showcase">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black"
          >
            Component Showcase
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Quality Dashboard
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className="logo" />

      {/* Headline */}
      <h1
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#ff3b3b',
          textShadow: '0 0 15px rgba(255,59,59,0.7)',
        }}
      >
        Mobile Paintball Range
      </h1>

      {/* Tagline */}
      <p
        style={{
          maxWidth: '600px',
          marginBottom: '2rem',
          fontSize: '1.2rem',
          lineHeight: '1.5',
          color: '#ccc',
        }}
      >
        Challenge your friends. Smash the high score. Claim your crown at markets, fairs, parties,
        and events.
      </p>

      {/* Coming Soon Badge */}
      <span
        style={{
          display: 'inline-block',
          border: '2px solid #ff3b3b',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: '#ff3b3b',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const target = e.target as HTMLSpanElement;
          target.style.background = '#ff3b3b';
          target.style.color = '#000';
        }}
        onMouseLeave={e => {
          const target = e.target as HTMLSpanElement;
          target.style.background = 'transparent';
          target.style.color = '#ff3b3b';
        }}
      >
        Coming Soon
      </span>

      {/* Component Test Pages */}
      <div
        style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* shadcn Button Tests */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Button variant="destructive" loading>
            Deleting...
          </Button>
        </div>

        {/* Slider Integration Test */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
            minWidth: '200px',
          }}
        >
          <div style={{ fontSize: '0.875rem', color: '#ccc' }}>Slider: {sliderValue[0]}%</div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            size="lg"
            variant="success"
            showValue={false}
            style={{ width: '200px' }}
          />
        </div>

        <Link href="/input-test">
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Input Tests
          </button>
        </Link>
        <Link href="/textarea-test">
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Textarea Tests
          </button>
        </Link>
        <Link href="/checkbox-demo">
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Checkbox Demo
          </button>
        </Link>
        <Link href="/contact">
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            Contact Form
          </button>
        </Link>
      </div>
    </main>
  );
}
