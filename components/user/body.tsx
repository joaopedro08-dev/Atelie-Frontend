"use client";

import { useState, useEffect } from "react";
import {
    Home,
    Package,
    ShoppingBag,
    Settings,
    Bell,
    ShieldCheck,
    StoreIcon
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BodyPage() {
    const [activeTab, setActiveTab] = useState("inicio");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const navItems = [
        { id: "inicio", label: "Início" },
        { id: "produtos", label: "Produtos" },
        { id: "carrinho", label: "Carrinho" },
        { id: "ajustes", label: "Ajustes" },
    ];

    return (
        <div className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden">
            <header className="flex-none w-full border-b bg-background/95 backdrop-blur z-50">
                <div className="w-full h-16 flex items-center px-4 md:px-8 relative">
                    <div className="flex items-center gap-2 z-10">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
                            <StoreIcon className="size-5" />
                        </div>
                        <span className="font-bold text-base tracking-tight hidden sm:inline-block">Ateliê Store</span>
                    </div>

                    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative py-2 transition-all duration-300 hover:text-primary ${
                                    activeTab === item.id ? "text-primary" : "text-muted-foreground"
                                } group`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                                    activeTab === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                                }`} />
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 ml-auto z-10">
                        <Button variant="ghost" size="icon" className="relative size-9">
                            <Bell className="size-4" />
                            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-background" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`size-9 ${activeTab === 'carrinho' ? 'text-primary' : ''}`}
                            onClick={() => setActiveTab("carrinho")}
                        >
                            <ShoppingBag className="size-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="h-full pr-4">
                    <main className="w-full p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
                        <TabsContent value="inicio" className="mt-0 focus-visible:outline-none">
                            <div className="max-w-[1400px] mx-auto">
                                <Card className="border-none shadow-none bg-transparent">
                                    <CardHeader className="px-0 pt-0 pb-4">
                                        <CardTitle className="text-2xl font-bold tracking-tight">Bem-vindo ao Ateliê</CardTitle>
                                        <CardDescription className="text-sm">Confira as novidades e seus destaques.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-0">
                                        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-muted/40 rounded-2xl border flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                                            <span className="text-muted-foreground font-medium z-10">Banner de Promoções</span>
                                        </div>
                                        {/* Espaçador para testar o scroll interno */}
                                        <div className="h-[1000px] mt-8 bg-gradient-to-b from-muted/10 to-transparent rounded-xl border border-dashed flex items-center justify-center">
                                            <p className="text-muted-foreground italic">Área de conteúdo longo para teste de scroll</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="produtos" className="mt-0 focus-visible:outline-none">
                            <div className="max-w-[1400px] mx-auto space-y-4">
                                <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="aspect-[3/4] bg-muted/30 rounded-xl border animate-pulse" />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="carrinho" className="mt-0 focus-visible:outline-none">
                            <div className="max-w-3xl mx-auto py-12 text-center">
                                <ShoppingBag className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                <h2 className="text-xl font-semibold">Seu carrinho está vazio</h2>
                                <Button onClick={() => setActiveTab("produtos")} className="mt-6">Ver Produtos</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="ajustes" className="mt-0 focus-visible:outline-none">
                            <div className="max-w-2xl mx-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Configurações</CardTitle>
                                        <CardDescription>Ajustes de segurança [cite: 2026-01-26]</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" className="gap-2">
                                            <ShieldCheck className="size-4" /> Alterar Senha
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </main>
                </ScrollArea>

                <div className="flex-none md:hidden bg-background/80 backdrop-blur-md border-t">
                    <TabsList className="flex h-16 w-full items-center justify-around bg-transparent border-none">
                        {navItems.map((item) => (
                            <TabsTrigger 
                                key={item.id}
                                value={item.id} 
                                className="flex flex-col gap-1 text-muted-foreground data-[state=active]:text-primary bg-transparent shadow-none"
                            >
                                {item.id === "inicio" && <Home className="size-5" />}
                                {item.id === "produtos" && <Package className="size-5" />}
                                {item.id === "carrinho" && <ShoppingBag className="size-5" />}
                                {item.id === "ajustes" && <Settings className="size-5" />}
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </Tabs>
        </div>
    );
}