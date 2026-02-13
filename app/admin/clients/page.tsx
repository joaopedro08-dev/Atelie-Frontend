"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, List, Search, X, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"; 
import { ClientList } from "./client-list";
import { ClientForm } from "./client-form";
import { ListAllClients } from "@/service/clients/list-all-clients";

interface ClientModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export default function ClientsPage() {
    const { listClients } = ListAllClients();
    const [activeTab, setActiveTab] = useState("list");
    const [searchTerm, setSearchTerm] = useState("");
    const [clients, setClients] = useState<ClientModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const data = await listClients();
            setClients(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const clearSearch = () => setSearchTerm("");

    const filteredClients = clients.filter(client => 
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
                </div>
                <p className="text-muted-foreground">
                    Gerencie sua base de clientes para realizar pedidos de venda e orçamentos.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
                    <TabsList className="mb-5 md:mb-0 w-full md:w-auto">
                        <TabsTrigger value="list" className="flex items-center gap-2">
                            <List className="h-4 w-4" /> Listagem
                        </TabsTrigger>
                        <TabsTrigger value="add" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Novo Cliente
                        </TabsTrigger>
                    </TabsList>

                    <div className="w-full max-w-full md:max-w-sm">
                        <InputGroup className={activeTab !== "list" ? "opacity-50 cursor-not-allowed" : ""}>
                            <InputGroupAddon align="inline-start">
                                <Search size={18} className="text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput 
                                placeholder="Buscar por nome ou e-mail..." 
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

                <TabsContent value="list" className="focus-visible:outline-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <ClientList 
                            clients={filteredClients} 
                            loading={isLoading} 
                            onRefresh={fetchClients} 
                        />
                    </motion.div>
                </TabsContent>

                <TabsContent value="add" className="focus-visible:outline-none">
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <ClientForm onSuccess={() => {
                            fetchClients();
                            setActiveTab("list");
                        }} />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}