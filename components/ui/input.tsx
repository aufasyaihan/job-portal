import { cn } from "@/lib/utils";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    status?: "success" | "error" | "default";
    statusMessage?: React.ReactNode;
}

export function Input({
    className,
    status = "default",
    statusMessage,
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            <input
                className={cn(
                    "border-2 rounded-lg p-2 w-full focus:outline-hidden focus:ring-2 focus:ring-primary-main",
                    status === "error" && "border-red-500 focus:ring-red-500",
                    status === "success" &&
                        "border-neutral-40 focus:ring-primary-main",
                    className
                )}
                {...props}
            />
            {statusMessage && (
                <div
                    className={cn(
                        "text-sm mt-1 flex items-center gap-0.5",
                        status === "success" && "text-green-600",
                        status === "error" && "text-red-600"
                    )}
                >
                    {status === "success" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                        </svg>
                    )}
                    <p>{statusMessage}</p>
                </div>
            )}
        </div>
    );
}
