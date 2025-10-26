"use client";

import { useAuth } from "@/contexts/auth-context";
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
} from "../ui/dropdown";
import ProfileIcon from "../icons/profile-icon";
import { LogOut, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="size-8 rounded-full bg-gray-200 animate-pulse" />
        );
    }

    if (!user) {
        return null;
    }

    const handleSignOut = async () => {
        await signOut();
        router.push("/auth/login");
    };

    return (
        <Dropdown>
            <DropdownTrigger asChild>
                <button className="cursor-pointer hover:opacity-80 transition-opacity h-fit">
                    <ProfileIcon className="size-9" />
                </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-56">
                <div className="px-4 py-3">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">
                        {user.user_metadata?.full_name || "User"}
                    </p>
                </div>
                <DropdownSeparator />
                <DropdownItem
                    onClick={() => router.push("/profile")}
                    className="gap-2"
                >
                    <User className="size-4" />
                    <span>Profile</span>
                </DropdownItem>
                <DropdownItem
                    onClick={() => router.push("/settings")}
                    className="gap-2"
                >
                    <Settings className="size-4" />
                    <span>Pengaturan</span>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                    onClick={handleSignOut}
                    className="gap-2 text-red-600 hover:bg-red-50"
                >
                    <LogOut className="size-4" />
                    <span>Keluar</span>
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    );
}
