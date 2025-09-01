import { z } from 'zod';

export const profileUpdateFormValidationSchema = z.object({
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

    user_age: z.number()
    .min(1, 'Age must be at least 1')
    .max(100, 'Age must be at most 100'),

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
});