"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import HeaderNavbar from "./header-navbar";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SIDEBAR_COOKIE_NAME = "sidebar_state";

const readSidebarCookie = (): boolean => {
    if (typeof document === 'undefined') return true;
    const name = SIDEBAR_COOKIE_NAME + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length) === "true";
    }
    return true;
}

export default function Body({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const [defaultOpen] = useState(() => readSidebarCookie());

    if (loading) return null;

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <div className="flex min-h-screen w-full bg-background">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <AppSidebar
                        username={user?.name || "Usuário"}
                        role={user?.role || "Admin"}
                    />
                </motion.div>

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <HeaderNavbar />
                    </motion.div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="max-w-full mx-auto">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}