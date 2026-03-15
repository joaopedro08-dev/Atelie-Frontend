"use client";

import Link from "next/link";
import { StoreIcon, SprayCanIcon, Building2Icon, ShieldAlertIcon } from "lucide-react";
import ToggleMenu from "./toggle-menu";
import { ModeToggle } from "../mode-toggle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const categories = [
    { name: "Produtos", href: "#produtos-categoria", icon: <SprayCanIcon size={18} className="text-muted-foreground" /> },
    { name: "Quem Somos", href: "#quem-somos", icon: <Building2Icon size={18} className="text-muted-foreground" /> },
    { name: "Política e Trocas", href: "#politica-trocas", icon: <ShieldAlertIcon size={18} className="text-muted-foreground" /> },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`w-full sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'border-b border-border bg-background/95 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="flex items-center z-10">
                        <Link href="/" className="flex flex-row items-center gap-3 group transition-all">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground transition-transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
                                <StoreIcon size={20} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl md:text-2xl font-bold tracking-[0.15em] uppercase text-foreground">
                                    Ateliê
                                </span>
                                <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase hidden md:block">
                                    Encantos do Arcanjo
                                </span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                        {categories.map((cat, i) => (
                            <motion.a
                                key={cat.name}
                                href={cat.href}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                                className="relative text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em] whitespace-nowrap group"
                            >
                                {cat.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 md:gap-4 z-10">
                        <div className="hidden md:block">
                            <ModeToggle />
                        </div>
                        <div className="md:hidden">
                            <ToggleMenu categories={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}