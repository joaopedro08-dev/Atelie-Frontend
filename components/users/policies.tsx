"use client"

import { motion, Variants } from "framer-motion"
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Gem, 
  Lock 
} from "lucide-react"

export default function Policies() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const policies = [
    {
      icon: <Gem className="w-6 h-6 text-primary" />,
      title: "Autenticidade",
      text: "Todas as nossas peças acompanham certificado de garantia vitalícia sobre a autenticidade dos metais e pedras preciosas utilizadas."
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Entrega Segura",
      text: "Envios realizados com seguro total e embalagem discreta. O prazo de produção para peças sob medida é de 15 a 20 dias úteis."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-primary" />,
      title: "Trocas e Devoluções",
      text: "Você tem até 7 dias após o recebimento para solicitar a troca. Peças personalizadas possuem políticas específicas de ajuste."
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Privacidade",
      text: "Seus dados são processados em ambiente criptografado, garantindo total sigilo durante toda a sua jornada conosco."
    }
  ]

  return (
    <section className="py-24 rounded-2xl bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4"
          >
            <ShieldCheck size={14} />
            <span>Compromisso Ateliê</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Transparência e Confiança</h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="mb-6 p-3 rounded-xl bg-primary/5 w-fit group-hover:scale-110 transition-transform">
                {policy.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{policy.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {policy.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 text-xs text-muted-foreground uppercase tracking-[0.2em]"
        >
          Última atualização: Fevereiro de 2026
        </motion.p>
      </div>
    </section>
  )
}