"use client";

import { useAuth } from "@/contexts/auth-context";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user && !isRedirecting) {
      setIsRedirecting(true);
      router.replace("/signin");
    }
  }, [user, loading, router, isRedirecting]);

  if (loading || (isRedirecting && !user)) {
    return <FullScreenLoader text="Verificando autenticação..." />;
  }

  if (!user) return null;

  return <>{children}</>;
}