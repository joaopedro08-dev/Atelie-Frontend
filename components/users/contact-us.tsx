"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function ContactUs() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">Contato</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Vamos criar algo <span className="text-primary italic">eterno</span> juntos?
              </h3>
              <p className="text-muted-foreground text-lg font-light">
                Agende uma consultoria exclusiva ou tire suas dúvidas sobre nossas peças sob medida.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-primary">
                  <FaWhatsapp size={20} />
                  <span className="font-semibold text-foreground">WhatsApp</span>
                </div>
                <p className="text-sm text-muted-foreground">(14) 99747-6755</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-primary">
                  <Mail size={20} />
                  <span className="font-semibold text-foreground">E-mail</span>
                </div>
                <p className="text-sm text-muted-foreground">anaalinemdd@hotmail.com</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin size={20} />
                  <span className="font-semibold text-foreground">Localização</span>
                </div>
                <p className="text-sm text-muted-foreground">Ibirarema, SP</p>
              </motion.div>
            </div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="p-8 md:p-10 rounded-3xl border border-primary/10 bg-muted/5 backdrop-blur-sm shadow-2xl shadow-primary/5"
          >
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Nome</label>
                  <Input placeholder="Seu nome completo" className="bg-background/50 border-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" className="bg-background/50 border-primary/20 focus:border-primary transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Assunto</label>
                <Input placeholder="Ex: Orçamento Personalizado" className="bg-background/50 border-primary/20 focus:border-primary transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Mensagem</label>
                <Textarea placeholder="Como podemos ajudar?" className="min-h-35 bg-background/50 border-primary/20 focus:border-primary transition-all resize-none" />
              </div>

              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  )
}