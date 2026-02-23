"use client";

import { useState } from "react";
import { Edit, Trash2, MoreHorizontal, Hash, User, Mail, Phone, Loader2, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteClient } from "@/service/clients/delete-client";
import { EditClientDialog } from "@/components/admin/client/edit-client-dialog";
import { ActionDelete } from "@/components/admin/actions/action-delete";

interface ClientListProps {
    clients: any[];
    loading: boolean;
    onRefresh: () => void;
}

export function ClientList({ clients, loading, onRefresh }: ClientListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [clientToRemove, setClientToRemove] = useState<any | null>(null);

    const { deleteClient } = DeleteClient();

    const itemsPerPage = 4;
    const totalPages = Math.ceil(clients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleClients = clients.slice(startIndex, startIndex + itemsPerPage);

    const handleEditAction = (client: any) => {
        setSelectedClient(client);
        setIsEditOpen(true);
    };

    const handleOpenRemoveDialog = (client: any) => {
        setClientToRemove(client);
        setIsRemoveOpen(true);
    };

    const confirmDelete = async () => {
        if (!clientToRemove) return;

        const res = await deleteClient(clientToRemove.id);

        if (res.success) {
            setIsRemoveOpen(false);
            setClientToRemove(null);
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
                            <TableHead><div className="flex items-center gap-2"><User className="h-4 w-4" /> Nome</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-center gap-2"><Mail className="h-4 w-4" /> E-mail</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><Phone className="h-4 w-4" /> Telefone</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><CalendarIcon className="h-4 w-4" /> Cadastro</div></TableHead>
                            <TableHead className="w-24 text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {clients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Nenhum cliente encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                visibleClients.map((client, index) => (
                                    <motion.tr
                                        key={client.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-muted/30 transition-colors border-b last:border-0"
                                    >
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-xs">
                                                #{client.id.slice(-6).toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {client.name}
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {client.email}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="secondary" className="font-mono text-xs">
                                                {client.phone}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-sm">
                                            {new Date(client.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
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
                                                        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleEditAction(client)}>
                                                            <Edit className="h-4 w-4" /> Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                                                            onClick={() => handleOpenRemoveDialog(client)}
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

            {clients.length > itemsPerPage && (
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

            {clientToRemove && (
                <ActionDelete
                    open={isRemoveOpen}
                    onOpenChange={setIsRemoveOpen}
                    itemName={clientToRemove.name}
                    onConfirm={confirmDelete}
                />
            )}

            <EditClientDialog
                client={selectedClient}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={onRefresh}
            />
        </div>
    );
}