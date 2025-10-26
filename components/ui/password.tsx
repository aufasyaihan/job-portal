"use client";

import { useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

export default function Password({
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <Input
                type={visible ? "text" : "password"}
                required
                {...props}
                className="w-full"
            />
            <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-100 hover:bg-neutral-30 p-1 rounded"
                onClick={() => setVisible(!visible)}
            >
                {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );
}
