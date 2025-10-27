"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import rakamin from "@/assets/rakamin.png";
import { useJob } from "@/contexts/job-context";

export default function JobDetail() {
    const { selectedJob } = useJob();

    if (!selectedJob) {
        return <div className="flex-1" />;
    }

    return (
        <Card className="flex-1 shadow-none">
            <CardHeader className="flex flex-row items-start gap-4 justify-between border-b border-neutral-40 pb-6">
                <div className="flex flex-row items-start gap-4 flex-1">
                    <div className="relative aspect-square w-1/6 max-w-12 border border-neutal-40 rounded-md overflow-hidden">
                        <Image
                            src={selectedJob.companyLogo || rakamin}
                            alt={`${selectedJob.company || "Company"} logo`}
                            fill
                            sizes="48px"
                        />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <p className="bg-success-main px-2 py-0.5 w-fit text-white rounded-sm text-xs">
                            Full-Time
                        </p>
                        <div className="flex flex-col flex-1">
                            <CardTitle className="text-base">
                                {selectedJob.title}
                            </CardTitle>
                            <p className="text-sm">
                                {selectedJob.company || "Company"}
                            </p>
                        </div>
                    </div>
                </div>
                <Button variant="secondary">Apply</Button>
            </CardHeader>
            <CardContent>
                {selectedJob.description &&
                selectedJob.description.length > 0 ? (
                    <ul className="list-disc pl-4">
                        {selectedJob.description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-neutral-60">
                        No description available for this job.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
