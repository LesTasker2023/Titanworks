'use server';
import { revalidatePath } from 'next/cache';
// Simple validation without external dependencies
function validateContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}) {
  const errors: string[] = [];
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.subject?.trim()) errors.push('Subject is required');
  if (!data.message?.trim() || data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  }
  return errors;
}
export async function submitContactForm(
  prevState: { success: boolean; errors: string[]; message: string },
  formData: FormData
): Promise<{ success: boolean; errors: string[]; message: string }> {
  const rawData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    newsletter: formData.get('newsletter') === 'on',
  };
  const errors = validateContactForm(rawData);
  if (errors.length > 0) {
    return { success: false, errors, message: '' };
  }
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Your email service integration here
  // Removed console statement:
  revalidatePath('/component-showcase');
  return { success: true, message: 'Message sent successfully!', errors: [] };
}
