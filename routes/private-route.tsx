"use client";

import { useAuth } from "@/contexts/auth-context";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types/type";

export function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: UserRole[]}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/signin");
      } else if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return <FullScreenLoader text="Validando autenticação..." />;
  }

  const hasAccess = user && (!allowedRoles || allowedRoles.includes(user.role as UserRole));

  if (!hasAccess) {
    return <FullScreenLoader text="Verificando permissões..." />;
  }

  return <>{children}</>;
}