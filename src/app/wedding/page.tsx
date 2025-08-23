'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  Bell,
  Building,
  Cake,
  Calendar,
  Camera,
  Car,
  Check,
  CheckCircle,
  Clipboard,
  Clock,
  DollarSign,
  Download,
  Edit,
  Facebook,
  Flower,
  Grid,
  Heart,
  Instagram,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Palette,
  Phone,
  PlayCircle,
  Share2,
  Shield,
  Star,
  Target,
  Twitter,
  Users,
  Utensils,
  Video,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
  category: string;
  couple?: string;
  location?: string;
  date?: string;
  tags?: string[];
}

interface Package {
  id: string;
  name: string;
  price: string;
  duration: string;
  includes: string[];
  popular?: boolean;
  photos: number;
  videos: number;
  edits: number;
}

interface Testimonial {
  id: string;
  name: string;
  couple: string;
  rating: number;
  comment: string;
  avatar: string;
  weddingDate: string;
  photos: string[];
}

interface BookingSlot {
  date: string;
  available: boolean;
  price?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    type: 'photo',
    src: '💑',
    thumbnail: '💑',
    alt: 'Romantic couple portrait',
    category: 'portraits',
    couple: 'Sarah & James',
    location: 'Central Park',
    date: '2024-06-15',
    tags: ['romantic', 'sunset', 'outdoor'],
  },
  {
    id: '2',
    type: 'video',
    src: '🎬',
    thumbnail: '🎬',
    alt: 'Wedding ceremony highlights',
    category: 'ceremony',
    couple: 'Emma & David',
    location: "St. Mary's Church",
    date: '2024-07-20',
    tags: ['ceremony', 'emotional', 'traditional'],
  },
  {
    id: '3',
    type: 'photo',
    src: '💐',
    thumbnail: '💐',
    alt: 'Bridal bouquet details',
    category: 'details',
    couple: 'Lisa & Michael',
    location: 'Garden Villa',
    date: '2024-05-10',
    tags: ['details', 'flowers', 'elegant'],
  },
  {
    id: '4',
    type: 'photo',
    src: '💃',
    thumbnail: '💃',
    alt: 'First dance moment',
    category: 'reception',
    couple: 'Anna & Robert',
    location: 'Grand Ballroom',
    date: '2024-08-03',
    tags: ['dancing', 'reception', 'celebration'],
  },
  {
    id: '5',
    type: 'video',
    src: '🥂',
    thumbnail: '🥂',
    alt: 'Toast and speeches',
    category: 'reception',
    couple: 'Maria & Carlos',
    location: 'Vineyard Estate',
    date: '2024-09-12',
    tags: ['speeches', 'emotional', 'celebration'],
  },
  {
    id: '6',
    type: 'photo',
    src: '👰',
    thumbnail: '👰',
    alt: 'Bridal preparation',
    category: 'preparation',
    couple: 'Jennifer & Mark',
    location: 'Bridal Suite',
    date: '2024-04-22',
    tags: ['preparation', 'bride', 'details'],
  },
];

const PACKAGES: Package[] = [
  {
    id: 'essential',
    name: 'Essential Package',
    price: '$2,500',
    duration: '6 hours',
    photos: 300,
    videos: 0,
    edits: 50,
    includes: [
      '6 hours of photography coverage',
      '300+ high-resolution photos',
      '50 professionally edited images',
      'Online gallery access',
      'Print release included',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '$4,500',
    duration: '8 hours',
    photos: 500,
    videos: 2,
    edits: 100,
    popular: true,
    includes: [
      '8 hours of photography coverage',
      '500+ high-resolution photos',
      '100 professionally edited images',
      '2 highlight videos (3-5 min each)',
      'Engagement session included',
      'Online gallery with download',
      'Print release & USB drive',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    price: '$7,500',
    duration: '10 hours',
    photos: 800,
    videos: 5,
    edits: 200,
    includes: [
      '10 hours of photography coverage',
      '800+ high-resolution photos',
      '200 professionally edited images',
      '5 cinematic videos including ceremony',
      'Engagement & rehearsal sessions',
      'Second photographer included',
      'Premium online gallery',
      'Custom photo album & USB',
      'Raw files included',
    ],
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & James',
    couple: 'Married June 2024',
    rating: 5,
    comment:
      "Absolutely magical! They captured every precious moment of our special day. The photos are stunning and the videos bring back all the emotions. We couldn't be happier!",
    avatar: '💑',
    weddingDate: '2024-06-15',
    photos: ['💑', '💐', '💃'],
  },
  {
    id: '2',
    name: 'Emma & David',
    couple: 'Married July 2024',
    rating: 5,
    comment:
      'Professional, creative, and so easy to work with. They made us feel comfortable throughout the entire process and delivered beyond our expectations.',
    avatar: '👰',
    weddingDate: '2024-07-20',
    photos: ['👰', '🤵', '🎬'],
  },
  {
    id: '3',
    name: 'Lisa & Michael',
    couple: 'Married May 2024',
    rating: 5,
    comment:
      'The attention to detail is incredible. Every shot tells a story and captures the essence of our love. We treasure these memories forever.',
    avatar: '💕',
    weddingDate: '2024-05-10',
    photos: ['💕', '💐', '💍'],
  },
];

function HeroSection({ openModal }: { openModal: (type: string, data?: any) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = ['💑', '💐', '💃', '🎬'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-secondary to-surface-primary">
        <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">
          {heroImages[currentSlide]}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-content-primary">
          Capturing Love Stories
        </h1>
        <p className="text-xl md:text-2xl text-content-secondary max-w-3xl mx-auto">
          Professional wedding photography & videography that preserves your most precious moments
          forever
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-3"
            onClick={() => openModal('portfolioBrowser')}
          >
            <Camera className="mr-2 h-5 w-5" />
            View Our Work
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => openModal('weddingConsultation')}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Consultation
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const categories = ['all', 'portraits', 'ceremony', 'reception', 'details', 'preparation'];

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-content-secondary mb-8">
            A collection of our favorite moments captured
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'masonry' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('masonry')}
            >
              <Layers className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid gap-4 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'columns-1 md:columns-2 lg:columns-3'
          }`}
        >
          {filteredItems.map(item => (
            <Card
              key={item.id}
              className={`group cursor-pointer overflow-hidden hover:shadow-lg transition-all ${
                viewMode === 'masonry' ? 'break-inside-avoid mb-4' : ''
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-square bg-surface-secondary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {item.thumbnail}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="capitalize">
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {item.type === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-content-primary mb-1">{item.alt}</h3>
                {item.couple && <p className="text-sm text-content-secondary">{item.couple}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-surface-primary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-content-primary mb-2">
                      {selectedItem.alt}
                    </h3>
                    <div className="flex items-center gap-4 text-content-secondary">
                      <span>{selectedItem.couple}</span>
                      <span>{selectedItem.location}</span>
                      <span>{selectedItem.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="aspect-video bg-surface-secondary rounded-lg flex items-center justify-center text-8xl mb-4">
                  {selectedItem.src}
                  {selectedItem.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white/80" />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags?.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Download className="mr-2 w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Share2 className="mr-2 w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PackagesSection({ openModal }: { openModal: (type: string, data?: any) => void }) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-surface-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">
            Wedding Packages
          </h2>
          <p className="text-xl text-content-secondary">
            Choose the perfect package for your special day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PACKAGES.map(pkg => (
            <Card
              key={pkg.id}
              className={`relative hover:shadow-lg transition-all ${
                pkg.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                <p className="text-content-secondary">{pkg.duration} coverage</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center text-2xl mb-1">📸</div>
                    <div className="font-semibold">{pkg.photos}+</div>
                    <div className="text-sm text-content-secondary">Photos</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-2xl mb-1">🎬</div>
                    <div className="font-semibold">{pkg.videos}</div>
                    <div className="text-sm text-content-secondary">Videos</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center text-2xl mb-1">✨</div>
                    <div className="font-semibold">{pkg.edits}</div>
                    <div className="text-sm text-content-secondary">Edits</div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {pkg.includes.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-content-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={selectedPackage === pkg.id ? 'secondary' : 'default'}
                  onClick={() => {
                    setSelectedPackage(pkg.id);
                    openModal('packageCustomization', { package: pkg });
                  }}
                >
                  {selectedPackage === pkg.id ? 'Customize Package' : 'Choose Package'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-content-secondary mb-4">
            Need something custom? We&apos;d love to create a personalized package for you.
          </p>
          <Button variant="secondary" size="lg" onClick={() => openModal('customQuote')}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">
            Happy Couples
          </h2>
          <p className="text-xl text-content-secondary">
            What our clients say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(testimonial => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">{testimonial.name}</h3>
                    <p className="text-sm text-content-secondary">{testimonial.couple}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-content-secondary italic">&ldquo;{testimonial.comment}&rdquo;</p>

                <div className="flex gap-2">
                  {testimonial.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center"
                    >
                      {photo}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ openModal }: { openModal: (type: string, data?: any) => void }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  // Generate sample booking dates
  const generateBookingDates = (): BookingSlot[] => {
    const dates: BookingSlot[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const isAvailable = Math.random() > 0.3; // 70% availability

      dates.push({
        date: dateStr,
        available: isAvailable,
        price: isAvailable ? '$4,500' : undefined,
      });
    }

    return dates;
  };

  const bookingDates = generateBookingDates();

  return (
    <section className="py-20 px-4 bg-surface-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">
            Book Your Date
          </h2>
          <p className="text-xl text-content-secondary">
            Check availability and secure your wedding photography
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Available Dates</CardTitle>
              <p className="text-content-secondary">Click on an available date to book</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-content-secondary p-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {bookingDates.slice(0, 28).map(slot => {
                  const date = new Date(slot.date);
                  const day = date.getDate();
                  const isSelected = selectedDate === slot.date;

                  return (
                    <button
                      key={slot.date}
                      onClick={() => slot.available && setSelectedDate(slot.date)}
                      disabled={!slot.available}
                      className={`
                        p-2 text-sm rounded-lg transition-colors
                        ${
                          slot.available
                            ? isSelected
                              ? 'bg-primary text-white'
                              : 'bg-surface-primary hover:bg-surface-secondary border border-border'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-content-primary">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h4>
                      <p className="text-content-secondary">Starting from $4,500</p>
                    </div>
                    <Button
                      onClick={() => openModal('bookingConsultation', { date: selectedDate })}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
              <p className="text-content-secondary">Let&apos;s discuss your special day</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Bride&apos;s Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter bride's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Groom&apos;s Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter groom's name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={selectedDate || ''}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Venue/Location
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Wedding venue or location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="Tell us about your vision for your special day..."
                />
              </div>

              <Button className="w-full" size="lg" onClick={() => openModal('weddingInquiry')}>
                <Calendar className="mr-2 h-5 w-5" />
                Send Inquiry
              </Button>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Phone className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-content-secondary">(555) 123-4567</p>
                </div>
                <div className="text-center">
                  <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-content-secondary">hello@weddingpro.com</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-content-secondary">New York, NY</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function WeddingPage() {
  // Modal state management
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>({});

  // Wedding planning state
  const [planningData, setPlanningData] = useState({
    weddingDate: '',
    venue: '',
    guestCount: 0,
    budget: 0,
    timeline: [],
    vendors: [],
    checklist: [],
  });

  // Vendor data
  const [vendorData, setVendorData] = useState({
    photographers: [],
    florists: [],
    caterers: [],
    musicians: [],
    venues: [],
  });

  // Guest management
  const [guestData, setGuestData] = useState({
    invited: 0,
    confirmed: 0,
    pending: 0,
    dietary: {},
    seating: {},
  });

  const openModal = (modalType: string, data: any = {}) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-primary/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-content-primary">WeddingPro</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#gallery"
                className="text-content-secondary hover:text-content-primary transition-colors"
              >
                Gallery
              </a>
              <a
                href="#packages"
                className="text-content-secondary hover:text-content-primary transition-colors"
              >
                Packages
              </a>
              <a
                href="#testimonials"
                className="text-content-secondary hover:text-content-primary transition-colors"
              >
                Reviews
              </a>
              <a
                href="#booking"
                className="text-content-secondary hover:text-content-primary transition-colors"
              >
                Booking
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
              <Button onClick={() => openModal('emergencyPlanning')}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection openModal={openModal} />
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="packages">
        <PackagesSection openModal={openModal} />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="booking">
        <BookingSection openModal={openModal} />
      </div>

      {/* Comprehensive Modal System */}
      <Modal isOpen={activeModal !== null} onClose={closeModal}>
        {/* Wedding Planning & Consultation Modals */}
        {activeModal === 'weddingConsultation' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Wedding Consultation Booking
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bride&apos;s Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-border rounded-lg"
                    placeholder="First & Last Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Groom&apos;s Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-border rounded-lg"
                    placeholder="First & Last Name"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-border rounded-lg"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-border rounded-lg"
                    placeholder="couple@email.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Wedding Date</label>
                  <input type="date" className="w-full p-3 border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Guest Count</label>
                  <select className="w-full p-3 border border-border rounded-lg">
                    <option>Select guest count</option>
                    <option>25-50 guests</option>
                    <option>50-100 guests</option>
                    <option>100-200 guests</option>
                    <option>200+ guests</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Wedding Vision</label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg resize-none"
                  placeholder="Tell us about your dream wedding style, preferred locations, must-have shots..."
                ></textarea>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('weddingPlanner');
                  }}
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Book Consultation
                </Button>
                <Button variant="secondary" onClick={() => openModal('weddingPlanner')}>
                  <Clipboard className="mr-2 w-4 h-4" />
                  Start Planning
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Wedding Planner */}
        {activeModal === 'weddingPlanner' && (
          <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clipboard className="w-6 h-6 text-primary" />
              Complete Wedding Planning Suite
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('timelineManager')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Timeline Manager</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  Plan your day from getting ready to last dance
                </p>
              </Card>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('vendorCoordination')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Vendor Network</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  Connect with our trusted vendor partners
                </p>
              </Card>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('budgetManager')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Budget Tracker</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  Manage expenses and payment schedules
                </p>
              </Card>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('guestManagement')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Guest Management</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  RSVPs, dietary needs, seating charts
                </p>
              </Card>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('weddingInsurance')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Event Insurance</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  Protect your investment with coverage
                </p>
              </Card>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openModal('emergencyKit')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Emergency Kit</h3>
                </div>
                <p className="text-sm text-content-secondary">
                  Day-of coordination and backup plans
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Timeline Management */}
        {activeModal === 'timelineManager' && (
          <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Wedding Day Timeline
            </h2>
            <div className="space-y-4">
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Pre-Ceremony (8:00 AM - 3:00 PM)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>8:00 AM - Hair & Makeup</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>10:00 AM - Photographer arrives</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>1:00 PM - First look photos</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Ceremony (3:30 PM - 4:30 PM)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>3:30 PM - Guest seating</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>4:00 PM - Processional</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Reception (5:00 PM - 11:00 PM)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>5:00 PM - Cocktail hour</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>7:00 PM - First dance</span>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Download className="mr-2 w-4 h-4" />
                  Download Timeline
                </Button>
                <Button variant="secondary" onClick={() => openModal('vendorCoordination')}>
                  <Users className="mr-2 w-4 h-4" />
                  Share with Vendors
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Vendor Coordination Network */}
        {activeModal === 'vendorCoordination' && (
          <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Trusted Vendor Network
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Flower className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Florists</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Beautiful arrangements for your special day
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Garden Dreams</span>
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bloom & Co</span>
                    <Badge>Recommended</Badge>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Cake className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Caterers</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Delicious cuisine for your celebration
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Artisan Catering</span>
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fresh Flavors</span>
                    <Badge>Featured</Badge>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Music className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Musicians</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Perfect soundtrack for your day
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Harmony Strings</span>
                    <Badge variant="secondary">Classical</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">DJ Premier</span>
                    <Badge>Popular</Badge>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Venues</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Stunning locations for your ceremony
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Grand Estate</span>
                    <Badge variant="secondary">Luxury</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Garden Pavilion</span>
                    <Badge>Outdoor</Badge>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Car className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Transportation</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">Elegant arrival and departure</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Elite Limos</span>
                    <Badge variant="secondary">Luxury</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Classic Cars</span>
                    <Badge>Vintage</Badge>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Coordinators</h3>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Expert planning and day-of coordination
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Dream Weddings</span>
                    <Badge variant="secondary">Full Service</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Perfect Day</span>
                    <Badge>Day-of</Badge>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1">
                <Phone className="mr-2 w-4 h-4" />
                Request Vendor Quotes
              </Button>
              <Button variant="secondary" onClick={() => openModal('budgetManager')}>
                <DollarSign className="mr-2 w-4 h-4" />
                Track Expenses
              </Button>
            </div>
          </div>
        )}

        {/* Package Customization */}
        {activeModal === 'packageCustomization' && (
          <div className="p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Edit className="w-6 h-6 text-primary" />
              Customize Your Package
            </h2>
            <div className="space-y-6">
              <div className="bg-surface-secondary p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  {modalData.package?.name || 'Selected Package'}
                </h3>
                <p className="text-2xl font-bold text-primary">{modalData.package?.price}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Add Extra Services</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Additional Hour Coverage', price: '+$400' },
                    { name: 'Engagement Session', price: '+$500' },
                    { name: 'Second Photographer', price: '+$800' },
                    { name: 'Same Day Highlights', price: '+$300' },
                    { name: 'Drone Photography', price: '+$600' },
                    { name: 'Premium Album Upgrade', price: '+$400' },
                  ].map((addon, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-semibold text-primary">{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => openModal('customQuote')}>
                  <Target className="mr-2 w-4 h-4" />
                  Get Custom Quote
                </Button>
                <Button variant="secondary" onClick={() => openModal('bookingConsultation')}>
                  <Calendar className="mr-2 w-4 h-4" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Browser */}
        {activeModal === 'portfolioBrowser' && (
          <div className="p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Professional Portfolio
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GALLERY_ITEMS.map(item => (
                <Card
                  key={item.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square bg-surface-secondary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {item.thumbnail}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="capitalize">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {item.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <Camera className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-content-primary mb-1">{item.alt}</h3>
                    {item.couple && <p className="text-sm text-content-secondary">{item.couple}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" onClick={() => openModal('weddingConsultation')}>
                <Calendar className="mr-2 w-4 h-4" />
                Book Your Session
              </Button>
              <Button variant="secondary">
                <Download className="mr-2 w-4 h-4" />
                Download Gallery
              </Button>
            </div>
          </div>
        )}

        {/* Emergency Planning & Day-of Coordination */}
        {activeModal === 'emergencyPlanning' && (
          <div className="p-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              Emergency Support & Day-of Coordination
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  24/7 Emergency Hotline
                </h3>
                <p className="text-content-secondary mb-4">
                  Direct access to our team for urgent wedding day needs
                </p>
                <Button className="w-full">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Emergency Line
                </Button>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clipboard className="w-5 h-5 text-primary" />
                  Last-Minute Changes
                </h3>
                <p className="text-content-secondary mb-4">
                  Weather backup plans, vendor substitutions, timeline adjustments
                </p>
                <Button className="w-full" variant="secondary">
                  <Edit className="mr-2 w-4 h-4" />
                  Submit Change Request
                </Button>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Backup Equipment
                </h3>
                <p className="text-content-secondary mb-4">
                  Multiple camera systems, lighting, and audio backup
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">All equipment insured</span>
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Vendor Coordination
                </h3>
                <p className="text-content-secondary mb-4">
                  Real-time communication between all wedding vendors
                </p>
                <Button className="w-full" variant="secondary">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Join Vendor Chat
                </Button>
              </Card>
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Comprehensive Peace of Mind</h3>
              <p className="text-content-secondary">
                Our emergency coordination service ensures your special day runs smoothly, no matter
                what challenges arise.
              </p>
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        {(activeModal === 'weddingInquiry' ||
          activeModal === 'customQuote' ||
          activeModal === 'bookingConsultation') && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              {activeModal === 'weddingInquiry'
                ? 'Wedding Inquiry'
                : activeModal === 'customQuote'
                  ? 'Custom Quote Request'
                  : 'Consultation Booking'}
            </h2>
            <div className="text-center space-y-4">
              <div className="text-6xl">💕</div>
              <p className="text-lg text-content-secondary">
                {activeModal === 'weddingInquiry'
                  ? "Your inquiry has been sent! We'll respond within 24 hours."
                  : activeModal === 'customQuote'
                    ? "Custom quote request submitted! We'll create a personalized package for you."
                    : 'Consultation booking confirmed! Check your email for details.'}
              </p>
              <div className="flex gap-3">
                <Button onClick={() => openModal('weddingPlanner')}>
                  <Clipboard className="mr-2 w-4 h-4" />
                  Start Planning
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                  <CheckCircle className="mr-2 w-4 h-4" />
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Footer */}
      <footer className="bg-surface-secondary border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-content-primary">WeddingPro</span>
              </div>
              <p className="text-content-secondary mb-4">
                Creating timeless memories through exceptional wedding photography and videography.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-content-primary mb-4">Services</h3>
              <ul className="space-y-2 text-content-secondary">
                <li>Wedding Photography</li>
                <li>Wedding Videography</li>
                <li>Engagement Sessions</li>
                <li>Bridal Portraits</li>
                <li>Rehearsal Coverage</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-content-primary mb-4">Quick Links</h3>
              <ul className="space-y-2 text-content-secondary">
                <li>Portfolio</li>
                <li>Pricing</li>
                <li>Testimonials</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-content-primary mb-4">Contact Info</h3>
              <div className="space-y-3 text-content-secondary">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (555) 123-4567
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@weddingpro.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  New York, NY
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-content-secondary">
            <p>&copy; 2024 WeddingPro. All rights reserved. Capturing love stories since 2018.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
