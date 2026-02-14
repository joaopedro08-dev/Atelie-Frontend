import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar
} from "@/components/ui/sidebar";
import {
    ChevronsUpDown,
    User2Icon,
    LayoutDashboard,
    Gem,
    ShoppingCart,
    Users,
    Settings,
    StoreIcon,
    ChevronDown
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from "../logout";

const navigation = [
    {
        category: "Principal",
        items: [
            { label: "Dashboard", link: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Gerenciar Itens", link: "/admin/itens", icon: Gem },
        ]
    },
    {
        category: "Vendas",
        items: [
            { label: "Pedidos", link: "/admin/orders", icon: ShoppingCart },
            { label: "Clientes", link: "/admin/clients", icon: Users },
        ]
    },
    {
        category: "Sistema",
        items: [
            { label: "Configurações", link: "/admin/settings", icon: Settings },
        ]
    }
];

interface AppSidebarProps {
    username: string;
    role: string;
}

export function AppSidebar({ username, role }: AppSidebarProps) {
    const { isMobile, setOpenMobile } = useSidebar();

    const closeSidebar = () => {
        if (isMobile) setOpenMobile(false);
    };

    const getFormattedName = (fullName: string) => {
        if (!fullName) return "Usuário";
        const nameParts = fullName.trim().split(/\s+/);
        if (nameParts.length <= 2) return nameParts.join(" ");
        const firstTwo = nameParts.slice(0, 2).join(" ");
        const initials = nameParts.slice(2).map(n => `${n.charAt(0).toUpperCase()}.`).join(" ");
        return `${firstTwo} ${initials}`;
    };

    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={
                            <Link href="/admin" onClick={closeSidebar}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <StoreIcon className="size-4" />
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

            <SidebarContent>
                {navigation.map((group) => (
                    <SidebarGroup key={group.category}>
                        <SidebarGroupLabel>{group.category}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.link}>
                                        <SidebarMenuButton tooltip={item.label}>
                                            <Link
                                                href={item.link}
                                                onClick={closeSidebar}
                                                className="flex items-center flex-row justify-start gap-2 w-full"
                                            >
                                                {Icon && <Icon className="size-4" />}
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t border-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <SidebarMenuButton className="py-6">
                                    <User2Icon className="size-6" />
                                    <div className="flex flex-col ml-2">
                                        <span className="text-sm font-medium">{getFormattedName(username)}</span>
                                        <span className="text-xs text-muted-foreground">{formattedRole}</span>
                                    </div>
                                    <ChevronDown className="ml-auto opacity-50" />
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