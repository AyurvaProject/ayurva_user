import { z } from 'zod';

export const signUpFormValidationSchema = z.object({
    user_name: z.string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

    user_email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters'),

    user_contact: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^[0-9+]+$/, 'Phone number can only contain numbers and +'),

    user_nic_no: z.string()
    .min(10, 'NIC number must be at least 10 digits')
    .max(12, 'NIC number must be at most 12 digits')
    .regex(/^[0-9V]+$/, 'NIC number can only contain numbers and V'),

    password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be at most 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
    confirmPassword: z.string(),

    user_age: z.string()
    .min(1, 'Age must be at least 1')
    .max(3, 'Age must be at most 3')
    .regex(/^[0-9]+$/, 'Age can only contain numbers'),

    user_gender: z.string(),

    ayurva_admin_id: z.number()
    .min(1, 'Admin ID is required'),

    user_profile_pic: z.any().optional()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Profile image is required",
      }
    ),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});