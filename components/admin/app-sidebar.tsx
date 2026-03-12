"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Gem, ShoppingCart, Users, Settings, StoreIcon, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Logout from "../logout";
import { AppSidebarProps } from "@/types/type";
import { NavGroup } from "./nav-group";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const navigation = [
    {
        category: "Principal",
        items: [
            { label: "Dashboard", link: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Gerenciar Itens", link: "/admin/itens", icon: Gem },
            { label: "Pedidos", link: "/admin/orders", icon: ShoppingCart, badge: 0 },
        ]
    },
    {
        category: "Usuários",
        items: [
            { label: "Clientes", link: "/admin/clients", icon: Users },
            { label: "Usuários (Ateliê)", link: "/admin/users", icon: Users },
        ]
    },
    {
        category: "Sistema",
        items: [
            { label: "Configurações", link: "/admin/settings", icon: Settings },
        ]
    }
];

const getInitials = (name: string) =>
    name.trim().split(/\s+/).slice(0, 2).map(n => n[0].toUpperCase()).join("");

const getAvatarColor = (name: string) => {
    const colors = ["bg-rose-500", "bg-violet-500", "bg-amber-500", "bg-teal-500", "bg-blue-500"];

    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return colors[hash % colors.length];
};

const getFormattedName = (fullName: string) => {
    if (!fullName) return "Usuário";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length <= 2) return parts.join(" ");
    const initials = parts.slice(2).map(n => `${n[0].toUpperCase()}.`).join(" ");
    return `${parts.slice(0, 2).join(" ")} ${initials}`;
};

export function AppSidebar({ username, role }: AppSidebarProps) {
    const { isMobile, setOpenMobile } = useSidebar();
    const pathname = usePathname();
    const closeSidebar = () => { if (isMobile) setOpenMobile(false); };

    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
            style={{
                top: 'var(--titlebar-height, 0px)',
                height: 'calc(100vh - var(--titlebar-height, 0px))'
            }}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={
                            <Link href="/admin" onClick={closeSidebar}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-foreground">
                                    <StoreIcon className="size-4 text-white" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none ml-2">
                                    <span className="font-semibold">Ateliê</span>
                                    <span className="text-xs text-muted-foreground">Painel do Admin</span>
                                </div>
                            </Link>
                        } className="hover:bg-transparent" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto">
                {navigation.map((group, groupIndex) => (
                    <NavGroup
                        key={group.category}
                        group={group}
                        groupIndex={groupIndex}
                        pathname={pathname}
                        closeSidebar={closeSidebar}
                    />
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t border-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <SidebarMenuButton className="hover:bg-muted/60 h-12 group-data-[collapsible=icon]:justify-center">
                                    <div className={`size-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(username)}`}>
                                        {getInitials(username)}
                                    </div>
                                    <div className="flex flex-col ml-2 min-w-0 group-data-[collapsible=icon]:hidden">
                                        <span className="text-sm font-medium truncate leading-tight">
                                            {getFormattedName(username)}
                                        </span>
                                        <span className="text-xs text-muted-foreground leading-tight">
                                            {role === "ADMIN" ? "Administrador(a)" : "Usuário"}
                                        </span>
                                    </div>
                                    <ChevronDown className="ml-auto opacity-50 shrink-0 group-data-[collapsible=icon]:hidden" />
                                </SidebarMenuButton>
                            } />
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <Logout />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}