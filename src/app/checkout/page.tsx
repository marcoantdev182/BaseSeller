"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { WhatsAppCheckout } from "@/components/checkout/WhatsAppCheckout";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { describeSelections } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, hydrated } = useCart();

  return (
    <ProtectedRoute requireVerified>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-8">
          <div className="grid max-w-3xl gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
              Checkout
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Resumo pronto para seguir ao WhatsApp.
            </h1>
          </div>

          {!hydrated ? (
            <div className="surface-line rounded-lg bg-white/[0.05] p-6 text-white/68">
              Carregando pedido...
            </div>
          ) : items.length ? (
            <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
              <section className="surface-line grid content-start gap-4 rounded-lg bg-white/[0.06] p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-semibold">Pedido</h2>
                  <Badge>{items.length} linhas</Badge>
                </div>
                {items.map((item) => {
                  const selections = describeSelections(item.selections);

                  return (
                    <article
                      className="grid gap-2 border-b border-white/10 py-3 last:border-b-0"
                      key={item.id}
                    >
                      <div className="flex justify-between gap-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="text-[var(--gold)]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-sm text-white/58">
                        {item.quantity} x {formatCurrency(item.price)}
                        {selections ? ` | ${selections}` : ""}
                      </p>
                    </article>
                  );
                })}
                <div className="flex justify-between gap-4 pt-2 text-xl font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </section>
              <WhatsAppCheckout />
            </div>
          ) : (
            <div className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-6">
              <h2 className="text-2xl font-semibold">Nao ha itens para checkout.</h2>
              <Link className={buttonStyles("primary", "w-fit")} href="/produtos">
                Voltar aos produtos
              </Link>
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}

