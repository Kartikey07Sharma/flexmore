import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { query } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

const postSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(220).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().max(50000).optional().nullable(),
  image: z.string().url().optional().nullable(),
  author: z.string().max(120).optional().nullable(),
  published: z.boolean().optional(),
});

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const onlyPublished = req.query.all !== 'true';
    const { rows } = await query(
      `SELECT * FROM blog_posts ${onlyPublished ? 'WHERE published = true' : ''} ORDER BY created_at DESC`
    );
    res.json(rows);
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const { rows } = await query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
    if (!rows[0]) throw new HttpError(404, 'Post not found');
    res.json(rows[0]);
  })
);

router.post(
  '/',
  requireAuth,
  requireAdmin,
  validate(postSchema),
  asyncHandler(async (req, res) => {
    const b = req.body;
    const slug = b.slug || slugify(b.title, { lower: true, strict: true });
    const { rows } = await query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, image, author, published)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [b.title, slug, b.excerpt || null, b.content || null, b.image || null, b.author || null, b.published ?? true]
    );
    res.status(201).json(rows[0]);
  })
);

router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  validate(postSchema.partial()),
  asyncHandler(async (req, res) => {
    const b = req.body;
    const { rows } = await query(
      `UPDATE blog_posts SET
        title = COALESCE($1,title),
        slug = COALESCE($2,slug),
        excerpt = COALESCE($3,excerpt),
        content = COALESCE($4,content),
        image = COALESCE($5,image),
        author = COALESCE($6,author),
        published = COALESCE($7,published),
        updated_at = now()
       WHERE id = $8 RETURNING *`,
      [b.title, b.slug, b.excerpt, b.content, b.image, b.author, b.published, req.params.id]
    );
    if (!rows[0]) throw new HttpError(404, 'Post not found');
    res.json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.status(204).end();
  })
);

export default router;
