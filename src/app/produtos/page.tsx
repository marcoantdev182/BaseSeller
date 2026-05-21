"use client";

import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import { useMemo, useState } from "react";

export default function ProductsPage() {
  const { products, hydrated } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const matches = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        category === "todas" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    return matches.sort((left, right) => {
      if (sort === "price-asc") {
        return left.price - right.price;
      }

      if (sort === "price-desc") {
        return right.price - left.price;
      }

      return Number(right.featured) - Number(left.featured);
    });
  }, [category, products, search, sort]);

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto grid max-w-7xl gap-8">
        <div className="grid max-w-3xl gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--cyan)]">
            Catalogo
          </p>
          <h1 className="text-balance text-4xl font-semibold sm:text-6xl">
            Produtos para testar a operacao completa da loja.
          </h1>
        </div>
        <ProductFilters
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
          onSortChange={setSort}
          search={search}
          sort={sort}
        />
        {!hydrated ? (
          <div className="surface-line rounded-lg bg-white/[0.05] p-6 text-white/68">
            Carregando catalogo local...
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </section>
  );
}

