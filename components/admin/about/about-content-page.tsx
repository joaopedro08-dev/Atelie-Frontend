"use client";

import { motion } from "framer-motion";
import { Code2, Shield, Layers, Globe, Lock, Server, Cpu, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FooterSupport } from "./about-system/footer-support";
import { StackInfo } from "./about-system/stack-info";
import { ProjectInfo } from "./about-system/project-info";
import { SecurityInfo } from "./about-system/security-info";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 18
        }
    },
};

const stack = [
    { category: "Frontend", icon: <Globe className="size-4" />, color: "text-blue-400", items: ["Next.js 16", "TypeScript", "Tailwind CSS"] },
    { category: "Componentes", icon: <Layers className="size-4" />, color: "text-violet-400", items: ["Shadcn/UI", "Framer Motion"] },
    { category: "Backend", icon: <Server className="size-4" />, color: "text-emerald-400", items: ["Java", "Spring Boot", "Microserviços"] },
    { category: "API", icon: <Code2 className="size-4" />, color: "text-orange-400", items: ["GraphQL"] },
    { category: "Plataforma", icon: <Cpu className="size-4" />, color: "text-pink-400", items: ["Next.js (Web)", "Tauri (Desktop)"] },
];

const security = [
    { icon: <Lock className="size-4 text-primary" />, title: "Autenticação JWT", desc: "Tokens com sistema de Silent Refresh automático" },
    { icon: <Shield className="size-4 text-primary" />, title: "SSL/TLS", desc: "Tráfego de dados 100% criptografado" },
    { icon: <CheckCircle2 className="size-4 text-primary" />, title: "Controle de Acesso", desc: "Roles ADMIN/USER com revogação de tokens" },
];

export function AboutContentPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <motion.div variants={item} className="space-y-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sobre o Sistema</h1>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/5 gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                        Operacional
                    </Badge>
                </div>
                <p className="text-muted-foreground text-sm">Ateliê — Gestão Inteligente v1.0.5-stable</p>
            </motion.div>

            <Separator />

            <motion.div variants={item}>
                <ProjectInfo />
            </motion.div>

            <motion.div variants={item}>
                <StackInfo stack={stack} />
            </motion.div>

            <motion.div variants={item}>
                <SecurityInfo security={security} />
            </motion.div>

            <motion.div variants={item}>
                <FooterSupport />
            </motion.div>
        </motion.div>
    );
}