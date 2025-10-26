import { cn } from "@/lib/utils";

export function Card({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col gap-1", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("text-lg font-bold", className)} {...props}>
            {children}
        </div>
    );
}

export function CardDescription({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardContent({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex flex-col gap-4 text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </div>
    );
}
