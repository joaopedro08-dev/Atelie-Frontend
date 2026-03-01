import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function ShoppingPage({setActiveTab} : {setActiveTab: Dispatch<SetStateAction<string>>}) {
    return (
        <div className="max-w-3xl mx-auto py-12 text-center">
            <ShoppingBag className="size-12 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold">Seu carrinho está vazio</h2>
            <Button onClick={() => setActiveTab("produtos")} className="mt-6">Ver Produtos</Button>
        </div>
    )
}