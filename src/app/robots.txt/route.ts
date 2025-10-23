export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`,
    {
      headers: { "Content-Type": "text/plain" },
    }
  );
}
