"use client";

import { Product } from "@/lib/api/products";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ProductFilter } from "@/components/home/product-filter";
import { Button } from "@/components/ui/button";
import { useProductPagination } from "@/hooks/use-product-pagination";

export function ProductList({ products }: { products: Product[] }) {
  const t = useTranslations("Home");
  const { page, totalPages, paginatedProducts, setPage } =
    useProductPagination(products);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-2xl font-display font-semibold">
          {t("collection")}
        </h2>
        <ProductFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {paginatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-square">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-medium text-slate-800 dark:text-slate-200">
                {product.name}
              </h3>
              <span className="text-yellow-600 font-semibold">
                R$ {product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              onClick={() => setPage(i + 1)}
              variant={page === i + 1 ? "default" : "outline"}
              size="sm"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
