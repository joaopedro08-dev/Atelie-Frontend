"use client";

import { useAuth } from "@/contexts/auth-context";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return <FullScreenLoader text="Verificando autenticação..." />;
  }

  if (!user) {
    return <FullScreenLoader text="Redirecionando..." />;
  }

  return <>{children}</>;
}