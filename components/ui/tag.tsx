import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                "green-outline":
                    "border border-success-border text-success-main bg-successs-surface",
                "green-solid": "bg-success-main text-white border-none",

                "red-outline":
                    "border border-danger-border text-danger-main bg-danger-surface",
                "red-solid": "bg-danger-main text-white border-none",

                "yellow-outline":
                    "border border-secondary-border text-secondary-main bg-secondary-surface",
                "yellow-solid": "bg-secondary-main text-neutral-90 border-none",

                "gray-outline":
                    "border border-neutral-40 text-neutral-90 bg-transparent",
                "gray-solid": "bg-neutral-600 text-white border-none",
            },
            size: {
                default: "h-7 px-3 py-1",
                sm: "h-6 px-2 py-0.5 text-xs",
                lg: "h-8 px-4 py-1.5 text-base",
            },
        },
        defaultVariants: {
            variant: "green-outline",
            size: "default",
        },
    }
);

interface TagProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, children, ...props }: TagProps) {
    return (
        <span
            data-slot="tag"
            className={cn(tagVariants({ variant, size, className }))}
            {...props}
        >
            {children}
        </span>
    );
}

export { Tag, tagVariants };
export type { TagProps };
