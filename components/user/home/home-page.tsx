import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function HomePage() {
    return (
        <div className="max-w-350 mx-auto">
            <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="px-0 pt-0 pb-4">
                    <CardTitle className="text-2xl font-bold tracking-tight">Bem-vindo ao Ateliê</CardTitle>
                    <CardDescription className="text-sm">Confira as novidades e seus destaques.</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="relative w-full aspect-21/9 md:aspect-3/1 bg-muted/40 rounded-2xl border flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
                        <span className="text-muted-foreground font-medium z-10">Banner de Promoções</span>
                    </div>
                    <div className="h-250 mt-8 bg-linear-to-b from-muted/10 to-transparent rounded-xl border border-dashed flex items-center justify-center">
                        <p className="text-muted-foreground italic">Área de conteúdo longo para teste de scroll</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}