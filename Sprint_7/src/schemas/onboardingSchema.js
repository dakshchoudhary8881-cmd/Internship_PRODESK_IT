import { z } from 'zod';

export const stepOneSchema = z.object({
  name: z
    .string()
    .min(1, 'Full Name is required')
    .min(3, 'Full Name must be at least 3 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full Name must contain only alphabets and spaces'),
  email: z
    .string()
    .min(1, 'Email Address is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone Number is required')
    .regex(/^\d{10}$/, 'Phone Number must be exactly 10 digits'),
  country: z
    .string()
    .min(1, 'Please select your country'),
});

export const stepTwoSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(5, 'Username must be at least 5 characters')
      .regex(/^\S+$/, 'Username cannot contain spaces'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
    role: z
      .string()
      .min(1, 'Please select a role'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
