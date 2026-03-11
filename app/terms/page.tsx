"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft, ShieldCheck, Scale, UserCog } from "lucide-react";
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

const TERMS = [
    {
        value: "item-1",
        icon: <Scale className="size-4 text-primary shrink-0" />,
        title: "1. Aceitação dos Termos",
        content: "Ao criar uma conta no Ateliê, você concorda em cumprir estes termos de serviço e todas as leis aplicáveis. O uso contínuo da plataforma após qualquer alteração nos termos constitui aceitação das mudanças.",
    },
    {
        value: "item-2",
        icon: <UserCog className="size-4 text-primary shrink-0" />,
        title: "2. Uso do Sistema",
        content: "O sistema é destinado exclusivamente à gestão de pedidos e clientes do Ateliê. É estritamente proibido o uso para fins ilícitos, disseminação de conteúdo inadequado ou qualquer atividade que comprometa a segurança, estabilidade ou integridade da plataforma.",
    },
    {
        value: "item-3",
        icon: <ShieldCheck className="size-4 text-primary shrink-0" />,
        title: "3. Responsabilidade",
        content: "O usuário é integralmente responsável pela veracidade das informações inseridas na plataforma e pela manutenção do sigilo de suas credenciais de acesso. Em caso de suspeita de acesso não autorizado, o usuário deve notificar imediatamente o suporte.",
    },
];

export default function TermsPage() {
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
                        <Button variant="ghost" onClick={() => router.back()} size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2">
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
                            <FileText className="size-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Termos de Serviço</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Leia com atenção antes de utilizar a plataforma Ateliê.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
                    <Accordion className="divide-y">
                        {TERMS.map((term) => (
                            <AccordionItem key={term.value} value={term.value} className="border-0 px-6">
                                <AccordionTrigger className="gap-3 py-4 text-sm font-semibold hover:no-underline [&>svg]:text-muted-foreground">
                                    <span className="flex items-center gap-2.5">
                                        {term.icon}
                                        {term.title}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed">
                                    {term.content}
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