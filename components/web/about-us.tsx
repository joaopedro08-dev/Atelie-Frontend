"use client"

import { motion } from "framer-motion"
import { Hammer, Crown } from "lucide-react"

const features = [
    {
        icon: <Hammer className="w-6 h-6" />,
        title: "Produtos Oficiais",
        description: "Trabalhamos apenas com peças autorizadas, garantindo originalidade, qualidade e procedência."
    },
    {
        icon: <Crown className="w-6 h-6" />,
        title: "Curadoria Premium",
        description: "Selecionamos produtos que se destacam no mercado, trazendo tendências e itens de alta procura."
    }
];

export default function AboutUs() {
    return (
        <section id="quem-somos" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full flex justify-center items-center"
                    >
                        <div className="w-full max-w-125 aspect-square">
                            <img
                                src="/atelie.jpeg"
                                alt="Ateliê Encantos do Arcanjo"
                                className="w-full h-full object-cover rounded-full shadow-xl"
                            />
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-primary font-medium tracking-[0.2em] uppercase text-sm text-center md:text-start">Quem somos</h2>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-center md:text-start">
                            Compromisso com Qualidade e Autenticidade
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Somos especializados na venda de produtos oficiais autorizados e também no desenvolvimento de peças próprias. Nosso objetivo é oferecer qualidade, autenticidade e exclusividade, unindo curadoria de mercado com criações que carregam nossa identidade.
                        </p>

                        <div className="grid grid-cols-1 gap-6 mt-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                    className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                                >
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
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