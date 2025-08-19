'use client';

import { submitContactForm } from '@/app/actions/contact';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { toast } from '@/components/ui/Toast';
import { useActionState, useEffect } from 'react';

const initialState = {
  success: false,
  message: '',
  errors: [] as string[],
};

export function EnhancedContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
        variant: 'default',
      });
    } else if (state.errors?.length > 0) {
      toast({
        title: 'Validation Error',
        description: state.errors.join(', '),
        variant: 'error',
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="John" required disabled={isPending} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" required disabled={isPending} />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select name="subject" required disabled={isPending}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="support">Technical Support</SelectItem>
            <SelectItem value="billing">Billing Question</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message here..."
          required
          disabled={isPending}
          minLength={10}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" name="newsletter" disabled={isPending} />
        <Label htmlFor="newsletter" className="text-sm">
          Subscribe to newsletter
        </Label>
      </div>

      <Button type="submit" className="w-full" loading={isPending} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
