import { API_BASE } from "@/routes/api";
import { ValidationInputs } from "./validations/validation-inputs";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

export const SignIn = () => {
    const router = useRouter(); 
    const validateSignIn = ValidationInputs.signIn;

    const SIGN_IN_MUTATION = `
        mutation SignIn($input: LoginUserInput!) {
            signIn(input: $input) {
                message
                success
            }
        }
    `;

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
                
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
            } else {
                toast.error(message || "Falha na autenticação", { id: toastId });
            }

        } catch (error) {
            toast.error("Erro de rede.", { id: toastId });
        }
    };

    return { signIn }; 
}