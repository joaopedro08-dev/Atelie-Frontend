"use client"

import { motion, Variants } from "framer-motion"
import { ShoppingBag, Sparkles } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const products = [
  { id: 1, category: "Dalla Déa", image: "/collection/atelie-img-01.jpeg" },
  { id: 2, category: "Dalla Déa", image: "/collection/atelie-img-02.jpeg" },
  { id: 3, category: "Dalla Déa", image: "/collection/atelie-img-03.jpeg" },
  { id: 4, category: "Dalla Déa", image: "/collection/atelie-img-04.jpeg" },
  { id: 5, category: "Dalla Déa", image: "/collection/atelie-img-05.jpeg" },
  { id: 6, category: "Sarah Trevisan", image: "/collection/atelie-img-06.jpeg" },
  { id: 7, category: "Sarah Trevisan", image: "/collection/atelie-img-07.jpeg" },
  { id: 8, category: "Sarah Trevisan", image: "/collection/atelie-img-08.jpeg" },
  { id: 9, category: "Sarah Trevisan", image: "/collection/atelie-img-09.jpeg" },
  { id: 10, category: "Dalla Déa", image: "/collection/atelie-img-10.jpeg" },
  { id: 11, category: "Sarah Trevisan", image: "/collection/atelie-img-11.jpeg" },
]

export default function ProductGrid() {
  return (
    <section id="produtos-categoria" className="py-10 md:py-20 bg-background relative overflow-hidden w-full">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-semibold tracking-widest uppercase text-primary mb-4">
            <Sparkles size={10} />
            Coleção Exclusiva
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-3">
            Coleções <span className="text-primary italic">Atemporais</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-base">
            Joias artesanais exclusivas (R$50 - R$600).{" "}
            <span className="opacity-80">Parcelamento em até 6x no cartão.</span>
          </p>
        </motion.div>

        <Carousel opts={{ align: "start", loop: false }} className="w-full relative">
          <CarouselContent className="-ml-3 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="pl-3 md:pl-4 basis-[50%] sm:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-3/4 w-full rounded-xl overflow-hidden bg-muted border border-border/40 mb-3">
                    <img
                      src={product.image}
                      alt={product.category}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-1.5 py-0.5 rounded-sm bg-background/90 backdrop-blur-sm text-[7px] md:text-[9px] text-foreground uppercase font-bold tracking-tighter">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ y: 8, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="p-2.5 bg-background rounded-full shadow-lg"
                      >
                        <ShoppingBag size={16} className="text-primary" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="space-y-0.5 px-0.5">
                    <h3 className="text-[10px] md:text-xs text-muted-foreground font-medium truncate uppercase tracking-tight">
                      {product.category}
                    </h3>
                    <p className="text-primary font-bold text-sm md:text-lg">R$ 50 — 600</p>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground/80 leading-none">
                      À vista ou até 6x*
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 bg-background border border-border hover:bg-muted transition-colors" />
            <CarouselNext className="-right-4 bg-background border border-border hover:bg-muted transition-colors" />
          </div>
        </Carousel>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          * Parcelamento sujeito a condições. Entre em contato para mais informações.
        </motion.p>
      </div>
    </section>
  )
}