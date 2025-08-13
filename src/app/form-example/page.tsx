'use client';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import { useState } from 'react';

export default function FormExamplePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          location: '',
          message: '',
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          TriggerKings Event Booking
          <Badge variant="destructive" className="ml-2">
            Demo Form
          </Badge>
        </h1>
        <p className="text-lg text-muted-foreground">
          Book your mobile paintball range experience using our Titan components
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Event Booking Form
              {formStatus === 'success' && <Badge variant="default">Submitted!</Badge>}
            </CardTitle>
            <CardDescription>
              Fill out the form below to request a quote for your mobile paintball event
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                    leftIcon="👤"
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                    leftIcon="👤"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    helperText="We'll send your quote here"
                    required
                    leftIcon="📧"
                    variant="outline"
                  />
                  <Input
                    type="tel"
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    helperText="For booking confirmation"
                    leftIcon="📱"
                    variant="outline"
                  />
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Event Type"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    placeholder="Birthday party, Corporate event, etc."
                    required
                    leftIcon="🎉"
                    variant="filled"
                  />
                  <Input
                    type="date"
                    label="Event Date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    leftIcon="📅"
                    variant="filled"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Expected Guest Count"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    placeholder="20"
                    helperText={
                      formData.guestCount && parseInt(formData.guestCount) > 50
                        ? 'Large groups may require special setup'
                        : 'Approximate number of participants'
                    }
                    min="1"
                    max="100"
                    leftIcon="👥"
                    state={
                      formData.guestCount && parseInt(formData.guestCount) > 50
                        ? 'warning'
                        : formData.guestCount
                          ? 'success'
                          : 'default'
                    }
                    successMessage={
                      formData.guestCount &&
                      parseInt(formData.guestCount) <= 50 &&
                      formData.guestCount
                        ? 'Perfect group size!'
                        : undefined
                    }
                  />

                  <Input
                    label="Event Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State or Full Address"
                    required
                    leftIcon="📍"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <Input
                  label="Special Requirements or Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about any special requirements, accessibility needs, or questions..."
                  helperText="Optional - Any additional details about your event"
                  leftIcon="💭"
                  variant="ghost"
                />
              </div>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">✓ Success</Badge>
                    <span className="text-green-800">
                      Your booking request has been submitted! We&apos;ll contact you within 24
                      hours.
                    </span>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">✗ Error</Badge>
                    <span className="text-red-800">
                      There was an error submitting your request. Please try again.
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                ← Back to Home
              </Button>

              <Button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="min-w-[120px]"
              >
                {formStatus === 'submitting' ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Submitting...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <Badge variant="outline" className="mr-2">
                      ✓
                    </Badge>
                    Submitted!
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎯</div>
                <h4 className="font-semibold">Mobile Range</h4>
                <p className="text-sm text-muted-foreground">
                  We bring the paintball experience to your location
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">🏆</div>
                <h4 className="font-semibold">High Scores</h4>
                <p className="text-sm text-muted-foreground">
                  Track performance and compete for the top spot
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎉</div>
                <h4 className="font-semibold">Perfect Events</h4>
                <p className="text-sm text-muted-foreground">
                  Ideal for parties, corporate events, and gatherings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
