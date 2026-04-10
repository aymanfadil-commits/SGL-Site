import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, background } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !background?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Sage Global Links <noreply@sagegloballinks.com>',
      to: 'info@sagegloballinks.com',
      replyTo: email.trim(),
      subject: `New Open Application — ${name.trim()}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; background: #ffffff;">
          <div style="background: #09111F; padding: 36px 40px;">
            <p style="color: #C4B49A; font-size: 11px; margin: 0 0 8px; letter-spacing: 4px; text-transform: uppercase;">Sage Global Links</p>
            <h1 style="color: #F0E9DB; font-size: 22px; margin: 0; font-weight: 400; letter-spacing: 1px;">New Open Application</h1>
          </div>
          <div style="padding: 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #eeeeee; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; width: 140px; vertical-align: top;">Name</td>
                <td style="padding: 14px 0; border-bottom: 1px solid #eeeeee; font-size: 15px;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #eeeeee; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;">Email</td>
                <td style="padding: 14px 0; border-bottom: 1px solid #eeeeee; font-size: 15px;">
                  <a href="mailto:${email.trim()}" style="color: #4A6FA5; text-decoration: none;">${email.trim()}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top; padding-top: 20px;">Background</td>
                <td style="padding: 14px 0; font-size: 15px; line-height: 1.7; padding-top: 20px;">${background.trim().replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eeeeee; color: #aaa; font-size: 11px; letter-spacing: 1px;">
              Submitted via sagegloballinks.com &nbsp;·&nbsp; ${new Date().toUTCString()}
            </div>
          </div>
        </div>
      `,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('[apply] Resend error:', err);
    return res.status(500).json({
      error: 'Failed to send application. Please email us directly at info@sagegloballinks.com.',
    });
  }
}
