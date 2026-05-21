"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { describeSelections } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import { getOrdersByUser } from "@/lib/orders";
import { useMemo } from "react";

export default function OrdersPage() {
  const { user } = useAuth();
  const orders = useMemo(
    () => (user ? getOrdersByUser(user.id) : []),
    [user],
  );

  return (
    <ProtectedRoute>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
              Pedidos
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Historico mockado da sua conversa de compra.
            </h1>
          </div>
          {orders.length ? (
            <div className="grid gap-4">
              {orders.map((order) => (
                <article
                  className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-5"
                  key={order.id}
                >
                  <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row">
                    <div className="grid gap-1">
                      <h2 className="text-xl font-semibold">
                        Pedido {order.id.slice(0, 8)}
                      </h2>
                      <p className="text-sm text-white/56">
                        {new Date(order.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>WhatsApp pendente</Badge>
                      <span className="text-xl font-semibold text-[var(--gold)]">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {order.items.map((item) => {
                      const details = describeSelections(item.selections);

                      return (
                        <div
                          className="flex flex-col justify-between gap-1 text-sm text-white/68 sm:flex-row"
                          key={item.id}
                        >
                          <span>
                            {item.quantity} x {item.name}
                            {details ? ` | ${details}` : ""}
                          </span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-line rounded-lg bg-white/[0.06] p-6 text-white/68">
              Seus pedidos enviados pelo checkout aparecerao aqui.
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
