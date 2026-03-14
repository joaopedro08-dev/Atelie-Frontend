"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { API_BASE } from "@/api/api";
import { User, AuthContextType, GraphQLResponse } from "@/types/interface"
import { LOGOUT_MUTATION, REFRESH_TOKEN_MUTATION, GET_USER_INFO } from "@/types/query";
import { ROLE_REDIRECT, DEFAULT_REDIRECT } from "@/types/record";

const PUBLIC_ROUTES = ["/signin", "/signup"];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const cached = sessionStorage.getItem('cached-user')
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('cached-user')
  })

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
    if (refreshPromise.current) return refreshPromise.current;

    refreshPromise.current = (async () => {
      try {
        const response = await baseFetch(REFRESH_TOKEN_MUTATION);

        if (!response.ok) {
          setUser(null);
          return false;
        }

        const result = await response.json();
        const success = !!result.data?.refreshToken?.success;

        if (!success) setUser(null);
        return success;
      } catch {
        setUser(null);
        return false;
      } finally {
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
              err.message?.toLowerCase().includes("unauthorized") ||
              err.message?.toLowerCase().includes("unauthenticated") ||
              err.extensions?.code === "UNAUTHENTICATED" ||
              err.extensions?.code === "UNAUTHORIZED"
          );

        if (isUnauthorized) {
          const refreshed = await handleRefresh();

          if (refreshed) {
            await new Promise((resolve) => setTimeout(resolve, 50));

            const retryResponse = await baseFetch(query, variables);
            const retryResult: GraphQLResponse<T> = await retryResponse.json();

            const retryUnauthorized =
              retryResponse.status === 401 ||
              retryResult.errors?.some(
                (err) =>
                  err.message?.toLowerCase().includes("unauthorized") ||
                  err.extensions?.code === "UNAUTHENTICATED"
              );

            if (retryUnauthorized) {
              setUser(null);
              return {
                data: null,
                errors: [{ message: "Sessão expirada. Faça login novamente." }],
              };
            }

            return retryResult;
          }

          setUser(null);
          router.replace("/signin");
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
    [baseFetch, handleRefresh, router]
  );

  const fetchUser = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true)
      try {
        const result = await authenticatedRequest<{ getUserInfo: User }>(GET_USER_INFO)
        const fetchedUser = result?.data?.getUserInfo ?? null
        setUser(fetchedUser)
        if (fetchedUser) {
          sessionStorage.setItem('cached-user', JSON.stringify(fetchedUser))
        } else {
          sessionStorage.removeItem('cached-user')
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    },
    [authenticatedRequest]
  )

  const logout = useCallback(async () => {
    try {
      await baseFetch(LOGOUT_MUTATION);
    } finally {
      setUser(null);
      sessionStorage.removeItem('cached-user') 
      setLoading(false);
      router.replace("/signin");
    }
  }, [baseFetch, router]);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isTauri = '__TAURI_INTERNALS__' in window;

    if (isTauri && pathname.startsWith("/user")) {
      router.replace("/signin");
      return;
    }

    if (user && isPublicRoute) {
      const destination = ROLE_REDIRECT[user.role] ?? DEFAULT_REDIRECT;
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