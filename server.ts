import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// ── Database ──────────────────────────────────────────────────────────────────

const db = new Database('sgl.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    organisation TEXT NOT NULL,
    email       TEXT NOT NULL,
    mandate     TEXT NOT NULL,
    created_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS applications (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    background  TEXT NOT NULL,
    created_at  TEXT DEFAULT (datetime('now'))
  );
`);

// ── Helpers ───────────────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── API Routes ────────────────────────────────────────────────────────────────

// POST /api/contact  — enquiry form
app.post('/api/contact', (req, res) => {
  const { name, organisation, email, mandate } = req.body ?? {};

  if (!name?.trim() || !organisation?.trim() || !email?.trim() || !mandate?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    db.prepare(
      'INSERT INTO contacts (name, organisation, email, mandate) VALUES (?, ?, ?, ?)'
    ).run(name.trim(), organisation.trim(), email.trim(), mandate.trim());

    console.log(`[contact] ${name} <${email}> — ${new Date().toISOString()}`);
    return res.json({ success: true });
  } catch (err) {
    console.error('[contact] DB error:', err);
    return res.status(500).json({ error: 'Failed to save inquiry. Please try again.' });
  }
});

// POST /api/apply  — careers application
app.post('/api/apply', (req, res) => {
  const { name, email, background } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !background?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    db.prepare(
      'INSERT INTO applications (name, email, background) VALUES (?, ?, ?)'
    ).run(name.trim(), email.trim(), background.trim());

    console.log(`[apply] ${name} <${email}> — ${new Date().toISOString()}`);
    return res.json({ success: true });
  } catch (err) {
    console.error('[apply] DB error:', err);
    return res.status(500).json({ error: 'Failed to save application. Please try again.' });
  }
});

// ── Serve Frontend in Production ──────────────────────────────────────────────

if (isProd) {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`);
});
