import { StoreIcon, UserIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetStateAction, Dispatch } from "react";

type NavItem = {
    id: string;
    label: string;
}

interface HeaderUserProps {
    navItems: NavItem[]
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

export function HeaderUser({navItems, activeTab, setActiveTab}: HeaderUserProps) {
    return (
        <header className="flex-none w-full border-b bg-background/95 backdrop-blur z-50">
            <div className="w-full h-16 flex items-center px-4 md:px-8">

                <div className="flex justify-start items-center gap-2 z-10 flex-1">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
                        <StoreIcon className="size-5" />
                    </div>
                    <span className="font-bold text-base tracking-tight inline-block">Ateliê Store</span>
                </div>

                <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`relative py-2 transition-all duration-300 hover:text-primary ${activeTab === item.id ? "text-primary" : "text-muted-foreground"
                                } group`}
                        >
                            {item.label}
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${activeTab === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                                }`} />
                        </button>
                    ))}
                </nav>

                <div className="flex justify-end items-center gap-2 z-10 flex-1">
                    <Button variant="ghost" size="icon" className={`size-9 ${activeTab === 'carrinho' ? 'text-primary' : ''}`} onClick={() => setActiveTab("carrinho")}>
                        <ShoppingBag className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setActiveTab("ajustes")} className="size-9 block md:hidden">
                        <UserIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}