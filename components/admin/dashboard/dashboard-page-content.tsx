"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, ShoppingBag, Clock, Package, FileDown, FileText, Table as TableIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChartConfig } from "@/components/ui/chart";
import { DashboardStats } from "@/service/dashboard/dashboard-stats";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exportDashboardToExcel } from "@/service/export/dashboard/dashboard-xlsx";
import { exportDashboardToPDF } from "@/service/export/dashboard/dashboard-pdf";
import { paymentTranslations, statusTranslations } from "@/types/record";
import { StatCard } from "./charts/stat-card";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";
import { OrderChart } from "./charts/order-chart";
import { CategoryPieChart } from "./charts/category-pie-chart";
import { HistoryOrdersChart } from "./charts/history-orders";

export const chartConfig = {
    count: { label: "Pedidos", color: "var(--primary)" },
    st: { label: "ST", color: "var(--primary)" },
    mrru: { label: "MRRU", color: "var(--chart-5)" },
    outros: { label: "Outros", color: "var(--chart-1)" },
    ni: { label: "N/I", color: "var(--muted)" },
} satisfies ChartConfig;

export const formatDateBR = (dateString: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

export function DashboardPageContent() {
    const { dashboardStats } = DashboardStats();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await dashboardStats();
            setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
    };

    const handleExport = (format: 'pdf' | 'excel') => {
        if (!stats) return;
        format === 'pdf'
            ? exportDashboardToPDF(stats, paymentTranslations, statusTranslations)
            : exportDashboardToExcel(stats, paymentTranslations, statusTranslations);
    };

    if (loading) return <DashboardSkeleton />

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Painel Administrativo</h1>
                    <p className="text-muted-foreground">Visão geral do seu ateliê hoje.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="gap-2">
                                <FileDown className="size-4" /> Exportar
                            </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2 cursor-pointer">
                                <FileText className="size-4 text-red-500" /> Salvar como PDF (A4)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2 cursor-pointer">
                                <TableIcon className="size-4 text-green-600" /> Salvar como Excel (.xlsx)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Receita Estimada" icon={<DollarSign className="text-green-500" />} value={formatCurrency(stats?.totalRevenue)} sub="Soma total de todos os itens" />
                <StatCard title="Total de Clientes" icon={<Users className="text-blue-500" />} value={stats?.totalClients} sub="Clientes cadastrados" />
                <StatCard title="Pedidos Pendentes" icon={<Clock className="text-orange-500" />} value={stats?.pendingOrders} sub="Aguardando processamento" />
                <StatCard title="Itens Produzidos" icon={<Package className="text-purple-500" />} value={stats?.totalItemsProduced} sub="Volume total de peças" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/10 border-muted/20">
                    <CardHeader>
                        <CardTitle>Fluxo de Pedidos</CardTitle>
                        <CardDescription>Volume de pedidos nos últimos 7 dias</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <OrderChart data={stats?.salesChartData || []} />
                    </CardContent>
                </Card>

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20 w-full">
                    <CardHeader className="flex flex-col">
                        <div className="flex flex-row items-center gap-2">
                            <CardTitle className="text-foreground">Atividade Recente</CardTitle>
                            <ShoppingBag className="size-4 text-muted-foreground" />
                        </div>
                        <CardDescription className="text-xs text-muted-foreground">
                            Últimas atualizações de status e pagamentos
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">
                        <ScrollArea className="h-77.5 pr-4">
                            <HistoryOrdersChart stats={stats} />
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20 w-full">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Distribuição de Itens</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                            Análise por prefixo e comprimento dos códigos selecionados
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        {stats?.listAllCategory?.length > 0 ? (
                            <CategoryPieChart data={stats.listAllCategory} />
                        ) : (
                            <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg m-4">
                                <p className="text-muted-foreground text-sm italic">Sem dados de categorias.</p>
                            </div>
                        )}
                    </CardContent>
                    <div className="flex flex-col gap-2 p-4 pt-0">
                        <div className="flex items-center justify-center gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                                <span>ST</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full" style={{ backgroundColor: "var(--chart-5)" }} />
                                <span>MRRU</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full" style={{ backgroundColor: "var(--chart-1)" }} />
                                <span>Outros</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="size-2 rounded-full" style={{ backgroundColor: "var(--muted)" }} />
                                <span>N/I</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </motion.div>
    );
}