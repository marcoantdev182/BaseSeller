"use client";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { user, hydrated: authHydrated } = useAuth();
  const { items, hydrated, subtotal, total, clearCart } = useCart();
  const [notice, setNotice] = useState("");

  function goToCheckout() {
    if (!authHydrated) {
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    if (!user.verified) {
      setNotice("Verifique sua conta para finalizar a compra");
      router.push("/minha-conta/verificacao");
      return;
    }

    router.push("/checkout");
  }

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-7xl gap-8">
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
            Carrinho
          </p>
          <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
            Revise itens e quantidades antes do pedido.
          </h1>
        </div>

        {user && !user.verified ? (
          <div className="rounded-lg border border-[#ff835f]/35 bg-[#ff835f]/12 px-5 py-4 text-[#ffd7cb]">
            Verifique sua conta para finalizar a compra
          </div>
        ) : null}
        {notice ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.06] px-5 py-4 text-white/72">
            {notice}
          </div>
        ) : null}

        {!hydrated ? (
          <div className="surface-line rounded-lg bg-white/[0.05] p-6 text-white/68">
            Carregando carrinho...
          </div>
        ) : items.length ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_23rem]">
            <div className="grid gap-4">
              {items.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
            <CartSummary
              disabled={!items.length}
              onCheckout={goToCheckout}
              onClear={clearCart}
              subtotal={subtotal}
              total={total}
            />
          </div>
        ) : (
          <div className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-6">
            <h2 className="text-2xl font-semibold">Seu carrinho esta vazio.</h2>
            <Link className={buttonStyles("primary", "w-fit")} href="/produtos">
              Escolher produtos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

