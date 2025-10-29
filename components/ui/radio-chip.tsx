"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioChipGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("flex items-center gap-2", className)}
            {...props}
            ref={ref}
        />
    );
});
RadioChipGroup.displayName = "RadioChipGroup";

const RadioChipItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
        label: string;
    }
>(({ className, label, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                "border border-gray-300 text-gray-700 hover:bg-gray-50",
                "data-[state=checked]:bg-transparent text-neutral-100 dark:text-white data-[state=checked]:text-primary-main data-[state=checked]:border-primary-main",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-main focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {label}
        </RadioGroupPrimitive.Item>
    );
});
RadioChipItem.displayName = "RadioChipItem";

export { RadioChipGroup, RadioChipItem };
