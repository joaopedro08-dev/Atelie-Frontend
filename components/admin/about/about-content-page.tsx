"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Shield,
    Layers,
    Globe,
    Mail,
    Lock,
    Server,
    Cpu,
    GitBranch,
    CheckCircle2,
    ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <GitBranch className="size-4 text-primary" />
                            O Projeto
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Nome</p>
                                <p className="font-medium text-foreground">Ateliê — Gestão Inteligente</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Versão</p>
                                <p className="font-mono font-medium text-primary">1.0.5-stable</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Desenvolvedor</p>
                                <p className="font-medium text-foreground">João Pedro Dala Dea Mello</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Plataforma</p>
                                <div className="flex items-center gap-1.5">
                                    <Badge variant="secondary" className="text-xs">Desktop</Badge>
                                    <Badge variant="secondary" className="text-xs">Web</Badge>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <p className="text-muted-foreground leading-relaxed">
                            Uma plataforma integrada de alta performance para gestão de pedidos, clientes e usuários.
                            Focada em segurança de dados e experiência do usuário, o Ateliê centraliza processos
                            complexos em uma interface intuitiva e rápida.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Code2 className="size-4 text-primary" />
                            Stack Tecnológica
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {stack.map((s) => (
                                <div key={s.category} className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-2">
                                    <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${s.color}`}>
                                        {s.icon}
                                        {s.category}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {s.items.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs font-normal border-border/40">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="size-4 text-primary" />
                            Segurança e Privacidade
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {security.map((s) => (
                                <div key={s.title} className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        {s.icon}
                                        <span className="text-sm font-medium text-foreground">{s.title}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div variants={item}>
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <ExternalLink className="size-4 text-primary" />
                            Links e Suporte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm">
                                <GitBranch className="size-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Repositório</span>
                            </div>
                            <Badge variant="outline" className="text-xs font-normal">Privado</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="size-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Suporte Técnico</span>
                            </div>
                            <span className="text-xs font-mono text-primary">joao.p.mello.dev@gmail.com</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}