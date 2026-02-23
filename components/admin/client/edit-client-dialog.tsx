"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateClient } from "@/service/clients/update-client"; 

interface EditClientDialogProps {
    client: any | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function EditClientDialog({ client, open, onOpenChange, onSuccess }: EditClientDialogProps) {
    const { updateClient } = UpdateClient();
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "" 
    });

    useEffect(() => {
        if (client) {
            setFormData({ 
                name: client.name, 
                email: client.email, 
                phone: client.phone 
            });
        }
    }, [client]);

    const handleSave = async () => {
        if (!client) return;

        const result = await updateClient(client.id, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
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
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogDescription>
                        Atualize as informações de contato do cliente e clique em salvar.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="exemplo@email.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Telefone / WhatsApp</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(00) 00000-0000"
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