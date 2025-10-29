import { createClient } from "@/lib/supabase/server";

export async function checkAuth() {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
}