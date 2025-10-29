"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check, TriangleAlert } from "./icons/validation";
import { cn } from "@/lib/utils";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export default function EmailInput({ label, ...props }: EmailInputProps) {
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<
        "success" | "error" | "default"
    >("default");
    const [emailMessage, setEmailMessage] = useState("");

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
    }, [email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2 text-xs font-bold">
            {label && (
                <Label
                    htmlFor={props.id}
                    className="after:content-['*'] gap-0 after:text-danger-main after:font-normal"
                >
                    {label}
                </Label>
            )}
            <Input
                type="email"
                {...props}
                value={email}
                onChange={handleChange}
                className={cn(
                    emailStatus === "error" &&
                        "border-danger-main focus:ring-danger-focus",
                    emailStatus === "success" &&
                        "border-neutral-40 focus:ring-primary-main"
                )}
            />
            {emailMessage && (
                <div
                    className={cn(
                        "text-xs mt-1 flex items-center gap-0.5 font-normal",
                        emailStatus === "success" && "text-success-main",
                        emailStatus === "error" && "text-danger-main"
                    )}
                >
                    {emailStatus === "success" ? <Check /> : <TriangleAlert />}
                    <p>{emailMessage}</p>
                </div>
            )}
        </div>
    );
}
