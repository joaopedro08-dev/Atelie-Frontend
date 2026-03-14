import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function StatCard({ title, icon, value, sub }: any) {
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