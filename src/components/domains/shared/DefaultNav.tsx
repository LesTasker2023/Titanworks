import { getBrandInfo } from '@/lib/siteConfig';
import Link from 'next/link';

export default function DefaultNav() {
  const brand = getBrandInfo();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl">{brand.name}</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              href="/component-showcase"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Components
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Documentation
            </Link>
            <Link href="/tutorials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tutorials
            </Link>
          </div>

          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
