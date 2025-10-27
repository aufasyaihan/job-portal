import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmailSent from "@/components/icons/email-sent";

export default async function EmailSentPage({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>;
}) {
    const email = (await searchParams).email;

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Periksa Email Anda</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-center text-center">
                <p>
                    Kami sudah mengirimkan link register ke{" "}
                    <span className="font-bold">{email}</span> yang berlaku
                    dalam <span className="font-bold">30 menit</span>
                </p>
                <EmailSent />
            </CardContent>
        </Card>
    );
}
