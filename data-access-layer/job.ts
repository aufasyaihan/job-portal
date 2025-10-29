import { createClient } from "@/lib/supabase/server";
import { checkAuth } from "./auth";
import { Job } from "@/types/job";

export async function getAllJobs(): Promise<Job[]> {
    try {
        const session = await checkAuth();
        if (!session) {
            throw new Error("Unauthorized");
        }
        const supabase = await createClient();
        const { data: jobs, error } = await supabase.from("jobs").select(`
        id,
        slug,
        title,
        status,
        job_salary_range (
          min_salary,
          max_salary,
          currency,
          display_text
        ),
        job_list_card (
          badge,
          started_on_text,
          cta
        )
      `);
        if (error) throw error;
        return jobs;
    } catch (error) {
        throw error;
    }
}
