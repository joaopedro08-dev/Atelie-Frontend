"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, List, Search, X, ShoppingCart, FileDown, FileText, TableIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ListAllOrders } from "@/service/orders/list-all-orders";
import { OrderList } from "@/app/admin/orders/order-list";
import { OrderForm } from "@/app/admin/orders/order-form";
import { exportOrdersToPDF } from "@/service/export/orders/order-pdf";
import { exportOrdersToExcel } from "@/service/export/orders/order-excel";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface OrderModel {
    id: number;
    itemId: number;
    clientId: number;
    methodPayment: string;
    status: string;
    dateOrder: string;
}

const statusTranslations: Record<string, { label: string }> = {
    PENDING: { label: "Pendente" },
    IN_PROGRESS: { label: "Em Produção" },
    COMPLETED: { label: "Concluído" },
    CANCELED: { label: "Cancelado" },
};

const paymentTranslations: Record<string, string> = {
    SYSTEM: "Pix",
    CARD: "Cartão",
    INSTALLMENT_PLAN: "Crediário",
    LOYAL_CUSTOMER: "Cliente Fidelizado"
};

export function OrderPageContent() {
    const { listOrders } = ListAllOrders();
    const [activeTab, setActiveTab] = useState("list");
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await listOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOrderSuccess = () => {
        fetchOrders();
        setActiveTab("list");
    };

    const clearSearch = () => setSearchTerm("");

    const filteredOrders = orders.filter(order => {
        const search = searchTerm.toLowerCase();
        const matchesId = order.id?.toString().includes(searchTerm);
        const statusLabel = statusTranslations[order.status]?.label?.toLowerCase() || "";
        const matchesStatus = statusLabel.includes(search);
        const paymentLabel = paymentTranslations[order.methodPayment]?.toLowerCase() || "";
        const matchesPayment = paymentLabel.includes(search);
        const matchesClient = order.clientId?.toString().includes(search);
        const matchesItem = order.itemId?.toString().includes(search);

        return matchesId || matchesStatus || matchesPayment || matchesClient || matchesItem;
    });

    const handleExport = (type: 'pdf' | 'excel') => {
        if (type === 'pdf') {
            exportOrdersToPDF(filteredOrders, statusTranslations, paymentTranslations);
        } else {
            exportOrdersToExcel(filteredOrders, statusTranslations, paymentTranslations);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
                    </div>
                    <p className="text-muted-foreground">Gerencie seus pedidos e histórico de vendas.</p>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="gap-2" disabled={isLoading || filteredOrders.length === 0}>
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
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                    <TabsList className="w-full md:w-auto">
                        <TabsTrigger value="list" className="flex items-center gap-2">
                            <List className="h-4 w-4" /> Listagem
                        </TabsTrigger>
                        <TabsTrigger value="add" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Novo Pedido
                        </TabsTrigger>
                    </TabsList>

                    <div className="w-full max-w-sm">
                        <InputGroup className={activeTab !== "list" ? "opacity-50" : ""}>
                            <InputGroupAddon align="inline-start">
                                <Search size={18} className="text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput
                                placeholder="Buscar por status ou pagamento..."
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

                <TabsContent value="list" className="focus-visible:outline-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <OrderList
                            orders={filteredOrders}
                            loading={isLoading}
                            onRefresh={fetchOrders}
                        />
                    </motion.div>
                </TabsContent>

                <TabsContent value="add" className="focus-visible:outline-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <OrderForm onSuccess={handleOrderSuccess} />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}