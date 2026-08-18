import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://daiwang-khera.vercel.app'
  const lastModified = new Date('2026-08-19')

  return [
    { url: base, lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/projects/legal-financial`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/projects/retail-ai`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
