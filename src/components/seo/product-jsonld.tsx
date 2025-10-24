"use client";

interface ProductJsonLdProps {
  product: {
    name: string;
    description: string;
    description_en?: string;
    price: number;
    images: string[];
    slug: string;
    category?: string;
  };
  locale: string;
}

export function ProductJsonLd({ product, locale }: ProductJsonLdProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  const url = `${BASE_URL}/${locale}/product/${product.slug}`;

  const name = locale === "pt" ? product.name : `${product.name} (EN)`;
  const description =
    locale === "pt"
      ? product.description
      : product.description_en ?? product.description;
  const image = product.images?.[0] ?? "/placeholder.png";
  const category =
    locale === "pt"
      ? product.category ?? "Camisetas"
      : product.category ?? "T-Shirts";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    image,
    url: BASE_URL,

    category,
    brand: {
      "@type": "Brand",
      name: "legadoefraim",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "pt" ? "Início" : "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "pt" ? "Produtos" : "Products",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
    </>
  );
}
