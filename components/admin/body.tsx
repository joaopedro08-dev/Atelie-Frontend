"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import HeaderNavbar from "./header-navbar";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Template from "@/app/admin/template";

const SIDEBAR_COOKIE_NAME = "sidebar_state";

export default function Body({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const [defaultOpen, setDefaultOpen] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const value = document.cookie
            .split("; ")
            .find(row => row.startsWith(SIDEBAR_COOKIE_NAME + "="))
            ?.split("=")[1];
        setDefaultOpen(value !== undefined ? value === "true" : true)
        setMounted(true)
    }, [])

    if (loading || !mounted) return null;

    return (
        <SidebarProvider defaultOpen={defaultOpen} className="h-full">
            <div className="flex h-full w-full bg-background">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="hidden md:block"
                >
                    <AppSidebar
                        username={user?.name || "Usuário"}
                        role={user?.role || "Admin"}
                    />
                </motion.div>

                <div className="md:hidden">
                    <AppSidebar
                        username={user?.name || "Usuário"}
                        role={user?.role || "Admin"}
                    />
                </div>

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-0 mb-5">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <HeaderNavbar />
                    </motion.div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                        <div className="max-w-full mx-auto">
                            <Template>{children}</Template>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}