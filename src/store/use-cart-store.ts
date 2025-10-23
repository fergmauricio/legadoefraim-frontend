import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/api/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const existing = get().items.find((p) => p.id === product.id);
        if (existing) {
          set({
            items: get().items.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },

      remove: (id) =>
        set({
          items: get().items.filter((p) => p.id !== id),
        }),

      increase: (id) =>
        set({
          items: get().items.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((p) =>
              p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
            )
            .filter((p) => p.quantity > 0),
        }),

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, p) => acc + p.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, p) => acc + p.price * p.quantity, 0),
    }),
    { name: "faithwear-cart" }
  )
);
