"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateItem } from "@/service/itens/update-item";

interface EditItemDialogProps {
    item: any | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function EditItemDialog({ item, open, onOpenChange, onSuccess }: EditItemDialogProps) {
    const { updateItem } = UpdateItem();
    const [formData, setFormData] = useState({ code: "", unitPrice: 0, totalPrice: 0 });

    useEffect(() => {
        if (item) {
            setFormData({ code: item.code, unitPrice: item.unitPrice, totalPrice: item.totalPrice });
        }
    }, [item]);

    const handleSave = async () => {
        if (!item) return;

        const result = await updateItem(item.id, {
            code: formData.code,
            unitPrice: formData.unitPrice,
            totalPrice: formData.totalPrice
        });

        if (result.success) {
            onOpenChange(false);
            onSuccess();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-112.5">
                <DialogHeader>
                    <DialogTitle>Editar Item</DialogTitle>
                    <DialogDescription>
                        Altere as informações do item e clique em salvar.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="code">Código do Produto</Label>
                        <Input
                            id="code"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                            placeholder="EX: ABC-123"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Preço Unit (R$)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.unitPrice}
                            onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="totalPrice">Preço Total (R$)</Label>
                        <Input
                            id="totalPrice"
                            type="number"
                            step="0.01"
                            value={formData.totalPrice}
                            onChange={(e) => setFormData({ ...formData, totalPrice: Number(e.target.value) })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}