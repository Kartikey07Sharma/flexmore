import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../db/pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const schema = fs.readFileSync(path.join(__dirname, '../../sql/schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('✅ Schema applied');
  await pool.end();
}

run().catch((e) => { console.error(e); process.exit(1); });
