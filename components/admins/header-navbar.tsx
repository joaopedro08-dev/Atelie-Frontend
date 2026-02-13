"use client"; 

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle"; 

const routeNames: Record<string, string> = {
  "/admin": "Home",
  "/admin/dashboard": "Dashboard",
  "/admin/clients": "Clientes",
  "/admin/itens": "Gerenciar Itens",
  "/admin/orders": "Pedidos",
  "/admin/settings": "Configurações",
};

export default function HeaderNavbar() {
    const pathname = usePathname();
    
    const linkName = routeNames[pathname] || 
                     pathname.split('/').pop()?.replace(/-/g, ' ') || 
                     "Ateliê";

    return (
        <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="h-4 w-px bg-border mx-2" />
                <span className="text-sm font-medium tracking-tight">
                    {linkName}
                </span>
            </div>

            <div className="flex items-center">
                <ModeToggle />
            </div>
        </header>
    );
}