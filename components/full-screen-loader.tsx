import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

interface FullScreenLoaderProps {
    text?: string
}

export function FullScreenLoader({
    text = "Carregando..."
}: FullScreenLoaderProps) {
    return (
        <div className="flex h-dvh flex-col items-center justify-center gap-4">

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                }}
            >
                <Spinner />
            </motion.div>

            <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="text-sm text-muted-foreground"
            >
                {text}
            </motion.span>


        </div>
    )
}