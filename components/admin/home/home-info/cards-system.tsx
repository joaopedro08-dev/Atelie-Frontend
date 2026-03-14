import { motion, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";

export function CardsSystem({ itemVariants, user }: { itemVariants: Variants, user: { statusSystem: boolean, role: string, createdAt: string, lastLogin: string } | null }) {
    return (
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
    )
}