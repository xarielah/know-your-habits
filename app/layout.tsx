import { auth } from "@/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Open_Sans } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habit | Take Control of Your Future",
  description: "Habits.com is a platform where users can list, visualize, and track their daily habits and potentially understand the reasons why their goals are not being met.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="flex-[1]">
              <SidebarTrigger className="m-2" />
              {children}
            </main>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
