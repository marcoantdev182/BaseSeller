"use client";

import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/formatCurrency";
import { ArrowRight, Trash2 } from "lucide-react";

type CartSummaryProps = {
  subtotal: number;
  total: number;
  disabled: boolean;
  onCheckout: () => void;
  onClear: () => void;
};

export function CartSummary({
  subtotal,
  total,
  disabled,
  onCheckout,
  onClear,
}: CartSummaryProps) {
  return (
    <aside className="surface-line grid content-start gap-5 rounded-lg bg-white/[0.06] p-5">
      <div className="grid gap-1">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--cyan)]">
          Resumo
        </p>
        <h2 className="text-2xl font-semibold">Seu carrinho</h2>
      </div>
      <dl className="grid gap-3 border-y border-white/10 py-4 text-sm">
        <div className="flex justify-between gap-4 text-white/68">
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4 text-lg font-semibold">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
      <div className="grid gap-2">
        <Button disabled={disabled} onClick={onCheckout} type="button">
          Finalizar no checkout
          <ArrowRight className="size-4" />
        </Button>
        <Button disabled={disabled} onClick={onClear} type="button" variant="ghost">
          <Trash2 className="size-4" />
          Limpar carrinho
        </Button>
      </div>
    </aside>
  );
}

