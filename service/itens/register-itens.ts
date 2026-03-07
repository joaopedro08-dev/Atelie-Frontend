import { useAuth } from "@/contexts/auth-context";
import { ValidationInputs } from "../validations/validation-inputs";
import { z } from "zod";
import { toast } from "sonner";

export const RegisterItems = () => {
  const { authenticatedRequest } = useAuth();
  const validateItem = ValidationInputs.item;

  const REGISTER_ITEMS_MUTATION = `
    mutation RegisterItems($input: ItemInput!) {
      registerItems(input: $input) {
        message
        success
      }
    }
  `;

  const registerItems = async (data: z.infer<typeof validateItem>) => {
    const toastId = toast.loading("Cadastrando itens...");

    try {
      const result = await authenticatedRequest(REGISTER_ITEMS_MUTATION, {
        input: {
          code: data.code,
          unitPrice: data.unitPrice,
          multiplyBy: data.multiplyBy,
          quantity: data.quantity
        }
      });

      if (!result) return { success: false };

      if (result.errors) {
        const errorMsg = result.errors[0].message;
        toast.error(errorMsg, { id: toastId });
        return { success: false };
      }

      const { success, message } = (result.data as { registerItems: { success: boolean; message: string } }).registerItems;

      if (success) {
        toast.success(message, { id: toastId });
        return { success: true };
      } else {
        toast.error(message || "Falha ao cadastrar item", { id: toastId });
        return { success: false };
      }

    } catch (error) {
      toast.error("Erro de comunicação com o servidor.", { id: toastId });
      return { success: false };
    }
  };

  return { registerItems };
};