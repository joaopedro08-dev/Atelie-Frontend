"use client";

import { useState } from "react";
import { Edit, Trash2, MoreHorizontal, Hash, DollarSign, Loader2, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteItem } from "@/service/itens/delete-item";
import { EditItemDialog } from "@/components/admin/item/edit-item-dialog";
import { ActionDelete } from "@/components/admin/actions/action-delete";
import { TableListProps } from "@/types/interface";

export function ItemList({ datas = [], loading, onRefresh }: TableListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<any | null>(null);

    const { deleteItem } = DeleteItem();

    const itemsPerPage = 4;
    const safeDatas = datas ?? [];
    const totalPages = Math.max(1, Math.ceil(safeDatas.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = safeDatas.slice(startIndex, startIndex + itemsPerPage);

    const handleEditAction = (item: any) => {
        setSelectedItem(item);
        setIsEditOpen(true);
    };

    const handleOpenRemoveDialog = (item: any) => {
        setItemToRemove(item);
        setIsRemoveOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToRemove) return;
        const res = await deleteItem(itemToRemove.id);
        if (res.success) {
            setIsRemoveOpen(false);
            setItemToRemove(null);
            onRefresh();
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center border rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-40"><div className="flex items-center gap-2"><Hash className="h-4 w-4" /> ID</div></TableHead>
                            <TableHead className="w-40"><div className="flex items-center gap-2"><Hash className="h-4 w-4" /> Código</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><DollarSign className="h-4 w-4" /> Preço Parcelado</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><DollarSign className="h-4 w-4" /> Preço Total</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><CalendarIcon className="h-4 w-4" />Data Cadastro</div></TableHead>
                            <TableHead className="w-24 text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {visibleItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Nenhum item encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                visibleItems.map((item, index) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-muted/30 transition-colors border-b last:border-0"
                                    >
                                        <TableCell><Badge variant="outline" className="font-mono text-xs">#{item.id}</Badge></TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-sm py-1 px-3 bg-primary/5 text-primary border-primary/20 uppercase">
                                                {item.code}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.unitPrice)}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalPrice)}
                                        </TableCell>
                                        <TableCell className="text-right text-sm">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-'}
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
                                                        <DropdownMenuLabel>Gerenciar</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleEditAction(item)}>
                                                            <Edit className="h-4 w-4" /> Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                                                            onClick={() => handleOpenRemoveDialog(item)}
                                                        >
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

            {safeDatas.length > itemsPerPage && (
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-muted-foreground">
                        Página <span className="font-medium text-foreground">{currentPage}</span> de <span className="font-medium text-foreground">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1} className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <ActionDelete
                open={isRemoveOpen}
                onOpenChange={setIsRemoveOpen}
                itemName={itemToRemove?.code || ""}
                onConfirm={confirmDelete}
            />

            <EditItemDialog
                data={selectedItem}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={onRefresh}
            />
        </div>
    );
}