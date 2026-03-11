"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Database, Lock, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

const MONTH_NAMES: Record<number, string> = {
    0: "Janeiro", 1: "Fevereiro", 2: "Março", 3: "Abril",
    4: "Maio", 5: "Junho", 6: "Julho", 7: "Agosto",
    8: "Setembro", 9: "Outubro", 10: "Novembro", 11: "Dezembro",
};

const ITEMS = [
    {
        value: "item-1",
        icon: <Database className="size-4 text-primary shrink-0" />,
        title: "1. Coleta de Dados",
        content: "Coletamos seu nome e e-mail exclusivamente para fins de identificação e comunicação dentro da plataforma Ateliê. Nenhum dado sensível é coletado além do estritamente necessário para o funcionamento do serviço.",
    },
    {
        value: "item-2",
        icon: <Lock className="size-4 text-primary shrink-0" />,
        title: "2. Proteção de Dados",
        content: "Utilizamos criptografia de ponta a ponta e as melhores práticas de segurança da informação para garantir que seus dados estejam protegidos. Nenhuma informação é compartilhada ou vendida a terceiros não autorizados.",
    },
    {
        value: "item-3",
        icon: <BadgeCheck className="size-4 text-primary shrink-0" />,
        title: "3. Seus Direitos (LGPD)",
        content: "De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato com o suporte da plataforma.",
    },
];

export default function PrivacyPage() {
    const date = new Date();
    const formattedDate = `${date.getDate()} de ${MONTH_NAMES[date.getMonth()]} de ${date.getFullYear()}`;
    const router = useRouter();

    return (
        <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-background px-4 py-16">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/4 blur-3xl" />
                <svg className="absolute inset-0 h-full w-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
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
                className="relative w-full max-w-2xl space-y-6"
            >
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2">
                            <ArrowLeft className="size-4" /> Voltar
                        </Button>
                    <Badge variant="secondary" className="text-[11px] font-medium">
                        Versão 1.0
                    </Badge>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl border bg-card p-7 shadow-sm"
                >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/20 shrink-0">
                            <ShieldCheck className="size-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Política de Privacidade</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Como coletamos, usamos e protegemos seus dados pessoais.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
                    <Accordion className="divide-y">
                        {ITEMS.map((item) => (
                            <AccordionItem key={item.value} value={item.value} className="border-0 px-6">
                                <AccordionTrigger className="gap-3 py-4 text-sm font-semibold hover:no-underline [&>svg]:text-muted-foreground">
                                    <span className="flex items-center gap-2.5">
                                        {item.icon}
                                        {item.title}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-[11px] text-muted-foreground">
                    Última atualização: {formattedDate}
                </motion.p>
            </motion.div>
        </div>
    );
}