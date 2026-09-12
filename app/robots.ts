import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Sitemap {
  const baseUrl = 'https://helloqr.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  } as unknown as MetadataRoute.Sitemap;
}