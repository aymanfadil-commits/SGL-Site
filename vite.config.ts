import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

// ── Dev-only API middleware ───────────────────────────────────────────────────
// Handles /api/* during `npm run dev` so forms work without a second terminal.
// In production, Vercel serverless functions (api/*.ts) take over automatically.

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
  });
}

function jsonResponse(res: ServerResponse, status: number, data: object) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST') return next();

        if (req.url === '/api/contact') {
          try {
            const { name, organisation, email, mandate } = JSON.parse(await readBody(req));
            if (!name?.trim() || !organisation?.trim() || !email?.trim() || !mandate?.trim())
              return jsonResponse(res, 400, { error: 'All fields are required.' });
            if (!isValidEmail(email))
              return jsonResponse(res, 400, { error: 'Invalid email address.' });
            console.log('\n[dev /api/contact]', { name, organisation, email, mandate });
            return jsonResponse(res, 200, { success: true });
          } catch {
            return jsonResponse(res, 500, { error: 'Failed to process request.' });
          }
        }

        if (req.url === '/api/apply') {
          try {
            const { name, email, background } = JSON.parse(await readBody(req));
            if (!name?.trim() || !email?.trim() || !background?.trim())
              return jsonResponse(res, 400, { error: 'All fields are required.' });
            if (!isValidEmail(email))
              return jsonResponse(res, 400, { error: 'Invalid email address.' });
            console.log('\n[dev /api/apply]', { name, email, background });
            return jsonResponse(res, 200, { success: true });
          } catch {
            return jsonResponse(res, 500, { error: 'Failed to process request.' });
          }
        }

        next();
      });
    },
  };
}

// ── Vite config ───────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
