-- Default company settings
INSERT INTO company_settings (key, value) VALUES
  ('company_name', 'Flexmore'),
  ('email',        '[email protected]'),
  ('phone',        '+91 00000 00000'),
  ('address',      'Mumbai, India'),
  ('whatsapp',     '+910000000000')
ON CONFLICT (key) DO NOTHING;

-- Sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Elastic Tapes',  'elastic-tapes',  'High-quality woven and knitted elastic tapes.'),
  ('Drawcords',      'drawcords',      'Custom drawcords for apparel manufacturers.'),
  ('Webbing',        'webbing',        'Industrial-grade webbing solutions.')
ON CONFLICT (slug) DO NOTHING;
