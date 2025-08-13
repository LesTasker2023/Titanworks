import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only when needed and with proper error handling
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not configured');
  }
  return new Resend(apiKey);
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, event, location, message } = await req.json();

    // Validate required fields
    if (!name || !email || !event || !location) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not configured - using mock mode');
      console.log('Contact form submission:', { name, email, event, location, message });

      return NextResponse.json({
        success: true,
        message: 'Message received (demo mode - email not sent)',
      });
    }

    // Initialize Resend client
    const resend = getResendClient();

    console.log('Attempting to send email with Resend...');

    // Email configuration
    const fromEmail = process.env.FROM_EMAIL || 'TriggerKings <noreply@resend.dev>';
    console.log('Using FROM_EMAIL:', fromEmail);

    // Send email with proper error handling
    const result = await resend.emails.send({
      from: fromEmail,
      to: ['leseatfire@gmail.com'], // Your verified email address
      replyTo: email, // Allow replies to go to the submitter
      subject: `TriggerKings Contact Form: ${event} in ${location}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p>Someone has contacted TriggerKings about <strong>${event}</strong> in <strong>${location}</strong>.</p>
        
        <h3>Contact Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Event:</strong> ${event}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Message:</strong> ${message || 'No additional message'}</li>
        </ul>
        
        <p><em>Reply to this email to respond directly to ${name}</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Someone has contacted TriggerKings about ${event} in ${location}.
        
        Contact Details:
        Name: ${name}
        Email: ${email}
        Event: ${event}
        Location: ${location}
        Message: ${message || 'No additional message'}
        
        Reply to this email to respond directly to ${name}
      `,
    });

    console.log('Resend response:', result);

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        {
          error: 'Failed to send email: ' + result.error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.data?.id,
      message: 'Message sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
