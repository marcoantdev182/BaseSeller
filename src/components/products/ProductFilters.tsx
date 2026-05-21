"use client";

import { Search } from "lucide-react";

type ProductFiltersProps = {
  categories: string[];
  search: string;
  category: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function ProductFilters({
  categories,
  search,
  category,
  sort,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="surface-line grid gap-3 rounded-lg bg-white/[0.06] p-3 md:grid-cols-[1fr_13rem_13rem]">
      <label className="surface-line flex min-h-12 items-center gap-3 rounded-md bg-black/25 px-4 text-white/68 focus-within:border-[var(--cyan)]">
        <Search className="size-4 shrink-0" />
        <input
          aria-label="Buscar produto"
          className="w-full bg-transparent text-white outline-none placeholder:text-white/34"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nome"
          type="search"
          value={search}
        />
      </label>
      <select
        aria-label="Filtrar por categoria"
        className="surface-line min-h-12 rounded-md bg-[#0c1015] px-4 text-sm text-white outline-none transition focus:border-[var(--cyan)]"
        onChange={(event) => onCategoryChange(event.target.value)}
        value={category}
      >
        <option value="todas">Todas categorias</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        aria-label="Ordenar por preco"
        className="surface-line min-h-12 rounded-md bg-[#0c1015] px-4 text-sm text-white outline-none transition focus:border-[var(--cyan)]"
        onChange={(event) => onSortChange(event.target.value)}
        value={sort}
      >
        <option value="featured">Destaques primeiro</option>
        <option value="price-asc">Menor preco</option>
        <option value="price-desc">Maior preco</option>
      </select>
    </div>
  );
}

