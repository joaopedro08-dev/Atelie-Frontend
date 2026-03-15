"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { User, ShieldCheckIcon, Keyboard } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ProfileAdmin } from "./settings/profile-admin";
import { ChangePassword } from "./settings/change-password";
import { AccessibilitySystem } from "./settings/accessibility-system";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 18 } },
};

type TabId = "profile" | "security" | "accessibility";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Perfil", icon: <User className="size-4" /> },
    { id: "security", label: "Segurança", icon: <ShieldCheckIcon className="size-4" /> },
    { id: "accessibility", label: "Acessibilidade", icon: <Keyboard className="size-4" /> },
];

export function SettingsPageContent() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<TabId>("profile");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.header variants={itemVariants} className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie sua conta e segurança de acesso.
                    </p>
                </div>

                <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1
                    ${user?.statusSystem
                        ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20"
                        : "bg-muted text-muted-foreground ring-border"
                    }`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${user?.statusSystem ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
                    {user?.statusSystem ? "Online" : "Offline"}
                </span>
            </motion.header>

            <motion.div variants={itemVariants} className="flex gap-1 rounded-xl border bg-card p-1 w-full sm:w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 sm:flex-none flex justify-center items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors
                ${activeTab === tab.id
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/20"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                    <ProfileAdmin />
                )}

                {activeTab === "security" && (
                    <ChangePassword />
                )}

                {activeTab === "accessibility" && (
                    <AccessibilitySystem />
                )}
            </AnimatePresence>
        </motion.div>
    );
}