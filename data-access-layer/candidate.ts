import { createClient } from "@/lib/supabase/server";
import { checkAuth } from "./auth";
import { Candidate } from "@/types/candidate";

export async function getAllCandidates(id: string): Promise<Candidate[]> {
    try {
        const session = await checkAuth();
        if (!session) {
            throw new Error("Unauthorized");
        }
        const supabase = await createClient();
        const { data: candidates, error: candError } = await supabase
            .from("candidates")
            .select(
                `
      id,
      attributes:candidate_attributes (
        key,
        label,
        value,
        "order"
      )
    `
            )
            .eq("job_id", id);
        if (candError) throw candError;
        return candidates;
    } catch (error) {
        throw error;
    }
}
