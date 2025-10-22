"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Product } from "@/lib/api/products";
import { useCartStore } from "@/store/use-cart-store";

import { useToast } from "@/components/ui/use-toast";

export function ProductView({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((s) => s.add);
  const { show } = useToast();

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(product);
    show({
      title: "Adicionado ao carrinho",
      description: `"${product.name}" foi adicionado com sucesso.`,
    });
    setLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-md">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-display font-semibold mb-4">
          {product.name}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {product.description}
        </p>

        <div className="text-2xl font-bold text-yellow-600 mb-6">
          R$ {product.price}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? "Adicionando..." : "Adicionar ao carrinho"}
        </Button>

        <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>Estoque: {product.stock} unidades</p>
          <p>Avaliação: {product.rating.toFixed(1)}</p>
        </div>
      </div>
    </main>
  );
}
