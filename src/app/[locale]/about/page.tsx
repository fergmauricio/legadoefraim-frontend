import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isPt = params.locale === "pt";
  const title = isPt
    ? "Sobre o Legado Efraim - Vivendo o evangelho, vestindo o propósito."
    : "About Efraim Legacy - Living the gospel, wearing the purpose.";

  const description = isPt
    ? "Conheça a missão do Legado Efraim: expressar fé e propósito através de cada estampa e design. Ajudar financeiramente missionários com 30% do lucro de cada camisa."
    : "Learn about Efraim's Legacy mission: to express faith and purpose through each print and design. Financially supporting missionaries with 30% of the profits from each shirt.";

  const url = `${BASE_URL}/${params.locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${BASE_URL}/pt/about`,
        "en-US": `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "LegadoEfraim",
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      images: [
        {
          url: `${BASE_URL}/og/legadoefraim-about.jpg`,
          width: 1200,
          height: 630,
          alt: "LegadoEfraim - Vivendo o evangelho, vestindo o propósito.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og/legadoefraim-about.jpg`],
    },
  };
}

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-display font-semibold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/about/legadoefraim-about.jpg"
              alt="FaithWear Banner"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t("missionTitle")}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("missionText")}
            </p>
            <h3 className="text-xl font-semibold">{t("valuesTitle")}</h3>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
              <li>{t("valuesFaith")}</li>
              <li>{t("valuesExcellence")}</li>
              <li>{t("valuesPurpose")}</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
