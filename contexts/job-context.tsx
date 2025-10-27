"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Job } from "@/types/job";

interface JobContextType {
    selectedJob: Job | null;
    setSelectedJob: (job: Job | null) => void;
    isJobSelected: (jobId: string) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const isJobSelected = (jobId: string) => {
        return selectedJob?.id === jobId;
    };

    return (
        <JobContext.Provider
            value={{
                selectedJob,
                setSelectedJob,
                isJobSelected,
            }}
        >
            {children}
        </JobContext.Provider>
    );
}

export function useJob() {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error("useJob must be used within a JobProvider");
    }
    return context;
}
