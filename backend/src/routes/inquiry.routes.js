import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { sendInquiryNotification } from '../lib/mailer.js';

const router = Router();

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().nullable(),
  company: z.string().trim().max(200).optional().nullable(),
  product: z.string().trim().max(200).optional().nullable(),
  quantity: z.string().trim().max(60).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
});

// Public: submit inquiry
router.post(
  '/',
  validate(inquirySchema),
  asyncHandler(async (req, res) => {
    const b = req.body;
    const { rows } = await query(
      `INSERT INTO inquiries (name, email, phone, company, product, quantity, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [b.name, b.email, b.phone || null, b.company || null, b.product || null, b.quantity || null, b.message || null]
    );
    // Fire-and-forget email notification
    sendInquiryNotification(rows[0]).catch(() => {});
    res.status(201).json(rows[0]);
  })
);

// Admin: list
router.get(
  '/',
  requireAuth,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const { rows } = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(rows);
  })
);

router.patch(
  '/:id',
  requireAuth,
  requireAdmin,
  validate(z.object({ status: z.enum(['new', 'in_progress', 'closed']).optional(), notes: z.string().max(2000).optional() })),
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `UPDATE inquiries SET status = COALESCE($1,status), notes = COALESCE($2,notes) WHERE id = $3 RETURNING *`,
      [req.body.status, req.body.notes, req.params.id]
    );
    if (!rows[0]) throw new HttpError(404, 'Inquiry not found');
    res.json(rows[0]);
  })
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await query('DELETE FROM inquiries WHERE id = $1', [req.params.id]);
    res.status(204).end();
  })
);

export default router;
