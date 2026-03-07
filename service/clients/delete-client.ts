import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const DeleteClient = () => {
    const { authenticatedRequest } = useAuth();

    const DELETE_CLIENT_MUTATION = `
        mutation DeleteClient($id: ID!) {
            deleteClient(id: $id) {
                message
                success
            }
        }
    `;

    const deleteClient = async (id: string) => {
        try {
            const result = await authenticatedRequest(DELETE_CLIENT_MUTATION, { id });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = (result.data as { deleteClient: { message: string; success: boolean } }).deleteClient;
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }

            return response;
        } catch (error) {
            toast.error("Erro ao excluir cliente.");
            return { success: false };
        }
    };

    return { deleteClient };
};