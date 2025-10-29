"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check, TriangleAlert } from "./icons/validation";
import { cn } from "@/lib/utils";

interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label: string;
    id: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export default function EmailInput({ label, value: propValue, onChange, error, ...props }: EmailInputProps) {
    const [email, setEmail] = useState(propValue || "");
    const [emailStatus, setEmailStatus] = useState<
        "success" | "error" | "default"
    >("default");
    const [emailMessage, setEmailMessage] = useState("");
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (propValue !== email) {
            setEmail(propValue || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propValue]);

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
        const newValue = e.target.value;
        setEmail(newValue);
        onChange?.(newValue);
        setHasInteracted(true);
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
                    error && !hasInteracted && "border-danger-main focus:ring-danger-main",
                    (hasInteracted || !error) && emailStatus === "error" &&
                        "border-danger-main focus:ring-danger-focus",
                    (hasInteracted || !error) && emailStatus === "success" &&
                        "border-neutral-40 focus:ring-primary-main"
                )}
            />
            {error && !hasInteracted ? (
                <p className="text-danger-main text-xs font-normal">{error}</p>
            ) : emailMessage && (
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
