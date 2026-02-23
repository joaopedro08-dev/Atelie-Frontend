"use client";

import { useAuth } from "@/contexts/auth-context";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserRole = "ADMIN" | "USER";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; 
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/signin");
      } else if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        router.replace("/unauthorized"); 
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !isAuthorized) {
    return <FullScreenLoader text="Verificando permissões..." />;
  }

  return <>{children}</>;
}