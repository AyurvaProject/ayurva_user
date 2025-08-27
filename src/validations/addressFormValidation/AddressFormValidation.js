import { z } from 'zod';

export const addressFormSchema = z.object({
    address_l1: z.string()
    .min(1, 'Address line 1 is required')
    .max(100, 'Address line 1 must be at most 100 characters'),

    address_l2: z.string()
    .min(1, 'Address line 2 is required')
    .max(100, 'Address line 2 must be at most 100 characters'),

    address_l3: z.string()
    .min(2, 'City is required')
    .max(100, 'City must be at most 100 characters'),

    user_lng: z.number("Longitude is Required"),

    user_lat: z.number("Latitude is Required"),

    address_district: z.string()
    .min(2, 'District is required')
    .max(100, 'District must be at most 100 characters'),

    address_zip_code: z.string()
    .min(2, 'Zip code is required')
    .max(100, 'Zip code must be at most 100 characters'),

    user_id: z.number("User ID is Required"),
});