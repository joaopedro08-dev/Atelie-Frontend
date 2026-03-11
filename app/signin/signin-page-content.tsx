"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreIcon, LockKeyhole, Loader2, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SignInType, ValidationInputs } from "@/service/validations/validation-inputs";
import { SignIn } from "@/service/sign-in";
import { useRouter } from "next/navigation";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
};

export function SignInPageContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = SignIn();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInType>({
        resolver: zodResolver(ValidationInputs.signIn),
    });

    const onSubmit = async (data: SignInType) => {
        setIsLoading(true);
        await signIn(data);
        setIsLoading(false);
    };

    return (
        <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute top-1/3 right-0 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
                <svg
                    className="absolute inset-0 h-full w-full opacity-[0.025]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-lg space-y-6"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-3 text-center">
                    <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                            <StoreIcon className="h-7 w-7" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        </span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Ateliê</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">Loja Virtual de Peças Artesanais</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl border bg-card p-7 shadow-sm"
                >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

                    <div className="relative space-y-5">
                        <div className="space-y-1">
                            <h2 className="text-base font-semibold">Bem-vindo de volta</h2>
                            <p className="text-xs text-muted-foreground">
                                Digite suas credenciais para acessar o painel
                            </p>
                        </div>

                        <div className="h-px bg-border" />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <Mail className="size-4 text-muted-foreground" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...register("email")}
                                            id="email"
                                            type="email"
                                            placeholder="nome@exemplo.com"
                                            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                                        />
                                    </InputGroup>
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-xs text-destructive"
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-1.5 sm:col-span-2">
                                    <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <LockKeyhole className="size-4 text-muted-foreground" />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...register("password")}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <AnimatePresence mode="popLayout">
                                        {errors.password && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                className="text-xs text-destructive font-medium"
                                            >
                                                {errors.password.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <Button
                                className="w-full transition-all active:scale-[0.98]"
                                type="submit"
                                disabled={isLoading}
                            >
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.span
                                            key="loader"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Loader2 className="size-4 animate-spin" />
                                            Autenticando...
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="content"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <LockKeyhole className="size-4" />
                                            Entrar
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </form>

                        <div className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                Não possui uma conta?{" "}
                                <Link
                                    href="/signup"
                                    className="text-primary font-medium hover:underline transition-colors hover:text-primary/80"
                                >
                                    Cadastre-se
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-center text-xs text-muted-foreground"
                >
                    Ao entrar, você concorda com nossos{" "}
                    <span onClick={() => router.replace("/terms")} className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
                        Termos de Serviço
                    </span>
                    .
                </motion.p>
            </motion.div>
        </div>
    );
}