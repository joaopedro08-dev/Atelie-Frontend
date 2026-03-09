"use client"

import { UsersList } from "@/app/admin/users/users-list";
import { listAllUsers } from "@/service/users/list-all-users";
import { UsersModel } from "@/types/interface";
import { Search, UserCheck, Users, X, FileDown, TableIcon, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { exportUsersToPDF } from "@/service/export/users/users-pdf";
import { exportUsersToExcel } from "@/service/export/users/users-excel";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const formatNumber = (num: number): string => {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error("O valor deve ser um número inteiro.");
    }
    return String(num).padStart(3, '0');
}

export function UsersContentPage() {
    const { listUsers } = listAllUsers();
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<UsersModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await listUsers();
            setUsers(Array.isArray(data) ? (data as UsersModel[]) : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = (type: 'pdf' | 'excel') => {
        if (type === 'pdf') exportUsersToPDF(filteredUsers);
        else exportUsersToExcel(filteredUsers);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="w-8 h-8 text-primary" />
                        Usuários do Sistema
                    </h1>
                    <p className="text-muted-foreground">
                        Visualização e monitoramento de todos os usuários registrados com a role Usuário.
                    </p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg hidden md:flex justify-center items-center gap-4 min-w-35 border border-transparent hover:border-border transition-colors">
                    <UserCheck className="text-green-500 h-6 w-6 shrink-0" />
                    <div className="flex flex-col items-start justify-center border-l pl-4 border-border min-h-10">
                        {isLoading ? (
                            <div className="flex items-center justify-center w-full">
                                <Spinner className="text-primary h-5 w-5" />
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col justify-center items-center"
                            >
                                <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">
                                    Total
                                </p>
                                <p className="text-xl font-bold tabular-nums leading-none">
                                    {formatNumber(users?.length || 0)}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div >

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="gap-2" disabled={isLoading || filteredUsers.length === 0}>
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

                <div className="w-full md:max-w-sm">
                    <InputGroup>
                        <InputGroupAddon align="inline-start">
                            <Search size={18} className="text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                            placeholder="Buscar usuário..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isLoading}
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

            <hr className="border-border" />

            <div className="rounded-md border bg-card">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <UsersList data={filteredUsers} isLoading={isLoading} />
                </motion.div>
            </div>
        </div >
    );
}