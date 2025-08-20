'use client';

import {
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Database,
  Eye,
  EyeOff,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Settings,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Label } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Separator } from '../Separator';

export default function LabelDemo() {
  const [formState, setFormState] = useState({
    firstName: '',
    email: '',
    password: '',
    newsletter: false,
    terms: false,
    preferences: {
      notifications: true,
      marketing: false,
      analytics: true,
    },
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string | boolean) => {
    const errors = { ...validationErrors };

    switch (name) {
      case 'firstName':
        if (typeof value === 'string') {
          if (!value || value.length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
          } else {
            delete errors.firstName;
          }
        }
        break;
      case 'email':
        if (typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            errors.email = 'Email is required';
          } else if (!emailRegex.test(value)) {
            errors.email = 'Please enter a valid email address';
          } else {
            delete errors.email;
          }
        }
        break;
      case 'password':
        if (typeof value === 'string') {
          if (!value) {
            errors.password = 'Password is required';
          } else if (value.length < 8) {
            errors.password = 'Password must be at least 8 characters';
          } else {
            delete errors.password;
          }
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setFormState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all fields
    Object.entries(formState).forEach(([key, value]) => {
      if (typeof value === 'string') {
        validateField(key, value);
      }
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Label Component</h1>
        <p className="text-muted-foreground">
          Accessible form field labels with validation states, help text, and interactive patterns
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Standard label patterns for form accessibility
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="basic-input">Simple Label</Label>
                <Input id="basic-input" placeholder="Enter text..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="required-input">
                  Required Field <span className="text-red-500">*</span>
                </Label>
                <Input id="required-input" placeholder="This field is required" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optional-input">
                  Optional Field <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input id="optional-input" placeholder="This field is optional" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disabled-input" className="text-muted-foreground">
                  Disabled Label
                </Label>
                <Input id="disabled-input" placeholder="Disabled input" disabled />
              </div>

              <div className="space-y-2">
                <Label>
                  <Checkbox className="mr-2" />
                  Checkbox with Label
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="font-medium text-sm">Bold Label Style</Label>
                <Input placeholder="With styled label" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Label States and Validation */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Label States & Validation</h3>
              <p className="text-sm text-muted-foreground">
                Labels with validation feedback and state indicators
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="success-input" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Success State
                </Label>
                <Input
                  id="success-input"
                  value="Valid input value"
                  className="border-green-500 focus:border-green-500"
                  readOnly
                />
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  This field is valid
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="error-input" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Error State
                </Label>
                <Input
                  id="error-input"
                  value="Invalid"
                  className="border-red-500 focus:border-red-500"
                />
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  This field has an error
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="warning-input" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Warning State
                </Label>
                <Input
                  id="warning-input"
                  value="Potential issue"
                  className="border-yellow-500 focus:border-yellow-500"
                />
                <p className="text-sm text-yellow-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  This field needs attention
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="info-input" className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Info State
                </Label>
                <Input
                  id="info-input"
                  placeholder="Additional information"
                  className="border-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-blue-600 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Additional context provided
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loading-input" className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  Loading State
                </Label>
                <Input id="loading-input" placeholder="Validating..." disabled />
                <p className="text-sm text-muted-foreground">Validating input...</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="counter-input" className="flex items-center justify-between">
                  <span>Character Counter</span>
                  <Badge variant="outline">25/100</Badge>
                </Label>
                <Input id="counter-input" placeholder="Type something..." maxLength={100} />
                <p className="text-sm text-muted-foreground">75 characters remaining</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Help Text and Tooltips */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Help Text & Context</h3>
              <p className="text-sm text-muted-foreground">
                Labels with contextual help and guidance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="help-input" className="flex items-center gap-2">
                  Username
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </Label>
                <Input id="help-input" placeholder="Enter username" />
                <p className="text-sm text-muted-foreground">
                  Choose a unique username between 3-20 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format-input">
                  Phone Number
                  <span className="block text-xs text-muted-foreground font-normal mt-1">
                    Format: +1 (555) 123-4567
                  </span>
                </Label>
                <Input id="format-input" placeholder="+1 (555) 123-4567" type="tel" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="example-input">
                  API Endpoint
                  <span className="block text-xs text-blue-600 font-normal mt-1">
                    Example: https://api.example.com/v1
                  </span>
                </Label>
                <Input id="example-input" placeholder="https://api.example.com/v1" type="url" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="security-input" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Secure Field
                  <Badge variant="secondary" className="text-xs">
                    Encrypted
                  </Badge>
                </Label>
                <Input id="security-input" type="password" placeholder="Enter secure data" />
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  This data is encrypted and secure
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority-input" className="flex items-center gap-2">
                  Priority Task
                  <Star className="h-4 w-4 text-yellow-500" />
                </Label>
                <Input id="priority-input" placeholder="High priority item" />
                <p className="text-sm text-yellow-600">This field requires immediate attention</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-input" className="flex items-center gap-2">
                  Smart Input
                  <Zap className="h-4 w-4 text-purple-500" />
                </Label>
                <Input id="auto-input" placeholder="Auto-suggestions enabled" />
                <p className="text-sm text-purple-600">Type to see smart suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Form Example */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">Interactive Form Labels</h3>
              <p className="text-sm text-muted-foreground">
                Real-time validation with dynamic label states
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="form-firstName"
                    className={`flex items-center gap-2 transition-colors ${
                      fieldFocus === 'firstName'
                        ? 'text-blue-600'
                        : validationErrors.firstName
                          ? 'text-red-600'
                          : formState.firstName && !validationErrors.firstName
                            ? 'text-green-600'
                            : ''
                    }`}
                  >
                    <User className="h-4 w-4" />
                    First Name
                    <span className="text-red-500">*</span>
                    {formState.firstName && !validationErrors.firstName && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="form-firstName"
                    value={formState.firstName}
                    onChange={e => handleFieldChange('firstName', e.target.value)}
                    onFocus={() => setFieldFocus('firstName')}
                    onBlur={() => setFieldFocus('')}
                    className={
                      validationErrors.firstName
                        ? 'border-red-500'
                        : formState.firstName && !validationErrors.firstName
                          ? 'border-green-500'
                          : ''
                    }
                    placeholder="Enter your first name"
                  />
                  {validationErrors.firstName && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {validationErrors.firstName}
                    </p>
                  )}
                  {formState.firstName && !validationErrors.firstName && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Looks good!
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="form-email"
                    className={`flex items-center gap-2 transition-colors ${
                      fieldFocus === 'email'
                        ? 'text-blue-600'
                        : validationErrors.email
                          ? 'text-red-600'
                          : formState.email && !validationErrors.email
                            ? 'text-green-600'
                            : ''
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    Email Address
                    <span className="text-red-500">*</span>
                    {formState.email && !validationErrors.email && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <Input
                    id="form-email"
                    type="email"
                    value={formState.email}
                    onChange={e => handleFieldChange('email', e.target.value)}
                    onFocus={() => setFieldFocus('email')}
                    onBlur={() => setFieldFocus('')}
                    className={
                      validationErrors.email
                        ? 'border-red-500'
                        : formState.email && !validationErrors.email
                          ? 'border-green-500'
                          : ''
                    }
                    placeholder="you@example.com"
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {validationErrors.email}
                    </p>
                  )}
                  {formState.email && !validationErrors.email && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Valid email address
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="form-password"
                    className={`flex items-center gap-2 transition-colors ${
                      fieldFocus === 'password'
                        ? 'text-blue-600'
                        : validationErrors.password
                          ? 'text-red-600'
                          : formState.password && !validationErrors.password
                            ? 'text-green-600'
                            : ''
                    }`}
                  >
                    <Lock className="h-4 w-4" />
                    Password
                    <span className="text-red-500">*</span>
                    {formState.password && !validationErrors.password && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="form-password"
                      type={showPassword ? 'text' : 'password'}
                      value={formState.password}
                      onChange={e => handleFieldChange('password', e.target.value)}
                      onFocus={() => setFieldFocus('password')}
                      onBlur={() => setFieldFocus('')}
                      className={`pr-10 ${
                        validationErrors.password
                          ? 'border-red-500'
                          : formState.password && !validationErrors.password
                            ? 'border-green-500'
                            : ''
                      }`}
                      placeholder="Enter secure password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {validationErrors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      {validationErrors.password}
                    </p>
                  )}
                  {formState.password && !validationErrors.password && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Strong password
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Preferences</Label>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={formState.newsletter}
                        onCheckedChange={checked => handleFieldChange('newsletter', checked)}
                      />
                      <span>Subscribe to newsletter</span>
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    </Label>

                    <Label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={formState.terms}
                        onCheckedChange={checked => handleFieldChange('terms', checked)}
                      />
                      <span>Accept terms and conditions</span>
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-sm font-medium">Notification Preferences</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={formState.preferences.notifications}
                    onCheckedChange={checked =>
                      handlePreferenceChange('notifications', checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">System Notifications</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Important updates and alerts</p>
                  </div>
                </Label>

                <Label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={formState.preferences.marketing}
                    onCheckedChange={checked =>
                      handlePreferenceChange('marketing', checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Marketing Emails</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Product updates and offers</p>
                  </div>
                </Label>

                <Label className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={formState.preferences.analytics}
                    onCheckedChange={checked =>
                      handlePreferenceChange('analytics', checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="font-medium">Analytics</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Help improve our service</p>
                  </div>
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting || Object.keys(validationErrors).length > 0 || !formState.terms
                }
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Label Patterns */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold">Advanced Label Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Complex label layouts and enterprise patterns
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Grouped Labels</h4>
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="text-base font-semibold">Contact Information</Label>

                  <div className="space-y-3 ml-4">
                    <div className="space-y-1">
                      <Label htmlFor="contact-email" className="text-sm">
                        Email
                      </Label>
                      <Input id="contact-email" placeholder="email@example.com" />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="contact-phone" className="text-sm">
                        Phone
                      </Label>
                      <Input id="contact-phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Inline Labels</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="inline-1" className="w-24 text-right text-sm">
                      Name:
                    </Label>
                    <Input id="inline-1" className="flex-1" placeholder="Enter name" />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label htmlFor="inline-2" className="w-24 text-right text-sm">
                      Location:
                    </Label>
                    <Input id="inline-2" className="flex-1" placeholder="Enter location" />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label htmlFor="inline-3" className="w-24 text-right text-sm">
                      Department:
                    </Label>
                    <Input id="inline-3" className="flex-1" placeholder="Enter department" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Rich Labels with Metadata</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rich-1" className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-blue-500" />
                        <span>Company Size</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Required</Badge>
                        <Badge variant="secondary">Business</Badge>
                      </div>
                    </Label>
                    <Input id="rich-1" placeholder="e.g. 50-100 employees" />
                    <p className="text-xs text-muted-foreground">
                      This helps us recommend the right plan for your business
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rich-2" className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-green-500" />
                        <span>Website URL</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Optional</Badge>
                        <Badge variant="secondary">Public</Badge>
                      </div>
                    </Label>
                    <Input id="rich-2" type="url" placeholder="https://yourcompany.com" />
                    <p className="text-xs text-blue-600">
                      We&apos;ll verify your domain for additional security features
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Dynamic Labels</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>Session Timeout</span>
                      <Badge variant="outline">Auto-save: ON</Badge>
                    </Label>
                    <Input placeholder="30 minutes" />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-orange-500" />
                      <span>File Upload</span>
                      <Badge variant="outline">3/5 files</Badge>
                    </Label>
                    <Input type="file" multiple />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Accessibility and Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Accessibility & Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Semantic HTML</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Proper label-input associations</p>
                <p>• Required field indicators</p>
                <p>• ARIA attributes for screen readers</p>
                <p>• Logical tab order and focus management</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Visual Design</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• High contrast text and backgrounds</p>
                <p>• Clear visual hierarchy</p>
                <p>• Consistent spacing and alignment</p>
                <p>• State-based color coding</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Clear error messages and validation</p>
                <p>• Contextual help and guidance</p>
                <p>• Progressive disclosure of complexity</p>
                <p>• Mobile-friendly touch targets</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Technical Implementation</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• htmlFor attribute binding</div>
              <div>• ARIA-described by for help text</div>
              <div>• Role and state announcements</div>
              <div>• Keyboard navigation support</div>
              <div>• Focus visible indicators</div>
              <div>• Error announcement timing</div>
              <div>• Label positioning consistency</div>
              <div>• Responsive text sizing</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
