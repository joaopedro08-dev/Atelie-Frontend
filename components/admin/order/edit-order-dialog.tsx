"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpdateOrder } from "@/service/orders/update-order";
import { ComboboxItem } from "@/components/admin/actions/combobox-item";
import { ComboboxClient } from "@/components/admin/actions/combobox-client";
import { DatePicker } from "@/components/admin/actions/date-picker";
import { Loader2, Save, X, Hash, DollarSign, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { EditDialogProps } from "@/types/interface";

export function EditOrderDialog({ data, open, onOpenChange, onSuccess }: EditDialogProps) {
    const { updateOrderGroup } = UpdateOrder();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        clientId: "",
        itemIds: [] as string[],
        methodPayment: "",
        status: "",
        installments: 1,
        dateOrder: new Date(),
        totalPrice: 0,
        discount: 0,
        dueDate: "10"
    });

    useEffect(() => {
        if (data) {
            const rawValue = String(data.itemIds || "");
            const cleanedValue = rawValue.replace(/[\[\]\s]/g, "");
            const idsArray = cleanedValue ? cleanedValue.split(",") : [];
            const initialDay = data.dueDate ? new Date(data.dueDate).getDate().toString() : "10";

            setFormData({
                clientId: String(data.clientId || ""),
                itemIds: idsArray,
                methodPayment: data.methodPayment || "SYSTEM",
                status: data.status || "PENDING",
                installments: data.installments || 1,
                dateOrder: data.dateOrder ? new Date(data.dateOrder) : data.datedata ? new Date(data.datedata) : new Date(),
                totalPrice: Number(data.totalPrice || 0),
                discount: Number(data.discount || 0),
                dueDate: initialDay
            });
        }
    }, [data, open]);

    const handleSave = async () => {
        if (!formData.clientId || !formData.dateOrder) {
            toast.error("Dados insuficientes para atualização.");
            return;
        }

        setIsLoading(true);
        try {
            const isoDateOrder = formData.dateOrder.toISOString();

            const payload = {
                ...formData,
                dateOrder: isoDateOrder 
            };

            const result = await updateOrderGroup(data.clientId, data.dateOrder, payload);

            if (result?.success) {
                onOpenChange(false);
                onSuccess();
            } else {
                toast.error((result as any)?.message || "Erro ao atualizar pedido.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro na comunicação com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    const getInstallmentOptions = () => {
        const max = formData.methodPayment === "CARD" ? 6 : formData.methodPayment === "INSTALLMENT_PLAN" ? 3 : 1;
        return Array.from({ length: max }, (_, i) => i + 1);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-none shadow-2xl bg-card flex flex-col max-h-[90vh]">
                <DialogHeader className="p-6 bg-muted/20 border-b shrink-0">
                    <DialogTitle className="text-xl flex items-center gap-2">
                        Editar Pedido <span className="text-primary">#{String(data?.clientId).slice(-5)}</span>
                    </DialogTitle>
                    <DialogDescription>Ajuste as informações abaixo para atualizar o registro.</DialogDescription>
                </DialogHeader>

                <div className="flex-1 w-full p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Cliente</Label>
                            <ComboboxClient value={formData.clientId} onChange={(val) => setFormData({ ...formData, clientId: val })} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Itens</Label>
                            <ComboboxItem selectedIds={formData.itemIds} onChange={(vals) => setFormData((prev) => ({ ...prev, itemIds: vals }))} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Data do Pedido</Label>
                            <DatePicker
                                date={formData.dateOrder}
                                setDate={(newDate) => {
                                    if (newDate) setFormData({ ...formData, dateOrder: newDate });
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Status</Label>
                            <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val || "" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pendente</SelectItem>
                                    <SelectItem value="IN_PROGRESS">Em Produção</SelectItem>
                                    <SelectItem value="COMPLETED">Concluído</SelectItem>
                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" /> Valor (R$)
                            </Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.totalPrice}
                                onChange={(e) => setFormData({ ...formData, totalPrice: Number(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                <CalendarRange className="h-3 w-3" /> Dia de Vencimento
                            </Label>
                            <Select value={formData.dueDate} onValueChange={(val) => setFormData({ ...formData, dueDate: val || "" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Dia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Dia 01</SelectItem>
                                    <SelectItem value="10">Dia 10</SelectItem>
                                    <SelectItem value="20">Dia 20</SelectItem>
                                    <SelectItem value="30">Dia 30</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground">Pagamento</Label>
                            <Select value={formData.methodPayment} onValueChange={(val) => setFormData({ ...formData, methodPayment: val || "", installments: 1 })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Forma de Pagamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SYSTEM">Pix</SelectItem>
                                    <SelectItem value="CARD">Cartão</SelectItem>
                                    <SelectItem value="INSTALLMENT_PLAN">Crediário</SelectItem>
                                    <SelectItem value="LOYAL_CUSTOMER">Fidelizado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1">
                                <Hash className="h-3 w-3" /> Parcelas
                            </Label>
                            <Select
                                value={formData.installments.toString()}
                                onValueChange={(val) => setFormData({ ...formData, installments: Number(val) })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Parcelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getInstallmentOptions().map(opt => (
                                        <SelectItem key={opt} value={opt.toString()}>{opt}x</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 bg-muted/10 border-t shrink-0 flex gap-3">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="gap-2">
                        <X className="h-4 w-4" /> Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="gap-2 bg-primary min-w-35">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}