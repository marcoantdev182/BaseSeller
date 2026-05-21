import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="surface-line rounded-lg bg-white/[0.05] p-6 text-white/68">
        Nenhum produto corresponde aos filtros atuais.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          animationDelay={Math.min(index * 0.06, 0.18)}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

