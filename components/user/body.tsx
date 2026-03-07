"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderUser } from "./header";
import { TabsLink } from "./tabs-link";
import { HomePage } from "./home/home-page";
import { SettingsPage } from "./settings/settings-page";
import { ShoppingPage } from "./shop/shopping-page";
import { ProductsPage } from "./products/products-page";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

toast.info("Aviso", {
    duration: 10000,
    description: "Este projeto não possui atividades reais de E-commerce. Sinta-se à vontade para explorar as funcionalidades, mas lembre-se de que não há transações reais envolvidas.",
});

const navItems = [
    { id: "inicio", label: "Início" },
    { id: "produtos", label: "Produtos" },
    { id: "carrinho", label: "Carrinho" },
    { id: "ajustes", label: "Ajustes" },
];

const TABS_ORDER = ["inicio", "produtos", "carrinho", "ajustes"];

export default function BodyPage() {
    const [activeTab, setActiveTab] = useState("inicio");
    const [mounted, setMounted] = useState(false);
    const [direction, setDirection] = useState(0);
    const prevTabRef = useRef(activeTab);
    const { user } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const currentIndex = TABS_ORDER.indexOf(activeTab);
        const prevIndex = TABS_ORDER.indexOf(prevTabRef.current);

        if (currentIndex > prevIndex) setDirection(1);
        if (currentIndex < prevIndex) setDirection(-1);

        prevTabRef.current = activeTab;
    }, [activeTab]);

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-dvh bg-background text-foreground overflow-hidden pt-safe-top pb-safe-bottom">
            <HeaderUser
                navItems={navItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                user={user || undefined}
            />

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
                <div className="relative flex-1 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeTab}
                            custom={direction}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.25}
                            whileDrag={{ scale: 0.98 }}
                            onDragEnd={(_event, info) => {
                                const threshold = 100;
                                const currentIndex = TABS_ORDER.indexOf(activeTab);

                                if (
                                    info.offset.x < -threshold &&
                                    currentIndex < TABS_ORDER.length - 1
                                ) {
                                    setActiveTab(TABS_ORDER[currentIndex + 1]);
                                }

                                if (info.offset.x > threshold && currentIndex > 0) {
                                    setActiveTab(TABS_ORDER[currentIndex - 1]);
                                }
                            }}
                            initial={{ x: direction * 100 + "%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction * -100 + "%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 180, damping: 26 }}
                            className="absolute inset-0 w-full h-full touch-pan-y"
                            style={{ touchAction: "pan-y" }}
                        >
                            <ScrollArea className="h-full w-full">
                                <main className="w-full mb-4 p-4 md:p-6 lg:p-8 pb-16 md:pb-8">
                                    {activeTab === "inicio" && <HomePage />}
                                    {activeTab === "produtos" && <ProductsPage />}
                                    {activeTab === "carrinho" && (
                                        <ShoppingPage setActiveTab={setActiveTab} />
                                    )}
                                    {activeTab === "ajustes" && <SettingsPage />}
                                </main>
                            </ScrollArea>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <TabsLink navItems={navItems} />
            </Tabs>
        </div>
    );
}