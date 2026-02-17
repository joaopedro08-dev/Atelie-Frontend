"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { API_BASE } from "@/routes/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  statusSystem: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  authenticatedRequest: (query: string, variables?: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GET_USER_INFO = `
  query GetUserInfo {
    getUserInfo {
      id
      name
      email
      role
      statusSystem
      createdAt
      lastLogin
    }
  }
`;

const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken {
    refreshToken {
      message
      success
    }
  }
`;

const LOGOUT_MUTATION = `
  mutation Logout {
    logout {
      message
      success
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isRefreshing = useRef(false);
  const refreshPromise = useRef<Promise<boolean> | null>(null);

  const baseFetch = useCallback(async (query: string, variables = {}) => {
    return fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query, variables }),
    });
  }, []);

  const handleRefresh = async () => {
    if (isRefreshing.current) {
      return refreshPromise.current; 
    }

    isRefreshing.current = true;
    refreshPromise.current = (async () => {
      try {
        const response = await baseFetch(REFRESH_TOKEN_MUTATION);
        const result = await response.json();
        const success = !!result.data?.refreshToken?.success;

        if (!success) {
          setUser(null); 
        }
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
  };

  const authenticatedRequest = useCallback(async (query: string, variables = {}) => {
    try {
      let response = await baseFetch(query, variables);

      if (response.status === 401) {
        const refreshed = await handleRefresh();

        if (refreshed) {
          response = await baseFetch(query, variables);
        } else {
          setUser(null);
          return { data: null, errors: [{ message: "Unauthorized" }] };
        }
      }

      return await response.json();

    } catch {
      return { data: null, errors: [{ message: "Network Error" }] };
    }
  }, [baseFetch]);

  const fetchUser = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);

    try {
      const result = await authenticatedRequest(GET_USER_INFO);
      setUser(result?.data?.getUserInfo || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authenticatedRequest]);


  const logout = async () => {
    try {
      await baseFetch(LOGOUT_MUTATION);
    } finally {
      setUser(null);
      setLoading(false);
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
  };

  useEffect(() => {
    fetchUser();

    const handleRevalidate = () => {
      fetchUser(true);
    };

    window.addEventListener("focus", handleRevalidate);
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) handleRevalidate();
    });

    return () => {
      window.removeEventListener("focus", handleRevalidate);
    };
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: () => fetchUser(true), authenticatedRequest }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};