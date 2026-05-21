"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct } = useProducts();

  return (
    <ProtectedRoute requireAdmin>
      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto grid max-w-5xl gap-8">
          <div className="grid gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
              Novo produto
            </p>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
              Cadastre uma nova peca no catalogo local.
            </h1>
          </div>
          <ProductForm
            onSubmit={(product) => {
              addProduct(product);
              router.push("/admin/produtos");
            }}
            submitLabel="Cadastrar produto"
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}

