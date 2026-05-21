"use client";

import { buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/admin", label: "Admin" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user } = useAuth();
  const { itemCount } = useCart();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[65] bg-black/72 px-4 py-4 backdrop-blur-md lg:hidden">
      <div className="surface-line ml-auto grid w-full max-w-sm gap-6 rounded-lg bg-[#0d1116] p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
            BaseSeller
          </span>
          <button
            aria-label="Fechar menu"
            className="grid size-10 place-items-center rounded-md text-white/72 transition hover:bg-white/[0.08] hover:text-white"
            onClick={onClose}
            title="Fechar menu"
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="grid gap-2">
          {links.map((link) => (
            <Link
              className="rounded-md px-3 py-3 text-lg text-white/86 transition hover:bg-white/[0.08] hover:text-white"
              href={link.href}
              key={link.href}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 border-t border-white/10 pt-5">
          <Link
            className={buttonStyles("secondary", "w-full")}
            href="/carrinho"
            onClick={onClose}
          >
            <ShoppingBag className="size-4" />
            Carrinho ({itemCount})
          </Link>
          <Link
            className={buttonStyles("primary", "w-full")}
            href={user ? "/minha-conta" : "/login"}
            onClick={onClose}
          >
            <UserRound className="size-4" />
            {user ? "Minha conta" : "Entrar"}
          </Link>
        </div>
      </div>
    </div>
  );
}

