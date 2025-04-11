
import { auth, signIn, signOut } from "@/auth"

import AuthenticatedSidebar from "./authed-sidebar"
import UnauthenticatedSidebar from "./unauth-sidebar"

export async function AppSidebar() {
    const session = await auth()
    const user = session?.user

    if (session && user) {
        return <AuthenticatedSidebar user={user} signOut={async () => {
            "use server";
            await signOut({ redirectTo: '/' })
        }} />
    } else {
        return <UnauthenticatedSidebar signIn={async () => {
            "use server";
            await signIn('google');
        }} />
    }
}







