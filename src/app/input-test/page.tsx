'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function InputTestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    website: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 1)) {
      newErrors.age = 'Please enter a valid age';
    }

    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert('Form submitted successfully!');

    // Reset form
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: '',
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '1px solid #333',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#ff3b3b',
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          Input Component Integration Test
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Basic text input with label */}
          <Input
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            helperText={!errors.name ? 'This will be displayed on your profile' : undefined}
          />

          {/* Email input with validation */}
          <Input
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            helperText={!errors.email ? "We'll never share your email with anyone" : undefined}
          />

          {/* Password input */}
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            helperText={!errors.password ? 'Minimum 6 characters' : undefined}
          />

          {/* Confirm password */}
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />

          {/* Number input */}
          <Input
            name="age"
            type="number"
            label="Age (Optional)"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleInputChange}
            error={errors.age}
            helperText={!errors.age ? 'This helps us provide age-appropriate content' : undefined}
          />

          {/* URL input */}
          <Input
            name="website"
            type="url"
            label="Website (Optional)"
            placeholder="https://your-website.com"
            value={formData.website}
            onChange={handleInputChange}
            error={errors.website}
            helperText={!errors.website ? 'Share your personal or professional website' : undefined}
          />

          {/* Loading state demonstration */}
          <div style={{ marginTop: '1rem' }}>
            <Input
              label="Loading State Demo"
              placeholder="This input is in loading state"
              loading={true}
              helperText="This demonstrates the loading state styling"
            />
          </div>

          {/* Disabled state demonstration */}
          <Input
            label="Disabled State Demo"
            placeholder="This input is disabled"
            disabled={true}
            defaultValue="Cannot edit this field"
            helperText="This demonstrates the disabled state styling"
          />

          {/* Error state demonstration */}
          <Input
            label="Error State Demo"
            placeholder="This input shows error state"
            defaultValue="invalid-value"
            error="This is what an error message looks like"
            readOnly
          />

          {/* Submit buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              justifyContent: 'center',
            }}
          >
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Form'}
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  age: '',
                  website: '',
                });
                setErrors({});
              }}
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        </form>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            href="/"
            style={{
              color: '#ff3b3b',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
