import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { query, pool } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

const productSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(220).optional(),
  category_id: z.string().uuid().nullable().optional(),
  description: z.string().max(5000).optional().nullable(),
  short_description: z.string().max(500).optional().nullable(),
  specifications: z.record(z.any()).optional().nullable(),
  featured: z.boolean().optional(),
  primary_image: z.string().url().optional().nullable(),
  images: z.array(z.string().url()).optional(),
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, featured, q, limit = 100, offset = 0 } = req.query;
    const conds = [];
    const params = [];
    if (category) {
      params.push(category);
      conds.push(`c.slug = $${params.length}`);
    }
    if (featured === 'true') conds.push('p.featured = true');
    if (q) {
      params.push(`%${q}%`);
      conds.push(`(p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`);
    }
    params.push(Number(limit), Number(offset));
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const { rows } = await query(
      `SELECT p.*, c.name AS category_name, c.slug AS category_slug
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ${where}
       ORDER BY p.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );
    res.json(rows);
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `SELECT p.*, c.name AS category_name, c.slug AS category_slug
       FROM products p LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.slug = $1`,
      [req.params.slug]
    );
    if (!rows[0]) throw new HttpError(404, 'Product not found');
    const product = rows[0];
    const imgs = await query(
      'SELECT id, url, sort_order FROM product_images WHERE product_id = $1 ORDER BY sort_order ASC',
      [product.id]
    );
    product.images = imgs.rows;
    res.json(product);
  })
);

router.post(
  '/',
  requireAuth,
  requireAdmin,
  validate(productSchema),
  asyncHandler(async (req, res) => {
    const b = req.body;
    const slug = b.slug || slugify(b.name, { lower: true, strict: true });
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rows } = await client.query(
        `INSERT INTO products
         (name, slug, category_id, description, short_description, specifications, featured, primary_image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [
          b.name, slug, b.category_id || null, b.description || null,
          b.short_description || null, b.specifications || {},
          b.featured ?? false, b.primary_image || null,
        ]
      );
      const product = rows[0];
      if (b.images?.length) {
        for (let i = 0; i < b.images.length; i++) {
          await client.query(
            'INSERT INTO product_images (product_id, url, sort_order) VALUES ($1,$2,$3)',
            [product.id, b.images[i], i]
          );
        }
      }
      await client.query('COMMIT');
      res.status(201).json(product);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  })
);

router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  validate(productSchema.partial()),
  asyncHandler(async (req, res) => {
    const b = req.body;
    const { rows } = await query(
      `UPDATE products SET
        name = COALESCE($1,name),
        slug = COALESCE($2,slug),
        category_id = COALESCE($3,category_id),
        description = COALESCE($4,description),
        short_description = COALESCE($5,short_description),
        specifications = COALESCE($6,specifications),
        featured = COALESCE($7,featured),
        primary_image = COALESCE($8,primary_image),
        updated_at = now()
       WHERE id = $9 RETURNING *`,
      [
        b.name, b.slug, b.category_id, b.description, b.short_description,
        b.specifications, b.featured, b.primary_image, req.params.id,
      ]
    );
    if (!rows[0]) throw new HttpError(404, 'Product not found');
    res.json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.status(204).end();
  })
);

// Product images
router.post(
  '/:id/images',
  requireAuth,
  requireAdmin,
  validate(z.object({ url: z.string().url(), sort_order: z.number().int().optional() })),
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      'INSERT INTO product_images (product_id, url, sort_order) VALUES ($1,$2,$3) RETURNING *',
      [req.params.id, req.body.url, req.body.sort_order ?? 0]
    );
    res.status(201).json(rows[0]);
  })
);

router.delete(
  '/:id/images/:imageId',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await query('DELETE FROM product_images WHERE id = $1 AND product_id = $2', [
      req.params.imageId, req.params.id,
    ]);
    res.status(204).end();
  })
);

export default router;
