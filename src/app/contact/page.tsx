'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: '',
    eventType: '', // New field for Select component
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, eventType: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send. Please try again later.');
      }
    } catch {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#181818',
        color: '#fff',
        padding: '2rem',
      }}
    >
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff3b3b' }}>
          Contact TriggerKings
        </h1>
        <Link href="/" style={{ color: '#ccc', textDecoration: 'underline' }}>
          ← Back to Home
        </Link>
      </div>

      {submitted ? (
        <div
          style={{
            color: '#0f0',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textAlign: 'center',
            padding: '2rem',
            border: '2px solid #0f0',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          }}
        >
          🎉 Thank you! We&apos;ll be in touch soon to make your event unforgettable!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            maxWidth: '500px',
            padding: '2rem',
            border: '1px solid #333',
            borderRadius: '0.5rem',
            backgroundColor: '#0a0a0a',
          }}
        >
          <Input
            name="name"
            label="Name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
            helperText="Let us know what to call you"
          />

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
            helperText="We'll use this to send you event details"
          />

          <div className="space-y-2">
            <label
              htmlFor="eventType"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Event Type *
            </label>
            <Select value={form.eventType} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select your event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">Birthday Party</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="stag">Stag/Hen Do</SelectItem>
                <SelectItem value="corporate">Corporate Event</SelectItem>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="graduation">Graduation</SelectItem>
                <SelectItem value="retirement">Retirement Party</SelectItem>
                <SelectItem value="other">Other Celebration</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose the type of event you&rsquo;re planning
            </p>
          </div>

          <Input
            name="location"
            label="Location"
            placeholder="City or venue name"
            value={form.location}
            onChange={handleChange}
            required
            helperText="Where should we bring the action?"
          />

          <Textarea
            name="message"
            label="Event Details"
            placeholder="Tell us about your event! Number of players, date preferences, special requirements, or anything that would make this unforgettable..."
            value={form.message}
            onChange={handleChange}
            maxLength={500}
            showCount
            helperText="The more details you share, the better we can customize your experience!"
          />

          <Button type="submit" size="lg" style={{ marginTop: '1rem' }}>
            Send Inquiry
          </Button>
        </form>
      )}
    </main>
  );
}
