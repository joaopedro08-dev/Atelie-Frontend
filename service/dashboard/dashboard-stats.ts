import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { DASHBOARD_STATS_QUERY } from "@/types/query"

export const DashboardStats = () => {
    const { authenticatedRequest } = useAuth();

    const dashboardStats = async () => {
        try {
            const result = await authenticatedRequest(DASHBOARD_STATS_QUERY);
            if (!result) return [];

            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }

            return (result as { data: { getDashboardStats: unknown } }).data.getDashboardStats;
        } catch (error) {
            toast.error("Erro ao buscar os status.");
            return [];
        }
    };

    return { dashboardStats };
};