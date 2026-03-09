"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    ShieldCheck,
    Activity,
    ArrowUpRight,
    UserCircle
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "Boa madrugada";
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
};

export function AdminHomeContent() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <motion.div className="flex flex-col gap-8" variants={containerVariants} initial="hidden" animate="visible">
            <motion.header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" variants={itemVariants}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight ">
                        {getGreeting()}, {user?.name?.split(" ")[0] || "Admin"}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center capitalize gap-2 text-sm md:text-base">
                        <Calendar className="size-4 text-primary" />
                        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
                <Button onClick={() => router.replace("/admin/settings")} variant="outline" className="gap-2 shadow-sm w-full md:w-auto">
                    <UserCircle className="size-4" />
                    Ver Perfil Completo
                </Button>
            </motion.header>

            <motion.div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" variants={itemVariants}>
                <Card className={`border-l-4 transition-all duration-500 ${user?.statusSystem ? "border-l-primary" : "border-l-destructive"}`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status do Acesso</CardTitle>
                        <div className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user?.statusSystem ? "bg-primary" : "bg-destructive"}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${user?.statusSystem ? "bg-primary" : "bg-destructive"}`}></span>
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
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Privilégio</CardTitle>
                        <Activity className="size-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold truncate">{user?.role ? "Administrador(a)" : "Usuário"}</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">Acesso total das operações</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Membro desde</CardTitle>
                        <Clock className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : "--/--/----"}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">Data de registro no sistema</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Última Sessão</CardTitle>
                        <ArrowUpRight className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : "Hoje"}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase">Sincronizado com a sessão atual</p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div className="grid gap-4 lg:grid-cols-2" variants={itemVariants}>
                <Card className="bg-primary/5 border-dashed border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="size-5 text-primary" />
                            <CardTitle className="text-lg">Segurança do Painel</CardTitle>
                        </div>
                        <CardDescription>
                            Sua conexão está protegida por tokens de rotação automática.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="bg-primary/5 border-dashed border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="size-5 text-primary" />
                            <CardTitle className="text-lg">Resumo Operacional</CardTitle>
                        </div>
                        <CardDescription>
                            Sem alertas críticos. Permissões de {user?.role ? "administrador(a)" : "usuário"} validadas.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </motion.div>
        </motion.div>
    );
}