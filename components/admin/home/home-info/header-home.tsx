"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, ShieldCheck, UserCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export function HeaderHome({ initials, user, getGreeting, getGreetingEmoji, itemVariants }: { initials: string, user: { name: string, statusSystem: boolean, email: string } | null, getGreeting: () => string, getGreetingEmoji: () => string, itemVariants: Variants }) {
    const router = useRouter();
    
    return (
         <motion.header
                className="relative overflow-hidden rounded-2xl border bg-card"
                variants={itemVariants}
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />
                    <div className="absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-primary/4 blur-2xl" />
                    <svg
                        className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">
                    <div className="flex items-center gap-5">
                        <div className="relative shrink-0">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold select-none ring-2 ring-primary/20 shadow-sm">
                                {initials}
                            </div>
                            <span
                                className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-card
                                    ${user?.statusSystem ? "bg-emerald-500" : "bg-destructive"}`}
                            >
                                <span
                                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60
                                        ${user?.statusSystem ? "bg-emerald-400" : "bg-destructive"}`}
                                />
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
                                <Calendar className="size-3 text-primary/60" />
                                <span className="capitalize">
                                    {new Date().toLocaleDateString("pt-BR", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </span>
                            </p>

                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                                {getGreeting()},{" "}
                                <span className="text-primary">{user?.name?.split(" ")[0] ?? "Admin"}</span>
                                {" "}{getGreetingEmoji()}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                                    <ShieldCheck className="size-3" />
                                    Administrador(a)
                                </span>

                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold
                                        ${user?.statusSystem
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "bg-destructive/10 text-destructive"
                                        }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${user?.statusSystem ? "bg-emerald-500" : "bg-destructive"}`}
                                    />
                                    {user?.statusSystem ? "Ativo" : "Inativo"}
                                </span>

                                {user?.email && (
                                    <span className="hidden sm:inline text-[11px] text-muted-foreground">
                                        {user.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => router.replace("/admin/settings")}
                        variant="outline"
                        className="gap-2 shadow-sm w-full md:w-auto shrink-0"
                    >
                        <UserCircle className="size-4" />
                        <span className="lg:block hidden">Ver Perfil Completo</span>
                    </Button>
                </div>
            </motion.header>
    )
}