import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  country: z.string().min(1, "Country of residence is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const roleSelectionSchema = z.object({
  role: z
    .enum(["curator", "finder"])
    .refine((val) => val, { message: "Please select a role" }),
});

export type RoleSelectionValues = z.infer<typeof roleSelectionSchema>;
