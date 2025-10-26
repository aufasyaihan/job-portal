import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const loginWithLinkSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginWithLinkFormData = z.infer<typeof loginWithLinkSchema>;
