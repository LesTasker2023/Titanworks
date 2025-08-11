import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error: Resend types may not be present, but runtime should work
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, event, location, message } = await req.json();
    if (!name || !email || !event || !location) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await resend.emails.send({
      from: "TriggerKings Contact <contact@triggerkings.co.uk>",
      to: ["your@email.com"], // Replace with your real email
      subject: `New Contact: ${event} in ${location}`,
      html: `<strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Event:</strong> ${event}<br/><strong>Location:</strong> ${location}<br/><strong>Message:</strong> ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
