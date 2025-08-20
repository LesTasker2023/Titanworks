'use client';

import {
  Heart,
  ImageIcon,
  Pause,
  Play,
  Quote,
  ShoppingCart,
  SkipBack,
  SkipForward,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '.';
import { AspectRatio } from '../AspectRatio';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent } from '../Card';

export default function CarouselDemo() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!api || !autoplay) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, autoplay]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 299,
      rating: 4.5,
      image: '/daedalus.png',
      badge: 'Best Seller',
    },
    { id: 2, name: 'Smart Watch', price: 199, rating: 4.3, image: '/daedalus.png', badge: 'New' },
    { id: 3, name: 'Laptop Stand', price: 79, rating: 4.7, image: '/daedalus.png', badge: 'Sale' },
    { id: 4, name: 'USB-C Hub', price: 49, rating: 4.4, image: '/daedalus.png', badge: '' },
    {
      id: 5,
      name: 'Wireless Mouse',
      price: 89,
      rating: 4.6,
      image: '/daedalus.png',
      badge: 'Popular',
    },
  ];

  const testimonials = [
    {
      quote:
        'This product completely changed how we work. The interface is intuitive and the performance is outstanding.',
      author: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      rating: 5,
    },
    {
      quote:
        'Exceptional customer service and a product that delivers on all its promises. Highly recommended!',
      author: 'Michael Rodriguez',
      role: 'CEO',
      company: 'StartupXYZ',
      rating: 5,
    },
    {
      quote:
        "The best investment we've made this year. ROI was visible within the first month of implementation.",
      author: 'Emily Johnson',
      role: 'Operations Director',
      company: 'Global Solutions',
      rating: 5,
    },
    {
      quote:
        'Outstanding features and reliability. The team support has been fantastic throughout our journey.',
      author: 'David Kim',
      role: 'Tech Lead',
      company: 'Innovation Labs',
      rating: 4,
    },
  ];

  const featuredImages = [
    { id: 1, title: 'Mountain Landscape', category: 'Nature' },
    { id: 2, title: 'City Skyline', category: 'Urban' },
    { id: 3, title: 'Ocean Sunset', category: 'Nature' },
    { id: 4, title: 'Forest Path', category: 'Nature' },
    { id: 5, title: 'Architecture', category: 'Design' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Carousel Component</h1>
        <p className="text-muted-foreground">Scrollable content galleries and image carousels</p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple carousel layouts for displaying content
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="font-medium mb-3">Basic Image Carousel</h4>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {featuredImages.map(image => (
                    <CarouselItem key={image.id}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div className="text-center">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="font-semibold">{image.title}</p>
                              <Badge variant="outline" className="mt-1">
                                {image.category}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div>
              <h4 className="font-medium mb-3">Card Carousel</h4>
              <Carousel className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex carousels with controls, indicators, and interactive features
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Product Showcase Carousel */}
            <div>
              <h4 className="font-medium mb-3">Product Showcase with Controls</h4>
              <div className="space-y-4">
                <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto">
                  <CarouselContent>
                    {products.map(product => (
                      <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="relative">
                                <AspectRatio
                                  ratio={1}
                                  className="bg-muted rounded-lg overflow-hidden"
                                >
                                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    <ImageIcon className="h-8 w-8" />
                                  </div>
                                </AspectRatio>
                                {product.badge && (
                                  <Badge className="absolute top-2 left-2" variant="destructive">
                                    {product.badge}
                                  </Badge>
                                )}
                                <Button
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  variant="secondary"
                                >
                                  <Heart className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <h5 className="font-semibold line-clamp-1">{product.name}</h5>
                                <div className="flex items-center gap-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(product.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    ({product.rating})
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold">${product.price}</span>
                                  <Button size="sm">
                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setAutoplay(!autoplay)}>
                      {autoplay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      {autoplay ? 'Pause' : 'Auto-play'}
                    </Button>

                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => api?.scrollTo(0)}
                        disabled={!api}
                      >
                        <SkipBack className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => api?.scrollTo(count - 1)}
                        disabled={!api}
                      >
                        <SkipForward className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    Slide {current} of {count}
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === current - 1 ? 'bg-primary' : 'bg-muted'
                      }`}
                      onClick={() => api?.scrollTo(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div>
              <h4 className="font-medium mb-3">Customer Testimonials</h4>
              <Carousel className="w-full max-w-3xl mx-auto">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                          <Quote className="h-8 w-8 mx-auto mb-4 text-primary" />
                          <blockquote className="text-lg italic mb-6">
                            &quot;{testimonial.quote}&quot;
                          </blockquote>
                          <div className="space-y-2">
                            <div className="flex justify-center mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="font-semibold">{testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Vertical Carousel */}
            <div>
              <h4 className="font-medium mb-3">Vertical Carousel</h4>
              <div className="flex justify-center">
                <Carousel
                  opts={{
                    align: 'start',
                  }}
                  orientation="vertical"
                  className="w-full max-w-xs"
                >
                  <CarouselContent className="-mt-1 h-[300px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index} className="pt-1 md:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex items-center justify-center p-6">
                              <div className="text-center">
                                <div className="text-2xl font-semibold mb-2">Item {index + 1}</div>
                                <p className="text-sm text-muted-foreground">
                                  Vertical carousel item
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            {/* Multiple Items Carousel */}
            <div>
              <h4 className="font-medium mb-3">Multiple Items View</h4>
              <Carousel
                opts={{
                  align: 'start',
                  loop: false,
                }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent className="-ml-1">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <div className="p-1">
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <span className="text-primary font-semibold">{index + 1}</span>
                              </div>
                              <p className="text-sm font-medium">Feature {index + 1}</p>
                              <p className="text-xs text-muted-foreground mt-1">Description text</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Shows multiple items at once, responsive breakpoints
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
