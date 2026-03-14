"use client";

import { useState } from "react";
import {
    Edit, Trash2, MoreHorizontal, Loader2, ChevronLeft, ChevronRight,
    CalendarIcon, CreditCard, Package, User as UserIcon,
    Activity
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EditOrderDialog } from "@/components/admin/order/edit-order-dialog";
import { ActionDelete } from "@/components/admin/actions/action-delete";
import { DeleteOrder } from "@/service/orders/delete-order";
import { TableListProps } from "@/types/interface";
import { statusTranslations } from "@/types/record";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

export function OrderList({ datas, loading, onRefresh }: TableListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [orderToRemove, setOrderToRemove] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState<any | null>(null);

    const { deleteOrder } = DeleteOrder();

    const itemsPerPage = 4;
    const totalPages = Math.ceil(datas.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleOrders = datas.slice(startIndex, startIndex + itemsPerPage);

    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const handleOpenEditDialog = (order: any) => {
        setOrderToEdit(order);
        setIsEditOpen(true);
    };

    const handleOpenRemoveDialog = (order: any) => {
        setOrderToRemove(order);
        setIsRemoveOpen(true);
    };

    const confirmDelete = async () => {
        if (!orderToRemove?.clientId || !orderToRemove?.dateOrder) return;

        const res = await deleteOrder(orderToRemove.clientId, orderToRemove.dateOrder);

        if (res.success) {
            setIsRemoveOpen(false);
            setOrderToRemove(null);
            onRefresh();
        }
    };

    if (loading) {
        return <TableSkeleton rows={4} cols={7} />
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead><div className="flex items-center gap-2"><UserIcon className="h-4 w-4" /> Cliente</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><Package className="h-4 w-4" /> Itens</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Total</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><Activity className="h-4 w-4" /> Status</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Data Pedido</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Data Validade</div></TableHead>
                            <TableHead className="w-24 text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {datas.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Nenhum pedido encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                visibleOrders.map((order, index) => (
                                    <motion.tr
                                        key={`${order.clientId}-${order.dateOrder}`}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-muted/30 transition-colors border-b last:border-0"
                                    >
                                        <TableCell className="font-medium text-xs">
                                            <div className="flex flex-col">
                                                <span>{order.name}</span>
                                                <span className="text-[10px] text-muted-foreground">{order.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal text-[10px]">
                                                {order.itemsCount} {order.itemsCount === 1 ? 'Item' : 'Itens'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-xs text-primary">
                                            {currencyFormatter.format(order.totalPrice)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${statusTranslations[order.status]?.color || ""} font-medium text-[10px]`}
                                            >
                                                {statusTranslations[order.status]?.label || order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs whitespace-nowrap">
                                            {order.dateOrder ? format(new Date(order.dateOrder), "dd/MM/yyyy", { locale: ptBR }) : '-'}
                                        </TableCell>
                                        <TableCell className="text-xs whitespace-nowrap">
                                            {order.dateOrder ? format(new Date(order.dueDate), "dd/MM/yyyy", { locale: ptBR }) : '-'}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                } />
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer"
                                                            onClick={() => handleOpenEditDialog(order)}>
                                                            <Edit className="h-4 w-4" /> Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                                                            onClick={() => handleOpenRemoveDialog(order)}>
                                                            <Trash2 className="h-4 w-4" /> Excluir
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {datas.length > itemsPerPage && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-muted-foreground">
                        Página <span className="font-medium text-foreground">{currentPage}</span> de <span className="font-medium text-foreground">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <EditOrderDialog
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                data={orderToEdit}
                onSuccess={onRefresh}
            />

            <ActionDelete
                open={isRemoveOpen}
                onOpenChange={setIsRemoveOpen}
                itemName={orderToRemove ? `Pedidos de ${orderToRemove.name}` : ""}
                onConfirm={confirmDelete}
            />
        </div>
    );
}