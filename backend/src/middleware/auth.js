import jwt from 'jsonwebtoken';
import { HttpError } from './error.js';
import { query } from '../db/pool.js';

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new HttpError(401, 'Missing token');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await query('SELECT id, email FROM users WHERE id = $1', [payload.sub]);
    if (!rows[0]) throw new HttpError(401, 'Invalid token');
    req.user = rows[0];
    next();
  } catch (err) {
    if (err instanceof HttpError) return next(err);
    next(new HttpError(401, 'Invalid or expired token'));
  }
}

export async function requireAdmin(req, _res, next) {
  try {
    if (!req.user) throw new HttpError(401, 'Unauthenticated');
    const { rows } = await query(
      "SELECT 1 FROM user_roles WHERE user_id = $1 AND role = 'admin' LIMIT 1",
      [req.user.id]
    );
    if (!rows[0]) throw new HttpError(403, 'Admin access required');
    next();
  } catch (err) {
    next(err);
  }
}
