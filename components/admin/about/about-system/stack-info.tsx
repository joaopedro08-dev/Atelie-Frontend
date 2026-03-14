import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
export function StackInfo({ stack }: { stack: any[] }) {
    return (
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
                                {s.items.map((tech: any) => (
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
    )
}