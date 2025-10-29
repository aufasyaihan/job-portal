"use client";

import { useAuth } from "@/contexts/auth-context";
import ProfileDropdown from "./profile-dropdown";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
    disabled?: boolean;
};

export default function MainHeader({
    breadcrumbs,
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    const { user } = useAuth();
    const isAdmin = user?.user_metadata.role.name === "admin";
    console.log(breadcrumbs);

    return (
        <header className="sticky top-0 z-10 px-[120px] py-3 shadow-xs w-full">
            <nav
                className={cn(
                    "w-full flex items-center",
                    isAdmin ? "justify-between" : "justify-end"
                )}
            >
                {breadcrumbs ? (
                    <div className="flex gap-2 items-center">
                        {breadcrumbs.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center"
                            >
                                {item.href && !item.disabled ? (
                                    <Link href={item.href}>
                                        <Button variant="outline">
                                            {item.label}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        variant="outline"
                                        disabled={item.disabled}
                                        className="disabled:text-neutral-100 disabled:opacity-100 disabled:bg-neutral-30 disabled:border-neutral-50"
                                    >
                                        {item.label}
                                    </Button>
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <ChevronRight />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    isAdmin && <h1 className="font-bold">Job List</h1>
                )}
                <div className="border-l border-neutral-40 w-fit flex justify-end pl-4">
                    <ProfileDropdown />
                </div>
            </nav>
        </header>
    );
}
