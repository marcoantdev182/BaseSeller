"use client";

import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { addOrder } from "@/lib/orders";
import { createWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import type { Order } from "@/types/order";
import { MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function createOrderId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `order-${Date.now()}`;
}

export function WhatsAppCheckout() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, total } = useCart();
  const [customerName, setCustomerName] = useState(user?.name ?? "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone ?? "");
  const [observations, setObservations] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function finishOrder() {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!user.verified) {
      router.push("/minha-conta/verificacao");
      return;
    }

    if (!items.length) {
      setMessage("Seu carrinho esta vazio.");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      setMessage("Informe nome e telefone para enviar o pedido.");
      return;
    }

    setSubmitting(true);
    setMessage("Pedido preparado. Abrindo WhatsApp...");

    const order: Order = {
      id: createOrderId(),
      userId: user.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items,
      total,
      observations: observations.trim(),
      status: "whatsapp-pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    window.open(
      createWhatsAppCheckoutUrl({
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        items,
        observations,
      }),
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitting(false);
  }

  return (
    <section className="surface-line grid gap-5 rounded-lg bg-white/[0.06] p-5">
      <div className="grid gap-2">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--cyan)]">
          Dados do cliente
        </p>
        <h2 className="text-2xl font-semibold">Enviar pedido</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Nome"
          onChange={(event) => setCustomerName(event.target.value)}
          required
          value={customerName}
        />
        <Input
          label="Telefone"
          onChange={(event) => setCustomerPhone(event.target.value)}
          required
          value={customerPhone}
        />
      </div>
      <TextArea
        label="Observacoes"
        onChange={(event) => setObservations(event.target.value)}
        placeholder="Entrega, referencia ou detalhe do pedido"
        value={observations}
      />
      {message ? (
        <p className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/72">
          {message}
        </p>
      ) : null}
      <Button disabled={submitting} onClick={finishOrder} type="button">
        <MessageCircleMore className="size-4" />
        {submitting ? "Preparando..." : "Finalizar pelo WhatsApp"}
      </Button>
    </section>
  );
}

