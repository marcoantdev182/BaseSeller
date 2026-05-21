"use client";

import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProductCard({
  product,
  animationDelay = 0,
}: {
  product: Product;
  animationDelay?: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) {
      return;
    }

    const timeout = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [added]);

  return (
    <ScrollFadeIn className="h-full" delay={animationDelay}>
      <article className="surface-line group grid h-full overflow-hidden rounded-lg bg-white/[0.06] shadow-2xl shadow-black/15">
        <Link
          className="relative block aspect-[4/4.6] overflow-hidden bg-white/[0.04]"
          href={`/produtos/${product.id}`}
        >
          <Image
            alt={product.name}
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={product.image}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{product.category}</Badge>
              {product.featured ? <Badge>Destaque</Badge> : null}
            </div>
          </div>
        </Link>
        <div className="grid gap-4 p-4">
          <div className="grid gap-2">
            <div className="flex items-start justify-between gap-3">
              <Link
                className="text-xl font-semibold text-white transition hover:text-[var(--gold)]"
                href={`/produtos/${product.id}`}
              >
                {product.name}
              </Link>
              <span className="shrink-0 text-base font-semibold text-[var(--gold)]">
                {formatCurrency(product.price)}
              </span>
            </div>
            <p className="line-clamp-2 text-sm leading-6 text-white/62">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1"
              disabled={!product.stock}
              onClick={() => {
                addItem(product);
                setAdded(true);
              }}
              type="button"
            >
              <ShoppingBag className="size-4" />
              {product.stock ? (added ? "Adicionado" : "Adicionar") : "Sem estoque"}
            </Button>
            <Link
              className={buttonStyles("ghost", "flex-1 surface-line")}
              href={`/produtos/${product.id}`}
            >
              Ver produto
            </Link>
          </div>
        </div>
      </article>
    </ScrollFadeIn>
  );
}

