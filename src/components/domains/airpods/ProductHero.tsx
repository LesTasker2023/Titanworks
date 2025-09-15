import { getSiteMetadata } from '@/lib/siteConfig';

export default function ProductHero() {
  const metadata = getSiteMetadata();

  return (
    <section className="hero-section bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{metadata.title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{metadata.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Shop Now
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl">🎧</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔊</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Premium Sound</h3>
            <p className="text-gray-600">Crystal clear audio with advanced noise cancellation</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">All-Day Battery</h3>
            <p className="text-gray-600">Up to 30 hours of listening time with wireless charging</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Seamless Integration</h3>
            <p className="text-gray-600">Perfect sync with all your Apple devices</p>
          </div>
        </div>
      </div>
    </section>
  );
}
