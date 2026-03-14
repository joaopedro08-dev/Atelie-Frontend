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
    CreditCard
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Label } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { paymentTranslations, statusTranslations } from "@/types/record";

const chartConfig = {
    count: { label: "Pedidos", color: "var(--primary)" },
    st: { label: "ST", color: "var(--primary)" },
    mrru: { label: "MRRU", color: "var(--chart-5)" },
    outros: { label: "Outros", color: "var(--chart-1)" },
    ni: { label: "N/I", color: "var(--muted)" },
} satisfies ChartConfig;

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

// Skeletons
function StatCardSkeleton() {
    return (
        <Card className="bg-card/10 border-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="size-5 rounded-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-3 w-36" />
            </CardContent>
        </Card>
    )
}

function ChartSkeleton() {
    const heights = [45, 70, 55, 80, 40, 65, 50]
    return (
        <div className="h-75 flex items-end gap-3 px-4 pb-4">
            {heights.map((h, i) => (
                <Skeleton key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
            ))}
        </div>
    )
}

function ActivitySkeleton() {
    return (
        <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                    <Skeleton className="size-9 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function PieSkeleton() {
    return (
        <div className="flex justify-center items-center h-64">
            <Skeleton className="size-48 rounded-full" />
        </div>
    )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-9 w-28" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-card/10 border-muted/20">
                    <CardHeader>
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3 w-52" />
                    </CardHeader>
                    <CardContent className="pt-2">
                        <ChartSkeleton />
                    </CardContent>
                </Card>

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20">
                    <CardHeader>
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3 w-52" />
                    </CardHeader>
                    <CardContent>
                        <ActivitySkeleton />
                    </CardContent>
                </Card>

                <Card className="col-span-4 lg:col-span-3 bg-card/10 border-muted/20">
                    <CardHeader className="items-center">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </CardHeader>
                    <CardContent>
                        <PieSkeleton />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ title, icon, value, sub }: any) {
    return (
        <Card className="bg-card/10 border-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <p className="text-xs text-muted-foreground">{sub}</p>
            </CardContent>
        </Card>
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
                            <div className="space-y-6">
                                {stats?.listAllRecentyActivity?.length > 0 ? (
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
                                                    <p className="text-sm font-medium leading-none text-foreground truncate">{activity.name}</p>
                                                    <p className="text-xs text-muted-foreground">Pedido #{activity.itemId} • {paymentLabel}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 shrink-0">
                                                    <Badge variant="outline" className={`${statusInfo.color} text-[10px] sm:text-xs whitespace-nowrap`}>
                                                        {statusInfo.label}
                                                    </Badge>
                                                    <p className="text-[10px] text-muted-foreground whitespace-nowrap">{formatDateBR(activity.dateOrder)}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-muted-foreground italic text-center py-4">Nenhuma atividade encontrada.</p>
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