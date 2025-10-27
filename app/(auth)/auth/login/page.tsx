import AuthForm from "@/components/auth-form";
import RakaminIcons from "@/components/icons/rakamin";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function LoginPage() {
    return (
        <>
            <RakaminIcons />
            <Card>
                <CardHeader>
                    <CardTitle>Masuk ke Rakamin</CardTitle>
                    <CardDescription className="text-neutral-100">
                        Belum Punya Akun?{" "}
                        <Link
                            href="/auth/register"
                            className="text-primary-main"
                        >
                            Daftar Menggunakan Email
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm />
                </CardContent>
            </Card>
        </>
    );
}
