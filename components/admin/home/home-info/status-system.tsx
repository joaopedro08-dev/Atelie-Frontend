import { motion, Variants } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Zap } from "lucide-react";

export function StatusSystem({ itemVariants, user }: { itemVariants: Variants, user: { role: string } | null }) {
    return (
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
    )
}