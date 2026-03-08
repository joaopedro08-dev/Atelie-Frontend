import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { LIST_CLIENT_COMBOBOX_QUERY } from "@/types/query";

export const ListAllClientsMin = () => {
    const { authenticatedRequest } = useAuth();

    const listClientsMin = async (): Promise<Array<{ id: string; name: string }>> => {
        try {
            const result = await authenticatedRequest(LIST_CLIENT_COMBOBOX_QUERY) as { data?: { listAllClientsMin: Array<{ id: string; name: string }> }; errors?: Array<{ message: string }> } | null;
            if (!result) return [];

            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }

            return result.data?.listAllClientsMin ?? [];
        } catch (error) {
            toast.error("Erro ao buscar clientes.");
            return [];
        }
    };

    return { listClientsMin };
};