"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { CircleCheckBig, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerificationPage() {
  const { user, verifyAccount } = useAuth();
  const [message, setMessage] = useState("");

  return (
    <ProtectedRoute>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-4xl gap-6">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Verificacao
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Verifique sua conta para finalizar a compra
            </h1>
          </div>
          <section className="surface-line grid gap-5 rounded-lg bg-white/[0.06] p-6">
            <div className="flex flex-wrap items-center gap-3">
              {user?.verified ? (
                <CircleCheckBig className="size-7 text-[var(--cyan)]" />
              ) : (
                <ShieldCheck className="size-7 text-[var(--ember)]" />
              )}
              <Badge>
                {user?.verified ? "Conta verificada" : "Aguardando verificacao"}
              </Badge>
            </div>
            <p className="max-w-2xl leading-8 text-white/68">
              Esta etapa simula uma verificacao inicial no front. Depois voce
              pode substituir este ponto por e-mail, SMS ou validacao no backend.
            </p>
            {message ? (
              <p className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/72">
                {message}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                disabled={user?.verified}
                onClick={() => setMessage(verifyAccount().message)}
                type="button"
              >
                {user?.verified ? "Verificada" : "Simular verificacao"}
              </Button>
              <Link className={buttonStyles("secondary")} href="/checkout">
                Voltar ao checkout
              </Link>
            </div>
          </section>
        </div>
      </section>
    </ProtectedRoute>
  );
}

