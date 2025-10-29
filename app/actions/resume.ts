"use server";

import { resumeSchema, type ResumeFormData } from "@/lib/validation/resume";
import { redirect } from "next/navigation";

export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ResumeFormData]?: string[];
    };
    data?: ResumeFormData;
};

export async function submitResume(
    prevState: FormState | null,
    formData: FormData
): Promise<FormState> {
    const rawData = {
        profilePhoto: formData.get("profilePhoto") as string,
        fullName: formData.get("full_name") as string,
        dateOfBirth: formData.get("date_of_birth") as string,
        gender: formData.get("gender") as string,
        domicile: formData.get("domicile") as string,
        phoneNumber: formData.get("phone_number") as string,
        email: formData.get("email") as string,
        linkedIn: formData.get("linkedIn") as string,
    };


    const validatedFields = resumeSchema.safeParse(rawData);

    if (!validatedFields.success) {
        // console.log(
        //     "Validation failed:",
        //     validatedFields.error.flatten().fieldErrors
        // );
        return {
            success: false,
            message: "",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // console.log("Resume submitted:", validatedFields.data);

    redirect("/resume/success");

    return {
        success: true,
        message: "Success",
    }
}
