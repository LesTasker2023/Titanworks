import { getSiteMetadata } from '@/lib/siteConfig';

export default function DefaultHero() {
  const metadata = getSiteMetadata();

  return (
    <section className="hero-section bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{metadata.title}</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{metadata.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
