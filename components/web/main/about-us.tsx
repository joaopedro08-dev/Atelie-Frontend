"use client"

import { motion } from "framer-motion"
import { Hammer, Crown, Star } from "lucide-react"

const features = [
    {
        icon: <Hammer className="w-5 h-5" />,
        title: "Produtos Oficiais",
        description: "Trabalhamos apenas com peças autorizadas, garantindo originalidade, qualidade e procedência."
    },
    {
        icon: <Crown className="w-5 h-5" />,
        title: "Curadoria Premium",
        description: "Selecionamos produtos que se destacam no mercado, trazendo tendências e itens de alta procura."
    },
    {
        icon: <Star className="w-5 h-5" />,
        title: "Identidade Própria",
        description: "Desenvolvemos peças exclusivas que carregam a essência e o estilo único do Ateliê Encantos do Arcanjo."
    }
];

export default function AboutUs() {
    return (
        <section id="quem-somos" className="py-24 bg-background relative overflow-hidden w-full">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[80px] rounded-full" />
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full flex justify-center items-center"
                    >
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 rounded-full border border-primary/20 scale-110" />
                            <div className="absolute inset-0 rounded-full border border-primary/10 scale-125" />

                            <div className="w-full aspect-square">
                                <img
                                    src="/atelie.jpeg"
                                    alt="Ateliê Encantos do Arcanjo"
                                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-primary/10"
                                />
                            </div>

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-4 bg-background border border-border rounded-xl px-4 py-2 shadow-lg flex items-center gap-2"
                            >
                                <Star size={14} className="text-primary fill-primary" />
                                <span className="text-xs font-semibold text-foreground">Qualidade Premium</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <span className="text-primary font-semibold tracking-[0.2em] uppercase text-xs text-center md:text-start">
                            Quem somos
                        </span>

                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-center md:text-start leading-tight">
                            Compromisso com{" "}
                            <span className="text-primary italic">Qualidade</span>{" "}
                            e Autenticidade
                        </h3>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Somos especializados na venda de produtos oficiais autorizados e também no desenvolvimento de peças próprias. Nosso objetivo é oferecer qualidade, autenticidade e exclusividade, unindo curadoria de mercado com criações que carregam nossa identidade.
                        </p>

                        <div className="grid grid-cols-1 gap-3 mt-2">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/20 transition-all duration-300 group"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}