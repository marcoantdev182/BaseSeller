"use client";

import {
  clearSession,
  loadSessionUser,
  loginLocalUser,
  registerLocalUser,
  verifyLocalUser,
} from "@/lib/auth";
import type { RegisterPayload, User } from "@/types/user";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ActionResult = {
  ok: boolean;
  message: string;
};

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string) => ActionResult;
  register: (payload: RegisterPayload) => ActionResult;
  logout: () => void;
  verifyAccount: () => ActionResult;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUser(loadSessionUser());
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      login: (email, password) => {
        const result = loginLocalUser(email, password);

        if (result.ok) {
          setUser(result.user);
        }

        return { ok: result.ok, message: result.message };
      },
      register: (payload) => {
        const result = registerLocalUser(payload);

        if (result.ok) {
          setUser(result.user);
        }

        return { ok: result.ok, message: result.message };
      },
      logout: () => {
        clearSession();
        setUser(null);
      },
      verifyAccount: () => {
        if (!user) {
          return { ok: false, message: "Faca login para verificar sua conta." };
        }

        const verifiedUser = verifyLocalUser(user.id);

        if (!verifiedUser) {
          return { ok: false, message: "Nao foi possivel verificar a conta." };
        }

        setUser(verifiedUser);
        return { ok: true, message: "Conta verificada com sucesso." };
      },
    }),
    [hydrated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
