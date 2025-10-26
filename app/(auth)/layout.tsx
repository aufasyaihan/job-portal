export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col justify-center items-center h-full w-full flex-1">
            <div className="flex flex-col gap-6 justify-start w-full max-w-lg px-4">
                {children}
            </div>
        </main>
    );
}
