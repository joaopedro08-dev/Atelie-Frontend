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
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Label } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { exportDashboardToExcel } from "@/service/export/dashboard/dashboard-xlsx";
import { exportDashboardToPDF } from "@/service/export/dashboard/dashboard-pdf";

const chartConfig = {
    count: { label: "Pedidos", color: "var(--primary)" },
    st: { label: "ST", color: "var(--primary)" },
    mrru: { label: "MRRU", color: "var(--chart-5)" },
    outros: { label: "Outros", color: "var(--chart-1)" },
    ni: { label: "N/I", color: "var(--muted)" },
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
    const formattedData = data.map(item => ({ ...item, date: item.date.split(" ")[0] }));
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
                        const [y, m, d] = value.split("-");
                        return `${d}/${m}`;
                    }}
                />
                <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => formatDateBR(v)} />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
        </ChartContainer>
    );
}

function CategoryPieChart({ data }: { data: any[] }) {
    const getColor = (name: string) => {
        if (name === "ST") return "var(--primary)";
        if (name === "MRRU") return "var(--chart-5)";
        if (name === "Outros") return "var(--chart-1)";
        return "var(--muted)";
    };
    const totalItens = data?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={data} dataKey="quantity" nameKey="category" innerRadius={60} strokeWidth={5}>
                    {data?.map((entry, index) => <Cell key={index} fill={getColor(entry.category)} />)}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">{totalItens}</tspan>
                                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs uppercase">Total</tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
}

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
                            <Button disabled={loading || !stats} variant="outline" className="gap-2">
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
                <StatCard title="Receita Estimada" icon={<DollarSign className="text-green-500" />} value={loading ? "..." : formatCurrency(stats?.totalRevenue)} sub="Soma total de todos os itens" loading={loading} />
                <StatCard title="Total de Clientes" icon={<Users className="text-blue-500" />} value={loading ? "..." : stats?.totalClients} sub="Clientes cadastrados" loading={loading} />
                <StatCard title="Pedidos Pendentes" icon={<Clock className="text-orange-500" />} value={loading ? "..." : stats?.pendingOrders} sub="Aguardando processamento" loading={loading} />
                <StatCard title="Itens Produzidos" icon={<Package className="text-purple-500" />} value={loading ? "..." : stats?.totalItemsProduced} sub="Volume total de peças" loading={loading} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/10 border-muted/20">
                    <CardHeader>
                        <CardTitle>Fluxo de Pedidos</CardTitle>
                        <CardDescription>Volume de pedidos nos últimos 7 dias</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        {loading ? <div className="h-75 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div> : <OrderChart data={stats?.salesChartData || []} />}
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

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20 w-full">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Distribuição de Itens</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">
                            Análise por prefixo e comprimento dos códigos selecionados
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        {loading ? (
                            <div className="h-64 flex items-center justify-center">
                                <Loader2 className="animate-spin size-8 text-primary" />
                            </div>
                        ) : stats?.listAllCategory?.length > 0 ? (
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

function StatCard({ title, icon, value, sub, loading }: any) {
    return (
        <Card className="bg-card/10 border-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{loading ? <Loader2 className="animate-spin size-4" /> : value}</div>
                <p className="text-xs text-muted-foreground">{sub}</p>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ activity }: any) {
    const statusInfo = statusTranslations[activity.status] || { label: activity.status, color: "" };
    return (
        <div className="flex items-center gap-4 py-2">
            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="size-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.name}</p>
                <p className="text-xs text-muted-foreground">Pedido #{activity.itemId}</p>
            </div>
            <Badge variant="outline" className={`${statusInfo.color} text-[10px]`}>{statusInfo.label}</Badge>
        </div>
    );
}