import { StoreIcon, UserIcon, BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderUserProps } from "@/types/interface";

export function HeaderUser({ navItems, activeTab, setActiveTab, user }: HeaderUserProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

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

                <div className="flex justify-end items-center gap-3 z-10 flex-1">
                    <Button variant="ghost" size="icon" className={`size-9 ${activeTab === 'carrinho' ? 'text-primary' : ''}`} onClick={() => setActiveTab("carrinho")}>
                        <BellIcon className="size-4" />
                    </Button>

                    <div className="h-6 w-px bg-border mx-1 hidden md:block" /> 

                    <button 
                        onClick={() => setActiveTab("ajustes")}
                        className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full transition-colors group"
                    >
                        <div className="flex-col items-end hidden md:flex">
                            <span className="text-sm font-semibold leading-none">{user?.name || "Usuário"}</span>
                            <span className="text-[10px] text-muted-foreground">Minha conta</span>
                        </div>
                        
                        <Avatar className="size-9 border-2 border-transparent group-hover:border-primary/30 transition-all">
                            <AvatarImage src={user?.image} alt={user?.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {user?.name ? getInitials(user.name) : <UserIcon className="size-4" />}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                </div>
            </div>
        </header>
    );
}