'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Grid3X3,
  Heart,
  List,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  fastShipping: boolean;
  category: string;
}

const PRODUCT_DATA: Product = {
  id: 1,
  name: 'Premium Wireless Headphones',
  price: 249,
  originalPrice: 329,
  rating: 4.8,
  reviews: 2847,
  colors: ['Black', 'White', 'Silver', 'Blue'],
  sizes: [],
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1491927570842-0261e477d937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  description:
    'Experience crystal-clear audio with our premium wireless headphones featuring advanced noise cancellation, 30-hour battery life, and premium materials.',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium leather finish',
    'Fast charging (5 min = 3 hours)',
    'Multi-device connectivity',
    'Touch controls',
    'Premium carry case included',
  ],
  inStock: true,
  fastShipping: true,
  category: 'Electronics',
};

const RELATED_PRODUCTS = [
  {
    id: 2,
    name: 'Wireless Earbuds Pro',
    price: 179,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
    reviews: 1234,
  },
  {
    id: 3,
    name: 'Gaming Headset RGB',
    price: 199,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
    reviews: 892,
  },
  {
    id: 4,
    name: 'Studio Monitor Headphones',
    price: 299,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
    reviews: 567,
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 89,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
    reviews: 2156,
  },
];

const REVIEWS = [
  {
    id: 1,
    user: 'Alex M.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Amazing sound quality!',
    content:
      'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised.',
    helpful: 24,
    verified: true,
    images: ['📸', '📸'],
  },
  {
    id: 2,
    user: 'Sarah K.',
    rating: 5,
    date: '1 month ago',
    title: 'Perfect for work and travel',
    content:
      "I use these every day for work calls and they're fantastic. The comfort level is outstanding even after long sessions.",
    helpful: 18,
    verified: true,
    images: [],
  },
  {
    id: 3,
    user: 'Mike R.',
    rating: 4,
    date: '3 weeks ago',
    title: 'Great build quality',
    content:
      'Really solid construction and premium feel. Only minor complaint is the touch controls can be a bit sensitive.',
    helpful: 12,
    verified: true,
    images: ['📸'],
  },
];

function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('single');

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  if (viewMode === 'grid') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-content-primary">Product Gallery</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('single')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Single View
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-surface-secondary rounded-xl flex items-center justify-center text-4xl cursor-pointer hover:bg-surface-secondary/80 transition-colors"
              onClick={() => {
                setCurrentImage(index);
                setViewMode('single');
              }}
            >
              {image}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-content-secondary">
            {currentImage + 1} of {images.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('grid')}
            className="flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            Grid View
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-2"
        >
          <ZoomIn className="w-4 h-4" />
          {isZoomed ? 'Zoom Out' : 'Zoom In'}
        </Button>
      </div>

      {/* Main Image */}
      <div className="relative">
        <div
          className={`aspect-square bg-surface-secondary rounded-2xl overflow-hidden transition-all duration-300 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        >
          <Image
            src={images[currentImage]}
            alt={`Product view ${currentImage + 1}`}
            className="w-full h-full object-cover"
            width={600}
            height={600}
          />
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-surface-primary/80 backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-surface-primary/80 backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentImage === index ? 'bg-primary' : 'bg-surface-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-16 h-16 bg-surface-secondary rounded-lg overflow-hidden transition-all ${
              currentImage === index
                ? 'ring-2 ring-primary bg-primary/10'
                : 'hover:bg-surface-secondary/80'
            }`}
          >
            <Image
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
              width={64}
              height={64}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductOptions({
  product,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
}: {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div>
          <h4 className="font-semibold text-content-primary mb-3">Color: {selectedColor}</h4>
          <div className="flex gap-3">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? 'border-primary scale-110'
                    : 'border-border hover:border-primary/50'
                } ${
                  color === 'Black'
                    ? 'bg-gray-900'
                    : color === 'White'
                      ? 'bg-white'
                      : color === 'Silver'
                        ? 'bg-gray-400'
                        : color === 'Blue'
                          ? 'bg-blue-500'
                          : 'bg-surface-secondary'
                }`}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h4 className="font-semibold text-content-primary mb-3">Quantity</h4>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-semibold text-content-primary mb-3">Key Features</h4>
        <ul className="space-y-2">
          {product.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-status-success flex-shrink-0" />
              <span className="text-content-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewsSection({
  reviews,
  openModal,
}: {
  reviews: typeof REVIEWS;
  openModal: (type: string) => void;
}) {
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    star => reviews.filter(review => review.rating === star).length
  );

  if (viewMode === 'summary') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-content-primary">Customer Reviews</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openModal('write-review')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Write Review
            </Button>
            <Button
              variant="outline"
              onClick={() => setViewMode('detailed')}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              View All
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Summary */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-content-primary">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-surface-secondary'
                    }`}
                  />
                ))}
              </div>
              <p className="text-content-secondary">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((count, index) => {
                const star = 5 - index;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{star}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-content-secondary">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Reviews Preview */}
          <div className="space-y-3">
            {reviews.slice(0, 2).map(review => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-content-primary flex items-center gap-2">
                      {review.user}
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-content-secondary">{review.date}</span>
                </div>
                <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                <p className="text-sm text-content-secondary line-clamp-2">{review.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-content-primary">All Reviews ({reviews.length})</h3>
        <Button
          variant="outline"
          onClick={() => setViewMode('summary')}
          className="flex items-center gap-2"
        >
          <Grid3X3 className="w-4 h-4" />
          Summary
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-semibold text-content-primary flex items-center gap-2">
                  {review.user}
                  {review.verified && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-status-success/10 text-status-success"
                    >
                      ✓ Verified Purchase
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-content-secondary">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-content-secondary mb-4">{review.content}</p>

            {review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-secondary/80 transition-colors"
                  >
                    {image}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1 text-content-secondary hover:text-primary transition-colors">
                <Heart className="w-4 h-4" />
                Helpful ({review.helpful})
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [stockNotifications, setStockNotifications] = useState(false);

  // Modal state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // Enhanced cart functionality
  const addToCart = (product: any, options: any) => {
    const cartItem = {
      id: `${product.id}-${options.color}-${Date.now()}`,
      product,
      color: options.color,
      quantity: options.quantity,
      addedAt: new Date().toISOString(),
    };
    setCartItems(prev => [...prev, cartItem]);
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const totalPrice = PRODUCT_DATA.price * quantity;
  const savings = PRODUCT_DATA.originalPrice
    ? (PRODUCT_DATA.originalPrice - PRODUCT_DATA.price) * quantity
    : 0;

  return (
    <main className="min-h-screen bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-content-secondary mb-6">
          <span>Home</span> → <span>Electronics</span> → <span>Headphones</span> →
          <span className="text-content-primary font-medium"> {PRODUCT_DATA.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={PRODUCT_DATA.images} productName={PRODUCT_DATA.name} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-content-primary mb-2">{PRODUCT_DATA.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(PRODUCT_DATA.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-surface-secondary'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-content-secondary">
                  {PRODUCT_DATA.rating} ({PRODUCT_DATA.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-content-primary">
                  ${PRODUCT_DATA.price}
                </span>
                {PRODUCT_DATA.originalPrice && (
                  <>
                    <span className="text-xl text-content-secondary line-through">
                      ${PRODUCT_DATA.originalPrice}
                    </span>
                    <Badge className="bg-status-success/10 text-status-success">
                      Save ${PRODUCT_DATA.originalPrice - PRODUCT_DATA.price}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-content-secondary leading-relaxed mb-6">
                {PRODUCT_DATA.description}
              </p>
            </div>

            <ProductOptions
              product={PRODUCT_DATA}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            {/* Add to Cart Section */}
            <div className="space-y-4 pt-6 border-t border-border">
              {quantity > 1 && (
                <div className="bg-surface-secondary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({quantity} items):</span>
                    <span className="font-bold text-xl">${totalPrice}</span>
                  </div>
                  {savings > 0 && (
                    <div className="text-status-success text-sm">You save: ${savings}</div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-12"
                  disabled={!PRODUCT_DATA.inStock}
                  onClick={() => {
                    if (PRODUCT_DATA.inStock) {
                      openModal('add-to-cart', {
                        product: PRODUCT_DATA,
                        color: selectedColor,
                        quantity,
                        totalPrice,
                        savings,
                      });
                    }
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {PRODUCT_DATA.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    openModal(isWishlisted ? 'wishlist-removed' : 'wishlist-added', {
                      product: PRODUCT_DATA,
                    });
                  }}
                  className="h-12 px-4"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-4"
                  onClick={() => openModal('share-product', { product: PRODUCT_DATA })}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-status-success" />
                  <span className="text-content-secondary">
                    {PRODUCT_DATA.fastShipping
                      ? 'FREE next-day delivery'
                      : 'FREE shipping on orders over $75'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openModal('shipping-calculator')}
                    className="text-primary hover:text-primary/80 p-0 h-auto underline"
                  >
                    Calculate shipping
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span className="text-content-secondary">30-day free returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-content-secondary">2-year warranty included</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openModal('warranty-protection')}
                    className="text-primary hover:text-primary/80 p-0 h-auto underline"
                  >
                    View protection options
                  </Button>
                </div>
              </div>

              {/* Additional Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal('compare-products')}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Compare Products
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal('price-alert')}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Price Alert
                </Button>
                {!PRODUCT_DATA.inStock && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal('stock-notification')}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Notify When Available
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-12">
          <ReviewsSection reviews={REVIEWS} openModal={openModal} />
        </section>

        {/* Related Products */}
        <section>
          <h3 className="text-2xl font-bold text-content-primary mb-6">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-surface-secondary rounded-t-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openModal('quick-view', product)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-content-primary mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-surface-secondary'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-content-secondary">({product.reviews})</span>
                  </div>
                  <div className="text-lg font-bold text-content-primary">${product.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Enhanced Modal System */}
      {activeModal && (
        <Modal isOpen={true} onClose={closeModal}>
          {/* Advanced Add to Cart Modal */}
          {activeModal === 'add-to-cart' && modalData && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-success/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-status-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Added to Cart!</h2>
                  <p className="text-content-secondary">
                    {modalData.product.name} - {modalData.color}
                  </p>
                </div>
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span>Item Total ({modalData.quantity}x):</span>
                  <span className="font-semibold">${modalData.totalPrice}</span>
                </div>
                {modalData.savings > 0 && (
                  <div className="flex justify-between text-status-success">
                    <span>You Saved:</span>
                    <span className="font-semibold">${modalData.savings}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold">
                    Cart Subtotal ({cartItems.length + 1} items):
                  </span>
                  <span className="font-bold text-lg">
                    $
                    {(
                      cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) +
                      modalData.totalPrice
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-content-primary">Recommended Add-ons</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-secondary rounded-lg flex items-center justify-center text-lg">
                        🎧
                      </div>
                      <div>
                        <div className="font-medium text-sm">Premium Carry Case</div>
                        <div className="text-xs text-content-secondary">+$29 (20% off)</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-secondary rounded-lg flex items-center justify-center text-lg">
                        🔌
                      </div>
                      <div>
                        <div className="font-medium text-sm">USB-C Fast Charger</div>
                        <div className="text-xs text-content-secondary">+$19 (15% off)</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    addToCart(modalData.product, modalData);
                    closeModal();
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    addToCart(modalData.product, modalData);
                    openModal('cart-summary');
                  }}
                >
                  View Cart & Checkout
                </Button>
              </div>
            </div>
          )}

          {/* Cart Summary Modal */}
          {activeModal === 'cart-summary' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-content-primary">
                  Shopping Cart ({cartItems.length} items)
                </h2>
                <Button variant="outline" size="sm" onClick={() => openModal('save-for-later')}>
                  <Heart className="w-4 h-4 mr-2" />
                  Saved Items (3)
                </Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg"
                  >
                    <div className="w-16 h-16 bg-surface-secondary rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-content-primary">{item.product.name}</h4>
                      <p className="text-sm text-content-secondary">Color: {item.color}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-content-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-status-error hover:text-status-error/80 p-0 h-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    $
                    {cartItems
                      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-status-success">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>
                    $
                    {(
                      cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) *
                      0.08
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    $
                    {(
                      cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) *
                      1.08
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Continue Shopping
                </Button>
                <Button className="flex-1">Proceed to Checkout</Button>
              </div>
            </div>
          )}

          {/* Product Comparison Modal */}
          {activeModal === 'compare-products' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-content-primary">Compare Products</h2>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square bg-surface-secondary rounded-lg flex items-center justify-center text-4xl">
                    🎧
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">Premium Wireless</h3>
                    <div className="text-2xl font-bold text-primary">$249</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-content-secondary ml-1">(2,847)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-square bg-surface-secondary rounded-lg flex items-center justify-center text-4xl">
                    🎮
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">Gaming Headset RGB</h3>
                    <div className="text-2xl font-bold text-content-primary">$199</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-surface-secondary" />
                      <span className="text-sm text-content-secondary ml-1">(892)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-square bg-surface-secondary rounded-lg flex items-center justify-center text-4xl">
                    🎧
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">Studio Monitor</h3>
                    <div className="text-2xl font-bold text-content-primary">$299</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-content-secondary ml-1">(567)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-content-primary">Feature Comparison</h3>
                <div className="space-y-3">
                  {[
                    { feature: 'Noise Cancellation', values: ['✓ Active', '✗ None', '✓ Passive'] },
                    { feature: 'Battery Life', values: ['30 hours', '20 hours', '40 hours'] },
                    {
                      feature: 'Wireless',
                      values: ['✓ Bluetooth 5.2', '✓ 2.4GHz', '✓ Bluetooth 5.0'],
                    },
                    { feature: 'Gaming Features', values: ['✗ None', '✓ RGB + Mic', '✗ None'] },
                    {
                      feature: 'Professional Use',
                      values: ['✓ Excellent', '✗ Gaming Only', '✓ Studio Grade'],
                    },
                  ].map((comparison, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b border-border">
                      <div className="font-medium text-content-primary">{comparison.feature}</div>
                      {comparison.values.map((value, i) => (
                        <div key={i} className="text-sm text-content-secondary">
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Close Comparison
                </Button>
                <Button className="flex-1">Add Current Product to Cart</Button>
              </div>
            </div>
          )}

          {/* Quick View Related Product Modal */}
          {activeModal === 'quick-view' && modalData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-content-primary">Quick View</h2>
                <Button variant="outline" size="sm" onClick={() => openModal('compare-products')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Compare
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square bg-surface-secondary rounded-lg flex items-center justify-center text-6xl">
                  {modalData.image}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-content-primary">{modalData.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(modalData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-surface-secondary'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-content-secondary">
                        ({modalData.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-primary">${modalData.price}</div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-content-primary">Key Features</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-status-success" />
                        <span>Premium build quality</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-status-success" />
                        <span>Extended warranty included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-status-success" />
                        <span>Fast shipping available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Calculator Modal */}
          {activeModal === 'shipping-calculator' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-content-primary">Shipping Calculator</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your zip code"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-content-primary">Shipping Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-content-secondary">5-7 business days</div>
                      </div>
                      <div className="text-status-success font-semibold">FREE</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-content-secondary">2-3 business days</div>
                      </div>
                      <div className="font-semibold">$12.99</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Next Day Delivery</div>
                        <div className="text-sm text-content-secondary">Order by 2 PM EST</div>
                      </div>
                      <div className="font-semibold">$24.99</div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Premium Member Benefits</span>
                  </div>
                  <ul className="text-sm text-content-secondary space-y-1">
                    <li>• FREE next-day delivery on all orders</li>
                    <li>• FREE returns and exchanges</li>
                    <li>• Exclusive member-only deals</li>
                  </ul>
                  <Button size="sm" className="mt-3">
                    Join Premium for $9.99/month
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={closeModal}>
                Apply Shipping Option
              </Button>
            </div>
          )}

          {/* Stock Notification Modal */}
          {activeModal === 'stock-notification' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Get Notified</h2>
                  <p className="text-content-secondary">
                    We&apos;ll alert you when this item is back in stock
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-content-primary">Notification Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Email notification when back in stock</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">SMS notification when back in stock</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Price drop alerts</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setStockNotifications(true);
                    closeModal();
                    openModal('notification-success');
                  }}
                >
                  Set Up Notifications
                </Button>
              </div>
            </div>
          )}

          {/* Price Alert Modal */}
          {activeModal === 'price-alert' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-success/10 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-status-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Price Drop Alert</h2>
                  <p className="text-content-secondary">Get notified when the price drops</p>
                </div>
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span>Current Price:</span>
                  <span className="text-xl font-bold">${PRODUCT_DATA.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Target Price:</span>
                  <input
                    type="number"
                    defaultValue={Math.floor(PRODUCT_DATA.price * 0.9)}
                    className="w-24 p-2 border border-border rounded bg-surface-primary text-content-primary text-right"
                  />
                </div>
                <div className="text-sm text-content-secondary">
                  Historical low: ${Math.floor(PRODUCT_DATA.price * 0.8)} (3 months ago)
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Alert me for price drops</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Alert me for special promotions</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setPriceAlerts(true);
                    closeModal();
                    openModal('alert-success');
                  }}
                >
                  Set Price Alert
                </Button>
              </div>
            </div>
          )}

          {/* Warranty & Protection Modal */}
          {activeModal === 'warranty-protection' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Warranty & Protection</h2>
                  <p className="text-content-secondary">Comprehensive coverage options</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-content-primary">Standard Warranty</h3>
                    <Badge className="bg-status-success/10 text-status-success">Included</Badge>
                  </div>
                  <ul className="text-sm text-content-secondary space-y-1">
                    <li>• 2-year manufacturer warranty</li>
                    <li>• Covers manufacturing defects</li>
                    <li>• Free repair or replacement</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-content-primary">Extended Protection Plan</h3>
                    <div className="text-right">
                      <div className="font-semibold text-primary">+$49</div>
                      <div className="text-xs text-content-secondary">Save $30</div>
                    </div>
                  </div>
                  <ul className="text-sm text-content-secondary space-y-1 mb-3">
                    <li>• 4-year total coverage</li>
                    <li>• Accidental damage protection</li>
                    <li>• Liquid damage coverage</li>
                    <li>• Battery replacement included</li>
                    <li>• Fast-track replacement service</li>
                  </ul>
                  <Button size="sm" variant="outline" className="w-full">
                    Add Protection Plan
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-content-primary">Premium Care+</h3>
                    <div className="text-right">
                      <div className="font-semibold text-primary">+$89</div>
                      <div className="text-xs text-content-secondary">Best value</div>
                    </div>
                  </div>
                  <ul className="text-sm text-content-secondary space-y-1 mb-3">
                    <li>• Everything in Extended Protection</li>
                    <li>• White-glove setup service</li>
                    <li>• Priority technical support</li>
                    <li>• Annual cleaning & maintenance</li>
                    <li>• Upgrade protection (trade-in credits)</li>
                  </ul>
                  <Button size="sm" className="w-full">
                    Add Premium Care+
                  </Button>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="text-sm text-content-secondary">
                  <strong>Why choose protection?</strong> 87% of customers who purchase protection
                  plans use them within the first 3 years. Our plans have a 96% customer
                  satisfaction rating.
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={closeModal}>
                Continue Without Protection
              </Button>
            </div>
          )}

          {/* Review Management Modal */}
          {activeModal === 'write-review' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-content-primary">Write a Review</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="p-1">
                        <Star className="w-8 h-8 text-yellow-400 hover:fill-yellow-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    placeholder="Summarize your experience"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Detailed Review
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Share your experience with this product..."
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-content-secondary mx-auto mb-2" />
                    <p className="text-sm text-content-secondary">Click to upload photos</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      I verify this is a genuine review based on my own experience
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Allow others to contact me about this review</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button className="flex-1">Submit Review</Button>
              </div>
            </div>
          )}

          {/* Success Modals */}
          {activeModal === 'notification-success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-status-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-content-primary mb-2">
                  You&apos;re All Set!
                </h2>
                <p className="text-content-secondary">
                  We&apos;ll notify you as soon as this item is back in stock.
                </p>
              </div>
              <Button onClick={closeModal}>Got It</Button>
            </div>
          )}

          {activeModal === 'alert-success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-status-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-content-primary mb-2">Price Alert Set!</h2>
                <p className="text-content-secondary">
                  We&apos;ll email you when the price drops to your target.
                </p>
              </div>
              <Button onClick={closeModal}>Perfect</Button>
            </div>
          )}

          {/* Share Product Modal */}
          {activeModal === 'share-product' && modalData && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-content-primary">Share Product</h2>

              <div className="flex items-center gap-4 p-4 bg-surface-secondary/30 rounded-lg">
                <div className="w-16 h-16 bg-surface-secondary rounded-lg overflow-hidden">
                  <Image
                    src={modalData.product.images[0]}
                    alt={modalData.product.name}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-content-primary">{modalData.product.name}</h3>
                  <p className="text-content-secondary">${modalData.product.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Copy Link
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📧 Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📱 Text Message
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📘 Facebook
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  🐦 Twitter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  💼 LinkedIn
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Add a Personal Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Check out this amazing product I found..."
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                />
              </div>

              <Button className="w-full" onClick={closeModal}>
                Share Product
              </Button>
            </div>
          )}

          {/* Wishlist Modals */}
          {activeModal === 'wishlist-added' && modalData && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-content-primary mb-2">Added to Wishlist!</h2>
                <p className="text-content-secondary">
                  We&apos;ll notify you of price drops and special offers.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={closeModal}>
                  Continue Shopping
                </Button>
                <Button onClick={() => openModal('wishlist-view')}>View Wishlist</Button>
              </div>
            </div>
          )}

          {activeModal === 'wishlist-removed' && modalData && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-content-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-content-primary mb-2">
                  Removed from Wishlist
                </h2>
                <p className="text-content-secondary">You can always add it back later.</p>
              </div>
              <Button onClick={closeModal}>Got It</Button>
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}
