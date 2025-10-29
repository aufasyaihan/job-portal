"use client";

import { useAuth } from "@/contexts/auth-context";
import ProfileDropdown from "./profile-dropdown";
import { cn } from "@/lib/utils";

export default function MainHeader() {
    const { user } = useAuth();
    const isAdmin = user?.user_metadata.role.name === "admin";
    return (
        <header className="sticky top-0 z-10 px-[120px] py-3 shadow-xs w-full">
            <nav className={cn("w-full flex items-center", isAdmin ? "justify-between" : "justify-end")}>
                {isAdmin && <h1 className="font-bold">Job List</h1>}
                <div className="border-l border-neutral-40 w-fit flex justify-end pl-4">
                    <ProfileDropdown />
                </div>
            </nav>
        </header>
    );
}
