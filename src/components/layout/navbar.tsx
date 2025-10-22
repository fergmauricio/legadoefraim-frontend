"use client";

import Link from "next/link";
import { ShoppingBag, Sun, Moon, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/use-cart-store";
import { motion } from "framer-motion";
import { useIsClient } from "@/hooks/use-is-client";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { otherLocale } from "@/lib/i18n";
import { useLocale } from "next-intl";

export function Navbar() {
  const locale = useLocale();
  const isClient = useIsClient();
  const { theme, setTheme } = useTheme();
  const { items, remove, clear, totalItems, totalPrice } = useCartStore();

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Faith<span className="text-yellow-500">Wear</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-700 dark:text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/about">Sobre</Link>
        </div>

        <nav className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <motion.span
            key={otherLocale(locale as "pt" | "en")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <LanguageSwitcher />
          </motion.span>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {isClient && totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>

              {items.length === 0 ? (
                <p className="text-sm text-slate-500">Ainda não há itens.</p>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {item.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          R$ {item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          x{item.qty}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-slate-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                  <p className="text-sm text-slate-600 mb-2">
                    Total:{" "}
                    <span className="font-semibold text-yellow-600">
                      R$ {totalPrice().toFixed(2)}
                    </span>
                  </p>
                  <Button className="w-full mb-2">Finalizar compra</Button>
                  <Button variant="outline" className="w-full" onClick={clear}>
                    Limpar carrinho
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </nav>
      </nav>
    </header>
  );
}
