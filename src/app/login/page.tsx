"use client";

import { Button, buttonStyles } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const result = login(email, password);
    setMessage(result.message);
    setSubmitting(false);

    if (result.ok) {
      router.push("/minha-conta");
    }
  }

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
            Login
          </p>
          <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
            Entre para liberar conta, pedidos e checkout.
          </h1>
          <p className="leading-8 text-white/64">
            O acesso administrador demo usa `admin@baseseller.dev` e
            `baseseller123`.
          </p>
        </div>
        <form
          className="surface-line grid gap-5 rounded-lg bg-white/[0.06] p-5"
          onSubmit={submitLogin}
        >
          <Input
            autoComplete="email"
            label="E-mail"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
          <Input
            autoComplete="current-password"
            label="Senha"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
          {message ? (
            <p className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/72">
              {message}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button disabled={submitting} type="submit">
              {submitting ? "Entrando..." : "Entrar"}
            </Button>
            <Link className={buttonStyles("ghost", "surface-line")} href="/cadastro">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

