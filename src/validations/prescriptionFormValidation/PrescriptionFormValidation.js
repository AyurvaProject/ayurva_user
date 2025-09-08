import { z } from 'zod';

export const prescriptionFormSchema = z.object({
    pres_description: z.string().optional(),

    pres_uploaded_date: z.date("Upload Date is Required"),

    pres_uploaded_time: z.string("Upload Time is Required"),

    pres_active_status: z.boolean("Active Status is Required"),

    pr_id: z.number().optional(),

    user_id: z.number("User ID is Required"),

    pres_status: z.string("Prescription Status is Required"),

    pres_img_01: z.any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Prescription image is required",
      }
    ),

    pres_img_02: z
    .any()
    .optional()
})