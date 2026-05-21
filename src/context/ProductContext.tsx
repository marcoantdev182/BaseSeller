"use client";

import { initialProducts } from "@/data/products";
import { readStorage, writeStorage } from "@/lib/storage";
import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const PRODUCTS_STORAGE_KEY = "baseseller-products";

type ProductContextValue = {
  products: Product[];
  hydrated: boolean;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  resetProducts: () => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProducts(readStorage<Product[]>(PRODUCTS_STORAGE_KEY, initialProducts));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) {
      writeStorage(PRODUCTS_STORAGE_KEY, products);
    }
  }, [hydrated, products]);

  const value = useMemo<ProductContextValue>(
    () => ({
      products,
      hydrated,
      addProduct: (product) => {
        setProducts((currentProducts) => [product, ...currentProducts]);
      },
      updateProduct: (product) => {
        setProducts((currentProducts) =>
          currentProducts.map((candidate) =>
            candidate.id === product.id ? product : candidate,
          ),
        );
      },
      removeProduct: (id) => {
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.id !== id),
        );
      },
      resetProducts: () => {
        setProducts(initialProducts);
      },
    }),
    [hydrated, products],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductProvider.");
  }

  return context;
}
