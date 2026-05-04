import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { query } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

const categorySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(140).optional(),
  description: z.string().max(500).optional().nullable(),
});

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const { rows } = await query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { rows } = await query('SELECT * FROM categories WHERE slug = $1', [req.params.slug]);
    if (!rows[0]) throw new HttpError(404, 'Category not found');
    res.json(rows[0]);
  })
);

router.post(
  '/',
  requireAuth,
  requireAdmin,
  validate(categorySchema),
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const slug = req.body.slug || slugify(name, { lower: true, strict: true });
    const { rows } = await query(
      'INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
      [name, slug, description || null]
    );
    res.status(201).json(rows[0]);
  })
);

router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  validate(categorySchema.partial()),
  asyncHandler(async (req, res) => {
    const fields = req.body;
    const { rows } = await query(
      `UPDATE categories
       SET name = COALESCE($1,name),
           slug = COALESCE($2,slug),
           description = COALESCE($3,description),
           updated_at = now()
       WHERE id = $4 RETURNING *`,
      [fields.name, fields.slug, fields.description, req.params.id]
    );
    if (!rows[0]) throw new HttpError(404, 'Category not found');
    res.json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.status(204).end();
  })
);

export default router;
