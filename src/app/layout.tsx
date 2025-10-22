"use client";
import { ToastProvider } from "@/components/ui/use-toast";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/layout/page-transition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <PageTransition>{children}</PageTransition>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
