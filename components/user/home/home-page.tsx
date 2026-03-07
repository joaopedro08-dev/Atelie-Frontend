import { ShoppingBag, Star, Truck, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const year = new Date().getFullYear();

export function HomePage() {
    return (
        <div className="max-w-full mx-auto space-y-12">
            <section className="relative w-full h-72 md:h-112.5 rounded-3xl bg-muted overflow-hidden flex items-center px-8 md:px-16">
                <div className="z-10 max-w-md space-y-4">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Nova Coleção {year}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                        Estilo Único para Você.
                    </h1>
                    <p className="text-muted-foreground">
                        Peças exclusivas feitas à mão com o cuidado que você merece.
                    </p>
                    <Button size="lg" className="rounded-full px-8">
                        Ver Catálogo
                    </Button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-primary/10 to-transparent hidden md:block" />
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y py-8 border-border/50">
                <div className="flex items-center gap-3 justify-center">
                    <Truck className="text-primary size-6" />
                    <div className="text-sm">
                        <p className="font-bold">Frete Grátis</p>
                        <p className="text-xs text-muted-foreground">Acima de R$ 199</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                    <ShieldCheck className="text-primary size-6" />
                    <div className="text-sm">
                        <p className="font-bold">Compra Segura</p>
                        <p className="text-xs text-muted-foreground">Certificado SSL</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                    <Zap className="text-primary size-6" />
                    <div className="text-sm">
                        <p className="font-bold">Envio Rápido</p>
                        <p className="text-xs text-muted-foreground">Em até 24h</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                    <Star className="text-primary size-6" />
                    <div className="text-sm">
                        <p className="font-bold">Qualidade</p>
                        <p className="text-xs text-muted-foreground">Materiais Premium</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Produtos em Destaque</h2>
                    <Button variant="link" className="text-primary">Ver todos</Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer space-y-3">
                            <div className="aspect-3/4 rounded-2xl bg-muted overflow-hidden relative">
                                <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded">
                                    -20%
                                </div>
                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" className="rounded-full shadow-lg">
                                        <ShoppingBag className="size-4" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Nome do Produto {i}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">R$ 89,90</span>
                                    <span className="text-xs text-muted-foreground line-through">R$ 110,00</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}