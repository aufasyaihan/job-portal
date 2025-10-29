"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema, loginWithLinkSchema } from "@/lib/validation/login";
import { registerSchema } from "@/lib/validation/register";

export type FormState = {
    success?: boolean;
    message?: string;
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
};

export async function login(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = loginSchema.safeParse({
        email,
        password,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    });

    if (error) {
        return {
            success: false,
            message: "Email atau password salah",
        };
    }

    redirect("/");
}

export async function loginWithLink(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = formData.get("email") as string;

    const validatedFields = loginWithLinkSchema.safeParse({
        email,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
        email: validatedFields.data.email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        return {
            success: false,
            message: "Gagal mengirim link login. Silakan coba lagi.",
        };
    }

    redirect(
        `/auth/email-sent?email=${encodeURIComponent(
            validatedFields.data.email
        )}`
    );

    return {
        success: true,
        message: "Link login telah dikirim ke email Anda.",
    }
}

async function isUserRegistered(email: string): Promise<{
    exists: boolean;
    isValid: boolean;
}> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
        return { exists: false, isValid: false };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password: "TempCheckPassword123!@#$%",
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        const errorMessage = error.message.toLowerCase();
        if (
            errorMessage.includes("already") ||
            errorMessage.includes("registered") ||
            errorMessage.includes("exists") ||
            errorMessage.includes("duplicate")
        ) {
            return { exists: true, isValid: true };
        }
    }

    if (
        data?.user &&
        (!data?.user?.identities || data?.user?.identities?.length === 0)
    ) {
        return { exists: true, isValid: true };
    }

    return { exists: false, isValid: true };
}

export async function registerWithLink(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = formData.get("email") as string;

    const validatedFields = loginWithLinkSchema.safeParse({
        email,
    });

    if (!validatedFields.success) {
        console.log(
            "Validation failed:",
            validatedFields.error.flatten().fieldErrors
        );
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const userCheck = await isUserRegistered(validatedFields.data.email);

    if (!userCheck.isValid) {
        return {
            success: false,
            errors: {
                email: ["Alamat email tidak valid"],
            },
        };
    }

    if (userCheck.exists) {
        console.log("Email already registered");
        return {
            success: false,
            message:
                "Email ini sudah terdaftar sebagai akun di Rakamin Academy.",
        };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
        email: validatedFields.data.email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        console.log("Supabase OTP error:", error);
        return {
            success: false,
            message: "Gagal mengirim link registrasi. Silakan coba lagi.",
        };
    }

    redirect(
        `/auth/email-sent?email=${encodeURIComponent(
            validatedFields.data.email
        )}`
    );

    return {
        success: true,
        message: "Link registrasi telah dikirim ke email Anda.",
    };
}

export async function register(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    console.log("Register attempt:", {
        email,
        hasPassword: !!password,
        hasConfirmPassword: !!confirmPassword,
    });

    const validatedFields = registerSchema.safeParse({
        email,
        password,
        confirmPassword,
    });

    if (!validatedFields.success) {
        console.log(
            "Validation failed:",
            validatedFields.error.flatten().fieldErrors
        );
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        const errorMessage = error.message.toLowerCase();
        console.log("Supabase error:", error);

        if (
            errorMessage.includes("already") ||
            errorMessage.includes("registered") ||
            errorMessage.includes("exists") ||
            errorMessage.includes("duplicate")
        ) {
            return {
                success: false,
                message:
                    "Email ini sudah terdaftar sebagai akun di Rakamin Academy.",
            };
        }
        return {
            success: false,
            message: error.message || "Gagal membuat akun. Silakan coba lagi.",
        };
    }

    if (
        data?.user &&
        (!data?.user?.identities || data?.user?.identities?.length === 0)
    ) {
        console.log("Email already exists (empty identities array)");
        return {
            success: false,
            message:
                "Email ini sudah terdaftar sebagai akun di Rakamin Academy.",
        };
    }

    console.log("Registration successful!");
    return {
        success: true,
        message:
            "Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi.",
    };
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
}
