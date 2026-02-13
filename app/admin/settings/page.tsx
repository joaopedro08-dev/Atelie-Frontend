"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Save, Loader2, Circle, Mail, User2Icon,
    ShieldCheckIcon, Lock, KeyRound, Shield, Info
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function SettingsPage() {
    const { user, authenticatedRequest, refreshUser } = useAuth();
    const [isPending, setIsPending] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [passwordData, setPasswordData] = useState({ current: "", new: "" });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const handleSaveProfile = async () => {
        if (!user) {
            toast.error("Usuário não autenticado.");
            return;
        }

        setIsPending(true);
        try {
            const UPDATE_PROFILE = `
                mutation UpdateProfileAdmin($input: ProfileInput!) {
                    updateProfileAdmin(input: $input) {
                        success
                        message
                    }
                }
            `;

            const result = await authenticatedRequest(UPDATE_PROFILE, {
                input: {
                    id: user.id,
                    name: formData.name,
                    email: formData.email
                }
            });

            if (result?.data?.updateProfileAdmin?.success) {
                await refreshUser();
                toast.success(result.data.updateProfileAdmin.message || "Perfil atualizado.");
            } else {
                const errorMsg = result?.data?.updateProfileAdmin?.message || result?.errors?.[0]?.message || "Erro ao atualizar.";
                toast.error("Falha na atualização", { description: errorMsg });
            }
        } catch (error) {
            toast.error("Erro crítico", { description: "Não foi possível conectar ao servidor." });
        } finally {
            setIsPending(false);
        }
    };

    const handleChangePassword = async () => {
        if (!passwordData.current || !passwordData.new) {
            toast.error("Preencha todos os campos de senha.");
            return;
        }

        setIsChangingPass(true);
        try {
            const CHANGE_PASSWORD = `
                mutation ChangePasswordAdmin($email: String!, $input: ChangePasswordAdmin!) {
                    changePasswordAdmin(email: $email, input: $input) {
                        success
                        message
                    }
                }
            `;

            const result = await authenticatedRequest(CHANGE_PASSWORD, {
                email: user?.email,
                input: {
                    currentPassword: passwordData.current,
                    newPassword: passwordData.new
                }
            });

            const data = result?.data?.changePasswordAdmin;

            if (data?.success) {
                toast.success(data.message || "Senha atualizada.");
                setPasswordData({ current: "", new: "" });
            } else {
                const errorMsg = data?.message || result?.errors?.[0]?.message || "Erro ao alterar senha.";
                toast.error("Segurança", { description: errorMsg });
            }
        } catch (error) {
            toast.error("Erro ao conectar ao servidor.");
        } finally {
            setIsChangingPass(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
        >
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                    <p className="text-muted-foreground">Gerencie sua conta e segurança de acesso.</p>
                </div>
                <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                    <Circle className={`size-2 fill-current ${user?.statusSystem ? "text-green-500 animate-pulse" : "text-gray-400"}`} />
                    {user?.statusSystem ? "Online" : "Offline"}
                </Badge>
            </header>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-80">
                    <TabsTrigger value="profile" className="flex gap-2">
                        <User className="h-4 w-4" /> Perfil
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex gap-2">
                        <ShieldCheckIcon className="h-4 w-4" /> Segurança
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <motion.div layout className="rounded-xl border bg-card p-6 shadow-sm space-y-6 mt-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                <User2Icon className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">{user?.name || "Usuário"}</h3>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome Completo</Label>
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
                                <Label htmlFor="email">E-mail Corporativo</Label>
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
                                <Label className="flex items-center gap-2 text-muted-foreground italic">
                                    <Shield className="h-3 w-3" /> Nível de Permissão
                                </Label>
                                <InputGroup>
                                    <InputGroupInput
                                        value={user?.role || ""}
                                        disabled
                                        className="bg-muted/30 font-mono text-xs tracking-widest uppercase cursor-not-allowed"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <Lock className="size-3 text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button onClick={handleSaveProfile} disabled={isPending} className="min-w-40 transition-all active:scale-95">
                                <AnimatePresence mode="wait">
                                    {isPending ? (
                                        <motion.div key="loading" className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
                                        </motion.div>
                                    ) : (
                                        <motion.div key="save" className="flex items-center gap-2">
                                            <Save className="h-4 w-4" /> Atualizar Perfil
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="security">
                    <motion.div layout className="rounded-xl border bg-card p-6 shadow-sm space-y-6 mt-4">
                        <div>
                            <h3 className="text-lg font-medium">Credenciais de Acesso</h3>
                            <p className="text-sm text-muted-foreground">Mantenha sua senha atualizada para evitar acessos não autorizados.</p>
                        </div>
                        <Separator />
                        <div className="max-w-md space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current">Senha Atual</Label>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Lock className="size-4 text-muted-foreground" />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id="current" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                                    />
                                </InputGroup>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="new">Nova Senha</Label>
                                    <div className="group relative flex items-center gap-1 cursor-help">
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Requisitos</span>
                                        <Info className="size-3 text-muted-foreground" />
                                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-popover border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                            <p className="text-xs font-semibold mb-1 text-foreground">A senha deve conter:</p>
                                            <ul className="text-[11px] space-y-1 text-muted-foreground">
                                                <li>• Mínimo de 8 caracteres</li>
                                                <li>• Letra maiúscula e minúscula</li>
                                                <li>• Pelo menos um número</li>
                                                <li>• Caractere especial (@$!%*?&)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <KeyRound className="size-4 text-muted-foreground" />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id="new" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                                    />
                                </InputGroup>
                            </div>
                            <Button 
                                variant="outline" 
                                onClick={handleChangePassword}
                                disabled={isChangingPass}
                                className="text-destructive border-destructive hover:bg-destructive/10 transition-colors"
                            >
                                {isChangingPass ? (
                                    <><Loader2 className="mr-2 size-4 animate-spin" /> Processando...</>
                                ) : (
                                    "Alterar Senha de Acesso"
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}