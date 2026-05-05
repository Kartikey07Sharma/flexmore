import { Router } from 'express';
import { query } from '../db/pool.js';
import { asyncHandler } from '../middleware/error.js';

const router = Router();

router.get(
  '/sitemap.xml',
  asyncHandler(async (req, res) => {
    const base = process.env.PUBLIC_SITE_URL || `${req.protocol}://${req.get('host')}`;
    const products = await query('SELECT slug, updated_at FROM products');
    const posts = await query('SELECT slug, updated_at FROM blog_posts WHERE published = true');

    const staticUrls = ['', '/about', '/products', '/manufacturing', '/blog', '/contact', '/quote'];
    const urls = [
      ...staticUrls.map((p) => ({ loc: `${base}${p}`, lastmod: new Date().toISOString() })),
      ...products.rows.map((p) => ({ loc: `${base}/products/${p.slug}`, lastmod: p.updated_at })),
      ...posts.rows.map((p) => ({ loc: `${base}/blog/${p.slug}`, lastmod: p.updated_at })),
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${new Date(u.lastmod).toISOString()}</lastmod></url>`).join('\n')}
</urlset>`;
    res.set('Content-Type', 'application/xml').send(xml);
  })
);

router.get('/robots.txt', (req, res) => {
  const base = process.env.PUBLIC_SITE_URL || `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
});

export default router;
