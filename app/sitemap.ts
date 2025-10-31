import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.neonlab.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${SITE_URL}#portfolio`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}#contato`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
  ]
}
