'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  Award,
  Bell,
  Cake,
  Calendar,
  Check,
  ChefHat,
  Clock,
  Coffee,
  Crown,
  Filter,
  Flame,
  Gift,
  Heart,
  Info,
  MapPin,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Users,
  Utensils,
  Wine,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  badges: string[];
  rating: number;
  prepTime: string;
  spicy: boolean;
  popular: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_CATEGORIES = [
  { id: 'appetizers', name: 'Appetizers', icon: Utensils, count: 8 },
  { id: 'mains', name: 'Main Courses', icon: ChefHat, count: 12 },
  { id: 'pasta', name: 'Pasta & Risotto', icon: Utensils, count: 6 },
  { id: 'seafood', name: 'Fresh Seafood', icon: Utensils, count: 7 },
  { id: 'wine', name: 'Wine & Drinks', icon: Wine, count: 15 },
  { id: 'desserts', name: 'Desserts', icon: Cake, count: 5 },
];

const MENU_ITEMS = {
  appetizers: [
    {
      id: 1,
      name: 'Truffle Arancini',
      description:
        'Crispy risotto balls with black truffle, parmigiano reggiano, and wild mushroom cream',
      price: 18,
      image: '🍄',
      badges: ['Chef Special', 'Vegetarian'],
      rating: 4.8,
      prepTime: '8 min',
      spicy: false,
      popular: true,
    },
    {
      id: 2,
      name: 'Burrata Caprese',
      description: 'Creamy burrata with heirloom tomatoes, basil oil, and aged balsamic',
      price: 22,
      image: '🧄',
      badges: ['Fresh', 'Vegetarian'],
      rating: 4.9,
      prepTime: '5 min',
      spicy: false,
      popular: true,
    },
    {
      id: 3,
      name: 'Tuna Tartare',
      description: 'Yellowfin tuna with avocado, citrus, and sesame oil',
      price: 26,
      image: '🐟',
      badges: ['Raw', 'Gluten Free'],
      rating: 4.7,
      prepTime: '10 min',
      spicy: false,
      popular: false,
    },
  ],
  mains: [
    {
      id: 4,
      name: 'Dry-Aged Ribeye',
      description: '28-day aged USDA Prime ribeye with roasted bone marrow and seasonal vegetables',
      price: 65,
      image: '🥩',
      badges: ['Premium', 'Gluten Free'],
      rating: 4.9,
      prepTime: '25 min',
      spicy: false,
      popular: true,
    },
    {
      id: 5,
      name: 'Duck Confit',
      description: 'Slow-cooked duck leg with cherry gastrique and duck fat potatoes',
      price: 38,
      image: '🦆',
      badges: ['Chef Special'],
      rating: 4.6,
      prepTime: '20 min',
      spicy: false,
      popular: false,
    },
  ],
  pasta: [
    {
      id: 6,
      name: 'Lobster Ravioli',
      description: 'House-made pasta filled with Maine lobster in saffron cream sauce',
      price: 42,
      image: '🦞',
      badges: ['Premium', 'House Made'],
      rating: 4.8,
      prepTime: '15 min',
      spicy: false,
      popular: true,
    },
  ],
  seafood: [
    {
      id: 7,
      name: 'Chilean Sea Bass',
      description: 'Miso-glazed sea bass with shiitake mushrooms and bok choy',
      price: 48,
      image: '🐠',
      badges: ['Sustainable', 'Gluten Free'],
      rating: 4.7,
      prepTime: '18 min',
      spicy: false,
      popular: true,
    },
  ],
  wine: [
    {
      id: 8,
      name: 'Barolo Riserva 2018',
      description: 'Full-bodied Nebbiolo from Piedmont with notes of cherry and truffle',
      price: 185,
      image: '🍷',
      badges: ['Award Winner', 'Limited'],
      rating: 4.9,
      prepTime: 'Immediate',
      spicy: false,
      popular: true,
    },
  ],
  desserts: [
    {
      id: 9,
      name: 'Chocolate Soufflé',
      description: 'Warm dark chocolate soufflé with vanilla bean ice cream',
      price: 16,
      image: '🍫',
      badges: ['Signature', 'Made to Order'],
      rating: 4.8,
      prepTime: '20 min',
      spicy: false,
      popular: true,
    },
  ],
};

const FILTERS = [
  { id: 'popular', label: 'Popular', active: false },
  { id: 'vegetarian', label: 'Vegetarian', active: false },
  { id: 'gluten-free', label: 'Gluten Free', active: false },
  { id: 'spicy', label: 'Spicy', active: false },
  { id: 'under-25', label: 'Under $25', active: false },
];

function MenuItem({
  item,
  onAddToCart,
  cartItems,
  onUpdateCart,
  favoriteItems,
  openModal,
}: {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  cartItems: CartItem[];
  onUpdateCart: (itemId: number, quantity: number) => void;
  favoriteItems: number[];
  openModal: (type: string, data?: any) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cartItem = cartItems.find((c: CartItem) => c.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    onAddToCart(item);
  };

  const handleUpdate = (newQuantity: number) => {
    onUpdateCart(item.id, newQuantity);
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="p-6">
        <div className="flex gap-4">
          {/* Item Image */}
          <div className="w-20 h-20 bg-surface-secondary rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
            {item.image}
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-content-primary flex items-center gap-2">
                  {item.name}
                  {item.popular && <Flame className="w-4 h-4 text-status-warning" />}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-content-secondary">{item.rating}</span>
                  </div>
                  <span className="text-content-secondary">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-content-secondary" />
                    <span className="text-sm text-content-secondary">{item.prepTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-content-primary">${item.price}</div>
              </div>
            </div>

            <p
              className={`text-content-secondary text-sm leading-relaxed ${!isExpanded && 'line-clamp-2'}`}
            >
              {item.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-3">
              {item.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-primary/80"
                >
                  {isExpanded ? 'Show Less' : 'View Details'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openModal('item-details', item)}
                  className="text-content-secondary hover:text-primary"
                >
                  <Info className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={`${favoriteItems.includes(item.id) ? 'text-status-error' : 'text-content-secondary hover:text-status-error'}`}
                >
                  <Heart
                    className={`w-4 h-4 ${favoriteItems.includes(item.id) ? 'fill-current' : ''}`}
                  />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {quantity > 0 ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdate(quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" onClick={handleAdd} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CartSummary({
  cartItems,
  onUpdateCart,
  isOpen,
  onToggle,
  openModal,
}: {
  cartItems: CartItem[];
  onUpdateCart: (itemId: number, quantity: number) => void;
  isOpen: boolean;
  onToggle: () => void;
  openModal: (type: string, data?: any) => void;
}) {
  const total = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  if (!isOpen && itemCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && itemCount > 0 && (
        <Button onClick={onToggle} className="rounded-full w-16 h-16 relative shadow-lg">
          <ShoppingCart className="w-6 h-6" />
          <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center">
            {itemCount}
          </Badge>
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 max-h-96 overflow-hidden shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Your Order ({itemCount} items)
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name}</div>
                    <div className="text-sm text-content-secondary">${item.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                      className="w-6 h-6 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                      className="w-6 h-6 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Total: ${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  openModal('enhanced-checkout', {
                    items: cartItems,
                    total: total.toFixed(2),
                  })
                }
              >
                Proceed to Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Enhanced modal state for restaurant features
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
    table: 'any',
  });
  const [loyaltyPoints, setLoyaltyPoints] = useState(850);
  const [favoriteItems, setFavoriteItems] = useState<number[]>([1, 6, 9]);

  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find((c: CartItem) => c.id === item.id);
      if (existing) {
        return prev.map((c: CartItem) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCart = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter((c: CartItem) => c.id !== itemId));
    } else {
      setCartItems(prev =>
        prev.map((c: CartItem) => (c.id === itemId ? { ...c, quantity: newQuantity } : c))
      );
    }
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId) ? prev.filter((f: string) => f !== filterId) : [...prev, filterId]
    );
  };

  const getFilteredItems = () => {
    let items = MENU_ITEMS[activeCategory as keyof typeof MENU_ITEMS] || [];

    // Apply search
    if (searchQuery) {
      items = items.filter(
        (item: MenuItem) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    items = items.filter((item: MenuItem) => {
      if (activeFilters.includes('popular') && !item.popular) return false;
      if (activeFilters.includes('under-25') && item.price >= 25) return false;
      if (activeFilters.includes('vegetarian') && !item.badges.includes('Vegetarian')) return false;
      if (activeFilters.includes('gluten-free') && !item.badges.includes('Gluten Free'))
        return false;
      if (activeFilters.includes('spicy') && !item.spicy) return false;
      return true;
    });

    return items;
  };

  return (
    <main className="min-h-screen bg-surface-primary">
      {/* Restaurant Header */}
      <section className="bg-gradient-to-r from-primary/10 to-surface-accent/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-content-primary mb-4">
              Bella Vista Ristorante
            </h1>
            <p className="text-xl text-content-secondary mb-6">
              Authentic Italian cuisine in the heart of the city
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-content-secondary mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Italian Way, Downtown</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-PASTA</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Open until 11 PM</span>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => openModal('make-reservation')}
                className="flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Make Reservation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openModal('chef-specials')}
                className="flex items-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Chef&apos;s Specials
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openModal('wine-pairing')}
                className="flex items-center gap-2"
              >
                <Wine className="w-5 h-5" />
                Wine Pairing
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => openModal('loyalty-program')}
                className="flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Loyalty Program
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-content-secondary" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface-primary text-content-primary placeholder:text-content-secondary focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(filter => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeFilters.includes(filter.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-secondary text-content-secondary hover:bg-surface-secondary/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Menu Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-2">
                  {MENU_CATEGORIES.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-surface-secondary text-content-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-content-primary mb-2">
                {MENU_CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-content-secondary">{getFilteredItems().length} items available</p>
            </div>

            <div className="space-y-4">
              {getFilteredItems().map(item => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                  cartItems={cartItems}
                  onUpdateCart={updateCart}
                  favoriteItems={favoriteItems}
                  openModal={openModal}
                />
              ))}
            </div>

            {getFilteredItems().length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-content-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-content-primary mb-2">No items found</h3>
                <p className="text-content-secondary">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <CartSummary
        cartItems={cartItems}
        onUpdateCart={updateCart}
        isOpen={cartOpen}
        onToggle={() => setCartOpen(!cartOpen)}
        openModal={openModal}
      />

      {/* Enhanced Restaurant Modal System */}
      {activeModal && (
        <Modal isOpen={true} onClose={closeModal}>
          {/* Make Reservation Modal */}
          {activeModal === 'make-reservation' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Make a Reservation</h2>
                  <p className="text-content-secondary">Reserve your perfect dining experience</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={reservationData.date}
                    onChange={e => setReservationData({ ...reservationData, date: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Time
                  </label>
                  <select
                    value={reservationData.time}
                    onChange={e => setReservationData({ ...reservationData, time: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  >
                    <option value="">Select time</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Party Size
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setReservationData({
                          ...reservationData,
                          guests: Math.max(1, reservationData.guests - 1),
                        })
                      }
                      className="w-10 h-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-surface-primary">
                      <Users className="w-4 h-4 text-content-secondary" />
                      <span className="font-medium">{reservationData.guests} guests</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setReservationData({
                          ...reservationData,
                          guests: reservationData.guests + 1,
                        })
                      }
                      className="w-10 h-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Table Preference
                  </label>
                  <select
                    value={reservationData.table}
                    onChange={e =>
                      setReservationData({ ...reservationData, table: e.target.value })
                    }
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  >
                    <option value="any">Any available</option>
                    <option value="window">Window seat</option>
                    <option value="booth">Private booth</option>
                    <option value="patio">Outdoor patio</option>
                    <option value="bar">Chef&apos;s counter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  value={reservationData.specialRequests}
                  onChange={e =>
                    setReservationData({ ...reservationData, specialRequests: e.target.value })
                  }
                  placeholder="Anniversary celebration, dietary restrictions, accessibility needs..."
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">VIP Experience Available</span>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Upgrade to our VIP experience with chef&apos;s tasting menu, wine pairing, and
                  personalized service.
                </p>
                <Button size="sm" variant="outline">
                  Learn More (+$85/person)
                </Button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('reservation-confirmation');
                  }}
                >
                  Confirm Reservation
                </Button>
              </div>
            </div>
          )}

          {/* Chef's Specials Modal */}
          {activeModal === 'chef-specials' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-warning/10 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-status-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Chef&apos;s Specials</h2>
                  <p className="text-content-secondary">
                    Exclusive dishes crafted by our executive chef
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center text-3xl">
                      🦞
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-content-primary">
                          Lobster Thermidor Risotto
                        </h3>
                        <div className="text-xl font-bold text-primary">$58</div>
                      </div>
                      <p className="text-sm text-content-secondary mb-3">
                        Maine lobster tail with cognac cream risotto, gruyere cheese, and fresh
                        herbs. Available tonight only.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-status-warning/10 text-status-warning">
                          Tonight Only
                        </Badge>
                        <Badge variant="secondary">Limited to 12 portions</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Add to Order
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center text-3xl">
                      🍖
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-content-primary">
                          Wagyu Beef Wellington
                        </h3>
                        <div className="text-xl font-bold text-primary">$125</div>
                      </div>
                      <p className="text-sm text-content-secondary mb-3">
                        A5 Wagyu beef wrapped in puff pastry with mushroom duxelles and foie gras.
                        Serves 2 people.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary">Chef&apos;s Signature</Badge>
                        <Badge variant="secondary">45-minute preparation</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Pre-Order (Requires 45 min)
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-surface-secondary rounded-lg flex items-center justify-center text-3xl">
                      🍰
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-content-primary">Seasonal Fruit Tart</h3>
                        <div className="text-xl font-bold text-primary">$18</div>
                      </div>
                      <p className="text-sm text-content-secondary mb-3">
                        Pastry cream tart with seasonal fruits, vanilla bean custard, and gold leaf
                        garnish.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-status-success/10 text-status-success">Seasonal</Badge>
                        <Badge variant="secondary">Vegetarian</Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Add to Order
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={closeModal}>
                Back to Menu
              </Button>
            </div>
          )}

          {/* Wine Pairing Modal */}
          {activeModal === 'wine-pairing' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Wine className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">
                    Wine Pairing Recommendations
                  </h2>
                  <p className="text-content-secondary">
                    Expert sommelier selections for your order
                  </p>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-content-primary">
                    Based on your current order:
                  </h3>

                  {cartItems.map(item => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-content-primary">{item.name}</h4>
                        <Badge variant="secondary">Perfect Pairing</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center text-2xl">
                            🍷
                          </div>
                          <div>
                            <div className="font-medium text-sm">Chianti Classico 2019</div>
                            <div className="text-xs text-content-secondary">Tuscany, Italy</div>
                            <div className="text-sm font-semibold text-primary">$45/bottle</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center text-2xl">
                            🥂
                          </div>
                          <div>
                            <div className="font-medium text-sm">Prosecco di Valdobbiadene</div>
                            <div className="text-xs text-content-secondary">Veneto, Italy</div>
                            <div className="text-sm font-semibold text-primary">$38/bottle</div>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-content-secondary mt-3">
                        Our sommelier recommends the Chianti for its earthy notes that complement
                        the dish&apos;s rich flavors.
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          Add Chianti
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Add Prosecco
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-600">Sommelier&apos;s Flight</span>
                    </div>
                    <p className="text-sm text-content-secondary mb-3">
                      Experience 3 perfectly paired wines (2oz each) selected by our award-winning
                      sommelier.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-600">$28 per person</span>
                      <Button size="sm">Add Wine Flight</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wine className="w-16 h-16 text-content-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-content-primary mb-2">
                    Add items to see pairings
                  </h3>
                  <p className="text-content-secondary">
                    Our sommelier will recommend perfect wine pairings based on your order.
                  </p>
                </div>
              )}

              <Button variant="outline" className="w-full" onClick={closeModal}>
                Continue Browsing
              </Button>
            </div>
          )}

          {/* Loyalty Program Modal */}
          {activeModal === 'loyalty-program' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-warning/10 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-status-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Bella Vista Rewards</h2>
                  <p className="text-content-secondary">Your loyalty pays off with every visit</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-status-warning/10 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{loyaltyPoints} Points</div>
                  <p className="text-content-secondary mb-4">
                    You&apos;re just 150 points away from Gold status!
                  </p>
                  <div className="w-full bg-surface-secondary rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(loyaltyPoints / 1000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-content-secondary">
                    <span>Silver (500 pts)</span>
                    <span className="font-semibold text-primary">You are here</span>
                    <span>Gold (1000 pts)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-content-primary">Available Rewards</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-status-success/10 rounded-lg flex items-center justify-center">
                        <Coffee className="w-5 h-5 text-status-success" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Free Dessert</div>
                        <div className="text-xs text-content-secondary">200 points</div>
                      </div>
                    </div>
                    <Button size="sm" disabled={loyaltyPoints < 200}>
                      {loyaltyPoints >= 200 ? 'Redeem' : 'Need 200 pts'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Wine className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Complimentary Wine Glass</div>
                        <div className="text-xs text-content-secondary">400 points</div>
                      </div>
                    </div>
                    <Button size="sm" disabled={loyaltyPoints < 400}>
                      {loyaltyPoints >= 400 ? 'Redeem' : 'Need 400 pts'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-status-warning/10 rounded-lg flex items-center justify-center">
                        <Crown className="w-5 h-5 text-status-warning" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Chef&apos;s Table Experience</div>
                        <div className="text-xs text-content-secondary">800 points</div>
                      </div>
                    </div>
                    <Button size="sm" disabled={loyaltyPoints < 800}>
                      {loyaltyPoints >= 800 ? 'Redeem' : 'Need 800 pts'}
                    </Button>
                  </div>
                </div>

                <div className="bg-status-success/5 border border-status-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-status-success" />
                    <span className="font-semibold text-status-success">
                      Earn Double Points Today!
                    </span>
                  </div>
                  <p className="text-sm text-content-secondary">
                    Get 2x points on orders over $50. Limited time offer ending tonight.
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={closeModal}>
                Continue to Menu
              </Button>
            </div>
          )}

          {/* Enhanced Checkout Modal */}
          {activeModal === 'enhanced-checkout' && modalData && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-success/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-status-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Checkout</h2>
                  <p className="text-content-secondary">Review your order and delivery details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-surface-secondary/30 rounded-lg p-4">
                  <h3 className="font-semibold text-content-primary mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {modalData.items.map((item: CartItem) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-2 mt-3 flex justify-between font-semibold">
                    <span>Subtotal:</span>
                    <span>${modalData.total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-content-primary">Order Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border border-primary bg-primary/5 rounded-lg text-left">
                      <div className="font-medium text-primary">Dine In</div>
                      <div className="text-xs text-content-secondary">Table service</div>
                    </button>
                    <button className="p-3 border border-border rounded-lg text-left hover:bg-surface-secondary/30">
                      <div className="font-medium">Takeout</div>
                      <div className="text-xs text-content-secondary">Ready in 20 min</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-content-primary">Special Instructions</h3>
                  <textarea
                    rows={3}
                    placeholder="Allergies, cooking preferences, special requests..."
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-content-primary">Payment & Rewards</h3>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="text-sm">Apply Loyalty Points</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-content-secondary">
                        {loyaltyPoints} available
                      </span>
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Back to Order
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('order-confirmation');
                  }}
                >
                  Complete Order
                </Button>
              </div>
            </div>
          )}

          {/* Order Confirmation Modal */}
          {activeModal === 'order-confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-status-success/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-status-success" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">Order Confirmed!</h2>
                <p className="text-content-secondary">Your delicious meal is being prepared</p>
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Order #BV-2025-0823</span>
                  <Badge className="bg-status-success/10 text-status-success">Confirmed</Badge>
                </div>
                <div className="text-sm text-content-secondary space-y-1">
                  <div>Estimated prep time: 25-30 minutes</div>
                  <div>Table service included</div>
                  <div>You earned 45 loyalty points!</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    closeModal();
                    openModal('order-tracking');
                  }}
                >
                  Track Your Order
                </Button>
                <Button variant="outline" className="w-full" onClick={closeModal}>
                  Continue Browsing Menu
                </Button>
              </div>
            </div>
          )}

          {/* Order Tracking Modal */}
          {activeModal === 'order-tracking' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Order Tracking</h2>
                  <p className="text-content-secondary">Order #BV-2025-0823</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-status-success rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-content-primary">Order Received</div>
                    <div className="text-sm text-content-secondary">7:45 PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-content-primary">Being Prepared</div>
                    <div className="text-sm text-content-secondary">Est. completion: 8:15 PM</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-content-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-content-secondary">Ready to Serve</div>
                    <div className="text-sm text-content-secondary">Pending</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Chef&apos;s Note</span>
                </div>
                <p className="text-sm text-content-secondary">
                  &quot;Your truffle arancini is being prepared with extra care using today&apos;s
                  fresh black truffles. The wait will be worth it!&quot;
                </p>
                <div className="text-xs text-content-secondary mt-2">- Chef Marco</div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => openModal('contact-staff')}
                >
                  Contact Staff
                </Button>
              </div>
            </div>
          )}

          {/* Reservation Confirmation Modal */}
          {activeModal === 'reservation-confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-10 h-10 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">
                  Reservation Confirmed!
                </h2>
                <p className="text-content-secondary">We look forward to hosting you</p>
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{reservationData.date || 'Today'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{reservationData.time || '7:00 PM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Party Size:</span>
                  <span>{reservationData.guests} guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Table:</span>
                  <span>
                    {reservationData.table === 'any' ? 'Best available' : reservationData.table}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={closeModal}>
                  Perfect, See You Soon!
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    closeModal();
                    openModal('pre-order-menu');
                  }}
                >
                  Pre-Order from Menu
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}
