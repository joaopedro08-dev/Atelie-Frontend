import Link from "next/link";
import { StoreIcon, SprayCanIcon, Building2Icon, ShieldAlertIcon } from "lucide-react";
import ToggleMenu from "./toggle-menu";
import { ModeToggle } from "../mode-toggle";

const categories = [
    { name: "Produtos", href: "#produtos-categoria", icon: <SprayCanIcon size={18} className="text-muted-foreground" /> },
    { name: "Quem Somos", href: "#quem-somos", icon: <Building2Icon size={18} className="text-muted-foreground" /> },
    { name: "Política e Trocas", href: "#politica-trocas", icon: <ShieldAlertIcon size={18} className="text-muted-foreground" /> },
];

export default function Header() {
    return (
        <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="relative flex h-20 items-center justify-between">

                    <div className="flex items-center z-10">
                        <Link href="/" className="flex flex-row items-center gap-3 group transition-all">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground transition-transform group-hover:scale-105">
                                <StoreIcon size={20} />
                            </div>
                            <span className="text-xl md:text-2xl font-bold tracking-[0.15em] uppercase text-foreground leading-none">
                                Ateliê
                            </span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
                        {categories.map((cat) => (
                            <a
                                key={cat.name}
                                href={cat.href}
                                className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em] whitespace-nowrap"
                            >
                                {cat.name}
                            </a>
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
        </header>
    );
}