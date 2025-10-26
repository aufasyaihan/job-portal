"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";

export default function UserProfile() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 px-4 py-2">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.email}</span>
                    <span className="text-xs text-muted-foreground">
                        {user.user_metadata?.full_name || "User"}
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="gap-2"
            >
                <LogOut className="h-4 w-4" />
                Keluar
            </Button>
        </div>
    );
}
