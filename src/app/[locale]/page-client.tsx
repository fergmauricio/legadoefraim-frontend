"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Product } from "@/lib/api/products";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const revalidate = 60;

export default function HomeClient({ products }: { products: Product[] }) {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            {t("headline")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {t("subheadline")}
          </p>
        </motion.div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-semibold mb-8">
          {t("collection")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
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
      </main>
      <Footer />
    </div>
  );
}
