"use client"

import { motion, Variants } from "framer-motion"
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Gem,
  Lock
} from "lucide-react"

const policies = [
  {
    icon: <Gem className="w-6 h-6 text-primary" />,
    title: "Produtos Autorizados e Exclusivos",
    text: "Trabalhamos com peças oficiais autorizadas e também desenvolvemos produtos próprios, garantindo autenticidade, qualidade e identidade exclusiva."
  },
  {
    icon: <Truck className="w-6 h-6 text-primary" />,
    title: "Envio Seguro",
    text: "Todos os pedidos são enviados com proteção e acompanhamento completo, garantindo segurança durante todo o processo de entrega."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-primary" />,
    title: "Trocas e Devoluções",
    text: "Você pode solicitar troca ou devolução em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor."
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Segurança e Privacidade",
    text: "Utilizamos tecnologias modernas de proteção de dados, garantindo privacidade e segurança em toda sua experiência."
  }
]

export default function Policies() {

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
    return months[month]
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="politica-trocas" className="py-28 rounded-3xl relative overflow-hidden bg-linear-to-b from-background via-muted/20 to-background">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(var(--primary),0.15),transparent_40%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 shadow-sm">
            <ShieldCheck size={16} />
            <span>Compromisso com Qualidade e Autenticidade</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Transparência e Confiança
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-3xl bg-background/60 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:-translate-y-3">
              <div className="mb-6 p-3 rounded-xl bg-primary/10 w-fit group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {policy.icon}
              </div>

              <h4 className="text-xl font-bold mb-3">
                {policy.title}
              </h4>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {policy.text}
              </p>
            </motion.div>
          ))}

        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-xs text-muted-foreground uppercase tracking-[0.25em]">
          Última atualização: {getMonthName(currentMonth)} de {currentYear}
        </motion.p>
      </div>
    </section>
  )
}