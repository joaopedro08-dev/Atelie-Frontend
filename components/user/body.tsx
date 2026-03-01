"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeaderUser } from "./header";
import { TabsLink } from "./tabs-link";
import { HomePage } from "./home/home-page";
import { SettingsPage } from "./settings/settings-page";
import { ShoppingPage } from "./shop/shopping-page";
import { ProductsPage } from "./products/products-page";

const navItems = [
    { id: "inicio", label: "Início" },
    { id: "produtos", label: "Produtos" },
    { id: "carrinho", label: "Carrinho" },
    { id: "ajustes", label: "Ajustes" },
];

export default function BodyPage() {
    const [activeTab, setActiveTab] = useState("inicio");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col bg-background text-foreground overflow-hidden">
            <HeaderUser navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="h-full pr-4">
                    <main className="w-full p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
                        <TabsContent value="inicio" className="mt-0 focus-visible:outline-none">
                            <HomePage />
                        </TabsContent>

                        <TabsContent value="produtos" className="mt-0 focus-visible:outline-none">
                            <ProductsPage />
                        </TabsContent>

                        <TabsContent value="carrinho" className="mt-0 focus-visible:outline-none">
                            <ShoppingPage setActiveTab={setActiveTab} />
                        </TabsContent>

                        <TabsContent value="ajustes" className="mt-0 focus-visible:outline-none">
                            <SettingsPage />
                        </TabsContent>
                    </main>
                </ScrollArea>

                <TabsLink navItems={navItems} />
            </Tabs>
        </div>
    );
}