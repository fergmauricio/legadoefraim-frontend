import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ToastProvider } from "@/components/ui/use-toast";
import LayoutClient from "@/components/layout/layout-client";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "LegadoEfraim - Camisetas Cristãs com Propósito",
    template: "%s | LegadoEfraim",
  },
  description:
    "Loja cristã bilíngue com camisetas de fé e propósito. 30% do lucro é destinado a apoiar missionários no campo.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://legadoefraim.vercel.app"
  ),
  openGraph: {
    type: "website",
    title: "LegadoEfraim - Camisetas Cristãs com Propósito",
    description:
      "Camisetas cristãs que expressam fé. Parte do lucro é destinado a apoiar missionários.",
    siteName: "LegadoEfraim",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LegadoEfraim - Camisetas Cristãs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LegadoEfraim - Camisetas Cristãs com Propósito",
    description:
      "Camisetas cristãs bilíngues que inspiram fé. 30% do lucro investido no Reino de Deus.",
    creator: "@legadoefraim",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutClient>
            <ToastProvider>{children}</ToastProvider>
          </LayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
