'use client';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Link from 'next/link';
import React, { useState } from 'react';

export default function TextareaTest() {
  const [basicValue, setBasicValue] = useState('');
  const [controlledValue, setControlledValue] = useState(
    'This is a controlled textarea with initial content.'
  );
  const [formData, setFormData] = useState({
    description: '',
    comments: '',
    feedback: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#ff3b3b',
            textShadow: '0 0 15px rgba(255,59,59,0.7)',
          }}
        >
          Textarea Component Tests
        </h1>
        <Link href="/" style={{ color: '#ccc', textDecoration: 'underline' }}>
          ← Back to Home
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '3rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        }}
      >
        {/* Basic Examples */}
        <section>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Basic Examples</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Default Textarea</h3>
              <Textarea placeholder="Enter your text here..." />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>With Label</h3>
              <Textarea label="Description" placeholder="Describe your experience..." />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Required Field</h3>
              <Textarea label="Required Field" placeholder="This field is required" required />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>With Helper Text</h3>
              <Textarea
                label="Comments"
                placeholder="Add your comments..."
                helperText="Share your thoughts and feedback here."
              />
            </div>
          </div>
        </section>

        {/* Character Count Examples */}
        <section>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Character Count</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Basic Count (100 chars)</h3>
              <Textarea
                label="Short Message"
                placeholder="Type a short message..."
                maxLength={100}
                showCount
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Warning State (50 chars)</h3>
              <Textarea
                label="Tweet-like Input"
                placeholder="Express yourself in 50 characters..."
                maxLength={50}
                showCount
                helperText="Keep it short and sweet!"
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>With Initial Content</h3>
              <Textarea
                label="Edit Content"
                defaultValue="This content has some initial text that you can edit and see the character count change."
                maxLength={200}
                showCount
              />
            </div>
          </div>
        </section>

        {/* State Examples */}
        <section>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Different States</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Error State</h3>
              <Textarea
                label="Validation Example"
                placeholder="This field has an error..."
                error="This field is required and cannot be empty."
                maxLength={50}
                showCount
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Disabled State</h3>
              <Textarea
                label="Disabled Field"
                placeholder="This field is disabled"
                disabled
                defaultValue="This content cannot be edited"
              />
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>Loading State</h3>
              <Textarea
                label="Loading Content"
                placeholder="Loading..."
                loading
                helperText="Content is being loaded..."
              />
            </div>
          </div>
        </section>

        {/* Controlled Component Example */}
        <section>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Controlled Components</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                Basic Controlled (Length: {basicValue.length})
              </h3>
              <Textarea
                label="Controlled Input"
                placeholder="Type here and see real-time updates..."
                value={basicValue}
                onChange={e => setBasicValue(e.target.value)}
                maxLength={150}
                showCount
              />
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#999' }}>
                Current value: &ldquo;{basicValue}&rdquo;
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>
                Advanced Controlled (Length: {controlledValue.length})
              </h3>
              <Textarea
                label="Advanced Example"
                value={controlledValue}
                onChange={e => setControlledValue(e.target.value)}
                maxLength={300}
                showCount
                helperText="This textarea starts with content and tracks all changes."
              />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" size="sm" onClick={() => setControlledValue('')}>
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setControlledValue('Sample content for testing...')}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Integration Example */}
        <section style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Form Integration</h2>
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              padding: '2rem',
              border: '1px solid #333',
              borderRadius: '0.5rem',
              backgroundColor: '#111',
            }}
          >
            <div>
              <Textarea
                label="Project Description"
                placeholder="Describe your project in detail..."
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                maxLength={500}
                showCount
                required
                helperText="Provide a comprehensive description of your project goals and requirements."
              />
            </div>

            <div>
              <Textarea
                label="Additional Comments"
                placeholder="Any additional comments or notes..."
                value={formData.comments}
                onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                maxLength={200}
                showCount
                helperText="Optional additional information that might be helpful."
              />
            </div>

            <div>
              <Textarea
                label="Feedback"
                placeholder="Share your feedback about our service..."
                value={formData.feedback}
                onChange={e => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                maxLength={300}
                showCount
                error={
                  formData.feedback.length > 0 && formData.feedback.length < 10
                    ? 'Feedback must be at least 10 characters long.'
                    : undefined
                }
              />
            </div>

            <div
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Button type="submit" variant="default">
                Submit Form
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ description: '', comments: '', feedback: '' })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </section>

        {/* Real-world Scenarios */}
        <section style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ color: '#ff3b3b', marginBottom: '1.5rem' }}>Real-world Scenarios</h2>
          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                backgroundColor: '#111',
              }}
            >
              <h3 style={{ marginBottom: '1rem', color: '#ccc' }}>Social Media Post</h3>
              <Textarea
                label="What's on your mind?"
                placeholder="Share your thoughts with the world..."
                maxLength={280}
                showCount
                helperText="Twitter-style character limit"
              />
            </div>

            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                backgroundColor: '#111',
              }}
            >
              <h3 style={{ marginBottom: '1rem', color: '#ccc' }}>Code Review</h3>
              <Textarea
                label="Review Comments"
                placeholder="Add your code review comments..."
                maxLength={1000}
                showCount
                helperText="Provide constructive feedback for code improvements"
                style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
              />
            </div>

            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                backgroundColor: '#111',
              }}
            >
              <h3 style={{ marginBottom: '1rem', color: '#ccc' }}>Customer Support</h3>
              <Textarea
                label="Describe your issue"
                placeholder="Please provide details about the problem you're experiencing..."
                maxLength={2000}
                showCount
                required
                helperText="The more details you provide, the better we can help you"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '4rem',
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid #333',
          color: '#666',
        }}
      >
        <p>
          Enhanced Textarea Component with character counting, validation, and accessibility
          features.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Built with shadcn/ui, enhanced with custom SCSS, and thoroughly tested with 42 test cases.
        </p>
      </div>
    </div>
  );
}
