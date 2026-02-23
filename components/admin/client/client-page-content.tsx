"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, List, Search, X, Users, FileDown, FileText, TableIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"; 
import { ClientList } from "@/app/admin/clients/client-list";
import { ClientForm } from "@/app/admin/clients/client-form";
import { ListAllClients } from "@/service/clients/list-all-clients";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { exportClientsToPDF } from "@/service/export/clients/client-pdf";
import { exportClientsToExcel } from "@/service/export/clients/client-excel";

export function ClientPageContent() {
    const { listClients } = ListAllClients();
    const [activeTab, setActiveTab] = useState("list");
    const [searchTerm, setSearchTerm] = useState("");
    const [clients, setClients] = useState<any[]>([]);
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

    useEffect(() => { fetchClients(); }, []);

    const filteredClients = clients.filter(client => 
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = (type: 'pdf' | 'excel') => {
        if (type === 'pdf') exportClientsToPDF(filteredClients);
        else exportClientsToExcel(filteredClients);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Users className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Clientes</h1>
                    </div>
                    <p className="text-muted-foreground">Gerencie sua base de clientes e orçamentos.</p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="outline" className="gap-2" disabled={isLoading || filteredClients.length === 0}>
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                    <TabsList className="w-full md:w-auto">
                        <TabsTrigger value="list" className="gap-2"><List className="h-4 w-4" /> Listagem</TabsTrigger>
                        <TabsTrigger value="add" className="gap-2"><Plus className="h-4 w-4" /> Novo Cliente</TabsTrigger>
                    </TabsList>

                    <div className="w-full md:max-w-sm">
                        <InputGroup className={activeTab !== "list" ? "opacity-50" : ""}>
                            <InputGroupAddon align="inline-start">
                                <Search size={18} className="text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput 
                                placeholder="Buscar cliente..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={activeTab !== "list"}
                            />
                            <AnimatePresence>
                                {searchTerm && (
                                    <InputGroupAddon align="inline-end">
                                        <motion.button 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setSearchTerm("")}
                                            className="hover:bg-muted p-1 rounded-full transition-colors"
                                        >
                                            <X size={16} className="text-muted-foreground" />
                                        </motion.button>
                                    </InputGroupAddon>
                                )}
                            </AnimatePresence>
                        </InputGroup>
                    </div>
                </div>

                <TabsContent value="list" className="outline-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <ClientList clients={filteredClients} loading={isLoading} onRefresh={fetchClients} />
                    </motion.div>
                </TabsContent>

                <TabsContent value="add" className="outline-none">
                    <ClientForm onSuccess={() => { fetchClients(); setActiveTab("list"); }} />
                </TabsContent>
            </Tabs>
        </div>
    );
}