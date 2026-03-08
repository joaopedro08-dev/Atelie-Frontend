"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Save, User, Mail, Phone, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterClient } from "@/service/clients/register-client";

export function ClientForm({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const { registerClient } = RegisterClient();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { name: "", email: "", phone: "" }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const result = await registerClient(data);
            if (result.success) {
                reset(); 
                if (onSuccess) onSuccess(); 
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <motion.div layout className="rounded-lg border bg-card p-6 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" /> Nome Completo
                            </Label>
                            <Input 
                                id="name" 
                                {...register("name", { required: "Obrigatório" })} 
                                className={errors.name ? "border-destructive" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" /> E-mail
                            </Label>
                            <Input 
                                id="email" 
                                type="email"
                                {...register("email", { required: "Obrigatório" })} 
                                className={errors.email ? "border-destructive" : ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" /> Telefone
                            </Label>
                            <Input 
                                id="phone" 
                                {...register("phone", { required: "Obrigatório" })} 
                                className={errors.phone ? "border-destructive" : ""}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t">
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto min-w-40">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div key="loader" className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
                                    </motion.div>
                                ) : (
                                    <motion.div key="content" className="flex items-center gap-2">
                                        <Save className="h-4 w-4" /> Cadastrar Cliente
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