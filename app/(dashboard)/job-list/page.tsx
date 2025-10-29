import JobCard from "@/components/candidate/job-card";
import JobDetail from "@/components/candidate/job-detail";
import { JobProvider } from "@/contexts/job-context";
import { Suspense } from "react";
import JobCardSkeleton from "@/components/skeleton/job-card";
import EmptyJob from "@/components/empty-job";
import { getAllJobs } from "@/data-access-layer/job";

const getDummyJobDescription = (title: string): string[] => {
    const descriptions: { [key: string]: string[] } = {
        "Frontend Developer": [
            "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.",
            "Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.",
            "Integrate front-end components with APIs and backend services.",
            "Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.",
            "Write clean, reusable, and maintainable code following best practices and coding standards.",
            "Participate in code reviews, contributing to continuous improvement and knowledge sharing.",
            "Troubleshoot and debug issues to improve usability and overall application quality.",
            "Stay updated with emerging front-end technologies and propose innovative solutions.",
            "Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.",
        ],
        "UX Designer": [
            "Design and prototype user interfaces for web and mobile applications.",
            "Conduct user research and usability testing to inform design decisions.",
            "Create wireframes, mockups, and interactive prototypes.",
            "Collaborate with developers to ensure design implementation.",
            "Maintain and evolve the design system and component library.",
            "Present design concepts to stakeholders and incorporate feedback.",
            "Analyze user behavior and metrics to improve user experience.",
        ],
        default: [
            "Execute assigned tasks and responsibilities according to role requirements.",
            "Collaborate with team members to achieve project goals.",
            "Participate in meetings and contribute to team discussions.",
            "Maintain documentation and follow established processes.",
            "Continuously improve skills and stay updated with industry trends.",
        ],
    };

    return descriptions[title] || descriptions.default;
};

async function Jobs() {
    try {
        const jobs = await getAllJobs();

        const jobsWithDescriptions = jobs?.map((job) => ({
            ...job,
            description: getDummyJobDescription(job.title),
            company: "Rakamin",
            location: "Jakarta Selatan",
        }));

        if (jobsWithDescriptions?.length === 0) {
            return (
                <EmptyJob message="Please wait for the next batch of openings." />
            );
        }
        if (jobsWithDescriptions && jobsWithDescriptions.length > 0) {
            return jobsWithDescriptions.map((job) => (
                <JobCard key={job.id} job={job} />
            ));
        }
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return (
            <div className="flex-1 shadow-none flex items-center justify-center h-full">
                <div className="flex flex-col gap-4 text-center">
                    <h3 className="font-bold text-xl text-neutral-90">
                        Failed to load job listings
                    </h3>
                    <p className="text-sm text-neutral-90">
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }
}

export default function JobListPage() {
    return (
        <JobProvider>
            <div className="flex gap-6 h-full">
                <div className="flex flex-col gap-2 w-1/3 h-full pr-[22px] overflow-y-auto">
                    <Suspense fallback={<JobCardSkeleton />}>
                        <Jobs />
                    </Suspense>
                </div>
                <JobDetail />
            </div>
        </JobProvider>
    );
}
