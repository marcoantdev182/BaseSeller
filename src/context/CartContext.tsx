"use client";

import {
  CART_STORAGE_KEY,
  createCartItem,
  getCartQuantity,
  getCartSubtotal,
} from "@/lib/cart";
import { readStorage, writeStorage } from "@/lib/storage";
import type { CartItem, CartSelections } from "@/types/cart";
import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  total: number;
  addItem: (product: Product, selections?: CartSelections) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setItems(readStorage<CartItem[]>(CART_STORAGE_KEY, []));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) {
      writeStorage(CART_STORAGE_KEY, items);
    }
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = getCartSubtotal(items);

    return {
      items,
      hydrated,
      itemCount: getCartQuantity(items),
      subtotal,
      total: subtotal,
      addItem: (product, selections) => {
        if (product.stock <= 0) {
          return;
        }

        const nextItem = createCartItem(product, selections);

        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === nextItem.id);

          if (!existingItem) {
            return [...currentItems, nextItem];
          }

          return currentItems.map((item) =>
            item.id === nextItem.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, item.stock),
                }
              : item,
          );
        });
      },
      removeItem: (lineId) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== lineId),
        );
      },
      updateQuantity: (lineId, quantity) => {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === lineId
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(quantity, item.stock)),
                }
              : item,
          ),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [hydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return context;
}
