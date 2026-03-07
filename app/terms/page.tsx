"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getMonthName = (month: number): string => {
    const months: { [key: number]: string } = {
        0: "Janeiro",
        1: "Fevereiro",
        2: "Março",
        3: "Abril",
        4: "Maio",
        5: "Junho",
        6: "Julho",
        7: "Agosto",
        8: "Setembro",
        9: "Outubro",
        10: "Novembro",
        11: "Dezembro",
    };
    return months[month] || "";
};

export default function TermsPage() {
    const date = new Date();

    const today = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = getMonthName(month);

    return (
        <div className="flex min-h-dvh flex-col items-center bg-muted/50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl space-y-8 rounded-lg border bg-card p-8 shadow-sm"
            >
                <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <h1 className="text-2xl font-bold">Termos de Serviço</h1>
                    </div>
                    <Link href="/signup">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                        </Button>
                    </Link>
                </div>

                <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
                    <section>
                        <h2 className="text-lg font-semibold text-foreground">1. Aceitação dos Termos</h2>
                        <p>Ao criar uma conta no Ateliê, você concorda em cumprir estes termos de serviço e todas as leis aplicáveis.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground">2. Uso do Sistema</h2>
                        <p>O sistema é destinado à gestão de pedidos e clientes. É proibido o uso para fins ilícitos ou que comprometam a segurança da plataforma.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground">3. Responsabilidade</h2>
                        <p>O usuário é responsável pela veracidade dos dados inseridos e pela manutenção do sigilo de sua senha de acesso.</p>
                    </section>
                </div>

                <p className="text-[10px] text-muted-foreground pt-8 border-t">
                    Última atualização: {today} de {monthName} de {year}.
                </p>
            </motion.div>
        </div>
    );
}