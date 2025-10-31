const SITE_URL = 'https://www.neonlab.dev'

const routes = [
  {
    loc: SITE_URL,
    changefreq: 'hourly',
    priority: '1.0',
  },
  {
    loc: `${SITE_URL}#portfolio`,
    changefreq: 'hourly',
    priority: '0.8',
  },
  {
    loc: `${SITE_URL}#contato`,
    changefreq: 'hourly',
    priority: '0.8',
  },
]

export function GET(): Response {
  const lastmod = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  })
}
