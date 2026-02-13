"use client";

import { useAuth } from "@/contexts/auth-context";
import { ValidationInputs } from "../validations/validation-inputs"; 
import { z } from "zod";
import { toast } from "sonner";

export const UpdateItem = () => {
    const { authenticatedRequest } = useAuth();
    const validateItem = ValidationInputs.itemUpdate;

    const UPDATE_ITEM_MUTATION = `
        mutation UpdateItem($id: ID!, $input: ItemInputUpdate!) {
            updateItem(id: $id, input: $input) {
                message
                success
            }
        }
    `;

    const updateItem = async (id: string, data: z.infer<typeof validateItem>) => {
        const toastId = toast.loading("Atualizando item...");

        try {
            const result = await authenticatedRequest(UPDATE_ITEM_MUTATION, {
                id,
                input: {
                    code: data.code,
                    unitPrice: data.unitPrice,
                    totalPrice: data.totalPrice
                }
            });

            if (!result) return { success: false };

            if (result.errors) {
                toast.error(result.errors[0].message, { id: toastId });
                return { success: false };
            }

            const { success, message } = result.data.updateItem;

            if (success) {
                toast.success(message, { id: toastId });
                return { success: true };
            } else {
                toast.error(message, { id: toastId });
                return { success: false };
            }

        } catch (error) {
            toast.error("Erro de conexão.", { id: toastId });
            return { success: false };
        }
    };

    return { updateItem }; 
};