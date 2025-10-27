"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Password from "./ui/password";
import { Button } from "./ui/button";
import { KeyRound, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState, useActionState, useEffect } from "react";
import {
    login,
    loginWithLink,
    register,
    registerWithLink,
} from "@/app/actions/auth";
import Error from "./error";
import { useSearchParams } from "next/navigation";

interface AuthFormProps {
    type?: "login" | "register";
}

const getErrorMessage = (
    errorCode: string | null
): React.JSX.Element | null => {
    if (!errorCode) return null;

    switch (errorCode) {
        case "expired_link":
            return (
                <p>
                    Link <span className="font-bold">sudah kadaluarsa</span>,
                    silahkan login kembali
                </p>
            );
        case "callback_error":
            return (
                <p>
                    Terjadi kesalahan saat memproses link. Silahkan coba lagi.
                </p>
            );
        default:
            return null;
    }
};

export default function AuthForm({ type = "login" }: AuthFormProps) {
    const [method, setMethod] = useState<"link" | "password">("password");
    const [state, formAction, isPending] = useActionState(
        type === "login"
            ? method === "password"
                ? login
                : loginWithLink
            : method === "password"
            ? register
            : registerWithLink,
        {}
    );

    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<
        "success" | "error" | "default"
    >("default");
    const [emailMessage, setEmailMessage] = useState("");
    const searchParams = useSearchParams();
    const [urlError, setUrlError] = useState<string | null>(null);

    // Check for errors in both query params and hash
    useEffect(() => {
        // Check query params first
        const errorFromQuery = searchParams.get("error");

        if (errorFromQuery) {
            setUrlError(errorFromQuery);
            return;
        }

        if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash.substring(1);
            const hashParams = new URLSearchParams(hash);

            const error = hashParams.get("error");
            const errorCode = hashParams.get("error_code");
            const errorDescription = hashParams.get("error_description");

            if (
                errorCode === "otp_expired" ||
                error === "access_denied" ||
                errorDescription?.toLowerCase().includes("expired") ||
                errorDescription?.toLowerCase().includes("invalid")
            ) {
                setUrlError("expired_link");
                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname + window.location.search
                );
            } else if (error) {
                setUrlError("callback_error");
                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname + window.location.search
                );
            }
        }
    }, [searchParams]);

    const urlErrorMessage = getErrorMessage(urlError);

    useEffect(() => {
        if (state?.message || state?.errors) {
            console.log("Form state updated:", {
                success: state?.success,
                message: state?.message,
                errors: state?.errors,
            });
        }
    }, [state]);

    useEffect(() => {
        if (!email) {
            setEmailStatus("default");
            setEmailMessage("");
            return;
        }

        const timeoutId = setTimeout(() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(email);

            if (!isValid) {
                setEmailStatus("error");
                setEmailMessage("Alamat email tidak valid");
            } else {
                setEmailStatus("success");
                setEmailMessage("Alamat email teridentifikasi");
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [email, type]);

    const handleToggleMethod = () => {
        setMethod((prev) => (prev === "password" ? "link" : "password"));
    };

    return (
        <form action={formAction}>
            <div className="flex flex-col gap-4">
                {urlErrorMessage && <Error message={urlErrorMessage} />}

                {state?.message && !state?.success && (
                    <>
                        {state.message.includes("sudah terdaftar") ? (
                            <Error
                                message={
                                    <span>
                                        {state.message}{" "}
                                        <Link
                                            href="/auth/login"
                                            className="text-danger-main font-bold"
                                        >
                                            Masuk
                                        </Link>
                                    </span>
                                }
                            />
                        ) : (
                            <Error message={state.message} />
                        )}
                    </>
                )}

                {state?.success && state?.message && (
                    <Error message={state.message} />
                )}

                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={isPending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        status={emailStatus}
                        statusMessage={emailMessage}
                    />
                    {state?.errors?.email && (
                        <p className="text-sm text-red-600">
                            {state.errors.email[0]}
                        </p>
                    )}
                </div>

                {method === "password" && (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-sm">
                                Password
                            </Label>
                            <Password
                                id="password"
                                name="password"
                                required
                                disabled={isPending}
                            />
                            {state?.errors?.password && (
                                <p className="text-sm text-red-600">
                                    {state.errors.password[0]}
                                </p>
                            )}
                        </div>

                        {type === "login" && (
                            <Link
                                href="/forgot-password"
                                className="text-sm w-full text-primary-main text-right"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </>
                )}

                <Button
                    variant="secondary"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {isPending
                        ? "Loading..."
                        : type === "login"
                        ? "Masuk"
                        : "Daftar"}
                </Button>

                <div className="flex items-center gap-2">
                    <hr className="w-full border-neutral-60" />
                    <span className="text-center text-sm text-neutral-60">
                        or
                    </span>
                    <hr className="w-full border-neutral-60" />
                </div>

                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleToggleMethod}
                    disabled={isPending}
                >
                    {method === "password" ? (
                        <Mail className="size-5" />
                    ) : (
                        <KeyRound className="size-5" />
                    )}
                    <span className="truncate">
                        {method === "password"
                            ? "Kirim link login melalui email"
                            : "Masuk dengan kata sandi"}
                    </span>
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isPending}
                >
                    <FcGoogle className="size-5" />
                    <span className="truncate">Masuk dengan Google</span>
                </Button>
            </div>
        </form>
    );
}
