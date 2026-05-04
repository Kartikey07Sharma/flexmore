import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { asyncHandler } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const { rows } = await query('SELECT key, value FROM company_settings');
    res.json(rows);
  })
);

router.put(
  '/',
  requireAuth,
  requireAdmin,
  validate(z.object({ settings: z.record(z.string()) })),
  asyncHandler(async (req, res) => {
    const entries = Object.entries(req.body.settings);
    for (const [key, value] of entries) {
      await query(
        `INSERT INTO company_settings (key, value) VALUES ($1,$2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, value]
      );
    }
    const { rows } = await query('SELECT key, value FROM company_settings');
    res.json(rows);
  })
);

export default router;
