import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const DashboardStats = () => {
    const { authenticatedRequest } = useAuth();

    const DASHBOARD_STATS_QUERY = `
        query GetDashboardStats {
            getDashboardStats {
                totalRevenue
                totalClients
                pendingOrders
                totalItemsProduced
                salesChartData {
                    date
                    count
                }
                listAllRecentyActivity {
                      name
                      itemId
                      methodPayment
                      status
                      dateOrder
                }
            }
        }
    `;

    const dashboardStats = async () => {
        try {
            const result = await authenticatedRequest(DASHBOARD_STATS_QUERY);
            if (!result) return [];

            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }

            return result.data.getDashboardStats;
        } catch (error) {
            toast.error("Erro ao buscar os status.");
            return [];
        }
    };

    return { dashboardStats };
};