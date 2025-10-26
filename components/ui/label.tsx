import { cn } from "@/lib/utils";

export function Label({
    className,
    ...props
}: { className?: string } & React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={cn("block text-sm font-normal text-neutral-90", className)}
            {...props}
        />
    );
}
