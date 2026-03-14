import { Badge } from "@/components/ui/badge";
import { paymentTranslations, statusTranslations } from "@/types/record";
import { CreditCard, DollarSign } from "lucide-react";
import { formatDateBR } from "../dashboard-page-content";

export function HistoryOrdersChart({ stats }: { stats: any }) {
    return (
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
    )
}