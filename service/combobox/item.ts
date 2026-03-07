import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface ItemData {
    id: string;
    itemCode: string;
    quantity: number;
}

interface QueryResult {
    data?: {
        listAllItemsByCode: ItemData[];
    };
    errors?: Array<{ message: string }>;
}

export const ListAllItemMin = () => {
    const { authenticatedRequest } = useAuth();

    const LIST_ITEM_ALL_QUERY = `
        query ListAllItemsByCode($currentItemIds: [ID]) {
            listAllItemsByCode(currentItemIds: $currentItemIds) {
                id
                itemCode
                quantity
            }
        }
    `;

    const listAllItemsByCode = async (currentItemIds: string[] = []) => {
        try {
            const result = await authenticatedRequest(LIST_ITEM_ALL_QUERY, {
                currentItemIds: currentItemIds.length > 0 ? currentItemIds : null
            }) as QueryResult;

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