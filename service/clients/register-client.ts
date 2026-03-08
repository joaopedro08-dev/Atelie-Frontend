import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { REGISTER_CLIENT_MUTATION } from "@/types/query"

export const RegisterClient = () => {
    const { authenticatedRequest } = useAuth();

    const registerClient = async (data: { name: string; email: string; phone: string }) => {
        try {
            const result = await authenticatedRequest(REGISTER_CLIENT_MUTATION, { input: data });

            if (result?.errors) {
                toast.error(result.errors[0].message);
                return { success: false };
            }

            const response = (result.data as { registerClient: { message: string; success: boolean } }).registerClient;
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }

            return response;
        } catch (error) {
            toast.error("Erro ao cadastrar cliente.");
            return { success: false };
        }
    };

    return { registerClient };
};