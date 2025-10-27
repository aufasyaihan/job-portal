"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Banknote, MapPin } from "lucide-react";
import rakamin from "@/assets/rakamin.png";
import { useJob } from "@/contexts/job-context";
import { cn } from "@/lib/utils";
import { Job } from "@/types/job";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const { setSelectedJob, isJobSelected } = useJob();
    const isActive = isJobSelected(job.id);

    const handleClick = () => {
        setSelectedJob(job);
    };

    const salaryRange = job.job_salary_range?.[0];
    const displaySalary = salaryRange?.display_text || "Salary not specified";

    return (
        <Card
            className={cn(
                "w-full gap-2 shadow-none cursor-pointer transition-all hover:border-primary-main",
                isActive && "border-primary-hover bg-primary-surface"
            )}
            onClick={handleClick}
        >
            <CardHeader className="flex flex-row items-start gap-4">
                <div className="relative aspect-square w-1/6 max-w-12 border border-neutal-40 rounded-md overflow-hidden">
                    <Image
                        src={job.companyLogo || rakamin}
                        alt={`${job.company || "Company"} logo`}
                        fill
                        sizes="48px"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <CardTitle className="text-base">{job.title}</CardTitle>
                    <p className="text-sm">{job.company || "Company"}</p>
                </div>
            </CardHeader>
            <hr className="w-full border-dashed border-neutral-40" />
            <CardContent>
                <div className="flex flex-col gap-2">
                        <div className="flex gap-1 items-center">
                            <MapPin className="size-4" />
                            <p className="text-sm">{job.location || "Jakarta Selatan"}</p>
                        </div>
                    <div className="flex gap-1 items-center">
                        <Banknote className="size-4" />
                        <p className="text-sm">{displaySalary}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
