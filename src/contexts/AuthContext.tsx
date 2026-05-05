import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, tokenStore } from "@/lib/api";

interface AuthUser {
  id: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    api<{ user: AuthUser }>("/api/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => tokenStore.clear())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await api<{ token: string; user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        auth: false,
      });
      tokenStore.set(data.token);
      setUser(data.user);
      return { error: null };
    } catch (e: any) {
      return { error: e.message || "Login failed" };
    }
  };

  const logout = async () => {
    tokenStore.clear();
    setUser(null);
  };

  const isAdmin = !!user?.roles?.includes("admin");

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isAdmin, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
