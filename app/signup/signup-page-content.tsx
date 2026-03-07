"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, StoreIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SignUpType, ValidationInputs } from "@/service/validations/validation-inputs";
import { SignUp } from "@/service/sign-up";

export function SignUpPageContent() {
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = SignUp();

    const {
        register,
        handleSubmit,
        control, 
        formState: { errors },
    } = useForm<SignUpType>({
        resolver: zodResolver(ValidationInputs.signUp),
        defaultValues: {
            terms: false, 
        }
    });

    const onSubmit = async (data: SignUpType) => {
        setIsLoading(true);
        await signUp(data);
        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="flex min-h-dvh items-center justify-center bg-muted/50 px-4 py-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-md space-y-6"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2 text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    >
                        <StoreIcon className="h-6 w-6" />
                    </motion.div>
                    <h1 className="text-2xl font-semibold tracking-tight">Criar sua conta</h1>
                    <p className="text-sm text-muted-foreground">Preencha os dados abaixo para gerenciar seu ateliê</p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    layout
                    className="rounded-lg border bg-card p-8 shadow-sm"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                                {...register("name")}
                                id="name"
                                placeholder="Seu nome"
                                className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            <AnimatePresence mode="wait">
                                {errors.name && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                                        {errors.name.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                placeholder="nome@exemplo.com"
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            <AnimatePresence mode="wait">
                                {errors.email && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar</Label>
                                <Input
                                    {...register("confirmPassword")}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="********"
                                    className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 py-2">
                            <div className="flex items-center space-x-2">
                                <Controller
                                    control={control}
                                    name="terms"
                                    render={({ field }) => (
                                        <Checkbox
                                            id="terms"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className={errors.terms ? "border-destructive" : ""}
                                        />
                                    )}
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-xs font-medium text-muted-foreground leading-none cursor-pointer"
                                >
                                    Aceito os{" "}
                                    <Link href="/terms" className="text-primary hover:underline">Termos de Serviço</Link>{" "}
                                    e a{" "}
                                    <Link href="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>
                                </Label>
                            </div>
                            <AnimatePresence mode="wait">
                                {errors.terms && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                                        className="text-[10px] text-destructive font-medium"
                                    >
                                        {errors.terms.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <Button className="w-full relative overflow-hidden" type="submit" disabled={isLoading}>
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Criando conta...
                                    </motion.div>
                                ) : (
                                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Criar conta
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </form>

                    <div className="flex mt-6 justify-center">
                        <Link href="/signin" className="text-sm text-muted-foreground group">
                            Já possui uma conta? <span className="text-primary font-medium group-hover:underline transition-colors">Fazer Login</span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}