import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, GitBranch, Mail } from "lucide-react";

export function FooterSupport() {
    return (
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
    )
}