"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreIcon, LockKeyhole, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInType, ValidationInputs } from "@/service/validations/validation-inputs";
import { SignIn } from "@/service/sign-in";

export function SignInPageContent() {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = SignIn();
    
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
        <div className="flex min-h-dvh items-center justify-center bg-muted/50 px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md space-y-6"
            >
                <div className="flex flex-col items-center space-y-2 text-center">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    >
                        <StoreIcon className="h-6 w-6" />
                    </motion.div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Acessar o Ateliê
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Digite suas credenciais para entrar no painel
                    </p>
                </div>

                <motion.div
                    layout
                    className="rounded-lg border bg-card p-8 shadow-sm"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="nome@exemplo.com"
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
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

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                {...register("password")}
                                id="password"
                                placeholder="********"
                                type="password"
                                className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                            />

                            <AnimatePresence mode="popLayout">
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xs text-destructive font-medium"
                                    >
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <Button
                            className="w-full relative overflow-hidden"
                            type="submit"
                            disabled={isLoading}
                        >
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center"
                                    >
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Autenticando...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center"
                                    >
                                        <LockKeyhole className="mr-2 h-4 w-4" />
                                        Entrar
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Ou</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/signup"
                            className="text-sm text-muted-foreground"
                        >
                            Não possui uma conta? <span className="text-primary font-medium hover:underline transition-colors hover:text-primary/80">Cadastre-se</span>
                        </Link>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-xs text-muted-foreground"
                >
                    Ao entrar, você concorda com nossos Termos de Serviço.
                </motion.p>
            </motion.div>
        </div>
    );
}