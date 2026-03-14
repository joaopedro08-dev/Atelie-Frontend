import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { chartConfig, formatDateBR } from "../dashboard-page-content";

export function OrderChart({ data }: { data: any[] }) {
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