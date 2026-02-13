import Link from "next/link";
import { MapPin, ShieldCheck, CreditCard, ShoppingBag, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const currentYear: number = new Date().getFullYear();
    return (
        <footer className="w-full bg-muted/30 border-t border-border mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-start gap-4">
                        <h3 className="text-lg font-bold text-foreground font-sans uppercase tracking-widest">
                            Ateliê - Encantos do Arcanjo
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Unindo a sofisticação das semijoias ao cuidado sensorial da Loccitane.
                            Beleza e bem-estar em um só lugar.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link target="_blank" href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <FaInstagram size={20} />
                            </Link>
                            <Link target="_blank" href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <FaWhatsapp size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Institucional</h4>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/produtos-categorias" className="hover:text-primary transition-colors">Produtos/Categorias</Link>
                            <Link href="/quem-somos" className="hover:text-primary transition-colors">Quem Somos</Link>
                            <Link href="/politica-trocas" className="hover:text-primary transition-colors">Política de Trocas/Devoluções</Link>
                            <Link href="/fale-conosco" className="hover:text-primary transition-colors">Fale Conosco</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Atendimento</h4>
                        <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-primary" />
                                <span>anaalinemdd@hotmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>Online - Brasil</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={16} className="text-primary" />
                                <span>Todos os dias</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground italic">Segurança</h4>
                        <div className="p-3 bg-background border border-border rounded-lg flex items-center gap-2">
                            <ShieldCheck className="text-green-600 h-5 w-5" />
                            <span className="text-[11px] text-muted-foreground leading-tight">
                                Ambiente 100% Seguro e Confiável
                            </span>
                        </div>
                    </div>

                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center md:text-left">
                    <p>© {currentYear} Ateliê - Encantos do Arcanjo - Todos os direitos reservados.</p>
                    <p className="font-bold">Desenvolvido por João Pedro Dala Dea Mello</p>
                </div>
            </div>
        </footer>
    );
}