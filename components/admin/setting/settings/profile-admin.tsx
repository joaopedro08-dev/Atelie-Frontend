"use client"

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { UPDATE_PROFILE } from "@/types/query";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Loader2, Lock, Mail, Save, User } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function ProfileAdmin() {
    const [isPending, setIsPending] = useState(false);
    const { user, authenticatedRequest, refreshUser } = useAuth();
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        if (user) setFormData({ name: user.name || "", email: user.email || "" });
    }, [user]);

    const handleSaveProfile = async () => {
        if (!user) { toast.error("Usuário não autenticado."); return; }
        setIsPending(true);
        try {
            const result = await authenticatedRequest(UPDATE_PROFILE, {
                input: { id: user.id, name: formData.name, email: formData.email }
            }) as { data?: { updateProfileAdmin?: { success: boolean; message: string } }; errors?: Array<{ message: string }> };

            if (result?.data?.updateProfileAdmin?.success) {
                await refreshUser();
                toast.success(result.data.updateProfileAdmin.message || "Perfil atualizado.");
            } else {
                const msg = result?.data?.updateProfileAdmin?.message || result?.errors?.[0]?.message || "Erro ao atualizar.";
                toast.error("Falha na atualização", { description: msg });
            }
        } catch {
            toast.error("Erro crítico", { description: "Não foi possível conectar ao servidor." });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl border bg-card p-6 space-y-6"
        >
            <div>
                <h3 className="font-semibold text-base">Informações Pessoais</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Atualize seu nome e e-mail de acesso.
                </p>
            </div>

            <Separator />

            <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                    <InputGroup>
                        <InputGroupAddon>
                            <User className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Seu nome"
                        />
                    </InputGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                    <InputGroup>
                        <InputGroupAddon>
                            <Mail className="size-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="exemplo@empresa.com"
                        />
                    </InputGroup>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Lock className="size-3" /> Nível de Permissão
                    </Label>
                    <InputGroup>
                        <InputGroupInput
                            value={user?.role ? "Administrador(a)" : "Usuário"}
                            disabled
                            className="bg-muted/30 font-mono text-[11px] tracking-widest uppercase cursor-not-allowed"
                        />
                        <InputGroupAddon align="inline-end">
                            <Lock className="size-3 text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Info className="size-3" />
                        Nível de permissão não pode ser alterado por aqui.
                    </p>
                </div>
            </div>

            <div className="flex justify-end pt-1">
                <Button
                    onClick={handleSaveProfile}
                    disabled={isPending}
                    className="min-w-40 transition-all active:scale-95"
                >
                    <AnimatePresence mode="wait">
                        {isPending ? (
                            <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" /> Salvando...
                            </motion.span>
                        ) : (
                            <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                <Save className="size-4" /> Atualizar Perfil
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </div>
        </motion.div>
    );
}