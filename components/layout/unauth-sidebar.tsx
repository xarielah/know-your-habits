"use client";

import { CircuitBoard, MessageCircleQuestion } from "lucide-react";
import { Button } from "../ui/button";
import GoogleIcon from "../ui/google-icon";
import { Sidebar, SidebarContent, SidebarFooter, SidebarItemsGroup } from "../ui/sidebar";

const generalMenuItems = [
    {
        title: "Plans",
        url: "/plans",
        icon: CircuitBoard,
    },
    {
        title: "What is this?",
        url: "/about",
        icon: MessageCircleQuestion,
    }
]

interface UnauthenticatedSidebarProps {
    signIn: () => void;
}

export default function UnauthenticatedSidebar({ signIn }: UnauthenticatedSidebarProps) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarItemsGroup label="General" items={generalMenuItems} />
            </SidebarContent>
            <SidebarFooter className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Button onClick={signIn} variant="ghost" type="submit">
                    <GoogleIcon />
                    Sign in with Google
                </Button>
            </SidebarFooter>
        </Sidebar >
    )
}