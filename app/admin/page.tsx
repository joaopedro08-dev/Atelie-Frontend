"use client";

import { useAuth } from "@/contexts/auth-context";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { LayoutDashboard, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function PageHome() {
    const { user } = useAuth();

    const getFormattedName = (fullName: string) => {
        if (!fullName) return "Admin";
        const nameParts = fullName.trim().split(/\s+/);
        return nameParts[0];
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 6) return "Boa madrugada";
        if (hour < 12) return "Bom dia";
        if (hour < 18) return "Boa tarde";
        return "Boa noite";
    };

    const getFormattedDate = () => {
        const date = new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
        return date.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()).replace(/ De /g, " de ");
    };

    const formattedRole = user?.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
        : "Admin";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, 
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.div 
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header className="flex flex-col gap-2" variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight text-center sm:text-start">
                    {getGreeting()}, {getFormattedName(user?.name || "")}! 👋
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1 text-sm font-medium">
                        <Calendar className="size-4 text-primary" />
                        {getFormattedDate()}
                    </span>
                    <div className="h-4 w-px bg-border hidden sm:block" />
                    <span className="flex items-center gap-1 text-sm font-medium">
                        <LayoutDashboard className="size-4 text-primary" />
                        Painel de Controle: <span className="text-foreground">{formattedRole}</span>
                    </span>
                </div>
            </motion.header>

            <motion.div 
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                variants={itemVariants}
            >
                <Card className="overflow-hidden relative group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Último Acesso</CardTitle>
                        <Clock className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : "--/--/----"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Seu acesso está protegido pelo sistema.
                        </p>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-primary/20" />
                </Card>
            </motion.div>
        </motion.div>
    );
}