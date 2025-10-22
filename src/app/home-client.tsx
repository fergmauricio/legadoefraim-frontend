"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Product } from "@/lib/api/products";

export function HomeClient({ products }: { products: Product[] }) {
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
            Fé que se veste.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Camisetas cristãs com propósito — expressando o que você crê em cada
            detalhe.
          </p>
        </motion.div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-semibold mb-8">
          Coleção Destaque
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block"
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
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
