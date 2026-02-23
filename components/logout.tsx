"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { Loader2, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Logout() {
    const { logout } = useAuth();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);
        try {
            await logout();
        } catch (error) {
            console.error("Erro ao sair:", error);
            setIsPending(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger render={
                <Button variant="destructive" className="text-foreground w-full flex justify-start items-center" onSelect={(e) => e.preventDefault()}>
                    <LogOutIcon className="mr-2 size-4" />
                    Sair
                </Button>
            } />

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Sua sessão será encerrada e você precisará fazer login novamente para acessar o painel administrativo.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        disabled={isPending}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirmar Sair
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}