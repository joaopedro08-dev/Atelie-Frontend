import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const listAllItens = () => {
    const { authenticatedRequest } = useAuth();

    const LIST_ALL_ITENS = `
        query ListAllItems {
            listAllItems {
                id
                code
                unitPrice
                totalPrice
                createdAt
            }
        }
    `;

    const listItens = async () => {
        try {
            const result = await authenticatedRequest(LIST_ALL_ITENS);

            if (!result) return [];

            if (result.errors) {
                const errorMsg = result.errors[0].message;
                toast.error(errorMsg);
                return [];
            }

            return result.data.listAllItems;
        } catch (error) {
            toast.error("Erro ao buscar itens.");
            return [];
        }
    };

    return { listItens };
};