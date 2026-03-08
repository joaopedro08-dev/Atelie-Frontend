import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { DELETE_ITEM_MUTATION } from "@/types/query";

export const DeleteItem = () => {
    const { authenticatedRequest } = useAuth();

    const deleteItem = async (id: string) => {
        const toastId = toast.loading("Removendo item...");

        try {
            const result = await authenticatedRequest(DELETE_ITEM_MUTATION, { id });

            if (!result) return { success: false };

            if (result.errors) {
                toast.error(result.errors[0].message, { id: toastId });
                return { success: false };
            }

            const { success, message } = (result.data as any).deleteItem;

            if (success) {
                toast.success(message, { id: toastId });
                return { success: true };
            } else {
                toast.error(message, { id: toastId });
                return { success: false };
            }
        } catch (error) {
            toast.error("Erro de conexão com o servidor.", { id: toastId });
            return { success: false };
        }
    };

    return { deleteItem };
};