"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarItemsGroup
} from "@/components/ui/sidebar";
import { BookOpenText, Home, LayoutDashboard, Search, Settings, Signpost } from "lucide-react";
import { User } from "next-auth";
import NavUser from "./nav-user";

const namelessMenuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Community",
        url: "community",
        icon: Signpost,
    },
]

// Menu items.
const habbitsMenuItems = [

    {
        title: "Your Habits",
        url: "habits",
        icon: BookOpenText,
    },
    {
        title: "Overview",
        url: "dashboard",
        icon: LayoutDashboard,
    },

]

const personalMenuItems = [
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

interface AuthenticatedSidebarProps {
    user: User,
    signOut: () => void;
}

export default function AuthenticatedSidebar({ user, signOut }: AuthenticatedSidebarProps) {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarItemsGroup label="Application" items={namelessMenuItems} />
                <SidebarItemsGroup label="Habits Zone" items={habbitsMenuItems} />
                <SidebarItemsGroup label="Personal Zone" items={personalMenuItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} signOut={signOut} />
            </SidebarFooter>
        </Sidebar>
    )
}