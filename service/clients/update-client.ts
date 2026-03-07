import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export const UpdateClient = () => {
    const { authenticatedRequest } = useAuth();

    const UPDATE_CLIENT_MUTATION = `
        mutation UpdateClient($id: ID!, $input: ClientInput!) {
            updateClient(id: $id, input: $input) {
                message
                success
            }
        }
    `;

    const updateClient = async (id: string, data: { name: string; email: string; phone: string }) => {
        try {
            const result = await authenticatedRequest(UPDATE_CLIENT_MUTATION, { 
                id: id, 
                input: data 
            });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = (result.data as { updateClient: { message: string; success: boolean } }).updateClient;
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }

            return response;
        } catch (error) {
            toast.error("Erro ao atualizar cliente.");
            return { success: false };
        }
    };

    return { updateClient };
};