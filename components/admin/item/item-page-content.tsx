"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, List, Search, X, FileDown, FileText, TableIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ItemForm } from "@/app/admin/itens/item-form";
import { ItemList } from "@/app/admin/itens/item-list";
import { listAllItens } from "@/service/itens/list-all-itens";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { exportItemsToPDF } from "@/service/export/itens/item-pdf";
import { exportItemsToExcel } from "@/service/export/itens/item-excel";
import { ItemModel } from "@/types/interface";

export function ItemPageContent() {
    const [activeTab, setActiveTab] = useState("list");
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState<ItemModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { listItens } = listAllItens();

    const fetchItems = async () => {
        setIsLoading(true);
        const data = await listItens();
        setItems(data as ItemModel[]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const clearSearch = () => setSearchTerm("");

    const filteredItems = items.filter(item =>
        item.code.toUpperCase().includes(searchTerm.toUpperCase())
    );

    const handleExport = (type: 'pdf' | 'excel') => {
        if (type === 'pdf') {
            exportItemsToPDF(filteredItems);
        } else {
            exportItemsToExcel(filteredItems);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Itens</h1>
                    <p className="text-muted-foreground text-sm">
                        Gerencie itens cadastrados que podem ser editados ou excluídos.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="gap-2 shadow-sm" disabled={isLoading || filteredItems.length === 0}>
                                <FileDown className="size-4" /> Exportar
                            </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2 cursor-pointer">
                                <FileText className="size-4 text-red-500" /> Salvar como PDF (A4)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2 cursor-pointer">
                                <TableIcon className="size-4 text-green-600" /> Salvar como Excel (.xlsx)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <TabsList className="w-full md:w-auto grid grid-cols-2">
                        <TabsTrigger value="list" className="flex items-center gap-2">
                            <List className="h-4 w-4" /> Listagem
                        </TabsTrigger>
                        <TabsTrigger value="add" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Novo Item
                        </TabsTrigger>
                    </TabsList>

                    <div className="w-full md:max-w-sm">
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
                                        </motion.button>
                                    </InputGroupAddon>
                                )}
                            </AnimatePresence>
                        </InputGroup>
                    </div>
                </div>

                <TabsContent value="list" className="mt-0 outline-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <ItemList datas={filteredItems} loading={isLoading} onRefresh={fetchItems} />
                    </motion.div>
                </TabsContent>

                <TabsContent value="add" className="mt-0 outline-none">
                    <ItemForm onSuccess={() => { fetchItems(); setActiveTab("list"); }} />
                </TabsContent>
            </Tabs>
        </div>
    );
}