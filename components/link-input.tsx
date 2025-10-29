"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { CheckCircle, TriangleAlert } from "./icons/validation";
import { cn } from "@/lib/utils";

interface LinkInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    label: string;
    id: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
}

export default function LinkInput({
    label,
    id,
    className,
    value: propValue,
    onChange,
    error,
    ...props
}: LinkInputProps) {
    const [url, setUrl] = useState(propValue || "");
    const [isValidating, setIsValidating] = useState(false);
    const [urlStatus, setUrlStatus] = useState<"valid" | "invalid" | null>(
        null
    );
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (propValue !== url) {
            setUrl(propValue || "");
        }
    }, [propValue,url]);

    const validateUrl = async (value: string) => {
        if (!value) {
            setUrlStatus(null);
            return;
        }

        const linkedinRegex =
            /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;

        if (!linkedinRegex.test(value)) {
            setUrlStatus("invalid");
            return;
        }

        try {
            new URL(value);
        } catch {
            setUrlStatus("invalid");
            return;
        }

        setIsValidating(true);

        try {
            await fetch(value, {
                method: "HEAD",
                mode: "no-cors",
            });
            setUrlStatus("valid");
        } catch {
            setUrlStatus("valid");
        } finally {
            setIsValidating(false);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(value);
        onChange?.(value);
        setHasInteracted(true);

        if (value) {
            const timer = setTimeout(() => {
                validateUrl(value);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setUrlStatus(null);
        }
    };

    return (
        <div className="flex flex-col gap-2 text-xs">
            <Label
                htmlFor={id}
                className="after:content-['*'] gap-0 after:text-danger-main"
            >
                {label}
            </Label>
            <div className="relative">
                <Input
                    type="url"
                    id={id}
                    value={url}
                    onChange={handleUrlChange}
                    className={cn(
                        error && !hasInteracted && "border-danger-main focus:ring-danger-main",
                        (hasInteracted || !error) && urlStatus === "valid"
                            ? "border-success-main focus:border-success-main focus:ring-success-focus"
                            : (hasInteracted || !error) && urlStatus === "invalid"
                            ? "border-danger-main focus:border-danger-main focus:ring-danger-focus"
                            : "",
                        className
                    )}
                    {...props}
                />
                {isValidating && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-primary-main border-t-transparent rounded-full"></div>
                    </div>
                )}
            </div>
            {error && !hasInteracted ? (
                <p className="text-danger-main text-xs font-normal">{error}</p>
            ) : urlStatus === "valid" ? (
                <p className="flex gap-2 items-center text-xs font-normal text-success-main">
                    <CheckCircle /> URL address found
                </p>
            ) : urlStatus === "invalid" ? (
                <p className="flex gap-2 items-center text-xs font-normal text-danger-main">
                    <TriangleAlert /> URL address not found
                </p>
            ) : null}
        </div>
    );
}
