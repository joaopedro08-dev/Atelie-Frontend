import { API_BASE } from "@/routes/api";
import { ValidationInputs } from "./validations/validation-inputs";
import { z } from "zod";
import { toast } from "sonner";

export const SignUp = () => {
    const validateSignUp = ValidationInputs.signUp;

    const SIGN_UP_MUTATION = `
        mutation SignUp($input: RegisterUserInput!) {
            signUp(input: $input) {
                message
                success
            }
        }
    `;

    const signUp = async (data: z.infer<typeof validateSignUp>) => {
        const toastId = toast.loading("Criando sua conta...");

        try {
            const response = await fetch(API_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify({
                    query: SIGN_UP_MUTATION,
                    variables: {
                        input: {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            confirmPassword: data.confirmPassword
                        }
                    },
                }),
            });

            const result = await response.json();

            if (result.errors) {
                toast.error(result.errors[0].message, { id: toastId });
                return;
            }

            const { success, message } = result.data.signUp;

            if (success) {
                toast.success(message, { id: toastId });
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1500);
            } else {
                toast.error(message || "Erro ao realizar cadastro", { id: toastId });
            }

        } catch (error) {
            toast.error("Erro crítico de conexão.", { id: toastId });
            console.error("Erro no SignUp:", error);
        }
    };

    return { signUp };
}