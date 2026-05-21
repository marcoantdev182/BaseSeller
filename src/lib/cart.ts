import type { CartItem, CartSelections } from "@/types/cart";
import type { Product } from "@/types/product";

export const CART_STORAGE_KEY = "baseseller-cart";

export function getDefaultSelections(product: Product): CartSelections {
  return product.variations.reduce<CartSelections>((selections, variation) => {
    selections[variation.label] = variation.options[0] ?? "";
    return selections;
  }, {});
}

export function createCartLineId(productId: string, selections: CartSelections) {
  const suffix = Object.entries(selections)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([label, value]) => `${label}:${value}`)
    .join("|");

  return suffix ? `${productId}__${suffix}` : productId;
}

export function createCartItem(
  product: Product,
  selections: CartSelections = getDefaultSelections(product),
): CartItem {
  return {
    id: createCartLineId(product.id, selections),
    productId: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.image,
    stock: product.stock,
    quantity: 1,
    selections,
  };
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartQuantity(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function describeSelections(selections: CartSelections) {
  return Object.entries(selections)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join(" | ");
}

