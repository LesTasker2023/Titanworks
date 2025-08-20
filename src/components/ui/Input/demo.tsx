'use client';

import {
  Check,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Hash,
  Info,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Search,
  Settings,
  Shield,
  Target,
  Upload,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Label } from '../Label';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: string;
  address: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function InputDemo() {
  const [basicInputs, setBasicInputs] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    phone: '',
    url: '',
  });

  const [enhancedInputs, setEnhancedInputs] = useState({
    search: '',
    currency: '',
    card: '',
    fileName: '',
  });

  const [validationInputs, setValidationInputs] = useState({
    email: '',
    password: '',
    required: '',
    charLimit: '',
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [loadingValue, setLoadingValue] = useState('Processing...');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const [advancedInputs, setAdvancedInputs] = useState({
    autocomplete: '',
    tags: [] as string[],
    currentTag: '',
  });

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 0;
    if (password.length < 8) return 1;
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return 2;
    if (!/(?=.*\d)/.test(password)) return 3;
    if (!/(?=.*[!@#$%^&*])/.test(password)) return 3;
    return 4;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
    }
    return numbers;
  };

  const formatCreditCard = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/[^\d.]/g, '');
    const parts = numbers.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : '';
    return `$${integerPart}${decimalPart}`;
  };

  const validateForm = () => {
    setIsValidating(true);
    const errors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (
      formData.amount &&
      (isNaN(Number(formData.amount.replace(/[$,]/g, ''))) ||
        Number(formData.amount.replace(/[$,]/g, '')) <= 0)
    ) {
      errors.amount = 'Amount must be a positive number';
    }

    setFormErrors(errors);
    setIsValidating(false);

    if (Object.keys(errors).length === 0) {
      addRecentAction('Form Validation Passed');
    } else {
      addRecentAction('Form Validation Failed');
    }
  };

  // Simulate loading state
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingValue(prev => (prev === 'Processing...' ? 'Processing' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Input Component</h1>
        <p className="text-muted-foreground">
          Text input fields with validation, formatting, and interactive features
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Input Actions:</span>
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

      {/* Basic Input Types */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic Input Types</h3>
            <p className="text-sm text-muted-foreground">
              Standard input fields with different types and configurations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input
                id="text-input"
                type="text"
                placeholder="Enter text..."
                value={basicInputs.text}
                onChange={e => {
                  setBasicInputs(prev => ({ ...prev, text: e.target.value }));
                  addRecentAction('Text Input Changed');
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-input">Email Input</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email-input"
                  type="email"
                  placeholder="user@example.com"
                  className="pl-9"
                  value={basicInputs.email}
                  onChange={e => {
                    setBasicInputs(prev => ({ ...prev, email: e.target.value }));
                    addRecentAction('Email Input Changed');
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-input">Password Input</Label>
              <div className="relative">
                <Input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password..."
                  className="pr-9"
                  value={basicInputs.password}
                  onChange={e => {
                    setBasicInputs(prev => ({ ...prev, password: e.target.value }));
                    addRecentAction('Password Input Changed');
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="number-input">Number Input</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="number-input"
                  type="number"
                  placeholder="Enter number..."
                  className="pl-9"
                  value={basicInputs.number}
                  onChange={e => {
                    setBasicInputs(prev => ({ ...prev, number: e.target.value }));
                    addRecentAction('Number Input Changed');
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tel-input">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tel-input"
                  type="tel"
                  placeholder="555-123-4567"
                  className="pl-9"
                  value={basicInputs.phone}
                  onChange={e => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setBasicInputs(prev => ({ ...prev, phone: formatted }));
                    addRecentAction('Phone Input Changed');
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url-input">URL Input</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  className="pl-9"
                  value={basicInputs.url}
                  onChange={e => {
                    setBasicInputs(prev => ({ ...prev, url: e.target.value }));
                    addRecentAction('URL Input Changed');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Input Fields */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Enhanced Input Fields</h3>
            <p className="text-sm text-muted-foreground">
              Input fields with icons, buttons, and special formatting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="search-input">Search with Action</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-input"
                  placeholder="Search anything..."
                  className="pl-9 pr-20"
                  value={enhancedInputs.search}
                  onChange={e => {
                    setEnhancedInputs(prev => ({ ...prev, search: e.target.value }));
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addRecentAction(`Searched: ${enhancedInputs.search}`);
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
                  onClick={() => addRecentAction(`Searched: ${enhancedInputs.search}`)}
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency-input">Currency Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currency-input"
                  placeholder="0.00"
                  className="pl-9"
                  value={enhancedInputs.currency}
                  onChange={e => {
                    const formatted = formatCurrency(e.target.value);
                    setEnhancedInputs(prev => ({ ...prev, currency: formatted }));
                    addRecentAction('Currency Updated');
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-input">Credit Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="card-input"
                  placeholder="1234 5678 9012 3456"
                  className="pl-9"
                  maxLength={19}
                  value={enhancedInputs.card}
                  onChange={e => {
                    const formatted = formatCreditCard(e.target.value);
                    if (formatted.length <= 19) {
                      setEnhancedInputs(prev => ({ ...prev, card: formatted }));
                      addRecentAction('Card Number Updated');
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file-input">File Upload Simulation</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="file-input"
                  placeholder="No file selected"
                  className="pl-9 pr-20"
                  value={enhancedInputs.fileName}
                  readOnly
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
                  onClick={() => {
                    const fileName = `document-${Date.now()}.pdf`;
                    setEnhancedInputs(prev => ({ ...prev, fileName }));
                    addRecentAction('File Selected');
                  }}
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Input Validation */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Input Validation</h3>
            <p className="text-sm text-muted-foreground">
              Real-time validation with error states and feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="validation-email">Email Validation</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="validation-email"
                  type="email"
                  placeholder="Enter valid email..."
                  className={`pl-9 pr-9 ${
                    validationInputs.email && !isValidEmail(validationInputs.email)
                      ? 'border-red-500 focus:ring-red-500'
                      : validationInputs.email && isValidEmail(validationInputs.email)
                        ? 'border-green-500 focus:ring-green-500'
                        : ''
                  }`}
                  value={validationInputs.email}
                  onChange={e => {
                    setValidationInputs(prev => ({ ...prev, email: e.target.value }));
                    addRecentAction('Email Validation');
                  }}
                />
                {validationInputs.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidEmail(validationInputs.email) ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {validationInputs.email && !isValidEmail(validationInputs.email) && (
                <p className="text-sm text-red-500">Please enter a valid email address</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validation-password">Password Strength</Label>
              <div className="relative">
                <Input
                  id="validation-password"
                  type="password"
                  placeholder="Enter strong password..."
                  value={validationInputs.password}
                  onChange={e => {
                    setValidationInputs(prev => ({ ...prev, password: e.target.value }));
                    addRecentAction('Password Strength Check');
                  }}
                />
              </div>
              {validationInputs.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          getPasswordStrength(validationInputs.password) >= level
                            ? level === 1
                              ? 'bg-red-500'
                              : level === 2
                                ? 'bg-yellow-500'
                                : level === 3
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Strength:{' '}
                    {getPasswordStrength(validationInputs.password) === 1
                      ? 'Weak'
                      : getPasswordStrength(validationInputs.password) === 2
                        ? 'Fair'
                        : getPasswordStrength(validationInputs.password) === 3
                          ? 'Good'
                          : getPasswordStrength(validationInputs.password) === 4
                            ? 'Strong'
                            : 'Very Weak'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validation-required">
                Required Field <span className="text-red-500">*</span>
              </Label>
              <Input
                id="validation-required"
                placeholder="This field is required..."
                className={
                  validationInputs.required.trim() === '' && validationInputs.required !== ''
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }
                value={validationInputs.required}
                onChange={e => {
                  setValidationInputs(prev => ({ ...prev, required: e.target.value }));
                  addRecentAction('Required Field Updated');
                }}
              />
              {validationInputs.required.trim() === '' && validationInputs.required !== '' && (
                <p className="text-sm text-red-500">This field is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validation-limit">
                Character Limit ({validationInputs.charLimit.length}/100)
              </Label>
              <Input
                id="validation-limit"
                placeholder="Max 100 characters..."
                maxLength={100}
                className={
                  validationInputs.charLimit.length > 90
                    ? 'border-yellow-500 focus:ring-yellow-500'
                    : ''
                }
                value={validationInputs.charLimit}
                onChange={e => {
                  setValidationInputs(prev => ({ ...prev, charLimit: e.target.value }));
                  addRecentAction('Character Limit Input');
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Keep it concise and clear</span>
                <span className={validationInputs.charLimit.length > 90 ? 'text-yellow-600' : ''}>
                  {100 - validationInputs.charLimit.length} remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Input States */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Input States & Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Different input states with visual feedback and loading indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Normal State</Label>
              <Input placeholder="Normal input field" />
              <p className="text-xs text-muted-foreground">Standard input appearance</p>
            </div>

            <div className="space-y-2">
              <Label>Success State</Label>
              <Input
                placeholder="Success state"
                className="border-green-500 focus:ring-green-500"
                value="Valid input"
                readOnly
              />
              <p className="text-xs text-green-600">Input validation passed</p>
            </div>

            <div className="space-y-2">
              <Label>Error State</Label>
              <Input
                placeholder="Error state"
                className="border-red-500 focus:ring-red-500"
                value="Invalid input"
                readOnly
              />
              <p className="text-xs text-red-600">Please correct this field</p>
            </div>

            <div className="space-y-2">
              <Label>Disabled State</Label>
              <Input placeholder="Disabled input" disabled defaultValue="Cannot edit" />
              <p className="text-xs text-muted-foreground">Field is not editable</p>
            </div>

            <div className="space-y-2">
              <Label>Loading State</Label>
              <div className="relative">
                <Input placeholder="Loading..." value={loadingValue} readOnly />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Processing input...</p>
            </div>

            <div className="space-y-2">
              <Label>With Helper Text</Label>
              <Input placeholder="Input with guidance" />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" />
                <span>Additional information to help users</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Complete Form Example */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Complete Form Example</h3>
            <p className="text-sm text-muted-foreground">
              Real-world form with validation, formatting, and submission
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="form-first-name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="form-first-name"
                      placeholder="John"
                      className={`pl-9 ${formErrors.firstName ? 'border-red-500' : ''}`}
                      value={formData.firstName}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, firstName: e.target.value }));
                        if (formErrors.firstName) {
                          setFormErrors(prev => ({ ...prev, firstName: '' }));
                        }
                      }}
                    />
                  </div>
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-last-name">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="form-last-name"
                      placeholder="Doe"
                      className={`pl-9 ${formErrors.lastName ? 'border-red-500' : ''}`}
                      value={formData.lastName}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, lastName: e.target.value }));
                        if (formErrors.lastName) {
                          setFormErrors(prev => ({ ...prev, lastName: '' }));
                        }
                      }}
                    />
                  </div>
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="form-email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className={`pl-9 ${formErrors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (formErrors.email) {
                        setFormErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                  />
                </div>
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="form-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="form-phone"
                      placeholder="555-123-4567"
                      className="pl-9"
                      value={formData.phone}
                      onChange={e => {
                        const formatted = formatPhoneNumber(e.target.value);
                        setFormData(prev => ({ ...prev, phone: formatted }));
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="form-amount"
                      placeholder="0.00"
                      className={`pl-9 ${formErrors.amount ? 'border-red-500' : ''}`}
                      value={formData.amount}
                      onChange={e => {
                        const formatted = formatCurrency(e.target.value);
                        setFormData(prev => ({ ...prev, amount: formatted }));
                        if (formErrors.amount) {
                          setFormErrors(prev => ({ ...prev, amount: '' }));
                        }
                      }}
                    />
                  </div>
                  {formErrors.amount && <p className="text-sm text-red-500">{formErrors.amount}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="form-address"
                    placeholder="123 Main St, City, State 12345"
                    className="pl-9"
                    value={formData.address}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, address: e.target.value }));
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={validateForm} disabled={isValidating} className="flex-1">
                  {isValidating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Validating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Validate Form
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      amount: '',
                      address: '',
                    });
                    setFormErrors({});
                    addRecentAction('Form Reset');
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      firstName: 'John',
                      lastName: 'Doe',
                      email: 'john.doe@example.com',
                      phone: '555-123-4567',
                      amount: '$1,250.00',
                      address: '123 Main St, New York, NY 10001',
                    });
                    addRecentAction('Sample Data Loaded');
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Sample Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Advanced Input Features</h3>
            <p className="text-sm text-muted-foreground">
              Specialized input behaviors and enterprise features
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Auto-complete Simulation</h4>
              <div className="space-y-2">
                <Label htmlFor="autocomplete-input">Search Countries</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="autocomplete-input"
                    placeholder="Type to search countries..."
                    className="pl-9"
                    value={advancedInputs.autocomplete}
                    onChange={e => {
                      setAdvancedInputs(prev => ({ ...prev, autocomplete: e.target.value }));
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>

                {showSuggestions && advancedInputs.autocomplete && (
                  <div className="border rounded-md bg-background shadow-lg max-h-40 overflow-auto">
                    {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France']
                      .filter(country =>
                        country.toLowerCase().includes(advancedInputs.autocomplete.toLowerCase())
                      )
                      .map((country, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                          onMouseDown={e => {
                            e.preventDefault();
                            setAdvancedInputs(prev => ({ ...prev, autocomplete: country }));
                            setShowSuggestions(false);
                            addRecentAction(`Selected: ${country}`);
                          }}
                        >
                          {country}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Tag Input Simulation</h4>
              <div className="space-y-2">
                <Label htmlFor="tag-input">Add Tags</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="tag-input"
                      placeholder="Type and press Enter to add tags..."
                      value={advancedInputs.currentTag}
                      onChange={e => {
                        setAdvancedInputs(prev => ({ ...prev, currentTag: e.target.value }));
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && advancedInputs.currentTag.trim()) {
                          e.preventDefault();
                          const newTag = advancedInputs.currentTag.trim();
                          if (!advancedInputs.tags.includes(newTag)) {
                            setAdvancedInputs(prev => ({
                              ...prev,
                              tags: [...prev.tags, newTag],
                              currentTag: '',
                            }));
                            addRecentAction(`Tag Added: ${newTag}`);
                          }
                        }
                      }}
                    />
                  </div>

                  {advancedInputs.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {advancedInputs.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            onClick={() => {
                              setAdvancedInputs(prev => ({
                                ...prev,
                                tags: prev.tags.filter((_, i) => i !== index),
                              }));
                              addRecentAction(`Tag Removed: ${tag}`);
                            }}
                            className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Input Field Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use clear, descriptive labels and placeholders</p>
                <p>• Provide immediate validation feedback</p>
                <p>• Support keyboard navigation and shortcuts</p>
                <p>• Format input values automatically when helpful</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Accessibility</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Associate labels with inputs properly</p>
                <p>• Use appropriate input types for better mobile UX</p>
                <p>• Provide error messages and help text</p>
                <p>• Ensure sufficient color contrast</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Implementation</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Validate on both client and server side</p>
                <p>• Handle edge cases and error states</p>
                <p>• Optimize for performance with large datasets</p>
                <p>• Test across different devices and browsers</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
