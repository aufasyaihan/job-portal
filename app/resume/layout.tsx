export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-dvh w-full flex flex-col">
            <div className="flex-1 mx-auto py-[50px] w-1/2 flex flex-col">{children}</div>
        </main>
    );
}
