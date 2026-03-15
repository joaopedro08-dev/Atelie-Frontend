"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles } from "lucide-react"

export default function HeroSection() {
    const [stars, setStars] = useState<Array<{
        id: number
        top: string
        left: string
        size: number
        duration: number
        floatDuration: number
        floatOffset: number
    }>>([])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, duration: 0.8 }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    useEffect(() => {
        const generated = Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 120}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3.5 + 1.8,
            duration: Math.random() * 4 + 2.5,
            floatDuration: Math.random() * 30 + 40,
            floatOffset: Math.random() * 20 - 10,
        }))
        setStars(generated)
    }, [])

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative min-h-screen bg-background flex items-center justify-center w-full"
        >
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="h-100 w-100 md:h-125 md:w-125 bg-primary/20 blur-[100px] rounded-full" />
            </div>

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-primary"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            boxShadow: `0 0 ${star.size * 4}px var(--primary), 0 0 ${star.size * 8}px var(--primary)`,
                        }}
                        initial={{ y: 0, opacity: 0.3 }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.3, 1],
                            y: ["0%", "-150%"],
                            x: [0, star.floatOffset + "%"],
                        }}
                        transition={{
                            opacity: { duration: star.duration, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: star.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: star.floatDuration, repeat: Infinity, ease: "linear", repeatType: "loop" },
                            x: { duration: star.floatDuration * 1.3, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background dark:opacity-80 opacity-60 pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-12 md:py-16 flex flex-col items-center text-center">

                <motion.div variants={itemVariants} className="mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-semibold tracking-widest uppercase text-primary">
                        <Sparkles size={12} />
                        Joias Artesanais Exclusivas
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] max-w-4xl"
                >
                    Onde a arte se{" "}
                    <span className="text-primary relative">
                        transforma
                        <motion.span
                            className="absolute -bottom-1 left-0 h-px bg-primary/40 w-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        />
                    </span>{" "}
                    em joias exclusivas
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light"
                >
                    Fabricamos e selecionamos joias artesanais exclusivas, unindo técnica, tradição e design autoral.
                    Descubra uma experiência única de alta joalheria em nossa vitrine digital.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                >
                    <Button
                        size="lg"
                        className="h-12 px-8 text-base font-semibold rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                        onClick={() => {
                            document.querySelector('#produtos-categoria')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Ver Produtos
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 text-base font-semibold rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary transition-all hover:-translate-y-0.5"
                        onClick={() => {
                            document.querySelector('#quem-somos')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        Nossa História
                    </Button>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Explorar</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                    />
                </motion.div>
            </div>
        </motion.section>
    )
}