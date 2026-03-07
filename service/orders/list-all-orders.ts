import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const ListAllOrders = () => {
    const { authenticatedRequest } = useAuth();

    const LIST_ORDER_ALL_QUERY = `
        query ListAllOrders {
            listAllOrders {
                name
                email
                phone
                clientId
                totalPrice
                installments
                methodPayment
                status
                dateOrder
                dueDate
                itemsCount
                itemIds
            }
        }
    `;

    const listOrders = async () => {
        try {
            const result = await authenticatedRequest(LIST_ORDER_ALL_QUERY) as { data?: { listAllOrders: unknown[] }; errors?: Array<{ message: string }> };
            if (!result) return [];

            if (result.errors) {
                toast.error(result.errors[0].message);
                return [];
            }

            return result.data?.listAllOrders ?? [];
        } catch (error) {
            toast.error("Erro ao buscar pedidos.");
            return [];
        }
    };

    return { listOrders };
};