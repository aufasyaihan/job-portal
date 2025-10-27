import { StaticImageData } from "next/image";

export interface JobSalaryRange {
    currency: string;
    max_salary: number;
    min_salary: number;
    display_text: string;
}

export interface JobListCard {
    cta: string;
    badge: string;
    started_on_text: string;
}

export interface Job {
    id: string;
    slug: string;
    title: string;
    status: string;
    company?: string;
    companyLogo?: string | StaticImageData;
    location?: string;
    job_type?: string;
    description?: string[];
    job_salary_range: JobSalaryRange[];
    job_list_card: JobListCard[];
}

export interface JobDisplay {
    id: string;
    title: string;
    company: string;
    companyLogo: string | StaticImageData;
    location: string;
    salaryMin: number;
    salaryMax: number;
    jobType: string;
    description: string[];
}
