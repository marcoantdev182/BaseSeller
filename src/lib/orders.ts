import { readStorage, writeStorage } from "@/lib/storage";
import type { Order } from "@/types/order";

const ORDERS_STORAGE_KEY = "baseseller-orders";

export function readOrders() {
  return readStorage<Order[]>(ORDERS_STORAGE_KEY, []);
}

export function addOrder(order: Order) {
  const orders = readOrders();
  writeStorage(ORDERS_STORAGE_KEY, [order, ...orders]);
}

export function getOrdersByUser(userId: string) {
  return readOrders().filter((order) => order.userId === userId);
}

