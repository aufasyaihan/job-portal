import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerWithLinkSchema = z.object({
    email: z.string().email("Email tidak valid"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterWithLinkFormData = z.infer<typeof registerWithLinkSchema>;
