import MainHeader from "@/components/navigations/main-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-dvh w-full flex flex-col">
            <MainHeader />
            <div className="flex-1 px-[104px] py-10">{children}</div>
        </main>
    );
}
