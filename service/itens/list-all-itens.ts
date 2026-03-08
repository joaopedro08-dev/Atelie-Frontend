import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { LIST_ALL_ITENS } from "@/types/query";

export const listAllItens = () => {
    const { authenticatedRequest } = useAuth();

    const listItens = async () => {
        try {
            const result = await authenticatedRequest(LIST_ALL_ITENS);

            if (!result) return [];

            if (result.errors) {
                const errorMsg = result.errors[0].message;
                toast.error(errorMsg);
                return [];
            }

            return (result.data as { listAllItems: unknown[] }).listAllItems;
        } catch (error) {
            toast.error("Erro ao buscar itens.");
            return [];
        }
    };

    return { listItens };
};