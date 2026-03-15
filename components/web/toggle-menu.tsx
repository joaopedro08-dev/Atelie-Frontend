"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Menu, StoreIcon, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Categories } from "@/types/type";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ToggleMenu({ categories }: { categories: Categories[] }) {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            } />

            <SheetContent
                showCloseButton={false}
                side="left"
                className="bg-background flex flex-col h-full w-75 p-0"
            >
                <SheetHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
                    <SheetTitle>
                        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground transition-transform group-hover:scale-105">
                                <StoreIcon size={18} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-bold tracking-widest uppercase text-lg">Ateliê</span>
                                <span className="text-[9px] tracking-[0.25em] text-muted-foreground uppercase">Encantos do Arcanjo</span>
                            </div>
                        </Link>
                    </SheetTitle>

                    <SheetClose render={
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Fechar</span>
                        </Button>
                    } />
                </SheetHeader>

                <div className="px-4 py-4 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-3">
                        Navegação
                    </p>
                    <nav className="flex flex-col gap-1">
                        {categories.map((cat, i) => (
                            <motion.a
                                key={cat.name}
                                href={cat.href}
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.3 }}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted hover:text-primary transition-all"
                            >
                                {cat.icon}
                                {cat.name}
                            </motion.a>
                        ))}
                    </nav>

                    <Separator className="my-4" />

                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-3">
                        Preferências
                    </p>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted hover:text-primary transition-all w-full"
                    >
                        <AnimatePresence mode="wait">
                            {theme === "dark" ? (
                                <motion.span
                                    key="sun"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <Sun size={18} className="text-muted-foreground" />
                                    Modo Claro
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <Moon size={18} className="text-muted-foreground" />
                                    Modo Escuro
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                <div className="p-6 border-t border-border bg-muted/20 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        © {currentYear} Ateliê · Todos os direitos reservados.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}