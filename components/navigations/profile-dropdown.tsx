"use client";

import { useAuth } from "@/contexts/auth-context";
import profile from "@/assets/avatar.png";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileDropdown() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <div className="h-8 aspect-square rounded-full bg-gray-200 animate-pulse" />
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage
                        src={avatarUrl || profile.src}
                        alt="profile-image"
                        className="object-cover border-2 border-neutral-40"
                    />
                    <AvatarFallback>RK</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-gray-500">
                        {user.user_metadata?.first_name &&
                        user.user_metadata?.last_name
                            ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                            : user.user_metadata?.full_name || "User"}
                    </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    variant="destructive"
                    className="cursor-pointer"
                >
                    <LogOut className="size-4 text-danger-main" />
                    <span>Keluar</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
