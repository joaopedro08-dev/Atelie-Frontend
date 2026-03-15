"use client"

import { motion, Variants } from "framer-motion"
import { ShieldCheck, Truck, RefreshCw, Gem, Lock } from "lucide-react"

const policies = [
  {
    icon: <Gem className="w-5 h-5 text-primary" />,
    title: "Produtos Autorizados e Exclusivos",
    text: "Trabalhamos com peças oficiais autorizadas e também desenvolvemos produtos próprios, garantindo autenticidade, qualidade e identidade exclusiva."
  },
  {
    icon: <Truck className="w-5 h-5 text-primary" />,
    title: "Envio Seguro",
    text: "Todos os pedidos são enviados com proteção e acompanhamento completo, garantindo segurança durante todo o processo de entrega."
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-primary" />,
    title: "Trocas e Devoluções",
    text: "Você pode solicitar troca ou devolução em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor."
  },
  {
    icon: <Lock className="w-5 h-5 text-primary" />,
    title: "Segurança e Privacidade",
    text: "Utilizamos tecnologias modernas de proteção de dados, garantindo privacidade e segurança em toda sua experiência."
  }
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const getMonthName = (month: number) => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  return months[month]
}

export default function Policies() {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return (
    <section id="politica-trocas" className="py-28 relative overflow-hidden w-full bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 blur-[60px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6"
          >
            <ShieldCheck size={14} />
            <span>Compromisso com Qualidade e Autenticidade</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Transparência e{" "}
            <span className="text-primary italic">Confiança</span>
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2"
            >
              <div className="mb-5 p-2.5 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                {policy.icon}
              </div>

              <h4 className="text-base font-bold mb-2 text-foreground leading-tight">
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
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-xs text-muted-foreground uppercase tracking-[0.25em]"
        >
          Última atualização: {getMonthName(currentMonth)} de {currentYear}
        </motion.p>
      </div>
    </section>
  )
}