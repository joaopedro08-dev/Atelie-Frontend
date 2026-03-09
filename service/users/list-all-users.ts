import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { LIST_ALL_USERS } from "@/types/query";

export const listAllUsers = () => {
    const { authenticatedRequest } = useAuth();

    const listUsers = async () => {
        try {
            const result = await authenticatedRequest(LIST_ALL_USERS);

            if (!result) return [];

            if (result.errors) {
                const errorMsg = result.errors[0].message;
                toast.error(errorMsg);
                return [];
            }

            return (result.data as { findAllByUsers: unknown[] }).findAllByUsers;
        } catch (error) {
            toast.error("Erro ao buscar usuários.");
            return [];
        }
    };

    return { listUsers };
};