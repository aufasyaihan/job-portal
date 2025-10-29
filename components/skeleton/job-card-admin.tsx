import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
    return (
        <Card>
            <CardContent className="flex flex-col gap-3">
                <div className="flex gap-4">
                    <Skeleton className="h-7 w-20 rounded-md" />
                    <Skeleton className="h-7 w-32 rounded-md" />
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}
