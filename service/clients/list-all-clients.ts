import { useAuth } from "@/contexts/auth-context";
import { LIST_CLIENT_ALL_QUERY } from "@/types/query";
import { toast } from "sonner";

export const ListAllClients = () => {
    const { authenticatedRequest } = useAuth();

    const listClients = async () => {
        try {
            const result = await authenticatedRequest(LIST_CLIENT_ALL_QUERY);
            if (!result) return [];

            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }

            return (result.data as { listAllClients: unknown[] }).listAllClients;
        } catch (error) {
            toast.error("Erro ao buscar clientes.");
            return [];
        }
    };

    return { listClients };
};