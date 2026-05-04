import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { HttpError } from '../middleware/error.js';

const router = Router();

const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = (req.params.bucket || 'misc').replace(/[^a-z0-9-]/gi, '');
    const dest = path.join(uploadDir, folder);
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = crypto.randomBytes(16).toString('hex') + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: (Number(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|pdf/;
    const ok = allowed.test(file.mimetype) || allowed.test(path.extname(file.originalname).toLowerCase());
    if (!ok) return cb(new HttpError(400, 'Unsupported file type'));
    cb(null, true);
  },
});

// Buckets: product-images | blog-images | catalogues
router.post(
  '/:bucket',
  requireAuth,
  requireAdmin,
  upload.single('file'),
  (req, res) => {
    if (!req.file) throw new HttpError(400, 'No file uploaded');
    const publicUrl = `/uploads/${req.params.bucket}/${req.file.filename}`;
    res.status(201).json({
      url: publicUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  }
);

export default router;
