import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HydrateClient, prefetchChatList } from "@/lib/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solution Tech",
  description: "A platform for innovative tech solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dehydratedState = await prefetchChatList();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HydrateClient state={dehydratedState}>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </HydrateClient>
      </body>
    </html>
  );
}
