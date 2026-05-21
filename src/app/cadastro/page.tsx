"use client";

import { Button, buttonStyles } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const result = register({ name, email, phone, password });
    setMessage(result.message);
    setSubmitting(false);

    if (result.ok) {
      router.push("/minha-conta/verificacao");
    }
  }

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
            Cadastro
          </p>
          <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
            Crie uma conta local para testar a jornada inteira.
          </h1>
        </div>
        <form
          className="surface-line grid gap-5 rounded-lg bg-white/[0.06] p-5"
          onSubmit={submitRegister}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              autoComplete="name"
              label="Nome"
              onChange={(event) => setName(event.target.value)}
              required
              value={name}
            />
            <Input
              autoComplete="tel"
              label="Telefone"
              onChange={(event) => setPhone(event.target.value)}
              required
              value={phone}
            />
            <Input
              autoComplete="email"
              label="E-mail"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
            <Input
              autoComplete="new-password"
              label="Senha"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>
          {message ? (
            <p className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/72">
              {message}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button disabled={submitting} type="submit">
              {submitting ? "Criando..." : "Cadastrar"}
            </Button>
            <Link className={buttonStyles("ghost", "surface-line")} href="/login">
              Ja tenho conta
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

