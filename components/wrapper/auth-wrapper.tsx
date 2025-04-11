"use client";

import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import { Spinner } from "../ui/spinner";

interface AuthWrapperProps {
    children: React.ReactNode
    // Access policy determines - "User can access the page only if they..."
    accessPolicy?: 'authenticated' | 'unauthenticated'
    fallbackRoute?: string
}
export default function Auth({
    children,
    accessPolicy = 'authenticated',
    fallbackRoute = '/'
}: AuthWrapperProps) {
    const session = useSession();

    if (session.status === "loading") {
        return <Spinner />
    }

    let canAccess: boolean = false;

    switch (accessPolicy) {
        case 'authenticated':
            canAccess = session.status === "authenticated";
            break;
        case 'unauthenticated':
            canAccess = session.status === "unauthenticated";
            break;
    }

    if (!canAccess) {
        redirect(fallbackRoute, RedirectType.replace);
    }

    return <>{children}</>
}
