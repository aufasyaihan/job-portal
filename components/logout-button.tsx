"use client"

import { logout } from "@/app/actions/auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
    const handleLogout = async () => {
        await logout();
    };
    return <Button onClick={handleLogout}>Logout</Button>;
}
