import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool, query } from '../db/pool.js';

async function run() {
  const email = (process.env.ADMIN_EMAIL || '[email protected]').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123456';
  const hash = await bcrypt.hash(password, 10);

  const { rows } = await query(
    `INSERT INTO users (email, password_hash) VALUES ($1,$2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
     RETURNING id, email`,
    [email, hash]
  );
  const user = rows[0];

  await query(
    `INSERT INTO user_roles (user_id, role) VALUES ($1,'admin')
     ON CONFLICT (user_id, role) DO NOTHING`,
    [user.id]
  );

  console.log(`✅ Admin ready: ${user.email} (password from ADMIN_PASSWORD env)`);
  await pool.end();
}

run().catch((e) => { console.error(e); process.exit(1); });
