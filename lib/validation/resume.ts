import { z } from "zod";

export const resumeSchema = z.object({
    profilePhoto: z.string().min(1, "Required"),
    fullName: z
        .string()
        .min(1, "Required")
        .min(3, "Full name must be at least 3 characters"),
    dateOfBirth: z.string().min(1, "Required"),
    gender: z.enum(["female", "male"], {
        message: "Required",
    }),
    domicile: z.string().min(1, "Required"),
    phoneNumber: z
        .string()
        .min(1, "Required")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    email: z
        .email("Please enter your email in the format: name@example.com")
        .min(1, "Required"),
    linkedIn: z
        .url(
            "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username"
        )
        .min(1, "Required")
        .refine(
            (val) => {
                if (!val || val === "") return true;
                const linkedinRegex =
                    /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/;
                try {
                    new URL(val);
                    return linkedinRegex.test(val);
                } catch {
                    return false;
                }
            },
            {
                message:
                    "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username",
            }
        ),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
