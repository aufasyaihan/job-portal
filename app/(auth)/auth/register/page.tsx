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

export default function RegisterPage() {
    return (
        <>
            <RakaminIcons />
            <Card>
                <CardHeader>
                    <CardTitle>Bergabung ke Rakamin</CardTitle>
                    <CardDescription className="text-neutral-100">
                        Sudah Punya Akun?{" "}
                        <Link href="/auth/login" className="text-primary-main">
                            Masuk
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm type="register" />
                </CardContent>
            </Card>
        </>
    );
}
