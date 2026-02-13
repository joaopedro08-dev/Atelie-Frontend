"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    DollarSign,
    Users,
    ShoppingBag,
    Clock,
    Package,
    FileDown,
    FileText,
    Table as TableIcon,
    Loader2,
    CreditCard
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardStats } from "@/service/dashboard/dashboard-stats";
import { ScrollArea } from "@/components/ui/scroll-area";
import { exportDashboardToExcel } from "@/service/export/dashboard-xlsx";
import { exportDashboardToPDF } from "@/service/export/dashboard-pdf";

const chartConfig = {
    count: {
        label: "Pedidos",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

const paymentTranslations: Record<string, string> = {
    SYSTEM: "Pix",
    CARD: "Cartão",
    INSTALLMENT_PLAN: "Crediário",
    LOYAL_CUSTOMER: "Cliente Fidelizado"
};

const statusTranslations: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
    IN_PROGRESS: { label: "Em Produção", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    COMPLETED: { label: "Concluído", color: "bg-green-500/10 text-green-600 border-green-200" },
    CANCELED: { label: "Cancelado", color: "bg-red-500/10 text-red-600 border-red-200" },
};

const formatDateBR = (dateString: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

function OrderChart({ data }: { data: any[] }) {
    const formattedData = data.map(item => ({
        ...item,
        date: item.date.split(" ")[0]
    }));

    return (
        <ChartContainer config={chartConfig} className="h-75 w-full">
            <BarChart accessibilityLayer data={formattedData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                        const [year, month, day] = value.split("-");
                        return `${day}/${month}`;
                    }}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            labelFormatter={(value) => {
                                const [year, month, day] = value.split("-");
                                return `${day}/${month}/${year}`;
                            }}
                        />
                    }
                />
                <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                />
            </BarChart>
        </ChartContainer>
    );
}

export default function DashboardPage() {
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
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    };

    const handleExport = (format: 'pdf' | 'excel') => {
        if (!stats) return;

        if (format === 'pdf') {
            exportDashboardToPDF(stats, paymentTranslations, statusTranslations);
        } else {
            exportDashboardToExcel(stats, paymentTranslations, statusTranslations);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Painel Administrativo</h1>
                    <p className="text-muted-foreground">Visão geral do seu ateliê hoje.</p>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="gap-2">
                                <FileDown className="size-4" />
                                Exportar
                            </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleExport('pdf')} disabled={loading || !stats} className="gap-2 cursor-pointer">
                                <FileText className="size-4 text-red-500" />
                                Salvar como PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('excel')} disabled={loading || !stats} className="gap-2 cursor-pointer">
                                <TableIcon className="size-4 text-green-600" />
                                Salvar como Excel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Receita Estimada</CardTitle>
                        <DollarSign className="size-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {loading ? <Loader2 className="animate-spin size-5" /> : formatCurrency(stats?.totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">Soma total de todos os itens</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total de Clientes</CardTitle>
                        <Users className="size-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {loading ? <Loader2 className="animate-spin size-5" /> : stats?.totalClients || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Clientes cadastrados na base</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Pendentes</CardTitle>
                        <Clock className="size-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {loading ? <Loader2 className="animate-spin size-5" /> : stats?.pendingOrders || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Aguardando processamento</p>
                    </CardContent>
                </Card>

                <Card className="bg-card/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Itens Produzidos</CardTitle>
                        <Package className="size-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {loading ? <Loader2 className="animate-spin size-5" /> : stats?.totalItemsProduced || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Volume total de peças</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/10 border-muted/20">
                    <CardHeader>
                        <CardTitle className="text-foreground">Fluxo de Pedidos</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                        {loading ? (
                            <div className="h-75 flex items-center justify-center">
                                <Loader2 className="animate-spin size-8 text-primary" />
                            </div>
                        ) : stats?.salesChartData?.length > 0 ? (
                            <OrderChart data={stats.salesChartData} />
                        ) : (
                            <div className="h-75 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
                                <p className="text-muted-foreground text-sm italic">Nenhum dado disponível.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20 w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-foreground">Atividade Recente</CardTitle>
                        <ShoppingBag className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="w-full">
                        <ScrollArea className="h-77.5 pr-4">
                            <div className="space-y-6">
                                {loading ? (
                                    <div className="flex justify-center py-4">
                                        <Loader2 className="animate-spin size-6 text-primary" />
                                    </div>
                                ) : stats?.listAllRecentyActivity?.length > 0 ? (
                                    stats.listAllRecentyActivity.map((activity: any, index: number) => {
                                        const statusInfo = statusTranslations[activity.status] || { label: activity.status, color: "" };
                                        const paymentLabel = paymentTranslations[activity.methodPayment] || activity.methodPayment;

                                        return (
                                            <div key={index} className="flex items-start sm:items-center gap-4 py-2">
                                                <div className="size-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                                                    {activity.methodPayment === 'SYSTEM' ? (
                                                        <DollarSign className="size-4 text-primary" />
                                                    ) : (
                                                        <CreditCard className="size-4 text-primary" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <p className="text-sm font-medium leading-none text-foreground truncate">
                                                        {activity.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Pedido #{activity.itemId} • {paymentLabel}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    <Badge variant="outline" className={`${statusInfo.color} text-[10px] sm:text-xs whitespace-nowrap`}>
                                                        {statusInfo.label}
                                                    </Badge>
                                                    <p className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                        {formatDateBR(activity.dateOrder)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-muted-foreground italic text-center py-4">
                                        Nenhuma atividade encontrada.
                                    </p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}