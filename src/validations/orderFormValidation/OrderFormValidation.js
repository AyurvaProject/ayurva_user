import { z } from 'zod';

export const orderFormSchema = z.object({
    order_date: z.date("Order Date is Required"),

    order_time: z.string("Order Time is Required"),

    quantity: z.number().min(1, 'Quantity must be at least 1'),

    order_pharmacy_status: z.string("Order Pharmacy Status is Required"),

    order_delivery_status: z.string("Order Delivery Status is Required"),

    address_id: z.number("Address ID is Required"),

    user_id: z.number("User ID is Required"),

    pharmacist_id: z.number("Pharmacist ID is Required"),

    delivery_person_id: z.number().optional(),

    product_id: z.number("Product ID is Required"),
});