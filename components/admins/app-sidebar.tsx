import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import {
    ChevronsUpDown,
    User2Icon,
    LayoutDashboard,
    Gem,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    StoreIcon,
    ChevronDown
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Logout from "../logout";

interface AppSidebarProps {
    username: string;
    role: string;
}

export function AppSidebar({ username, role }: AppSidebarProps) {
    const getFormattedName = (fullName: string) => {
        if (!fullName) return "Usuário";

        const nameParts = fullName.trim().split(/\s+/);

        if (nameParts.length <= 2) {
            return nameParts.join(" ");
        }

        const firstTwo = nameParts.slice(0, 2).join(" ");

        const initials = nameParts
            .slice(2)
            .map(name => `${name.charAt(0).toUpperCase()}.`)
            .join(" ");

        return `${firstTwo} ${initials}`;
    };
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <SidebarMenuButton size="lg" className="hover:bg-transparent">
                                    <Link href="/admin" className="flex gap-2 justify-start items-center w-full">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <StoreIcon className="size-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 leading-none ml-2">
                                            <span className="font-semibold">Ateliê</span>
                                            <span className="text-xs text-muted-foreground">Painel do Admin</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto opacity-50" />
                                    </Link>
                                </SidebarMenuButton>
                            }>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Principal</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem className="mb-2">
                            <SidebarMenuButton tooltip="Dashboard">
                                <Link href="/admin/dashboard" className="flex gap-2 justify-start items-center w-full">
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Produtos">
                                <Link href="/admin/itens" className="flex gap-2 justify-start items-center w-full">
                                    <Gem />
                                    <span>Gerenciar Itens</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Vendas</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem className="mb-2">
                            <SidebarMenuButton tooltip="Pedidos">
                                <Link href="/admin/orders" className="flex gap-2 justify-start items-center w-full">
                                    <ShoppingCart />
                                    <span>Pedidos</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Clientes">
                                <Link href="/admin/clients" className="flex gap-2 justify-start items-center w-full">
                                    <Users />
                                    <span>Clientes</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Configurações">
                                <Link href="/admin/settings" className="flex gap-2 justify-start items-center w-full">
                                    <Settings />
                                    <span>Configurações</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
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
                            }>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <Logout />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}