"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    User, Save, Loader2, Mail,
    Lock, KeyRound, Info, CheckCircle2, Eye, EyeOff,
    AlertTriangle, ShieldCheckIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { CHANGE_PASSWORD, UPDATE_PROFILE } from "@/types/query";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 18 } },
};

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
    if (!pw) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[@$!%*?&]/.test(pw)) score++;

    if (score <= 1) return { score, label: "Fraca", color: "bg-destructive" };
    if (score === 2) return { score, label: "Média", color: "bg-yellow-500" };
    if (score === 3) return { score, label: "Boa", color: "bg-blue-500" };
    return { score, label: "Forte", color: "bg-emerald-500" };
}

type TabId = "profile" | "security";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Perfil", icon: <User className="size-4" /> },
    { id: "security", label: "Segurança", icon: <ShieldCheckIcon className="size-4" /> },
];

export function SettingsPageContent() {
    const { user, authenticatedRequest, refreshUser } = useAuth();
    const [activeTab, setActiveTab] = useState<TabId>("profile");
    const [isPending, setIsPending] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [passwordData, setPasswordData] = useState({ current: "", new: "" });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const strength = getPasswordStrength(passwordData.new);

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

    const handleChangePassword = async () => {
        if (!passwordData.current || !passwordData.new) {
            toast.error("Preencha todos os campos de senha.");
            return;
        }
        setIsChangingPass(true);
        try {
            const result = await authenticatedRequest(CHANGE_PASSWORD, {
                email: user?.email,
                input: { currentPassword: passwordData.current, newPassword: passwordData.new }
            }) as { data?: { changePasswordAdmin?: { success: boolean; message: string } }; errors?: Array<{ message: string }> };

            const data = result?.data?.changePasswordAdmin;
            if (data?.success) {
                toast.success(data.message || "Senha atualizada.");
                setPasswordData({ current: "", new: "" });
            } else {
                const msg = data?.message || result?.errors?.[0]?.message || "Erro ao alterar senha.";
                toast.error("Segurança", { description: msg });
            }
        } catch {
            toast.error("Erro ao conectar ao servidor.");
        } finally {
            setIsChangingPass(false);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.header variants={itemVariants} className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie sua conta e segurança de acesso.
                    </p>
                </div>

                <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1
                    ${user?.statusSystem
                        ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20"
                        : "bg-muted text-muted-foreground ring-border"
                    }`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${user?.statusSystem ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
                    {user?.statusSystem ? "Online" : "Offline"}
                </span>
            </motion.header>

            <motion.div variants={itemVariants} className="flex gap-1 rounded-xl border bg-card p-1 w-full sm:w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 sm:flex-none flex justify-center items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors
                ${activeTab === tab.id
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/20"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative flex items-center gap-2">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {activeTab === "profile" && (
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
                )}

                {activeTab === "security" && (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="rounded-2xl border bg-card p-6 space-y-6"
                    >
                        <div>
                            <h3 className="font-semibold text-base">Credenciais de Acesso</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Mantenha sua senha atualizada para evitar acessos não autorizados.
                            </p>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3 rounded-xl bg-yellow-500/8 border border-yellow-500/20 px-4 py-3">
                            <AlertTriangle className="size-4 text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Ao alterar a senha, você será mantido logado na sessão atual. Outras sessões ativas serão encerradas automaticamente.
                            </p>
                        </div>

                        <div className="max-w-md space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="current" className="text-sm font-medium">Senha Atual</Label>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <Lock className="size-4 text-muted-foreground" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="current"
                                        type={showCurrent ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="new" className="text-sm font-medium">Nova Senha</Label>
                                    {strength.label && (
                                        <span className={`text-[11px] font-semibold ${strength.score <= 1 ? "text-destructive" :
                                                strength.score === 2 ? "text-yellow-500" :
                                                    strength.score === 3 ? "text-blue-500" : "text-emerald-500"
                                            }`}>
                                            {strength.label}
                                        </span>
                                    )}
                                </div>

                                <InputGroup>
                                    <InputGroupAddon>
                                        <KeyRound className="size-4 text-muted-foreground" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="new"
                                        type={showNew ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </InputGroupAddon>
                                </InputGroup>

                                {passwordData.new && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="space-y-2 pt-1"
                                    >
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength.score ? strength.color : "bg-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            {[
                                                { label: "8+ caracteres", ok: passwordData.new.length >= 8 },
                                                { label: "Maiúscula e minúscula", ok: /[A-Z]/.test(passwordData.new) && /[a-z]/.test(passwordData.new) },
                                                { label: "Número", ok: /[0-9]/.test(passwordData.new) },
                                                { label: "Caractere especial", ok: /[@$!%*?&]/.test(passwordData.new) },
                                            ].map(({ label, ok }) => (
                                                <div key={label} className="flex items-center gap-1.5">
                                                    <CheckCircle2 className={`size-3 transition-colors ${ok ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                                                    <span className={`text-[11px] transition-colors ${ok ? "text-foreground" : "text-muted-foreground"}`}>
                                                        {label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleChangePassword}
                                disabled={isChangingPass}
                                className="w-full md:w-auto text-destructive border-destructive/40 hover:bg-destructive/10 hover:border-destructive transition-colors"
                            >
                                {isChangingPass ? (
                                    <><Loader2 className="mr-2 size-4 animate-spin" /> Processando...</>
                                ) : (
                                    "Alterar Senha de Acesso"
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}