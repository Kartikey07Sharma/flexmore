import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const { rows } = await query('SELECT * FROM catalogues ORDER BY created_at DESC');
    res.json(rows);
  })
);

router.post(
  '/',
  requireAuth,
  requireAdmin,
  validate(z.object({
    title: z.string().min(1).max(200),
    file_url: z.string().url(),
    file_size: z.number().int().optional(),
  })),
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      'INSERT INTO catalogues (title, file_url, file_size) VALUES ($1,$2,$3) RETURNING *',
      [req.body.title, req.body.file_url, req.body.file_size || null]
    );
    res.status(201).json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { rowCount } = await query('DELETE FROM catalogues WHERE id = $1', [req.params.id]);
    if (!rowCount) throw new HttpError(404, 'Catalogue not found');
    res.status(204).end();
  })
);

export default router;
