"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

export function UnathorizedContentPage() {
    const router = useRouter();

    return (
        <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-destructive/6 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-destructive/4 blur-3xl" />
                <div className="absolute top-1/3 right-0 h-48 w-48 rounded-full bg-destructive/3 blur-2xl" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-sm space-y-6 text-center"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
                        className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 ring-2 ring-destructive/20"
                    >
                        <ShieldAlert className="size-9 text-destructive" />
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive ring-2 ring-background">
                            <span className="text-[9px] font-bold text-destructive-foreground">!</span>
                        </span>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight">Acesso Restrito</h1>
                        <span className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-0.5 text-[11px] font-mono font-semibold text-destructive ring-1 ring-destructive/20">
                            401
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        Seu perfil não possui as permissões necessárias para visualizar esta página. Esta tentativa foi registrada pelo sistema.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
                    <Button variant="outline" onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="size-4" />
                        Voltar
                    </Button>
                    <Button onClick={() => router.push("/")} className="gap-2">
                        <Home className="size-4" />
                        Início
                    </Button>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                    Segurança Ateliê • Unauthorized
                </motion.p>
            </motion.div>
        </div>
    );
}