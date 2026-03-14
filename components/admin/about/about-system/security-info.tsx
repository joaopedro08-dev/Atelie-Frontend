import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export function SecurityInfo({ security }: { security: any[] }) {
    return (
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
    )
}