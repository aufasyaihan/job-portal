import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Job Portal",
    description: "Best way to find your dream job.",
};

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans",
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="w-full h-dvh">
            <body className={`${nunitoSans.className} antialiased w-full h-full`}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
