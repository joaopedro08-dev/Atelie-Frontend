"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-destructive text-background">
              <ShieldAlert className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-2xl">Acesso Restrito</EmptyTitle>
            <EmptyDescription>
              Seu perfil de usuário não possui as permissões necessárias para 
              visualizar esta página. O sistema de segurança registrou esta tentativa.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex-row justify-center gap-3">
            <Button variant="outline" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
            <Button onClick={() => router.push("/")} className="gap-2">
              <Home className="size-4" />
              Início
            </Button>
          </EmptyContent>

          <p className="text-[10px] text-foreground uppercase tracking-widest mt-8 opacity-80">
            Segurança Ateliê • 403 Forbidden
          </p>
        </Empty>
      </motion.div>
    </div>
  );
}