"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { buttonStyles } from "@/components/ui/Button";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";

export default function AdminPage() {
  const { products } = useProducts();
  const featuredCount = products.filter((product) => product.featured).length;
  const stockCount = products.reduce((total, product) => total + product.stock, 0);

  return (
    <ProtectedRoute requireAdmin>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-6xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Admin
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Controle local do catalogo inicial.
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Produtos", value: products.length },
              { label: "Destaques", value: featuredCount },
              { label: "Itens em estoque", value: stockCount },
            ].map((metric) => (
              <div
                className="surface-line grid gap-2 rounded-lg bg-white/[0.06] p-5"
                key={metric.label}
              >
                <span className="text-sm text-white/54">{metric.label}</span>
                <strong className="text-4xl font-semibold">{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={buttonStyles("primary")} href="/admin/produtos">
              Gerenciar produtos
            </Link>
            <Link className={buttonStyles("secondary")} href="/admin/produtos/novo">
              Cadastrar produto
            </Link>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}

