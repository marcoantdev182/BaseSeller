"use client";

import { buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  requireVerified?: boolean;
  requireAdmin?: boolean;
};

export function ProtectedRoute({
  children,
  requireVerified = false,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { hydrated, user } = useAuth();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requireVerified && !user.verified) {
      router.replace("/minha-conta/verificacao");
    }
  }, [hydrated, requireVerified, router, user]);

  if (!hydrated) {
    return (
      <section className="px-6 pb-20 pt-36">
        <div className="surface-line mx-auto max-w-xl rounded-lg bg-white/[0.06] p-6 text-white/72">
          Carregando acesso...
        </div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  if (requireVerified && !user.verified) {
    return (
      <section className="px-6 pb-20 pt-36">
        <div className="surface-line mx-auto grid max-w-xl gap-4 rounded-lg bg-white/[0.06] p-6">
          <h1 className="text-2xl font-semibold">
            Verifique sua conta para finalizar a compra
          </h1>
          <p className="text-white/68">
            A verificacao mockada libera o checkout e o envio do pedido.
          </p>
          <Link
            className={buttonStyles("primary", "w-fit")}
            href="/minha-conta/verificacao"
          >
            Ir para verificacao
          </Link>
        </div>
      </section>
    );
  }

  if (requireAdmin && user.role !== "admin") {
    return (
      <section className="px-6 pb-20 pt-36">
        <div className="surface-line mx-auto grid max-w-xl gap-4 rounded-lg bg-white/[0.06] p-6">
          <h1 className="text-2xl font-semibold">Area administrativa restrita</h1>
          <p className="text-white/68">
            Entre com um usuario administrador para editar o catalogo.
          </p>
          <Link className={buttonStyles("secondary", "w-fit")} href="/minha-conta">
            Voltar para minha conta
          </Link>
        </div>
      </section>
    );
  }

  return children;
}
