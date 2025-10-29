"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";
import { CheckCircle, TriangleAlert } from "./icons/validation";
import { cn } from "@/lib/utils";

interface LinkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    className?: string;
}

export default function LinkInput({
    label,
    id,
    className,
    ...props
}: LinkInputProps) {
    const [url, setUrl] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [urlStatus, setUrlStatus] = useState<"valid" | "invalid" | null>(
        null
    );

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
                        urlStatus === "valid"
                            ? "border-success-main focus:border-success-main focus:ring-success-focus"
                            : urlStatus === "invalid"
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
            {urlStatus === "valid" && (
                <p className="flex gap-2 items-center text-xs font-normal text-green-600">
                    <CheckCircle /> URL address found
                </p>
            )}
            {urlStatus === "invalid" && (
                <p className="flex gap-2 items-center text-xs font-normal text-red-600">
                    <TriangleAlert /> URL address not found
                </p>
            )}
        </div>
    );
}
