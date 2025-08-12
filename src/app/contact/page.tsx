'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: '',
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ff3b3b' }}>
        Contact TriggerKings
      </h1>
      {submitted ? (
        <div style={{ color: '#0f0', fontWeight: 'bold' }}>Thank you! We’ll be in touch soon.</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #333' }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #333' }}
          />
          <input
            name="event"
            placeholder="Event Type (party, stag, etc)"
            value={form.event}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #333' }}
          />
          <input
            name="location"
            placeholder="Location/City"
            value={form.location}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #333' }}
          />
          <textarea
            name="message"
            placeholder="What would make this unforgettable?"
            value={form.message}
            onChange={handleChange}
            rows={3}
            style={{ padding: 10, borderRadius: 6, border: '1px solid #333' }}
          />
          <button
            type="submit"
            style={{
              background: '#ff3b3b',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: 12,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </form>
      )}
    </main>
  );
}
