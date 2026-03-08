import { API_BASE } from "@/api/api";
import { ValidationInputs } from "./validations/validation-inputs";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { SIGN_IN_MUTATION } from "@/types/query";

export const SignIn = () => {
    const { refreshUser } = useAuth();
    const validateSignIn = ValidationInputs.signIn;

    const signIn = async (data: z.infer<typeof validateSignIn>) => {
        const toastId = toast.loading("Autenticando...");

        try {
            const response = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    query: SIGN_IN_MUTATION,
                    variables: {
                        input: { email: data.email, password: data.password }
                    },
                }),
            });

            const result = await response.json();

            if (result.errors) {
                toast.error(result.errors[0].message, { id: toastId });
                return;
            }

            const { success, message } = result.data.signIn;

            if (success) {
                toast.success(message, { id: toastId });
                await refreshUser();
            } else {
                toast.error(message || "Falha na autenticação", { id: toastId });
            }

        } catch (error) {
            toast.error("Erro de rede.", { id: toastId });
        }
    };

    return { signIn };
}