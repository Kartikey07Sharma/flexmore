import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { validate } from '../middleware/validate.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

const credsSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
});

router.post(
  '/login',
  validate(credsSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { rows } = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    const user = rows[0];
    if (!user) throw new HttpError(401, 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, 'Invalid credentials');

    const { rows: roleRows } = await query(
      'SELECT role FROM user_roles WHERE user_id = $1',
      [user.id]
    );
    const roles = roleRows.map((r) => r.role);
    const token = signToken(user);
    res.json({ token, user: { id: user.id, email: user.email, roles } });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      'SELECT role FROM user_roles WHERE user_id = $1',
      [req.user.id]
    );
    res.json({
      user: { id: req.user.id, email: req.user.email, roles: rows.map((r) => r.role) },
    });
  })
);

router.post(
  '/change-password',
  requireAuth,
  validate(z.object({ currentPassword: z.string(), newPassword: z.string().min(8).max(100) })),
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { rows } = await query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    const ok = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!ok) throw new HttpError(401, 'Current password is incorrect');
    const hash = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, req.user.id]);
    res.json({ ok: true });
  })
);

export default router;
