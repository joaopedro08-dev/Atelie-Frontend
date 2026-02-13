"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Hash, DollarSign, Layers, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterItems } from "@/service/itens/register-itens"; 
import { ValidationInputs, ItemFormType } from "@/service/validations/validation-inputs";
import { useState } from "react";

interface ItemFormProps {
    onSuccess?: () => void;
}

export function ItemForm({ onSuccess }: ItemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { registerItems } = RegisterItems();

    const { 
        register, 
        reset,
        handleSubmit, 
        formState: { errors } 
    } = useForm<ItemFormType>({
        resolver: zodResolver(ValidationInputs.item),
        defaultValues: {
            multiplyBy: 1, 
            quantity: 1
        }
    });

    const onSubmit = async (data: ItemFormType) => {
        setIsLoading(true);
        const result = await registerItems(data);  
        setIsLoading(false);

        if (result?.success) {
            reset(); 
            if (onSuccess) onSuccess(); 
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
        >
            <motion.div 
                layout 
                className="rounded-lg border bg-card p-6 shadow-sm"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        <div className="space-y-2">
                            <Label htmlFor="code" className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-primary" /> Código
                            </Label>
                            <Input 
                                id="code" 
                                placeholder="Ex: MRRU23A" 
                                {...register("code")} 
                                className={`font-mono uppercase transition-all ${errors.code ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-primary" /> Preço
                            </Label>
                            <Input 
                                id="price" 
                                type="number" 
                                step="0.01" 
                                placeholder="0,00"
                                {...register("unitPrice", { valueAsNumber: true })} 
                                className={`transition-all ${errors.unitPrice ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="multiplyBy" className="flex items-center gap-2">
                                <X className="h-4 w-4 text-primary" /> Multiplicador
                            </Label>
                            <Input 
                                id="multiplyBy" 
                                type="number" 
                                placeholder="1"
                                {...register("multiplyBy", { valueAsNumber: true })} 
                                className={`transition-all ${errors.multiplyBy ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                            <AnimatePresence mode="popLayout">
                                {errors.multiplyBy && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive font-medium">
                                        {errors.multiplyBy.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-primary" /> Qtd Itens
                            </Label>
                            <Input 
                                id="quantity" 
                                type="number" 
                                {...register("quantity", { valueAsNumber: true })} 
                                className={`transition-all ${errors.quantity ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full md:w-auto min-w-40 relative overflow-hidden active:scale-95 transition-transform"
                        >
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div key="loader" className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
                                    </motion.div>
                                ) : (
                                    <motion.div key="content" className="flex items-center gap-2">
                                        <Save className="h-4 w-4" /> Cadastrar Lote
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}