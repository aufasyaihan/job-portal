import { cn } from "@/lib/utils";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <div className="w-full">
            <input
                className={cn(
                    "border-2 rounded-lg p-2 w-full focus:outline-hidden focus:ring-2 focus:ring-primary-main text-xs font-normal placeholder:text-neutral-60 placeholder:font-normal",
                    className
                )}
                {...props}
            />
        </div>
    );
}
