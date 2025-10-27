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

interface AuthFormProps {
    type?: "login" | "register";
}

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
    const [emailStatus, setEmailStatus] = useState<"success" | "error" | "default">("default");
    const [emailMessage, setEmailMessage] = useState("");

    useEffect(() => {
        if (state?.message || state?.errors) {
            console.log("Form state updated:", {
                success: state?.success,
                message: state?.message,
                errors: state?.errors
            });
        }
    }, [state]);

    useEffect(() => {
        if (type !== "register" || !email) {
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
                {state?.message && !state?.success && (
                    <>
                        {state.message.includes("sudah terdaftar") ? (
                            <Error 
                                message={
                                    <span>
                                        {state.message}{" "}
                                        <Link href="/auth/login" className="text-danger-main font-bold">
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
                        status={type === "register" ? emailStatus : "default"}
                        statusMessage={type === "register" ? emailMessage : undefined}
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
