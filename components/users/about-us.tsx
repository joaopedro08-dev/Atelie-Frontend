"use client"

import { motion } from "framer-motion"
import { Sparkles, Hammer, Crown } from "lucide-react"

export default function AboutUs() {
    const features = [
        {
            icon: <Hammer className="w-6 h-6" />,
            title: "Produção Artesanal",
            description: "Cada peça é moldada à mão, respeitando o tempo e a delicadeza dos metais nobres."
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Pedras Selecionadas",
            description: "Garantimos a procedência e o brilho eterno de cada gema presente em nossas coleções."
        },
        {
            icon: <Crown className="w-6 h-6" />,
            title: "Design Exclusivo",
            description: "Criamos joias autorais que não apenas adornam, mas contam a sua própria história."
        }
    ]

    return (
        <section id="quem-somos" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group h-full"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden border border-primary/20 aspect-square bg-muted">
                            <div className="absolute inset-0 z-20 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                            <div
                                className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
                                style={{ backgroundImage: "url('/atelie.jpeg')" }}
                            />
                        </div>

                        <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl -z-10 group-hover:-top-2 group-hover:-left-2 transition-all duration-500" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Nossa Essência</h2>
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                            Unindo a tradição do martelo à <span className="text-primary italic">visão</span> do amanhã.
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            O Ateliê nasceu do desejo de resgatar o valor do que é feito à mão. Em um mundo de produções em massa, escolhemos o caminho da exclusividade. Cada curva, cada polimento e cada cravação é feita com a atenção que uma joia eterna merece.
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