"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Save, User, Package, CreditCard, CalendarDays, Loader2, Activity, Hash, Percent, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RegisterOrder } from "@/service/orders/register-order";
import { ValidationInputs, OrderFormType } from "@/service/validations/validation-inputs";
import { ComboboxItem } from "@/components/admin/actions/combobox-item";
import { ComboboxClient } from "@/components/admin/actions/combobox-client";
import { DatePicker } from "@/components/admin/actions/date-picker";

interface OrderFormProps {
    onSuccess?: () => void;
}

export function OrderForm({ onSuccess }: OrderFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { registerOrder } = RegisterOrder();

    const { control, reset, setValue, handleSubmit, formState: { errors } } = useForm<OrderFormType>({
        resolver: zodResolver(ValidationInputs.order) as any,
        defaultValues: {
            methodPayment: "SYSTEM" as any,
            status: "PENDING",
            dateOrder: new Date(),
            installments: 1,
            itemId: [],
            clientId: "",
            discount: 0,
            dueDate: "1"
        }
    });

    const methodPayment = useWatch({ control, name: "methodPayment" });

    useEffect(() => {
        if (methodPayment === "SYSTEM" || methodPayment === "LOYAL_CUSTOMER") {
            setValue("installments", 1);
        }
    }, [methodPayment, setValue]);

    const onSubmit = async (data: OrderFormType) => {
        setIsLoading(true);
        const result = await registerOrder(data);
        setIsLoading(false);

        if (result?.success) {
            reset();
            if (onSuccess) onSuccess();
        }
    };

    const getInstallmentOptions = () => {
        const max = methodPayment === "CARD" ? 6 : methodPayment === "INSTALLMENT_PLAN" ? 3 : 1;
        return Array.from({ length: max }, (_, i) => i + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
        >
            <motion.div layout className="rounded-lg border bg-card p-6 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-primary" /> Data do Pedido
                            </Label>
                            <Controller
                                name="dateOrder"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker date={field.value} setDate={field.onChange} />
                                )}
                            />
                            {errors.dateOrder && (
                                <p className="text-xs text-destructive font-medium">{errors.dateOrder.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-primary" /> Vencimento
                            </Label>
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`w-full errors.dueDate ? "border-destructive" : ""`}>
                                            <SelectValue placeholder="Dia" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Dia 01</SelectItem>
                                            <SelectItem value="10">Dia 10</SelectItem>
                                            <SelectItem value="20">Dia 20</SelectItem>
                                            <SelectItem value="30">Dia 30</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" /> Cliente
                            </Label>
                            <Controller
                                name="clientId"
                                control={control}
                                render={({ field }) => (
                                    <ComboboxClient value={field.value} onChange={field.onChange} />
                                )}
                            />
                            {errors.clientId && (
                                <p className="text-xs text-destructive font-medium">{errors.clientId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-primary" /> Itens
                            </Label>
                            <Controller
                                name="itemId"
                                control={control}
                                render={({ field }) => (
                                    <ComboboxItem
                                        selectedIds={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.itemId && (
                                <p className="text-xs text-destructive font-medium">
                                    {errors.itemId.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-primary" /> Pagamento
                            </Label>
                            <Controller
                                name="methodPayment"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || "SYSTEM"}>
                                        <SelectTrigger className={`w-full h-10 transition-all ${errors.methodPayment ? "border-destructive" : ""}`}>
                                            <SelectValue placeholder="Selecione o pagamento...">
                                                {field.value === "SYSTEM" ? "PIX" :
                                                    field.value === "CARD" ? "CARTÃO" :
                                                        field.value === "INSTALLMENT_PLAN" ? "CREDIÁRIO" :
                                                            field.value === "LOYAL_CUSTOMER" ? "CLIENTE FIDELIZADO" : field.value}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SYSTEM">PIX</SelectItem>
                                            <SelectItem value="CARD">CARTÃO</SelectItem>
                                            <SelectItem value="INSTALLMENT_PLAN">CREDIÁRIO</SelectItem>
                                            <SelectItem value="LOYAL_CUSTOMER">CLIENTE FIDELIZADO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.methodPayment && (
                                <p className="text-xs text-destructive font-medium">{errors.methodPayment.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-primary" /> Parcelas
                            </Label>
                            <Controller
                                name="installments"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        disabled={methodPayment === "SYSTEM" || methodPayment === "LOYAL_CUSTOMER" || !methodPayment}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                        value={field.value?.toString()}
                                    >
                                        <SelectTrigger className="w-full h-10">
                                            <SelectValue placeholder="Parcelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getInstallmentOptions().map(opt => (
                                                <SelectItem key={opt} value={opt.toString()}>{opt}x</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Percent className="h-4 w-4 text-primary" /> Desconto (R$)
                            </Label>
                            <Controller
                                name="discount"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0,00"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className={errors.discount ? "border-destructive" : ""}
                                    />
                                )}
                            />
                            {errors.discount && (
                                <p className="text-xs text-destructive font-medium">{errors.discount.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" /> Status
                            </Label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={`w-full h-10 transition-all ${errors.status ? "border-destructive" : ""}`}>
                                            <SelectValue>
                                                {field.value === "PENDING" ? "PENDENTE" :
                                                    field.value === "IN_PROGRESS" ? "EM PRODUÇÃO" :
                                                        field.value === "COMPLETED" ? "CONCLUÍDO" :
                                                            field.value === "CANCELED" ? "CANCELADO" : field.value}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">PENDENTE</SelectItem>
                                            <SelectItem value="IN_PROGRESS">EM PRODUÇÃO</SelectItem>
                                            <SelectItem value="COMPLETED">CONCLUÍDO</SelectItem>
                                            <SelectItem value="CANCELED">CANCELADO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.status && (
                                <p className="text-xs text-destructive font-medium">{errors.status.message}</p>
                            )}
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
                                        <Save className="h-4 w-4" /> Finalizar Pedido
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