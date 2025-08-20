'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert/alert';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar/avatar';
import { Badge } from '@/components/ui/Badge/badge';
import { Button } from '@/components/ui/Button/button';
import { Card, CardContent } from '@/components/ui/Card/card';
import { Input } from '@/components/ui/Input/input';
import { Label } from '@/components/ui/Label/Label';
import { Progress } from '@/components/ui/Progress/progress';
import { Separator } from '@/components/ui/Separator/Separator';
import { Slider } from '@/components/ui/Slider/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
import { AdvancedThemePicker } from '@/components/ui/ThemeToggle/AdvancedThemePicker';
import { MinimalThemePicker } from '@/components/ui/ThemeToggle/MinimalThemePicker';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { useState } from 'react';

export default function EcommercePage() {
  const [cartItems, setCartItems] = useState(0);
  const [quantity, setQuantity] = useState([1]);
  const [selectedColor, setSelectedColor] = useState('navy');
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCartItems(prev => prev + quantity[0]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
              TriggerKings Store
            </Badge>

            <div className="flex items-center space-x-4">
              <ThemeToggle className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" />
              <Button variant="outline" size="sm" className="relative">
                Cart
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Wireless Headphones
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience audio perfection with our flagship product
          </p>
        </div>

        {/* Foundation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image Section */}
          <div>
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <div className="text-6xl text-blue-500/30">🎧</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                Electronics
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Premium Wireless Headphones Pro Max</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 (324 reviews)</span>
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Color</Label>
                <div className="flex space-x-3">
                  {[
                    { value: 'navy', color: 'bg-blue-900', name: 'Midnight Navy' },
                    { value: 'silver', color: 'bg-gray-300', name: 'Space Silver' },
                    { value: 'rose', color: 'bg-rose-300', name: 'Rose Gold' },
                    { value: 'black', color: 'bg-black', name: 'Deep Black' },
                  ].map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color.color} ${
                        selectedColor === color.value
                          ? 'ring-2 ring-blue-500 ring-offset-2'
                          : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Quantity: {quantity[0]}
                </Label>
                <Slider
                  value={quantity}
                  onValueChange={setQuantity}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Trust Badges */}
            <Alert>
              <AlertDescription>
                ✅ Free shipping on orders over $50 • 🛡️ 2-year warranty • 🔄 30-day returns
              </AlertDescription>
            </Alert>

            {/* Pricing */}
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="pt-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">$299.99</span>
                  <span className="text-lg text-gray-500 line-through">$399.99</span>
                  <Badge variant="destructive">25% OFF</Badge>
                </div>
                <p className="text-sm text-orange-600">Sale ends in 2 days!</p>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full bg-interactive text-interactive-foreground hover:bg-interactive/90 font-semibold py-3"
              onClick={addToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>Adding to Cart...</span>
                </span>
              ) : (
                `Add to Cart - $${(299.99 * quantity[0]).toFixed(2)}`
              )}
            </Button>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (324)</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Product Overview</h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                    Experience audio like never before with our Premium Wireless Headphones Pro Max.
                    Engineered with cutting-edge technology and premium materials, these headphones
                    deliver exceptional sound quality, comfort, and style.
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">⚡ Key Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>Active Noise Cancellation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>40-hour battery life</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>Premium leather cushions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>Multi-device connectivity</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      🏆 Awards & Recognition
                    </h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="mr-2 mb-2">
                        Best Audio 2024
                      </Badge>
                      <Badge variant="outline" className="mr-2 mb-2">
                        Editor&apos;s Choice
                      </Badge>
                      <Badge variant="outline" className="mr-2 mb-2">
                        5-Star Rating
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6 p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4">Technical Specifications</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Audio</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver Size:</span>
                        <span>40mm Dynamic</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency Response:</span>
                        <span>20Hz - 20kHz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Impedance:</span>
                        <span>32 Ohm</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Connectivity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bluetooth:</span>
                        <span>5.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span>Up to 30m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Multi-point:</span>
                        <span>Up to 2 devices</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 p-6">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} className="text-yellow-400 text-lg">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-2xl font-bold">4.8</span>
                        <span className="text-gray-500">out of 5</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>

                {/* Rating Breakdown */}
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4">Rating Breakdown</h4>
                    <div className="space-y-2">
                      {[
                        { rating: 5, count: 234, percentage: 75 },
                        { rating: 4, count: 67, percentage: 20 },
                        { rating: 3, count: 15, percentage: 4 },
                        { rating: 2, count: 5, percentage: 1 },
                        { rating: 1, count: 3, percentage: 0 },
                      ].map(item => (
                        <div key={item.rating} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 w-16">
                            <span className="text-sm">{item.rating}</span>
                            <span className="text-yellow-400">★</span>
                          </div>
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-sm text-gray-500 w-12">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      user: 'Sarah Johnson',
                      rating: 5,
                      date: '2 days ago',
                      title: 'Absolutely Amazing!',
                      content:
                        'This product exceeded all my expectations. The build quality is fantastic and it works exactly as advertised.',
                      verified: true,
                    },
                    {
                      user: 'Mike Chen',
                      rating: 4,
                      date: '1 week ago',
                      title: 'Great value for money',
                      content:
                        'Really solid product. Minor issues with packaging but the item itself is excellent.',
                      verified: true,
                    },
                  ].map((review, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <Avatar>
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{review.user}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <span
                                    key={star}
                                    className={
                                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-semibold mb-2">{review.title}</h5>
                        <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6 p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4">Shipping Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-4">Shipping Options</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-medium">Standard Delivery</div>
                            <div className="text-sm text-gray-500">5-7 business days</div>
                          </div>
                          <div className="text-green-600 font-medium">FREE</div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-medium">Express Delivery</div>
                            <div className="text-sm text-gray-500">2-3 business days</div>
                          </div>
                          <div className="font-medium">$9.99</div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-medium">Next Day Delivery</div>
                            <div className="text-sm text-gray-500">Order by 2 PM</div>
                          </div>
                          <div className="font-medium">$19.99</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-4">Delivery Information</h4>
                      <Alert>
                        <AlertDescription>
                          📦 Order within the next 3 hours for same-day dispatch!
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">You Might Also Like</h2>
            <Button variant="ghost">View All →</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Premium Accessory Kit', price: 49.99, rating: 4.5 },
              { name: 'Wireless Charging Stand', price: 79.99, rating: 4.8 },
              { name: 'Premium Travel Case', price: 129.99, rating: 4.7 },
              { name: 'Pro Audio Cable', price: 29.99, rating: 4.9 },
            ].map((product, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 rounded-t flex items-center justify-center">
                    <div className="text-4xl text-gray-400">📦</div>
                  </div>
                </CardContent>
                <div className="p-4">
                  <h4 className="font-semibold mb-2 group-hover:text-interactive transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Stay Updated with TriggerKings</h3>
              <p className="text-blue-100">
                Get notified about new products, exclusive sales, and special offers
              </p>
              <div className="flex space-x-2 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-blue-200">
                Join 50,000+ subscribers • Unsubscribe anytime • No spam, ever
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Minimal Theme Picker */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">🎨 Research-Based Theme System</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized 3-color system based on design psychology and accessibility research
            </p>
          </div>
          <MinimalThemePicker />
        </div>

        {/* Advanced Theme Picker (Optional) */}
        <div className="mb-12 opacity-60">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium mb-2">🧪 Advanced Customization (Original)</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Compare with the research-backed minimal approach above
            </p>
          </div>
          <AdvancedThemePicker />
        </div>

        {/* Success Message */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-green-600 mb-2">🎉 E-Commerce Page Complete!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We&apos;ve successfully built a stunning product page using our component library
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Interactive Product Options</Badge>
            <Badge variant="secondary">Tabbed Content</Badge>
            <Badge variant="secondary">Customer Reviews</Badge>
            <Badge variant="secondary">Shopping Cart</Badge>
            <Badge variant="secondary">Related Products</Badge>
            <Badge variant="secondary">Newsletter Signup</Badge>
          </div>
        </div>
      </main>
    </div>
  );
}
