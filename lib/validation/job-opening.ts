import { z } from "zod";

export const jobOpeningSchema = z
    .object({
        jobName: z.string().min(1, "Job name is required"),
        jobType: z.string().min(1, "Job type is required"),
        jobDescription: z.string().min(1, "Job description is required"),
        candidatesNeeded: z.string().min(1, "Number of candidates is required"),
        minSalary: z.string().min(1, "Minimum salary is required"),
        maxSalary: z.string().min(1, "Maximum salary is required"),
        profileRequirements: z.record(
            z.string(),
            z.enum(["Mandatory", "Optional", "Off"])
        ),
    })
    .refine(
        (data) => {
            // Remove dots from formatted currency to compare numeric values
            const minValue = parseInt(data.minSalary.replace(/\./g, ""));
            const maxValue = parseInt(data.maxSalary.replace(/\./g, ""));
            return maxValue >= minValue;
        },
        {
            message: "Maximum salary must be greater than or equal to minimum salary",
            path: ["maxSalary"],
        }
    );

export type JobOpeningFormData = z.infer<typeof jobOpeningSchema>;
