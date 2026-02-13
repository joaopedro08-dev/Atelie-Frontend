import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const UpdateOrder = () => {
    const { authenticatedRequest } = useAuth();

    const UPDATE_ORDER_GROUP_MUTATION = `
        mutation UpdateOrderGroup($clientId: ID!, $dateOrder: String!, $input: OrderInput!) {
            updateOrderGroup(clientId: $clientId, dateOrder: $dateOrder, input: $input) {
                message
                success
            }
        }
    `;

    const updateOrderGroup = async (
        clientId: string | number,
        originalDateOrder: string,
        data: {
            methodPayment: string;
            status: string;
            installments: number;
            itemIds?: string[];
            dateOrder: Date;
            discount: number;
            totalPrice: number;
            dueDate: string;
        }
    ) => {
        try {
            const dueDateTime = new Date(data.dateOrder);
            dueDateTime.setDate(Number(data.dueDate));
            dueDateTime.setHours(12, 0, 0, 0);

            const result = await authenticatedRequest(UPDATE_ORDER_GROUP_MUTATION, {
                clientId: String(clientId),
                dateOrder: originalDateOrder,
                input: {
                    clientId: Number(clientId),
                    itemIds: data.itemIds ? data.itemIds.map(id => Number(id)) : [],
                    methodPayment: data.methodPayment,
                    status: data.status,
                    dateOrder: data.dateOrder.toISOString(),
                    installments: Number(data.installments),
                    totalPrice: Number(data.totalPrice || 0),
                    discount: Number(data?.discount || 0),
                    dueDate: dueDateTime.toISOString()
                }
            });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = result?.data?.updateOrderGroup;

            if (response?.success) {
                toast.success(response.message);
                return response;
            } else {
                toast.error(response?.message || "Erro na resposta do servidor.");
                return { success: false };
            }

        } catch (error) {
            console.error("UpdateOrder Error:", error);
            toast.error("Erro ao atualizar grupo de pedidos.");
            return { success: false };
        }
    };

    return { updateOrderGroup };
};