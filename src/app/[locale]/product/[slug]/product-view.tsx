"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import type { Product } from "@/lib/api/products";
import { useCartStore } from "@/store/use-cart-store";
import { useToast } from "@/components/ui/use-toast";
import { ProductList } from "@/components/home/product-list";

export function ProductView({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const addToCart = useCartStore((s) => s.add);
  const { show } = useToast();

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(product);
    show({
      title: "Adicionado ao carrinho 🛍️",
      description: `"${product.name}" foi adicionado com sucesso.`,
    });
    setLoading(false);
  };

  const relatedProducts = useMemo(() => {
    const others = MOCK_PRODUCTS.filter((p) => p.id !== product.id);

    return others.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [product.id]);

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                    activeImage === img
                      ? "border-yellow-500 ring-2 ring-yellow-400"
                      : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-display font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="text-2xl font-bold text-yellow-600 mb-6">
            R$ {product.price}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full md:w-auto text-base font-semibold"
          >
            {loading ? "Adicionando..." : "Adicionar ao carrinho"}
          </Button>

          <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 space-y-1">
            <p>Estoque: {product.stock ?? 0} unidades</p>
            <p className="flex gap-2">
              Avaliação: {product.rating?.toFixed(1) ?? "5.0"}{" "}
              <StarIcon size={18} className="text-yellow-600" />
            </p>
            <p>Categoria: Camisetas</p>
          </div>
        </div>
      </main>

      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-display font-semibold mb-8">
            Você também pode gostar
          </h2>
          <ProductList products={relatedProducts} />
        </section>
      )}
    </>
  );
}

import { MOCK_PRODUCTS } from "@/lib/api/products";
import { StarIcon } from "lucide-react";
