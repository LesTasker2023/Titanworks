'use client';

import {
  AlertTriangle,
  Briefcase,
  Building,
  Check,
  CreditCard,
  Database,
  Eye,
  EyeOff,
  Save,
  Shield,
  Target,
  User,
  UserPlus,
} from 'lucide-react';
import React, { useState } from 'react';
import { Form } from '.';
import { Button } from '../Button';
import { Card } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';
import { Separator } from '../Separator';
import { Textarea } from '../Textarea';

export default function FormDemo() {
  // Basic form states
  const [basicForm, setBasicForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // User profile states
  const [profileForm, setProfileForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Developer',
    department: 'Engineering',
    bio: 'Experienced software developer with expertise in React and TypeScript.',
  });

  // Registration states
  const [registrationForm, setRegistrationForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    agreeToTerms: false,
  });

  // Business contact states
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    industry: 'technology',
    employees: '10-50',
    budget: '10000-25000',
    projectType: 'web-development',
    timeline: '3-6-months',
    description: '',
    hearAboutUs: 'search-engine',
  });

  // Payment form states
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  // Form validation states
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [feedback, setFeedback] = useState<string>('');

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateForm = (form: Record<string, any>, formType: string) => {
    const errors: Record<string, string> = {};

    if (formType === 'registration') {
      if (!form.username) errors.username = 'Username is required';
      if (!form.email) errors.email = 'Email is required';
      else if (!validateEmail(form.email)) errors.email = 'Invalid email format';
      if (!form.password) errors.password = 'Password is required';
      else if (!validatePassword(form.password))
        errors.password = 'Password must be 8+ chars with uppercase, lowercase, and number';
      if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      if (!form.agreeToTerms) errors.terms = 'You must agree to the terms';
    }

    return errors;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: Record<string, any>, formType: string) => {
    setSubmitStatus('loading');

    const errors = validateForm(formData, formType);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitStatus('error');
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitStatus('success');
    setFeedback(`${formType} form submitted successfully!`);
    setTimeout(() => {
      setSubmitStatus('idle');
      setFeedback('');
    }, 3000);
  };

  const updateFormState = <T extends Record<string, unknown>>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: string,
    value: unknown
  ) => {
    setter((prev: T) => ({ ...prev, [field]: value }) as T);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Form Component</h1>
        <p className="text-muted-foreground">
          Comprehensive form handling for enterprise applications, user registration, and business
          workflows
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              Success: <strong>{feedback}</strong>
            </span>
          </div>
        </Card>
      )}

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple form patterns for common user inputs
          </p>

          <Form className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="basic-name">Full Name</Label>
              <Input
                id="basic-name"
                placeholder="Enter your name"
                value={basicForm.name}
                onChange={e => updateFormState(setBasicForm, 'name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basic-email">Email</Label>
              <Input
                id="basic-email"
                type="email"
                placeholder="Enter your email"
                value={basicForm.email}
                onChange={e => updateFormState(setBasicForm, 'email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basic-message">Message</Label>
              <Textarea
                id="basic-message"
                placeholder="Enter your message"
                value={basicForm.message}
                onChange={e => updateFormState(setBasicForm, 'message', e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={() => handleSubmit(basicForm, 'contact')}
              disabled={submitStatus === 'loading'}
              className="w-full"
            >
              {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </Form>
        </div>
      </Card>

      {/* User Registration */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <UserPlus className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">User Registration</h3>
              <p className="text-sm text-muted-foreground">
                Complete user onboarding with validation
              </p>
            </div>
          </div>

          <Form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reg-firstname">First Name</Label>
                <Input
                  id="reg-firstname"
                  placeholder="John"
                  value={registrationForm.firstName}
                  onChange={e => updateFormState(setRegistrationForm, 'firstName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-lastname">Last Name</Label>
                <Input
                  id="reg-lastname"
                  placeholder="Doe"
                  value={registrationForm.lastName}
                  onChange={e => updateFormState(setRegistrationForm, 'lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-username">Username</Label>
              <Input
                id="reg-username"
                placeholder="johndoe"
                value={registrationForm.username}
                onChange={e => updateFormState(setRegistrationForm, 'username', e.target.value)}
                className={formErrors.username ? 'border-red-500' : ''}
              />
              {formErrors.username && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {formErrors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Email Address</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="john@company.com"
                value={registrationForm.email}
                onChange={e => updateFormState(setRegistrationForm, 'email', e.target.value)}
                className={formErrors.email ? 'border-red-500' : ''}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    value={registrationForm.password}
                    onChange={e => updateFormState(setRegistrationForm, 'password', e.target.value)}
                    className={formErrors.password ? 'border-red-500' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-confirm">Confirm Password</Label>
                <Input
                  id="reg-confirm"
                  type="password"
                  placeholder="Confirm password"
                  value={registrationForm.confirmPassword}
                  onChange={e =>
                    updateFormState(setRegistrationForm, 'confirmPassword', e.target.value)
                  }
                  className={formErrors.confirmPassword ? 'border-red-500' : ''}
                />
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-company">Company (Optional)</Label>
              <Input
                id="reg-company"
                placeholder="Company name"
                value={registrationForm.company}
                onChange={e => updateFormState(setRegistrationForm, 'company', e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={registrationForm.agreeToTerms}
                onChange={e =>
                  updateFormState(setRegistrationForm, 'agreeToTerms', e.target.checked)
                }
                className="h-4 w-4"
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {formErrors.terms && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {formErrors.terms}
              </p>
            )}

            <Button
              onClick={() => handleSubmit(registrationForm, 'registration')}
              disabled={submitStatus === 'loading'}
              className="w-full"
            >
              {submitStatus === 'loading' ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form>
        </div>
      </Card>

      {/* Business Contact Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Business Contact Form</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise sales and partnership inquiries
              </p>
            </div>
          </div>

          <Form className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Company Information</h4>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    placeholder="Acme Corporation"
                    value={contactForm.companyName}
                    onChange={e => updateFormState(setContactForm, 'companyName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input
                    id="contact-person"
                    placeholder="Jane Smith"
                    value={contactForm.contactPerson}
                    onChange={e => updateFormState(setContactForm, 'contactPerson', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://acme.com"
                    value={contactForm.website}
                    onChange={e => updateFormState(setContactForm, 'website', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <select
                    id="industry"
                    className="w-full p-2 border rounded-md"
                    value={contactForm.industry}
                    onChange={e => updateFormState(setContactForm, 'industry', e.target.value)}
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Project Details</h4>

                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <select
                    id="project-type"
                    className="w-full p-2 border rounded-md"
                    value={contactForm.projectType}
                    onChange={e => updateFormState(setContactForm, 'projectType', e.target.value)}
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="enterprise-software">Enterprise Software</option>
                    <option value="consulting">Consulting</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <select
                    id="budget"
                    className="w-full p-2 border rounded-md"
                    value={contactForm.budget}
                    onChange={e => updateFormState(setContactForm, 'budget', e.target.value)}
                  >
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000-50000">$25,000 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000+">$100,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <select
                    id="timeline"
                    className="w-full p-2 border rounded-md"
                    value={contactForm.timeline}
                    onChange={e => updateFormState(setContactForm, 'timeline', e.target.value)}
                  >
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="12+months">12+ months</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hear-about">How did you hear about us?</Label>
                  <select
                    id="hear-about"
                    className="w-full p-2 border rounded-md"
                    value={contactForm.hearAboutUs}
                    onChange={e => updateFormState(setContactForm, 'hearAboutUs', e.target.value)}
                  >
                    <option value="search-engine">Search Engine</option>
                    <option value="social-media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="event">Conference/Event</option>
                    <option value="partner">Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                placeholder="Please describe your project requirements, goals, and any specific features you need..."
                value={contactForm.description}
                onChange={e => updateFormState(setContactForm, 'description', e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={() => handleSubmit(contactForm, 'business-contact')}
              disabled={submitStatus === 'loading'}
              className="w-full"
            >
              {submitStatus === 'loading' ? 'Sending...' : 'Send Business Inquiry'}
            </Button>
          </Form>
        </div>
      </Card>

      {/* User Profile Edit */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">User Profile Management</h3>
              <p className="text-sm text-muted-foreground">Edit user information and preferences</p>
            </div>
          </div>

          <Form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-firstname">First Name</Label>
                <Input
                  id="profile-firstname"
                  value={profileForm.firstName}
                  onChange={e => updateFormState(setProfileForm, 'firstName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-lastname">Last Name</Label>
                <Input
                  id="profile-lastname"
                  value={profileForm.lastName}
                  onChange={e => updateFormState(setProfileForm, 'lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email Address</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profileForm.email}
                  onChange={e => updateFormState(setProfileForm, 'email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone Number</Label>
                <Input
                  id="profile-phone"
                  value={profileForm.phone}
                  onChange={e => updateFormState(setProfileForm, 'phone', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-title">Job Title</Label>
                <Input
                  id="profile-title"
                  value={profileForm.title}
                  onChange={e => updateFormState(setProfileForm, 'title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-department">Department</Label>
                <Input
                  id="profile-department"
                  value={profileForm.department}
                  onChange={e => updateFormState(setProfileForm, 'department', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-bio">Bio</Label>
              <Textarea
                id="profile-bio"
                value={profileForm.bio}
                onChange={e => updateFormState(setProfileForm, 'bio', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleSubmit(profileForm, 'profile')}
                disabled={submitStatus === 'loading'}
              >
                <Save className="h-4 w-4 mr-2" />
                {submitStatus === 'loading' ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Form>
        </div>
      </Card>

      {/* Payment Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold">Payment Information</h3>
              <p className="text-sm text-muted-foreground">Secure payment processing form</p>
            </div>
          </div>

          <Form className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <h4 className="font-medium">Card Information</h4>

              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={e => updateFormState(setPaymentForm, 'cardNumber', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={e => updateFormState(setPaymentForm, 'expiryDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={e => updateFormState(setPaymentForm, 'cvv', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholder">Cardholder Name</Label>
                <Input
                  id="cardholder"
                  placeholder="John Doe"
                  value={paymentForm.cardholderName}
                  onChange={e => updateFormState(setPaymentForm, 'cardholderName', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Billing Address</h4>

              <div className="space-y-2">
                <Label htmlFor="billing-address">Address</Label>
                <Input
                  id="billing-address"
                  placeholder="123 Main Street"
                  value={paymentForm.billingAddress}
                  onChange={e => updateFormState(setPaymentForm, 'billingAddress', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={paymentForm.city}
                    onChange={e => updateFormState(setPaymentForm, 'city', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={paymentForm.state}
                    onChange={e => updateFormState(setPaymentForm, 'state', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    value={paymentForm.zipCode}
                    onChange={e => updateFormState(setPaymentForm, 'zipCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleSubmit(paymentForm, 'payment')}
              disabled={submitStatus === 'loading'}
              className="w-full"
            >
              {submitStatus === 'loading' ? 'Processing...' : 'Process Payment'}
            </Button>
          </Form>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Business Operations</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Employee onboarding forms</p>
                <p>• Customer feedback surveys</p>
                <p>• Lead qualification forms</p>
                <p>• Support ticket creation</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Data Collection</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• User research questionnaires</p>
                <p>• Event registration forms</p>
                <p>• Product feedback collection</p>
                <p>• Market research surveys</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Multi-step wizards</p>
                <p>• Progressive disclosure</p>
                <p>• Real-time validation</p>
                <p>• Auto-save functionality</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Field validation</div>
              <div>• Error handling</div>
              <div>• File uploads</div>
              <div>• Auto-completion</div>
              <div>• Conditional fields</div>
              <div>• Progress indicators</div>
              <div>• Draft saving</div>
              <div>• Accessibility support</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
