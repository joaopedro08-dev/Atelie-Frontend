"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useAuth } from "@/contexts/auth-context";
import { CHANGE_PASSWORD } from "@/types/query";
import { motion } from "framer-motion";
import { Loader2, Lock, KeyRound, CheckCircle2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

export function ChangePassword() {
    const [passwordData, setPasswordData] = useState({ current: "", new: "" });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);
    const { user, authenticatedRequest } = useAuth();

    const strength = getPasswordStrength(passwordData.new);

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
    )
}