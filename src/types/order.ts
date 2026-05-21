import type { CartItem } from "@/types/cart";

export type Order = {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  observations: string;
  status: "whatsapp-pending";
  createdAt: string;
};

