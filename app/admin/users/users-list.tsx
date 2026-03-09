"use client";

import { useState } from "react";
import { Hash, User, Mail, Loader2, ChevronLeft, ChevronRight, CalendarIcon, Activity, User2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { UsersModel } from "@/types/interface";

export function UsersList({ data, isLoading }: { data: UsersModel[], isLoading: boolean }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleUsers = data.slice(startIndex, startIndex + itemsPerPage);

    const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
    const goToPreviousPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

    if (isLoading) {
        return (
            <div className="flex h-40 items-center justify-center border rounded-md bg-card/50">
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
                            <TableHead className="w-32"><div className="flex items-center gap-2"><Hash className="h-4 w-4" /> ID</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><User className="h-4 w-4" /> Nome</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><Mail className="h-4 w-4" /> E-mail</div></TableHead>
                            <TableHead><div className="flex items-center gap-2"><User2 className="h-4 w-4" /> Role</div></TableHead>
                            <TableHead className="text-center"><div className="flex items-center justify-center gap-2"><Activity className="h-4 w-4" /> Status</div></TableHead>
                            <TableHead className="text-right"><div className="flex items-center justify-end gap-2"><CalendarIcon className="h-4 w-4" /> Cadastro</div></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="wait">
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                visibleUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2, delay: index * 0.04 }}
                                        className="hover:bg-muted/30 transition-colors border-b last:border-0"
                                    >
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono text-[10px] uppercase">
                                                #{String(user.id).padStart(3, '0')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>{user.role ? "Usuário" : "N/A"}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge 
                                                variant={user.statusSystem ? "default" : "secondary"}
                                                className={user.statusSystem ? "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200" : ""}
                                            >
                                                {user.statusSystem ? "Ativo" : "Inativo"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-sm text-muted-foreground">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '--/--/--'}
                                        </TableCell>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {data.length > itemsPerPage && (
                <div className="flex items-center justify-between px-2 py-1">
                    <p className="text-xs text-muted-foreground">
                        Página <span className="font-medium text-foreground">{visibleUsers.length}</span> de <span className="font-medium text-foreground">{data.length}</span> usuários
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1} className="h-8 px-2">
                            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                        </Button>
                        <div className="text-xs font-medium">
                            {currentPage} / {totalPages}
                        </div>
                        <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages} className="h-8 px-2">
                            Próximo <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}