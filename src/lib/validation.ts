import { z } from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (at least 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+ -]{10,15}$/, 'Please enter a valid phone number'),
  addressLine1: z.string().min(5, 'Street address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State / Province is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
});

export const consultationBookingSchema = z.object({
  customerName: z.string().min(2, 'Your name is required'),
  customerEmail: z.string().email('Valid email is required'),
  date: z.string().min(1, 'Please select a date'),
  timeSlot: z.string().min(1, 'Please select an available time slot'),
  topic: z.string().min(5, 'Please specify the consultation topic'),
  brief: z.string().min(10, 'Please provide a short brief for the artisan (at least 10 characters)'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to receive craft stories' }),
  }),
});

export const customDesignPromptSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters describing your idea'),
  artisanId: z.string().min(1, 'Please select an artisan'),
});
