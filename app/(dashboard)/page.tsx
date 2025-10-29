"use client";

import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";

export default function DashboardPage() {
    const { user } = useAuth();

    if (user?.user_metadata.role.name === "user") {
        redirect("/job-list");
    } else if (user?.user_metadata.role.name === "admin") {
        redirect("/admin/jobs");
    }
}
