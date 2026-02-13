"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, List, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"; 
import { ItemForm } from "./item-form"; 
import { ItemList } from "./item-list";
import { listAllItens } from "@/service/itens/list-all-itens"; 

interface ItemModel {
    id: string;
    code: string;
    unitPrice: number;
    totalPrice: number;
    createdAt: string;
}

export default function ItemPage() {
    const [activeTab, setActiveTab] = useState("list");
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState<ItemModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { listItens } = listAllItens();

    const fetchItems = async () => {
        setIsLoading(true);
        const data = await listItens();
        setItems(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const clearSearch = () => {
        setSearchTerm("");
    };

    const filteredItems = items.filter(item => 
        item.code.toUpperCase().includes(searchTerm.toUpperCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Itens</h1>
                <p className="text-muted-foreground">
                    Gerencie itens cadastrados que podem ser editados ou excluídos.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
                    <TabsList className="mb-5 md:mb-0 w-full md:w-auto">
                        <TabsTrigger value="list" className="flex items-center gap-2">
                            <List className="h-4 w-4" /> Listagem
                        </TabsTrigger>
                        <TabsTrigger value="add" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Novo Item
                        </TabsTrigger>
                    </TabsList>

                    <div className="w-full max-w-full md:max-w-sm">
                        <InputGroup className={activeTab !== "list" ? "opacity-50 cursor-not-allowed" : ""}>
                            <InputGroupAddon align="inline-start">
                                <Search size={18} className="text-muted-foreground" />
                            </InputGroupAddon>
                            
                            <InputGroupInput 
                                placeholder="Buscar por código..." 
                                value={searchTerm}
                                disabled={activeTab !== "list"}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10"
                            />

                            <AnimatePresence>
                                {searchTerm.length > 0 && (
                                    <InputGroupAddon align="inline-end">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={clearSearch}
                                            className="hover:text-foreground transition-colors outline-none p-1 rounded-full hover:bg-muted"
                                        >
                                            <X size={16} className="text-muted-foreground" />
                                            <span className="sr-only">Limpar pesquisa</span>
                                        </motion.button>
                                    </InputGroupAddon>
                                )}
                            </AnimatePresence>
                        </InputGroup>
                    </div>
                </div>

                <TabsContent value="list">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <ItemList items={filteredItems} loading={isLoading} onRefresh={fetchItems} />
                    </motion.div>
                </TabsContent>

                <TabsContent value="add">
                    <ItemForm onSuccess={fetchItems} />
                </TabsContent>
            </Tabs>
        </div>
    );
}