import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getProducts } from "@/lib/api/products";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative w-full h-[60vh] flex items-center justify-center text-center bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Fé que se veste.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Camisetas cristãs com propósito — expressando o que você crê em cada
            detalhe.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-display font-semibold mb-8">
          Coleção Destaque
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
