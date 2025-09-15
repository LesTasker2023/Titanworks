import { getMetrics, getSiteMetadata } from '@/lib/siteConfig';

export default function EnterpriseHero() {
  const metadata = getSiteMetadata();
  const metrics = getMetrics();

  return (
    <section className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {metadata.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {metadata.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Explore Components
            </button>
            <button className="border-2 border-blue-400 hover:border-blue-300 text-blue-400 hover:text-blue-300 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              View Documentation
            </button>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-blue-400">{metrics.totalComponents}</div>
            <div className="text-sm text-gray-300 mt-1">Components</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-green-400">{metrics.testsCoverage}%</div>
            <div className="text-sm text-gray-300 mt-1">Test Coverage</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-purple-400">{metrics.qualityScore}</div>
            <div className="text-sm text-gray-300 mt-1">Quality Score</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-yellow-400">A+</div>
            <div className="text-sm text-gray-300 mt-1">Grade</div>
          </div>
        </div>
      </div>
    </section>
  );
}
