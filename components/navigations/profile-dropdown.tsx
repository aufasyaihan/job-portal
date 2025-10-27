"use client";

import { useAuth } from "@/contexts/auth-context";
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
} from "../ui/dropdown";
import profile from "@/assets/avatar.png";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileDropdown() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="h-6 aspect-square rounded-full bg-gray-200 animate-pulse" />
        );
    }

    if (!user) {
        return null;
    }

    const handleSignOut = async () => {
        await signOut();
        router.push("/auth/login");
    };

    const avatarUrl = user.user_metadata?.avatar_url;

    return (
        <Dropdown>
            <DropdownTrigger asChild>
                <button className="relative h-full aspect-square cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-full border border-neutral-40 overflow-hidden mr-5">
                    <Image
                        src={avatarUrl || profile}
                        alt="profile-image"
                        className="object-cover"
                        fill
                        sizes="48px"
                    />
                </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-56">
                <div className="px-4 py-3">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">
                        {user.user_metadata?.first_name &&
                        user.user_metadata?.last_name
                            ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                            : user.user_metadata?.full_name || "User"}
                    </p>
                </div>
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
