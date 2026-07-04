import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const haikus = await getCollection('haikus');
  const essays = await getCollection('essays');

  const base = 'https://watchhaikus.com';

  const urls = [
    '',
    '/haikus',
    '/essays',
    '/about',
    ...haikus.map(h => `/haikus/${h.slug}`),
    ...essays.map(e => `/essays/${e.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${base}${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
