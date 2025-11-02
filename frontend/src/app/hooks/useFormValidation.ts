import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useFormValidation<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: DefaultValues<T>
): UseFormReturn<T> & {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
} {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  return {
    ...form,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    isSubmitting: form.formState.isSubmitting,
  };
}

// Common validation schemas
export const validationSchemas = {
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  walletAddress: z.string()
    .min(42, 'Wallet address must be 42 characters')
    .max(42, 'Wallet address must be 42 characters')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum address'),

  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Please enter a valid positive number'),

  url: z.string()
    .url('Please enter a valid URL'),

  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 18 && age <= 120;
    }, 'You must be at least 18 years old'),

  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),

  postalCode: z.string()
    .min(5, 'Postal code must be at least 5 characters')
    .max(10, 'Postal code must be less than 10 characters'),

  country: z.string()
    .min(2, 'Please select a country'),

  terms: z.boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
};

// Form schemas for different use cases
export const formSchemas = {
  login: z.object({
    email: validationSchemas.email,
    password: z.string().min(1, 'Password is required'),
  }),

  register: z.object({
    email: validationSchemas.email,
    password: validationSchemas.password,
    confirmPassword: z.string(),
    name: validationSchemas.name,
    terms: validationSchemas.terms,
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  kyc: z.object({
    email: validationSchemas.email,
    name: validationSchemas.name,
    dateOfBirth: validationSchemas.dateOfBirth,
    phone: validationSchemas.phone,
    address: z.string().min(10, 'Please enter your full address'),
    city: z.string().min(2, 'City is required'),
    postalCode: validationSchemas.postalCode,
    country: validationSchemas.country,
  }),

  deposit: z.object({
    amount: validationSchemas.amount,
    token: z.enum(['ETH', 'USDC', 'MNT'], {
      errorMap: () => ({ message: 'Please select a token' }),
    }),
    vaultId: z.string().min(1, 'Please select a vault'),
  }),

  withdraw: z.object({
    amount: validationSchemas.amount,
    vaultId: z.string().min(1, 'Please select a vault'),
    destinationAddress: validationSchemas.walletAddress,
  }),

  createAsset: z.object({
    name: z.string().min(3, 'Asset name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    valuation: validationSchemas.amount,
    maturityDate: z.string().refine((val) => new Date(val) > new Date(), {
      message: 'Maturity date must be in the future',
    }),
    assetType: z.enum(['invoice', 'real-estate', 'bond'], {
      errorMap: () => ({ message: 'Please select an asset type' }),
    }),
    documentUrl: validationSchemas.url,
  }),

  contact: z.object({
    name: validationSchemas.name,
    email: validationSchemas.email,
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(20, 'Message must be at least 20 characters'),
  }),
};