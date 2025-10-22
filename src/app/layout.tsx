import { ToastProvider } from "@/components/ui/use-toast";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FaithWear",
  description: "Camisetas cristãs com propósito",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
