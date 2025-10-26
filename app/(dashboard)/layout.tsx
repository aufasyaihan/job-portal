import MainHeader from "@/components/navigations/main-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <MainHeader />
            {children}
        </main>
    );
}
