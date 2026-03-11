"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    ShieldCheck,
    Activity,
    ArrowUpRight,
    UserCircle,
    Zap,
    Lock,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const initials = user?.name
        ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
        : "A";

    return (
        <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header
                className="relative overflow-hidden rounded-2xl border bg-card"
                variants={itemVariants}
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
                    <div className="absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-primary/4 blur-2xl" />
                    <svg
                        className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold select-none ring-2 ring-primary/20 shadow-sm">
                                {initials}
                            </div>
                            <span
                                className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-card
                                    ${user?.statusSystem ? "bg-emerald-500" : "bg-destructive"}`}
                            >
                                <span
                                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60
                                        ${user?.statusSystem ? "bg-emerald-400" : "bg-destructive"}`}
                                />
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
                                <Calendar className="size-3 text-primary/60" />
                                <span className="capitalize">
                                    {new Date().toLocaleDateString("pt-BR", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </span>
                            </p>

                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                                {getGreeting()},{" "}
                                <span className="text-primary">{user?.name?.split(" ")[0] ?? "Admin"}</span>
                                {" "}{getGreetingEmoji()}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                    <ShieldCheck className="size-3" />
                                    Administrador(a)
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold
                                        ${user?.statusSystem
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "bg-destructive/10 text-destructive"
                                        }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${user?.statusSystem ? "bg-emerald-500" : "bg-destructive"}`}
                                    />
                                    {user?.statusSystem ? "Ativo" : "Inativo"}
                                </span>

                                {user?.email && (
                                    <span className="hidden sm:inline text-[11px] text-muted-foreground">
                                        {user.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => router.replace("/admin/settings")}
                        variant="outline"
                        className="gap-2 shadow-sm w-full md:w-auto shrink-0"
                    >
                        <UserCircle className="size-4" />
                        Ver Perfil Completo
                    </Button>
                </div>
            </motion.header>

            <motion.div
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                variants={itemVariants}
            >
                <Card className={`border-l-4 transition-colors duration-500 ${user?.statusSystem ? "border-l-primary" : "border-l-destructive"}`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Status do Acesso
                        </CardTitle>
                        <div className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user?.statusSystem ? "bg-primary" : "bg-destructive"}`} />
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${user?.statusSystem ? "bg-primary" : "bg-destructive"}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user?.statusSystem ? "Ativo" : "Inativo"}</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase flex items-center gap-1">
                            <ShieldCheck className="size-3" /> Monitoramento em tempo real
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Privilégio
                        </CardTitle>
                        <Activity className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold truncate">
                            {user?.role ? "Administrador(a)" : "Usuário"}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">
                            Acesso total das operações
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Membro desde
                        </CardTitle>
                        <Clock className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user?.createdAt
                                ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                                : "--/--/----"}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">
                            Data de registro no sistema
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Última Sessão
                        </CardTitle>
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user?.lastLogin
                                ? new Date(user.lastLogin).toLocaleDateString("pt-BR")
                                : "Hoje"}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">
                            Sincronizado com a sessão atual
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div className="grid gap-4 lg:grid-cols-2" variants={itemVariants}>
                <Card className="group bg-primary/5 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/8 transition-colors duration-300">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                <Lock className="size-4 text-primary" />
                            </div>
                            <CardTitle className="text-base font-semibold">Segurança do Painel</CardTitle>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                            Sua conexão está protegida por tokens de rotação automática.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="group bg-primary/5 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/8 transition-colors duration-300">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                <Zap className="size-4 text-primary" />
                            </div>
                            <CardTitle className="text-base font-semibold">Resumo Operacional</CardTitle>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                            Sem alertas críticos. Permissões de{" "}
                            {user?.role ? "administrador(a)" : "usuário"} validadas.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </motion.div>
        </motion.div>
    );
}