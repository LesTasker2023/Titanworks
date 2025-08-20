'use client';

import {
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  CreditCard,
  Globe,
  Home,
  Monitor,
  Moon,
  Palette,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  Star,
  Sun,
  Target,
  Truck,
  User,
  Users,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Label } from '../Label';

interface PreferenceSettings {
  theme: string;
  notifications: string;
  language: string;
  privacy: string;
}

interface SurveyResponse {
  satisfaction: string;
  frequency: string;
  recommendation: string;
  priority: string;
}

export default function RadioGroupDemo() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedContact, setSelectedContact] = useState('email');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedRating, setSelectedRating] = useState('4');
  const [preferences, setPreferences] = useState<PreferenceSettings>({
    theme: 'system',
    notifications: 'all',
    language: 'english',
    privacy: 'private',
  });
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse>({
    satisfaction: '',
    frequency: '',
    recommendation: '',
    priority: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const paymentMethods = [
    {
      value: 'card',
      label: 'Credit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
    },
    { value: 'paypal', label: 'PayPal', description: 'Pay with your PayPal account', icon: Zap },
    {
      value: 'bank',
      label: 'Bank Transfer',
      description: 'Direct bank account transfer',
      icon: Building,
    },
    {
      value: 'crypto',
      label: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, and more',
      icon: Globe,
    },
  ];

  const shippingOptions = [
    {
      value: 'standard',
      label: 'Standard Shipping',
      description: '5-7 business days',
      price: 'Free',
      icon: Truck,
    },
    {
      value: 'express',
      label: 'Express Shipping',
      description: '2-3 business days',
      price: '$9.99',
      icon: Zap,
    },
    {
      value: 'overnight',
      label: 'Overnight Delivery',
      description: 'Next business day',
      price: '$24.99',
      icon: Clock,
    },
    {
      value: 'pickup',
      label: 'Store Pickup',
      description: 'Pick up at our store',
      price: 'Free',
      icon: Home,
    },
  ];

  const pricingPlans = [
    {
      value: 'basic',
      label: 'Basic',
      price: '$9/month',
      features: ['10 Projects', '5GB Storage', 'Email Support'],
      icon: User,
    },
    {
      value: 'pro',
      label: 'Pro',
      price: '$29/month',
      features: ['100 Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
      icon: Star,
      popular: true,
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      price: '$99/month',
      features: ['Unlimited Projects', '1TB Storage', '24/7 Phone Support', 'Custom Integrations'],
      icon: Building,
    },
  ];

  const sizingOptions = [
    { value: 'small', label: 'Small', description: 'Up to 10 users' },
    { value: 'medium', label: 'Medium', description: '11-50 users' },
    { value: 'large', label: 'Large', description: '51-200 users' },
    { value: 'enterprise', label: 'Enterprise', description: '200+ users' },
  ];

  const colorOptions = [
    { value: 'blue', label: 'Ocean Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Forest Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Royal Purple', color: 'bg-purple-500' },
    { value: 'red', label: 'Crimson Red', color: 'bg-red-500' },
    { value: 'orange', label: 'Sunset Orange', color: 'bg-orange-500' },
    { value: 'pink', label: 'Rose Pink', color: 'bg-pink-500' },
  ];

  const submitSurvey = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addRecentAction('Survey Submitted');
    }, 2000);
  };

  const resetSurvey = () => {
    setSurveyResponse({
      satisfaction: '',
      frequency: '',
      recommendation: '',
      priority: '',
    });
    addRecentAction('Survey Reset');
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">RadioGroup Component</h1>
        <p className="text-muted-foreground">
          Single-choice selection groups with enhanced layouts and interactive features
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent RadioGroup Actions:</span>
            <div className="flex gap-2">
              {recentActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Basic RadioGroup Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic RadioGroup Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple radio button groups for single-choice selections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Simple Selection */}
            <div className="space-y-4">
              <h4 className="font-medium">Simple Options</h4>
              <RadioGroup
                value={selectedContact}
                onValueChange={value => {
                  setSelectedContact(value);
                  addRecentAction(`Contact Method: ${value}`);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mail" id="contact-mail" />
                  <Label htmlFor="contact-mail">Physical Mail</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="contact-none" />
                  <Label htmlFor="contact-none">No Contact</Label>
                </div>
              </RadioGroup>
            </div>

            {/* With Enhanced Features */}
            <div className="space-y-4">
              <h4 className="font-medium">Enhanced RadioGroup</h4>
              <RadioGroup
                value={selectedSize}
                onValueChange={value => {
                  setSelectedSize(value);
                  addRecentAction(`Team Size: ${value}`);
                }}
                label="Team Size"
                helperText="Select the size that best describes your team"
                required
              >
                {sizingOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`size-${option.value}`} />
                    <Label htmlFor={`size-${option.value}`} className="flex-1">
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Method Selection */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Payment Method Selection</h3>
            <p className="text-sm text-muted-foreground">
              Enhanced radio groups with icons and descriptions
            </p>
          </div>

          <RadioGroup
            value={selectedPayment}
            onValueChange={value => {
              setSelectedPayment(value);
              addRecentAction(`Payment Method: ${value}`);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                  <div key={method.value}>
                    <Label
                      htmlFor={`payment-${method.value}`}
                      className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer hover:bg-muted transition-colors ${
                        selectedPayment === method.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <RadioGroupItem value={method.value} id={`payment-${method.value}`} />
                      <Icon className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      </Card>

      {/* Shipping Options */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Shipping Options</h3>
            <p className="text-sm text-muted-foreground">
              Radio groups with pricing and delivery information
            </p>
          </div>

          <RadioGroup
            value={selectedShipping}
            onValueChange={value => {
              setSelectedShipping(value);
              addRecentAction(`Shipping: ${value}`);
            }}
          >
            <div className="space-y-3">
              {shippingOptions.map(option => {
                const Icon = option.icon;
                return (
                  <div key={option.value}>
                    <Label
                      htmlFor={`shipping-${option.value}`}
                      className={`flex items-center justify-between rounded-lg border-2 p-4 cursor-pointer hover:bg-muted transition-colors ${
                        selectedShipping === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={`shipping-${option.value}`} />
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${option.price === 'Free' ? 'text-green-600' : ''}`}
                        >
                          {option.price}
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      </Card>

      {/* Pricing Plans */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Pricing Plans</h3>
            <p className="text-sm text-muted-foreground">
              Feature-rich plan selection with highlights
            </p>
          </div>

          <RadioGroup
            value={selectedPlan}
            onValueChange={value => {
              setSelectedPlan(value);
              addRecentAction(`Plan Selected: ${value}`);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricingPlans.map(plan => {
                const Icon = plan.icon;
                return (
                  <div key={plan.value} className="relative">
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                        Most Popular
                      </Badge>
                    )}
                    <Label
                      htmlFor={`plan-${plan.value}`}
                      className={`block rounded-lg border-2 p-6 cursor-pointer hover:bg-muted transition-colors ${
                        selectedPlan === plan.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      } ${plan.popular ? 'border-primary' : ''}`}
                    >
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                          <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{plan.label}</div>
                          <div className="text-2xl font-bold text-primary">{plan.price}</div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      </Card>

      {/* Color Selection */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Color Theme Selection</h3>
            <p className="text-sm text-muted-foreground">
              Visual color picker with radio group functionality
            </p>
          </div>

          <RadioGroup
            value={selectedColor}
            onValueChange={value => {
              setSelectedColor(value);
              addRecentAction(`Color Theme: ${value}`);
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colorOptions.map(color => (
                <div key={color.value}>
                  <Label
                    htmlFor={`color-${color.value}`}
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer hover:bg-muted transition-colors ${
                      selectedColor === color.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <RadioGroupItem value={color.value} id={`color-${color.value}`} />
                    <div className={`w-6 h-6 rounded-full ${color.color}`}></div>
                    <div className="font-medium">{color.label}</div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </Card>

      {/* Rating Selection */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Rating & Feedback</h3>
            <p className="text-sm text-muted-foreground">Star rating system using radio groups</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">How would you rate your experience?</h4>
            <RadioGroup
              value={selectedRating}
              onValueChange={value => {
                setSelectedRating(value);
                addRecentAction(`Rating: ${value} stars`);
              }}
            >
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map(rating => (
                  <Label key={rating} htmlFor={`rating-${rating}`} className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-5 w-5 ${
                              index < rating
                                ? selectedRating === rating.toString()
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{rating}</span>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      {/* Settings & Preferences */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Settings & Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Multiple radio groups for different preference categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme Preference */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Theme Preference
              </h4>
              <RadioGroup
                value={preferences.theme}
                onValueChange={value => {
                  setPreferences(prev => ({ ...prev, theme: value }));
                  addRecentAction(`Theme: ${value}`);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Sun className="h-4 w-4" />
                  <Label htmlFor="theme-light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Moon className="h-4 w-4" />
                  <Label htmlFor="theme-dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Monitor className="h-4 w-4" />
                  <Label htmlFor="theme-system">System</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notification Preference */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Notifications
              </h4>
              <RadioGroup
                value={preferences.notifications}
                onValueChange={value => {
                  setPreferences(prev => ({ ...prev, notifications: value }));
                  addRecentAction(`Notifications: ${value}`);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="notif-all" />
                  <Volume2 className="h-4 w-4" />
                  <Label htmlFor="notif-all">All Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="important" id="notif-important" />
                  <AlertTriangle className="h-4 w-4" />
                  <Label htmlFor="notif-important">Important Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="notif-none" />
                  <VolumeX className="h-4 w-4" />
                  <Label htmlFor="notif-none">None</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Language Preference */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Language
              </h4>
              <RadioGroup
                value={preferences.language}
                onValueChange={value => {
                  setPreferences(prev => ({ ...prev, language: value }));
                  addRecentAction(`Language: ${value}`);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="lang-en" />
                  <Label htmlFor="lang-en">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spanish" id="lang-es" />
                  <Label htmlFor="lang-es">Español</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="french" id="lang-fr" />
                  <Label htmlFor="lang-fr">Français</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="german" id="lang-de" />
                  <Label htmlFor="lang-de">Deutsch</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Privacy Preference */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Level
              </h4>
              <RadioGroup
                value={preferences.privacy}
                onValueChange={value => {
                  setPreferences(prev => ({ ...prev, privacy: value }));
                  addRecentAction(`Privacy: ${value}`);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="privacy-public" />
                  <Users className="h-4 w-4" />
                  <Label htmlFor="privacy-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="privacy-friends" />
                  <User className="h-4 w-4" />
                  <Label htmlFor="privacy-friends">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="privacy-private" />
                  <Shield className="h-4 w-4" />
                  <Label htmlFor="privacy-private">Private</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => {
                addRecentAction('Preferences Saved');
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPreferences({
                  theme: 'system',
                  notifications: 'all',
                  language: 'english',
                  privacy: 'private',
                });
                addRecentAction('Preferences Reset');
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </Card>

      {/* Survey Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Survey Form</h3>
            <p className="text-sm text-muted-foreground">
              Complete survey form using multiple radio groups
            </p>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="space-y-3">
              <h4 className="font-medium">How satisfied are you with our service?</h4>
              <RadioGroup
                value={surveyResponse.satisfaction}
                onValueChange={value => {
                  setSurveyResponse(prev => ({ ...prev, satisfaction: value }));
                  addRecentAction('Survey Answer Updated');
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="sat-very" />
                  <Label htmlFor="sat-very">Very Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfied" id="sat-satisfied" />
                  <Label htmlFor="sat-satisfied">Satisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="sat-neutral" />
                  <Label htmlFor="sat-neutral">Neutral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dissatisfied" id="sat-dissatisfied" />
                  <Label htmlFor="sat-dissatisfied">Dissatisfied</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-dissatisfied" id="sat-very-dis" />
                  <Label htmlFor="sat-very-dis">Very Dissatisfied</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <h4 className="font-medium">How often do you use our service?</h4>
              <RadioGroup
                value={surveyResponse.frequency}
                onValueChange={value => {
                  setSurveyResponse(prev => ({ ...prev, frequency: value }));
                  addRecentAction('Survey Answer Updated');
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="freq-daily" />
                  <Label htmlFor="freq-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="freq-weekly" />
                  <Label htmlFor="freq-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="freq-monthly" />
                  <Label htmlFor="freq-monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="freq-rarely" />
                  <Label htmlFor="freq-rarely">Rarely</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Question 3 */}
            <div className="space-y-3">
              <h4 className="font-medium">Would you recommend us to others?</h4>
              <RadioGroup
                value={surveyResponse.recommendation}
                onValueChange={value => {
                  setSurveyResponse(prev => ({ ...prev, recommendation: value }));
                  addRecentAction('Survey Answer Updated');
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="definitely" id="rec-definitely" />
                  <Label htmlFor="rec-definitely">Definitely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="probably" id="rec-probably" />
                  <Label htmlFor="rec-probably">Probably</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="rec-maybe" />
                  <Label htmlFor="rec-maybe">Maybe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="probably-not" id="rec-probably-not" />
                  <Label htmlFor="rec-probably-not">Probably Not</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="definitely-not" id="rec-definitely-not" />
                  <Label htmlFor="rec-definitely-not">Definitely Not</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={submitSurvey}
                disabled={
                  isSubmitting ||
                  !surveyResponse.satisfaction ||
                  !surveyResponse.frequency ||
                  !surveyResponse.recommendation
                }
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Survey
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetSurvey}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Survey
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">RadioGroup Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use radio groups for mutually exclusive choices</p>
                <p>• Provide clear, descriptive labels</p>
                <p>• Group related options logically</p>
                <p>• Consider default selections when appropriate</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use proper ARIA labels and descriptions</p>
                <p>• Ensure keyboard navigation works correctly</p>
                <p>• Provide sufficient touch target sizes</p>
                <p>• Test with screen readers</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Implementation</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Validate selection on form submission</p>
                <p>• Handle error states appropriately</p>
                <p>• Use consistent styling across groups</p>
                <p>• Consider progressive enhancement</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
