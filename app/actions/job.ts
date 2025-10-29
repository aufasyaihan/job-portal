"use server";

import { createClient } from "@/lib/supabase/server";
import { jobOpeningSchema } from "@/lib/validation/job-opening";
import { revalidatePath } from "next/cache";

export type JobFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        jobName?: string[];
        jobType?: string[];
        jobDescription?: string[];
        candidatesNeeded?: string[];
        minSalary?: string[];
        maxSalary?: string[];
        profileRequirements?: string[];
    };
};

export async function createJobOpening(
    prevState: JobFormState,
    formData: FormData
): Promise<JobFormState> {
    const rawData = {
        jobName: formData.get("jobName") as string,
        jobType: formData.get("jobType") as string,
        jobDescription: formData.get("jobDescription") as string,
        candidatesNeeded: formData.get("candidatesNeeded") as string,
        minSalary: formData.get("minSalary") as string,
        maxSalary: formData.get("maxSalary") as string,
        profileRequirements: JSON.parse(
            formData.get("profileRequirements") as string
        ),
    };

    const validatedFields = jobOpeningSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { data } = validatedFields;

    try {
        const supabase = await createClient();

        const slug = data.jobName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const { data: job, error: jobError } = await supabase
            .from("jobs")
            .insert({
                slug,
                title: data.jobName,
                status: "active",
            })
            .select("id")
            .single();

        if (jobError) {
            console.error("Job insert error:", jobError);
            throw new Error("Failed to create job");
        }

        const minSalaryValue = parseInt(data.minSalary.replace(/\./g, ""));
        const maxSalaryValue = parseInt(data.maxSalary.replace(/\./g, ""));

        const { error: salaryError } = await supabase
            .from("job_salary_range")
            .insert({
                job_id: job.id,
                min_salary: minSalaryValue,
                max_salary: maxSalaryValue,
                currency: "IDR",
                display_text: `Rp ${data.minSalary} - Rp ${data.maxSalary}`,
            });

        if (salaryError) {
            console.error("Salary insert error:", salaryError);
            await supabase.from("jobs").delete().eq("id", job.id);
            throw new Error("Failed to create salary range");
        }

        const { error: cardError } = await supabase
            .from("job_list_card")
            .insert({
                job_id: job.id,
                badge: "Active",
                started_on_text: `started on ${new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}`,
                cta: "Manage Job",
            });

        if (cardError) {
            console.error("Card insert error:", cardError);
            await supabase.from("job_salary_range").delete().eq("job_id", job.id);
            await supabase.from("jobs").delete().eq("id", job.id);
            throw new Error("Failed to create job card");
        }

        const { data: form, error: formError } = await supabase
            .from("application_forms")
            .insert({
                id: job.id,
            })
            .select("id")
            .single();

        if (formError) {
            console.error("Form insert error:", formError);
            await supabase.from("job_list_card").delete().eq("job_id", job.id);
            await supabase.from("job_salary_range").delete().eq("job_id", job.id);
            await supabase.from("jobs").delete().eq("id", job.id);
            throw new Error("Failed to create application form");
        }

        const { data: section, error: sectionError } = await supabase
            .from("sections")
            .insert({
                form_id: form.id,
                title: "Minimum Profile Information Required",
            })
            .select("id")
            .single();

        if (sectionError) {
            console.error("Section insert error:", sectionError);
            await supabase.from("application_forms").delete().eq("id", form.id);
            await supabase.from("job_list_card").delete().eq("job_id", job.id);
            await supabase.from("job_salary_range").delete().eq("job_id", job.id);
            await supabase.from("jobs").delete().eq("id", job.id);
            throw new Error("Failed to create form section");
        }

        const fields = Object.entries(data.profileRequirements)
            .map(([key, value]) => {
                if (value === "Off") {
                    return {
                        section_id: section.id,
                        key,
                        validation: null,
                    };
                }
                return {
                    section_id: section.id,
                    key,
                    validation: {
                        required: value === "Mandatory",
                    },
                };
            });

        if (fields.length > 0) {
            const { error: fieldError } = await supabase
                .from("fields")
                .insert(fields);

            if (fieldError) {
                console.error("Fields insert error:", fieldError);
                await supabase.from("sections").delete().eq("id", section.id);
                await supabase.from("application_forms").delete().eq("id", form.id);
                await supabase.from("job_list_card").delete().eq("job_id", job.id);
                await supabase.from("job_salary_range").delete().eq("job_id", job.id);
                await supabase.from("jobs").delete().eq("id", job.id);
                throw new Error("Failed to create form fields");
            }
        }

        revalidatePath("/admin/jobs");
        
        return {
            success: true,
            message: "Job opening created successfully!",
        };
    } catch (error) {
        console.error("Create job opening error:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create job opening. Please try again.",
        };
    }
}
