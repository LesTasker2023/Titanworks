'use client';

import {
  AlertTriangle,
  Bell,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  CreditCard,
  Eye,
  GamepadIcon,
  HardDrive,
  Headphones,
  Monitor,
  Moon,
  Package,
  Palette,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  Save,
  Shield,
  Smartphone,
  Sun,
  Target,
  TrendingUp,
  Users,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Label } from '../Label';

interface Country {
  code: string;
  name: string;
  flag: string;
  continent: string;
}

interface FormData {
  country: string;
  role: string;
  priority: string;
  status: string;
  category: string;
  timeZone: string;
  language: string;
  currency: string;
  theme: string;
  notification: string;
}

export default function SelectDemo() {
  const [basicValue, setBasicValue] = useState('');
  const [formData, setFormData] = useState<FormData>({
    country: '',
    role: '',
    priority: '',
    status: '',
    category: '',
    timeZone: '',
    language: '',
    currency: '',
    theme: '',
    notification: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const countries: Country[] = [
    { code: 'US', name: 'United States', flag: '🇺🇸', continent: 'North America' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'North America' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
    { code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
    { code: 'CN', name: 'China', flag: '🇨🇳', continent: 'Asia' },
    { code: 'IN', name: 'India', flag: '🇮🇳', continent: 'Asia' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', continent: 'South America' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', continent: 'North America' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', continent: 'Europe' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', continent: 'Europe' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', continent: 'Europe' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', continent: 'Europe' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', continent: 'Europe' },
  ];

  const userRoles = [
    { value: 'admin', label: 'Administrator', icon: Shield, description: 'Full system access' },
    { value: 'manager', label: 'Manager', icon: Briefcase, description: 'Team management access' },
    { value: 'developer', label: 'Developer', icon: Code, description: 'Development access' },
    { value: 'designer', label: 'Designer', icon: Palette, description: 'Design access' },
    { value: 'analyst', label: 'Data Analyst', icon: TrendingUp, description: 'Analytics access' },
    {
      value: 'support',
      label: 'Support Agent',
      icon: Users,
      description: 'Customer support access',
    },
    { value: 'marketing', label: 'Marketing', icon: Target, description: 'Marketing access' },
    { value: 'viewer', label: 'Viewer', icon: Eye, description: 'Read-only access' },
  ];

  const priorityLevels = [
    {
      value: 'critical',
      label: 'Critical',
      color: 'bg-red-500',
      description: 'Immediate attention required',
    },
    {
      value: 'high',
      label: 'High',
      color: 'bg-orange-500',
      description: 'Important but not urgent',
    },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', description: 'Standard priority' },
    { value: 'low', label: 'Low', color: 'bg-green-500', description: 'Can be addressed later' },
    {
      value: 'planning',
      label: 'Planning',
      color: 'bg-blue-500',
      description: 'Future consideration',
    },
  ];

  const projectStatuses = [
    { value: 'planning', label: 'Planning', icon: Calendar, color: 'text-blue-500' },
    { value: 'active', label: 'Active', icon: PlayCircle, color: 'text-green-500' },
    { value: 'review', label: 'In Review', icon: Eye, color: 'text-yellow-500' },
    { value: 'testing', label: 'Testing', icon: CheckCircle, color: 'text-purple-500' },
    { value: 'deployed', label: 'Deployed', icon: Zap, color: 'text-green-600' },
    { value: 'paused', label: 'Paused', icon: PauseCircle, color: 'text-orange-500' },
    { value: 'cancelled', label: 'Cancelled', icon: X, color: 'text-red-500' },
  ];

  const productCategories = [
    { value: 'electronics', label: 'Electronics', icon: Smartphone, count: 1234 },
    { value: 'computers', label: 'Computers', icon: Monitor, count: 856 },
    { value: 'software', label: 'Software', icon: Code, count: 432 },
    { value: 'accessories', label: 'Accessories', icon: Headphones, count: 789 },
    { value: 'gaming', label: 'Gaming', icon: GamepadIcon, count: 567 },
    { value: 'mobile', label: 'Mobile Devices', icon: Smartphone, count: 923 },
    { value: 'audio', label: 'Audio', icon: Volume2, count: 345 },
    { value: 'storage', label: 'Storage', icon: HardDrive, count: 234 },
  ];

  const timeZones = [
    { value: 'UTC-12', label: '(UTC-12:00) International Date Line West', offset: '-12:00' },
    { value: 'UTC-11', label: '(UTC-11:00) Coordinated Universal Time-11', offset: '-11:00' },
    { value: 'UTC-10', label: '(UTC-10:00) Hawaii', offset: '-10:00' },
    { value: 'UTC-9', label: '(UTC-09:00) Alaska', offset: '-09:00' },
    { value: 'UTC-8', label: '(UTC-08:00) Pacific Time (US & Canada)', offset: '-08:00' },
    { value: 'UTC-7', label: '(UTC-07:00) Mountain Time (US & Canada)', offset: '-07:00' },
    { value: 'UTC-6', label: '(UTC-06:00) Central Time (US & Canada)', offset: '-06:00' },
    { value: 'UTC-5', label: '(UTC-05:00) Eastern Time (US & Canada)', offset: '-05:00' },
    { value: 'UTC-4', label: '(UTC-04:00) Atlantic Time (Canada)', offset: '-04:00' },
    { value: 'UTC-3', label: '(UTC-03:00) Brasilia', offset: '-03:00' },
    { value: 'UTC-2', label: '(UTC-02:00) Coordinated Universal Time-02', offset: '-02:00' },
    { value: 'UTC-1', label: '(UTC-01:00) Azores', offset: '-01:00' },
    { value: 'UTC+0', label: '(UTC+00:00) Dublin, Edinburgh, Lisbon, London', offset: '+00:00' },
    { value: 'UTC+1', label: '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris', offset: '+01:00' },
    { value: 'UTC+2', label: '(UTC+02:00) Athens, Bucharest, Istanbul', offset: '+02:00' },
    { value: 'UTC+3', label: '(UTC+03:00) Moscow, St. Petersburg', offset: '+03:00' },
    { value: 'UTC+4', label: '(UTC+04:00) Abu Dhabi, Muscat', offset: '+04:00' },
    { value: 'UTC+5', label: '(UTC+05:00) Islamabad, Karachi', offset: '+05:00' },
    { value: 'UTC+6', label: '(UTC+06:00) Astana, Dhaka', offset: '+06:00' },
    { value: 'UTC+7', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', offset: '+07:00' },
    { value: 'UTC+8', label: '(UTC+08:00) Beijing, Chongqing, Hong Kong', offset: '+08:00' },
    { value: 'UTC+9', label: '(UTC+09:00) Osaka, Sapporo, Tokyo', offset: '+09:00' },
    { value: 'UTC+10', label: '(UTC+10:00) Canberra, Melbourne, Sydney', offset: '+10:00' },
    { value: 'UTC+11', label: '(UTC+11:00) Solomon Is., New Caledonia', offset: '+11:00' },
    { value: 'UTC+12', label: '(UTC+12:00) Auckland, Wellington', offset: '+12:00' },
  ];

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union' },
    { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', country: 'Switzerland' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Select Component</h1>
        <p className="text-muted-foreground text-lg">
          Dropdown selection inputs with advanced features for enterprise applications
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple dropdown selections for common use cases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Simple Select</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="basic-select">Choose an option</Label>
                <Select value={basicValue} onValueChange={setBasicValue}>
                  <SelectTrigger id="basic-select">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                    <SelectItem value="option4">Option 4</SelectItem>
                    <SelectItem value="option5" disabled>
                      Option 5 (Disabled)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Selected: {basicValue || 'None'}</p>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">With Icons</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="icon-select">User Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={value => updateFormData('role', value)}
                >
                  <SelectTrigger id="icon-select">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <role.icon className="h-4 w-4" />
                          <span>{role.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Selected:{' '}
                  {formData.role ? userRoles.find(r => r.value === formData.role)?.label : 'None'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Sophisticated selection interfaces for enterprise applications
          </p>
        </div>

        {/* Country Selection with Search */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Country Selection with Flags</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <Label htmlFor="country-select">Select Country</Label>
              <Select
                value={formData.country}
                onValueChange={value => updateFormData('country', value)}
              >
                <SelectTrigger id="country-select">
                  <SelectValue placeholder="Choose a country">
                    {formData.country && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {countries.find(c => c.code === formData.country)?.flag}
                        </span>
                        <span>{countries.find(c => c.code === formData.country)?.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-md"
                    />
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {filteredCountries.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{country.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium">{country.name}</div>
                            <div className="text-xs text-muted-foreground">{country.continent}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Priority with Color Indicators */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Priority Selection with Color Indicators</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <Label htmlFor="priority-select">Task Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={value => updateFormData('priority', value)}
              >
                <SelectTrigger id="priority-select">
                  <SelectValue placeholder="Select priority level">
                    {formData.priority && (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${priorityLevels.find(p => p.value === formData.priority)?.color}`}
                        ></div>
                        <span>
                          {priorityLevels.find(p => p.value === formData.priority)?.label}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {priorityLevels.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                        <div className="flex-1">
                          <div className="font-medium">{priority.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {priority.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Project Status with Icons */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Project Status Selection</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <Label htmlFor="status-select">Project Status</Label>
              <Select
                value={formData.status}
                onValueChange={value => updateFormData('status', value)}
              >
                <SelectTrigger id="status-select">
                  <SelectValue placeholder="Select project status">
                    {formData.status && (
                      <div className="flex items-center gap-2">
                        {React.createElement(
                          projectStatuses.find(s => s.value === formData.status)?.icon || Calendar,
                          {
                            className: `h-4 w-4 ${projectStatuses.find(s => s.value === formData.status)?.color}`,
                          }
                        )}
                        <span>{projectStatuses.find(s => s.value === formData.status)?.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {projectStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <status.icon className={`h-4 w-4 ${status.color}`} />
                        <span>{status.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Product Categories with Counts */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Product Categories with Item Counts</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <Label htmlFor="category-select">Product Category</Label>
              <Select
                value={formData.category}
                onValueChange={value => updateFormData('category', value)}
              >
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Select a category">
                    {formData.category && (
                      <div className="flex items-center gap-2">
                        {React.createElement(
                          productCategories.find(c => c.value === formData.category)?.icon ||
                            Package,
                          { className: 'h-4 w-4' }
                        )}
                        <span>
                          {productCategories.find(c => c.value === formData.category)?.label}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          <span>{category.label}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {category.count.toLocaleString()}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Time Zone Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Time Zone Selection</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <Label htmlFor="timezone-select">Time Zone</Label>
              <Select
                value={formData.timeZone}
                onValueChange={value => updateFormData('timeZone', value)}
              >
                <SelectTrigger id="timezone-select">
                  <SelectValue placeholder="Select your time zone">
                    {formData.timeZone && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{timeZones.find(tz => tz.value === formData.timeZone)?.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div className="max-h-60 overflow-auto">
                    {timeZones.map(timeZone => (
                      <SelectItem key={timeZone.value} value={timeZone.value}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{timeZone.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Language and Currency Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Language Selection</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="language-select">Preferred Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={value => updateFormData('language', value)}
                >
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select a language">
                      {formData.language && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {languages.find(l => l.code === formData.language)?.flag}
                          </span>
                          <span>{languages.find(l => l.code === formData.language)?.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{language.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium">{language.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {language.nativeName}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Currency Selection</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="currency-select">Preferred Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={value => updateFormData('currency', value)}
                >
                  <SelectTrigger id="currency-select">
                    <SelectValue placeholder="Select a currency">
                      {formData.currency && (
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-mono font-bold">
                            {currencies.find(c => c.code === formData.currency)?.symbol}
                          </span>
                          <span>{currencies.find(c => c.code === formData.currency)?.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold w-8">{currency.symbol}</span>
                          <div className="flex-1">
                            <div className="font-medium">{currency.name}</div>
                            <div className="text-xs text-muted-foreground">{currency.country}</div>
                          </div>
                          <span className="text-xs text-muted-foreground">{currency.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
        </div>

        {/* Theme and Notification Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Theme Preference</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="theme-select">Application Theme</Label>
                <Select
                  value={formData.theme}
                  onValueChange={value => updateFormData('theme', value)}
                >
                  <SelectTrigger id="theme-select">
                    <SelectValue placeholder="Select theme">
                      {formData.theme && (
                        <div className="flex items-center gap-2">
                          {formData.theme === 'light' && <Sun className="h-4 w-4" />}
                          {formData.theme === 'dark' && <Moon className="h-4 w-4" />}
                          {formData.theme === 'system' && <Monitor className="h-4 w-4" />}
                          <span className="capitalize">{formData.theme}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Notification Settings</h3>
            <Card className="p-4">
              <div className="space-y-3">
                <Label htmlFor="notification-select">Notification Frequency</Label>
                <Select
                  value={formData.notification}
                  onValueChange={value => updateFormData('notification', value)}
                >
                  <SelectTrigger id="notification-select">
                    <SelectValue placeholder="Select frequency">
                      {formData.notification && (
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="capitalize">
                            {formData.notification.replace('_', ' ')}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span>All Notifications</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="important">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Important Only</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="weekly_digest">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Weekly Digest</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="none">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4" />
                        <span>None</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>
        </div>

        {/* Form Summary */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Form Summary</h3>
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Selected Values:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Country:</span>
                  <p className="text-muted-foreground">
                    {formData.country
                      ? countries.find(c => c.code === formData.country)?.name
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Role:</span>
                  <p className="text-muted-foreground">
                    {formData.role
                      ? userRoles.find(r => r.value === formData.role)?.label
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Priority:</span>
                  <p className="text-muted-foreground">
                    {formData.priority
                      ? priorityLevels.find(p => p.value === formData.priority)?.label
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <p className="text-muted-foreground">
                    {formData.status
                      ? projectStatuses.find(s => s.value === formData.status)?.label
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="text-muted-foreground">
                    {formData.category
                      ? productCategories.find(c => c.value === formData.category)?.label
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Time Zone:</span>
                  <p className="text-muted-foreground">
                    {formData.timeZone
                      ? timeZones.find(tz => tz.value === formData.timeZone)?.offset
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Language:</span>
                  <p className="text-muted-foreground">
                    {formData.language
                      ? languages.find(l => l.code === formData.language)?.name
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Currency:</span>
                  <p className="text-muted-foreground">
                    {formData.currency
                      ? currencies.find(c => c.code === formData.currency)?.code
                      : 'Not selected'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Theme:</span>
                  <p className="text-muted-foreground capitalize">
                    {formData.theme || 'Not selected'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() =>
                    setFormData({
                      country: '',
                      role: '',
                      priority: '',
                      status: '',
                      category: '',
                      timeZone: '',
                      language: '',
                      currency: '',
                      theme: '',
                      notification: '',
                    })
                  }
                  variant="outline"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Form
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use clear, descriptive labels for all options</li>
              <li>• Provide search functionality for long lists</li>
              <li>• Include visual indicators like icons and colors</li>
              <li>• Group related options with separators</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Performance</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Implement virtualization for very long lists</li>
              <li>• Use lazy loading for dynamic option lists</li>
              <li>• Cache frequently accessed option data</li>
              <li>• Debounce search input for external APIs</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
