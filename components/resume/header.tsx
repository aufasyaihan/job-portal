"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

export default function ResumeHeader() {
    const router = useRouter();

    return (
        <CardHeader className="flex flex-row items-center gap-4 shrink-0">
            <Button variant="outline" className="p-1 h-fit w-fit" size="icon" type="button" onClick={() => router.back()}>
                <ArrowLeft className="size-4" />
            </Button>
            <CardTitle className="flex text-neutral-100 items-center justify-between w-full">
                Apply Front End at Rakamin
                <span className="text-sm text-neutral-90 font-normal">
                    ℹ️ This field required to fill
                </span>
            </CardTitle>
        </CardHeader>
    );
}
