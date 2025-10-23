import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ToastProvider } from "@/components/ui/use-toast";
import LayoutClient from "@/components/layout/layout-client";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

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
