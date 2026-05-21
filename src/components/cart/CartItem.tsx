"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { describeSelections } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import type { CartItem as CartItemType } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart();
  const details = describeSelections(item.selections);

  return (
    <article className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-4 sm:grid-cols-[8rem_1fr]">
      <Link
        className="relative aspect-square overflow-hidden rounded-md bg-white/[0.04]"
        href={`/produtos/${item.productId}`}
      >
        <Image
          alt={item.name}
          className="object-cover"
          fill
          sizes="128px"
          src={item.image}
        />
      </Link>
      <div className="grid gap-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="grid gap-1">
            <Link
              className="text-xl font-semibold transition hover:text-[var(--gold)]"
              href={`/produtos/${item.productId}`}
            >
              {item.name}
            </Link>
            {details ? <p className="text-sm text-white/56">{details}</p> : null}
            <p className="text-sm text-white/56">Estoque: {item.stock}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-semibold text-[var(--gold)]">
              {formatCurrency(item.price * item.quantity)}
            </p>
            <p className="text-sm text-white/54">
              {formatCurrency(item.price)} por unidade
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="surface-line flex min-h-11 items-center rounded-md bg-black/25">
            <button
              aria-label={`Diminuir quantidade de ${item.name}`}
              className="grid size-11 place-items-center text-white/72 transition hover:text-white disabled:opacity-35"
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              title="Diminuir quantidade"
              type="button"
            >
              <Minus className="size-4" />
            </button>
            <input
              aria-label={`Quantidade de ${item.name}`}
              className="w-14 bg-transparent text-center text-sm font-semibold text-white outline-none"
              max={item.stock}
              min={1}
              onChange={(event) =>
                updateQuantity(item.id, Number(event.target.value) || 1)
              }
              type="number"
              value={item.quantity}
            />
            <button
              aria-label={`Aumentar quantidade de ${item.name}`}
              className="grid size-11 place-items-center text-white/72 transition hover:text-white disabled:opacity-35"
              disabled={item.quantity >= item.stock}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              title="Aumentar quantidade"
              type="button"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <Button onClick={() => removeItem(item.id)} type="button" variant="danger">
            <Trash2 className="size-4" />
            Remover
          </Button>
        </div>
      </div>
    </article>
  );
}

