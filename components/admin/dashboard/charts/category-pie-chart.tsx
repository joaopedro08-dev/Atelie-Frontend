import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { chartConfig } from "../dashboard-page-content";
import { Cell, Label, Pie, PieChart } from "recharts";

export function CategoryPieChart({ data }: { data: any[] }) {
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