"use client";

import Link from "next/link";
import { MapPin, ShieldCheck, ShoppingBag, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { StoreIcon } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

export default function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="w-full bg-muted/30 border-t border-border mt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <motion.div variants={item} className="flex flex-col justify-center items-center md:items-start text-center md:text-start gap-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground transition-transform group-hover:scale-105">
                                <StoreIcon size={18} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-bold tracking-widest uppercase text-base text-foreground">Ateliê</span>
                                <span className="text-[9px] tracking-[0.25em] text-muted-foreground uppercase">Encantos do Arcanjo</span>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Unindo a sofisticação das semijoias ao cuidado sensorial da Loccitane.
                            Beleza e bem-estar em um só lugar.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.instagram.com/store_encantosdoarcanjo"
                                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform"
                            >
                                <FaInstagram size={20} />
                            </Link>
                            <Link
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://wa.me/5514997476755"
                                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform"
                            >
                                <FaWhatsapp size={20} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Institucional</h4>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            {[
                                { label: "Produtos/Categorias", href: "#produtos-categorias" },
                                { label: "Quem Somos", href: "#quem-somos" },
                                { label: "Política de Trocas/Devoluções", href: "#politica-trocas" },
                                { label: "Fale Conosco", href: "#fale-conosco" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative hover:text-primary transition-colors group w-fit"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Atendimento</h4>
                        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-primary shrink-0" />
                                <span>anaalinemdd@hotmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary shrink-0" />
                                <span>Online — Brasil</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={16} className="text-primary shrink-0" />
                                <span>Todos os dias</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Segurança</h4>
                        <div className="p-3 bg-background border border-border rounded-lg flex items-center gap-2">
                            <ShieldCheck className="text-green-500 h-5 w-5 shrink-0" />
                            <span className="text-[11px] text-muted-foreground leading-tight">
                                Ambiente 100% Seguro e Confiável
                            </span>
                        </div>
                        <div className="p-3 bg-background border border-border rounded-lg flex items-center gap-2">
                            <FaWhatsapp className="text-green-500 h-5 w-5 shrink-0" />
                            <Link
                                href="https://wa.me/5514997476755"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-muted-foreground leading-tight hover:text-primary transition-colors"
                            >
                                Atendimento via WhatsApp
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center md:text-left">
                    <p>© {currentYear} Ateliê — Encantos do Arcanjo · Todos os direitos reservados.</p>
                    <p className="font-bold">Desenvolvido por João Pedro Dala Dea Mello</p>
                </div>
            </div>
        </footer>
    );
}