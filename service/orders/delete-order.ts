import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const DeleteOrder = () => {
    const { authenticatedRequest } = useAuth();

    // Atualizado para usar a mutation de grupo
    const DELETE_ORDER_GROUP_MUTATION = `
        mutation DeleteOrderGroup($clientId: ID!, $dateOrder: String!) {
            deleteOrderGroup(clientId: $clientId, dateOrder: $dateOrder) {
                message
                success
            }
        }
    `;

    const deleteOrder = async (clientId: number | string, dateOrder: string) => {
        try {
            const result = await authenticatedRequest(DELETE_ORDER_GROUP_MUTATION, { 
                clientId: Number(clientId), 
                dateOrder 
            });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = result.data.deleteOrderGroup;
            
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }

            return response;
        } catch (error) {
            console.error("DeleteOrder Error:", error);
            toast.error("Erro ao excluir grupo de pedidos.");
            return { success: false };
        }
    };

    return { deleteOrder };
};