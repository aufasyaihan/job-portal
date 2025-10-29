import EmptyJob from "@/components/empty-job";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { JobOpeningDialog } from "@/components/admin/job-opening-dialog";
import { Tag } from "@/components/ui/tag";
import { getAllJobs } from "@/data-access-layer/job";
import { Suspense } from "react";
import { JobCardSkeleton } from "@/components/skeleton/job-card-admin";

async function Jobs() {
    try {
        const jobs = await getAllJobs();

        if (jobs.length === 0) {
            return (
                <EmptyJob
                    message="Create a job opening now and start the candidate process."
                    renderContent={
                        <JobOpeningDialog>
                            <Button variant="secondary" className="w-fit">
                                Create a new job
                            </Button>
                        </JobOpeningDialog>
                    }
                />
            );
        }

        return jobs.map((job) => (
            <Card key={job.id}>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        <Tag variant="green-outline">{job.job_list_card[0].badge}</Tag>
                        <Tag variant="gray-outline">
                            {job.job_list_card[0].started_on_text}
                        </Tag>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-lg text-neutral-100">
                                {job.title}
                            </h3>
                            <p className="text-neutral-80 text-lg">
                                {job.job_salary_range[0].display_text}
                            </p>
                        </div>
                        <Button variant="primary">{job.job_list_card[0].cta}</Button>
                    </div>
                </CardContent>
            </Card>
        ));
    } catch (error) {
        throw error;
    }
}

export default function JobsPage() {
    return (
        <div className="flex gap-6">
            <div className="flex flex-col gap-4 flex-1">
                <div className="relative h-fit">
                    <Input placeholder="Search jobs..." />
                    <Search className="text-primary-main absolute top-1/6 right-3" />
                </div>
                <div className="flex-1 flex flex-col gap-2 h-full overflow-y-auto">
                    <Suspense
                        fallback={
                            <>
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                                <JobCardSkeleton />
                            </>
                        }
                    >
                        <Jobs />
                    </Suspense>
                </div>
            </div>
            <div className="w-1/4">
                <Card className="bg-[url('/assets/bg-image.jpg')] bg-cover relative overflow-hidden after:absolute after:inset-0 after:bg-black after:opacity-72">
                    <CardHeader className="z-[1]">
                        <CardTitle className="text-neutral-40">
                            Recruit the best candidates
                        </CardTitle>
                        <CardDescription className="text-neutral-10">
                            Create jobs, invite, and hire with ease
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="z-[1]">
                        <JobOpeningDialog>
                            <Button variant="primary" className="w-full">
                                Create a new job
                            </Button>
                        </JobOpeningDialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
