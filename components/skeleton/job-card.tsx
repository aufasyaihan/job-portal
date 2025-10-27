import { Card, CardContent, CardHeader } from "../ui/card";
import { Banknote, MapPin } from "lucide-react";

export default function JobCardSkeleton() {
    return (
        <Card className="w-full gap-2 shadow-none animate-pulse">
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="relative aspect-square w-1/6 max-w-12 border border-neutral-40 rounded-md overflow-hidden bg-neutral-30" />
                <div className="flex flex-col flex-1 gap-2">
                    <div className="h-5 bg-neutral-30 rounded w-3/4" />
                    <div className="h-4 bg-neutral-30 rounded w-1/2" />
                </div>
            </CardHeader>
            <hr className="w-full border-dashed border-neutral-40" />
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <MapPin className="size-4 text-neutral-40" />
                        <div className="h-4 bg-neutral-30 rounded w-32" />
                    </div>

                    <div className="flex gap-1 items-center">
                        <Banknote className="size-4 text-neutral-40" />
                        <div className="h-4 bg-neutral-30 rounded w-40" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
