"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Power } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const SHORTCUTS_KEY = "shortcuts-enabled";

const shortcuts = [
    { keys: ["Ctrl", "+", "Y"], description: "Ir para Início", route: "/admin" },
    { keys: ["Ctrl", "+", "D"], description: "Ir para Dashboard", route: "/admin/dashboard" },
    { keys: ["Ctrl", "+", "P"], description: "Ir para Pedidos", route: "/admin/orders" },
    { keys: ["Ctrl", "+", "U"], description: "Ir para Clientes", route: "/admin/clients" },
    { keys: ["Ctrl", "+", "I"], description: "Ir para Itens", route: "/admin/itens" },
    { keys: ["Ctrl", "+", "T"], description: "Ir para Sobre o Sistema", route: "/admin/about" },
    { keys: ["Ctrl", "+", ","], description: "Ir para Configurações", route: "/admin/settings" },
    { keys: ["Ctrl", "+", "L"], description: "Encerrar sessão", route: null },
    { keys: ["Esc"], description: "Fechar modais e dialogs", route: null },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

export function AccessibilitySystem() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window === "undefined") return true;
        const stored = localStorage.getItem(SHORTCUTS_KEY);
        return stored !== null ? stored === "true" : true;
    });

    const handleToggle = (value: boolean) => {
        setEnabled(value);
        localStorage.setItem(SHORTCUTS_KEY, String(value));
        window.dispatchEvent(new CustomEvent('shortcuts-changed', { detail: value }))
        toast.success(value ? "Atalhos de teclado ativados" : "Atalhos de teclado desativados");
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            <motion.div variants={item} className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Acessibilidade</h2>
                <p className="text-sm text-muted-foreground">Personalize sua experiência de navegação no sistema.</p>
            </motion.div>

            <Separator />

            <motion.div variants={item}>
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Keyboard className="size-4 text-primary" />
                                <CardTitle className="text-base">Atalhos de Teclado</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={enabled
                                        ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
                                        : "text-muted-foreground border-muted/30"
                                    }
                                >
                                    <Power className="size-3 mr-1" />
                                    {enabled ? "Ativo" : "Inativo"}
                                </Badge>
                                <Switch checked={enabled} onCheckedChange={handleToggle} />
                            </div>
                        </div>
                        <CardDescription>
                            Navegue pelo sistema sem usar o mouse. Os atalhos são desativados automaticamente em campos de texto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {shortcuts.map((shortcut, index) => (
                                <motion.div
                                    key={index}
                                    variants={item}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${enabled ? "hover:bg-muted/30" : "opacity-50"}`}
                                >
                                    <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                                    <KbdGroup>
                                        {shortcut.keys.map((key) => (
                                            <Kbd key={key}>{key}</Kbd>
                                        ))}
                                    </KbdGroup>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}