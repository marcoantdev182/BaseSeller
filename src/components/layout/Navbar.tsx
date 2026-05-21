"use client";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Menu, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { href: "/produtos", label: "Produtos" },
  { href: "/carrinho", label: "Carrinho" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { itemCount } = useCart();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-60 px-4 py-4 sm:px-6">
        <div className="surface-line mx-auto flex max-w-7xl items-center justify-between rounded-lg bg-black/45 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl">
          <Link className="grid gap-0.5" href="/">
            <span className="text-base font-semibold uppercase tracking-[0.2em] text-white">
              BaseSeller
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--gold)]">
              Loja base
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-sm text-white/72 transition duration-300 hover:bg-white/[0.08] hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              aria-label="Abrir carrinho"
              className="relative hidden size-11 place-items-center rounded-md text-white/80 transition hover:bg-white/[0.08] hover:text-white sm:grid"
              href="/carrinho"
              title="Carrinho"
            >
              <ShoppingBag className="size-5" />
              {itemCount ? (
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[var(--ember)] px-1 text-[0.68rem] font-bold text-black">
                  {itemCount}
                </span>
              ) : null}
            </Link>
            <Link
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.08] hover:text-white sm:flex"
              href={user ? "/minha-conta" : "/login"}
            >
              <UserRound className="size-4" />
              {user ? user.name.split(" ")[0] : "Entrar"}
              {user?.verified ? <Badge>Verificada</Badge> : null}
            </Link>
            <button
              aria-label="Abrir menu"
              className="grid size-11 place-items-center rounded-md text-white/80 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              title="Menu"
              type="button"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

