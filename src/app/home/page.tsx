'use client';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import * as React from 'react';

export default function HomePage() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    event: '',
    location: '',
    message: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Thank you! We received your message and will be in touch.');
        setForm({ name: '', email: '', event: '', location: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Daedalus</h1>
        <p className="text-xl text-muted-foreground mb-2">The Foundation for Digital Creation</p>
        <p className="text-lg text-muted-foreground">
          Build beautiful, accessible apps faster with Daedalus.
        </p>
      </header>

      <section className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Want a custom UI system, enterprise consulting, or to book a demo? Fill out the form below
          and we’ll get back to you fast.
        </p>
        <form className="space-y-6 max-w-lg mx-auto text-left" onSubmit={handleSubmit}>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="event"
              label="Event"
              placeholder="What are you interested in?"
              value={form.event}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              name="location"
              label="Location"
              placeholder="Your city or company"
              value={form.location}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <Textarea
            name="message"
            label="Message (optional)"
            placeholder="Tell us more about your needs, timeline, or questions."
            value={form.message}
            onChange={handleChange}
            rows={4}
            disabled={loading}
          />
          <Button type="submit" loading={loading} className="w-full h-12 text-lg font-bold">
            {loading ? 'Sending...' : 'Contact Us'}
          </Button>
        </form>
      </section>
    </main>
  );
}
