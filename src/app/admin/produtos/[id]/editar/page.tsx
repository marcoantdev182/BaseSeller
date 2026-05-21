"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { buttonStyles } from "@/components/ui/Button";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { products, hydrated, updateProduct } = useProducts();
  const product = products.find((candidate) => candidate.id === params.id);

  return (
    <ProtectedRoute requireAdmin>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-5xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
              Editar produto
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Ajuste o item sem sair da base local.
            </h1>
          </div>
          {!hydrated ? (
            <div className="surface-line rounded-lg bg-white/[0.05] p-6 text-white/68">
              Carregando produto...
            </div>
          ) : product ? (
            <ProductForm
              initialProduct={product}
              onSubmit={(updatedProduct) => {
                updateProduct(updatedProduct);
                router.push("/admin/produtos");
              }}
              submitLabel="Salvar alteracoes"
            />
          ) : (
            <div className="surface-line grid gap-4 rounded-lg bg-white/[0.06] p-6">
              <h2 className="text-2xl font-semibold">Produto nao encontrado.</h2>
              <Link className={buttonStyles("secondary", "w-fit")} href="/admin/produtos">
                Voltar ao admin
              </Link>
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}
