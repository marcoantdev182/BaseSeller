"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
              Minha conta
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Bem-vindo, {user?.name}.
            </h1>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <section className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{user?.role === "admin" ? "Administrador" : "Cliente"}</Badge>
                <Badge>{user?.verified ? "Conta verificada" : "Verificacao pendente"}</Badge>
              </div>
              <dl className="grid gap-3 text-sm text-white/72">
                <div className="grid gap-1">
                  <dt className="text-white/42">E-mail</dt>
                  <dd>{user?.email}</dd>
                </div>
                <div className="grid gap-1">
                  <dt className="text-white/42">Telefone</dt>
                  <dd>{user?.phone}</dd>
                </div>
              </dl>
              <Button
                className="w-fit"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                type="button"
                variant="danger"
              >
                <LogOut className="size-4" />
                Sair
              </Button>
            </section>
            <section className="grid content-start gap-3 border-l border-white/10 pl-5">
              <Link className={buttonStyles("secondary", "justify-between")} href="/pedidos">
                Historico de pedidos
              </Link>
              <Link
                className={buttonStyles("secondary", "justify-between")}
                href="/minha-conta/verificacao"
              >
                Verificacao da conta
              </Link>
              <Link className={buttonStyles("secondary", "justify-between")} href="/checkout">
                Ir ao checkout
              </Link>
              {user?.role === "admin" ? (
                <Link className={buttonStyles("primary", "justify-between")} href="/admin">
                  Abrir admin
                </Link>
              ) : null}
            </section>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}

