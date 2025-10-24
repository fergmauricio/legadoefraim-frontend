import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProducts, getProduct } from "@/lib/api/products";
import { ProductView } from "./product-view";
import { ProductJsonLd } from "@/components/seo/product-jsonld";
import { Navbar } from "@/components/layout/navbar";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  const locales = ["pt", "en"];

  return products.flatMap((p) =>
    locales.map((locale) => ({
      locale,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title:
        locale === "pt"
          ? "Produto não encontrado | Legado Efraim"
          : "Product not found | Legado Efraim",
      description:
        locale === "pt"
          ? "O produto que você procura não existe."
          : "The product you’re looking for doesn’t exist.",
      robots: { index: false },
    };
  }

  const title =
    locale === "pt"
      ? `${product.name} | Legado Efraim`
      : `${product.name} | Legado Efraim (EN)`;
  const description =
    locale === "pt"
      ? product.description
      : product.description_en ?? product.description;
  const url = `${BASE_URL}/${locale}/product/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${BASE_URL}/pt/product/${slug}`,
        "en-US": `${BASE_URL}/en/product/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Legado Efraim",
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "product",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
      creator: "@legadoefraim",
    },
    other: {
      keywords: "camisetas cristãs, legados de fé, Jesus, roupas cristãs",
      author: "LegadoEfraim",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <Navbar />
        <main className="flex-1">
          <section className="max-w-6xl mx-auto px-4 py-16">
            <ProductView product={product} />
          </section>
        </main>
      </div>
    </>
  );
}
