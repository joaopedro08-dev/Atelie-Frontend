import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProjectInfo() {
    return (
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
                        <p className="font-mono font-medium text-primary">1.0.6</p>
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
    )
}