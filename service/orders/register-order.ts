import { useAuth } from "@/contexts/auth-context";
import { format, isValid, setHours, setMinutes, setSeconds, addMonths } from "date-fns";
import { toast } from "sonner";

export const RegisterOrder = () => {
    const { authenticatedRequest } = useAuth();

    const REGISTER_ORDER_MUTATION = `
        mutation RegisterOrder($input: OrderInput!) {
            registerOrder(input: $input) {
                message
                success
            }
        }
    `;

    const registerOrder = async (data: any) => {
        try {
            if (!data.dateOrder || !isValid(new Date(data.dateOrder))) {
                toast.error("Data do pedido inválida.");
                return { success: false };
            }

            const now = new Date();
            const selectedDay = Number(data.dueDate);
            let dueDateObj = new Date(now.getFullYear(), now.getMonth(), selectedDay);
            
            dueDateObj = setHours(setMinutes(setSeconds(dueDateObj, 0), 0), 12);

            if (dueDateObj < now) {
                dueDateObj = addMonths(dueDateObj, 1);
            }

            const formattedInput = {
                clientId: Number(data.clientId),
                itemIds: Array.isArray(data.itemId)
                    ? data.itemId.map((id: string) => Number(id))
                    : [Number(data.itemId)],
                methodPayment: data.methodPayment,
                installments: Number(data.installments),
                status: data.status,
                dateOrder: format(new Date(data.dateOrder), "yyyy-MM-dd'T'HH:mm:ss"),
                dueDate: format(dueDateObj, "yyyy-MM-dd'T'HH:mm:ss"), 
                discount: Number(data.discount || 0) 
            };

            if (isNaN(formattedInput.clientId) || formattedInput.itemIds.some(isNaN)) {
                toast.error("Verifique se o cliente e os itens foram selecionados.");
                return { success: false };
            }

            const result = await authenticatedRequest(REGISTER_ORDER_MUTATION, {
                input: formattedInput
            });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = result?.data?.registerOrder;

            if (response?.success) {
                toast.success(response.message);
                return response;
            } else {
                toast.error(response?.message || "Erro ao salvar pedido.");
                return { success: false };
            }

        } catch (error) {
            console.error("Erro no Service RegisterOrder:", error);
            toast.error("Erro na comunicação com o servidor.");
            return { success: false };
        }
    };

    return { registerOrder };
};