import { describeSelections, getCartSubtotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import type { CartItem } from "@/types/cart";

export const STORE_WHATSAPP_NUMBER = "55NUMEROAQUI";

type WhatsAppMessagePayload = {
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  observations: string;
};

export function buildWhatsAppOrderMessage({
  customerName,
  customerPhone,
  items,
  observations,
}: WhatsAppMessagePayload) {
  const itemLines = items.map((item, index) => {
    const selections = describeSelections(item.selections);
    const details = selections ? ` (${selections})` : "";

    return [
      `${index + 1}. ${item.name}${details}`,
      `Quantidade: ${item.quantity}`,
      `Preco unitario: ${formatCurrency(item.price)}`,
      `Subtotal: ${formatCurrency(item.price * item.quantity)}`,
    ].join("\n");
  });

  return [
    "Novo pedido BaseSeller",
    "",
    `Cliente: ${customerName}`,
    `Telefone: ${customerPhone}`,
    "",
    "Produtos:",
    ...itemLines,
    "",
    `Total: ${formatCurrency(getCartSubtotal(items))}`,
    `Observacoes: ${observations.trim() || "Sem observacoes."}`,
  ].join("\n");
}

export function createWhatsAppCheckoutUrl(payload: WhatsAppMessagePayload) {
  const message = buildWhatsAppOrderMessage(payload);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

