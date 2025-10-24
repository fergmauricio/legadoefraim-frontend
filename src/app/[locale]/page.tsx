import { getProducts } from "@/lib/api/products";

import { ProductSkeleton } from "@/components/ui/product-skeleton";
import { Suspense } from "react";
import HomeClient from "./page-client";

export const revalidate = 60;

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Camisetas Cristãs com Propósito | LegadoEfraim",
  description: "Loja cristã de camisetas inspiradas na fé",
  themeColor: "#facc15",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
});

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <HomeClient products={products} />
    </Suspense>
  );
}
