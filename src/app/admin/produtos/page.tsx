"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useProducts } from "@/context/ProductContext";
import { formatCurrency } from "@/lib/formatCurrency";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdminProductsPage() {
  const { products, removeProduct, resetProducts } = useProducts();
  const [message, setMessage] = useState("");

  return (
    <ProtectedRoute requireAdmin>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-7xl gap-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="grid gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
                Admin produtos
              </p>
              <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
                Catalogo persistido no navegador.
              </h1>
            </div>
            <Link className={buttonStyles("primary")} href="/admin/produtos/novo">
              <Plus className="size-4" />
              Novo produto
            </Link>
          </div>
          {message ? (
            <p className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/72">
              {message}
            </p>
          ) : null}
          <div className="grid gap-3">
            {products.map((product) => (
              <article
                className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-4 md:grid-cols-[6rem_1fr_auto] md:items-center"
                key={product.id}
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-white/[0.05]">
                  <Image
                    alt={product.name}
                    className="object-cover"
                    fill
                    sizes="96px"
                    src={product.image}
                  />
                </div>
                <div className="grid gap-1">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-sm text-white/58">
                    {product.category} | {formatCurrency(product.price)} | Estoque{" "}
                    {product.stock}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className={buttonStyles("secondary")}
                    href={`/admin/produtos/${product.id}/editar`}
                  >
                    <Pencil className="size-4" />
                    Editar
                  </Link>
                  <Button
                    onClick={() => {
                      removeProduct(product.id);
                      setMessage("Produto removido do catalogo local.");
                    }}
                    type="button"
                    variant="danger"
                  >
                    <Trash2 className="size-4" />
                    Remover
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <Button
            className="w-fit"
            onClick={() => {
              resetProducts();
              setMessage("Catalogo mockado restaurado.");
            }}
            type="button"
            variant="ghost"
          >
            Restaurar catalogo inicial
          </Button>
        </div>
      </section>
    </ProtectedRoute>
  );
}

