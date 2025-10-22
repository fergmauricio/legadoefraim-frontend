import { getProducts } from "@/lib/api/products";

import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { Suspense } from "react";
import HomeClient from "./page-client";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      }
    >
      <HomeClient products={products} />
    </Suspense>
  );
}
