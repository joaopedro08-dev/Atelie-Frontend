"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Anel Essência de Ouro",
      category: "Anéis",
      price: "R$ 4.200",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Colar Aurora Boreal",
      category: "Colares",
      price: "R$ 8.900",
      image: "https://images.unsplash.com/photo-1599643478518-a744c517b228?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Brincos Gota de Cristal",
      category: "Brincos",
      price: "R$ 2.150",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Pulseira Infinito Real",
      category: "Pulseiras",
      price: "R$ 5.600",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe157a8?auto=format&fit=crop&q=80",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Coleções <span className="text-primary italic">Atemporais</span>
            </motion.h2>
            <p className="text-muted-foreground">
              Explore a seleção exclusiva do mês, onde a raridade encontra o design.
            </p>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto font-semibold tracking-wider uppercase text-xs">
            Ver catálogo completo
          </Button>
        </div>

        {/* Grid de Produtos */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card de Imagem */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted mb-4 border border-border/50">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                
                {/* Badge de Categoria */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold border border-white/10">
                    {product.category}
                  </span>
                </div>

                {/* Overlay de Compra Rápida */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" className="rounded-full bg-primary hover:scale-110 transition-transform">
                    <ShoppingBag size={20} />
                  </Button>
                </div>
              </div>

              {/* Informações do Produto */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 text-yellow-500/80">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-medium text-muted-foreground">5.0</span>
                  </div>
                </div>
                <p className="text-primary font-bold text-xl">{product.price}</p>
              </div>
              
              {/* Brilho de fundo no hover (Soft Glow) */}
              <div className="absolute -inset-2 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}