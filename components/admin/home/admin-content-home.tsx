"use client";

import { useAuth } from "@/contexts/auth-context";
import { motion, Variants } from "framer-motion";
import { StatusSystem } from "./home-info/status-system";
import { CardsSystem } from "./home-info/cards-system";
import { HeaderHome } from "./home-info/header-home";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 90, damping: 18 },
    },
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "Boa madrugada";
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
};

const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "🌙";
    if (hour < 12) return "☀️";
    if (hour < 18) return "👋";
    return "🌆";
};

export function AdminHomeContent() {
    const { user } = useAuth();

    const initials = user?.name
        ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
        : "A";

    return (
        <motion.div className="flex flex-col gap-6" variants={containerVariants} initial="hidden" animate="visible">
            <HeaderHome initials={initials} user={user} getGreeting={getGreeting} getGreetingEmoji={getGreetingEmoji} itemVariants={itemVariants} />
            <CardsSystem itemVariants={itemVariants} user={user} />
            <StatusSystem itemVariants={itemVariants} user={user} />
        </motion.div>
    );
}