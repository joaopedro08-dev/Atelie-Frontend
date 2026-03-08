"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { API_BASE } from "@/api/api";
import { User, AuthContextType, GraphQLResponse } from "@/types/interface"
import { LOGOUT_MUTATION, REFRESH_TOKEN_MUTATION, GET_USER_INFO } from "@/types/query";
import { ROLE_REDIRECT } from "@/types/record";

const PUBLIC_ROUTES = ["/signin", "/signup"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isRefreshing = useRef(false);
  const refreshPromise = useRef<Promise<boolean> | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const baseFetch = useCallback(
    async (query: string, variables: Record<string, unknown> = {}) => {
      return fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ query, variables }),
      });
    },
    []
  );

  const handleRefresh = useCallback(async (): Promise<boolean> => {
    if (isRefreshing.current) return refreshPromise.current!;

    isRefreshing.current = true;

    refreshPromise.current = (async () => {
      try {
        const response = await baseFetch(REFRESH_TOKEN_MUTATION);
        const result = await response.json();
        const success = !!result.data?.refreshToken?.success;
        if (!success) setUser(null);
        return success;
      } catch {
        setUser(null);
        return false;
      } finally {
        isRefreshing.current = false;
        refreshPromise.current = null;
      }
    })();

    return refreshPromise.current;
  }, [baseFetch]);

  const authenticatedRequest = useCallback(
    async <T = unknown>(
      query: string,
      variables: Record<string, unknown> = {}
    ): Promise<GraphQLResponse<T>> => {
      try {
        const response = await baseFetch(query, variables);
        const result: GraphQLResponse<T> = await response.json();

        const isUnauthorized =
          response.status === 401 ||
          result.errors?.some(
            (err) =>
              err.message?.includes("Unauthorized") ||
              err.extensions?.code === "UNAUTHENTICATED"
          );

        if (isUnauthorized) {
          const refreshed = await handleRefresh();

          if (refreshed) {
            const retryResponse = await baseFetch(query, variables);
            return retryResponse.json();
          }

          setUser(null);
          return {
            data: null,
            errors: [{ message: "Sessão expirada. Faça login novamente." }],
          };
        }

        return result;
      } catch {
        return {
          data: null,
          errors: [{ message: "Erro de conexão. Verifique sua internet." }],
        };
      }
    },
    [baseFetch, handleRefresh]
  );

  const fetchUser = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        const result = await authenticatedRequest<{ getUserInfo: User }>(
          GET_USER_INFO
        );
        setUser(result?.data?.getUserInfo ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    [authenticatedRequest]
  );

  const logout = useCallback(async () => {
    try {
      await baseFetch(LOGOUT_MUTATION);
    } finally {
      setUser(null);
      setLoading(false);
      router.replace("/signin");
    }
  }, [baseFetch, router]);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (user && isPublicRoute) {
      const destination = ROLE_REDIRECT[user.role] ?? "/";
      router.replace(destination);
      return;
    }

    if (!user && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
      router.replace("/signin");
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    fetchUser();

    const handleRevalidate = () => fetchUser(true);
    window.addEventListener("focus", handleRevalidate);
    return () => window.removeEventListener("focus", handleRevalidate);
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: () => fetchUser(true),
        authenticatedRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};

export const useGraphQL = () => {
  const { authenticatedRequest } = useAuth();

  const query = useCallback(
    <T,>(gql: string, variables?: Record<string, unknown>) =>
      authenticatedRequest<T>(gql, variables),
    [authenticatedRequest]
  );

  return { query };
}