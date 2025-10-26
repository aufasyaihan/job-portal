import { cn } from "@/lib/utils";

export function Input({
    className,
    ...props
}: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                "border-2 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-main",
                className
            )}
            {...props}
        />
    );
}
