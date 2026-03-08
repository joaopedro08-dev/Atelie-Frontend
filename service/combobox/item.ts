import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { LIST_ITEM_COMBOBOX_QUERY } from "@/types/query";

export const ListAllItemMin = () => {
    const { authenticatedRequest } = useAuth();

    const listAllItemsByCode = async (currentItemIds: string[] = []) => {
        try {
            const result = await authenticatedRequest(LIST_ITEM_COMBOBOX_QUERY, { currentItemIds: currentItemIds.length > 0 ? currentItemIds : null }) as { data?: { listAllItemsByCode: Array<{ id: string; code: string }> }; errors?: Array<{ message: string }> } | null;

            if (!result) return [];
            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }
            return result.data?.listAllItemsByCode ?? [];
        } catch (error) {
            toast.error("Erro ao buscar itens.");
            return [];
        }
    };

    return { listAllItemsByCode };
};