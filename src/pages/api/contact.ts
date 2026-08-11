import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';

// On-demand (Cloudflare Worker) — the one non-static route in the project.
export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
  lang?: string;
}

// Shape of the Cloudflare bindings/vars this route needs (from wrangler.jsonc).
interface CfEnv {
  /** send_email binding, restricted to the verified destination address. */
  SEB: { send(message: EmailMessage): Promise<void> };
  /** Envelope sender — a bare address on the verified domain. */
  CONTACT_FROM: string;
  /** Recipient — must be a verified destination address in Email Routing. */
  CONTACT_TO: string;
}
const cf = env as unknown as CfEnv;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  const company = (body.company ?? '').trim();
  const lang = body.lang === 'es' ? 'es' : 'en';

  // Honeypot filled → a bot. Accept silently, send nothing.
  if (company) return json({ ok: true }, 200);

  // Re-validate server-side with the same rules as the client.
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'required';
  if (!email) errors.mail = 'required';
  else if (!emailRe.test(email)) errors.mail = 'invalid';
  if (!message) errors.message = 'required';
  else if (message.length < 10) errors.message = 'short';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  try {
    const from = cf.CONTACT_FROM;
    const to = cf.CONTACT_TO;

    const mime = createMimeMessage();
    mime.setSender({ name: `Portfolio — ${name}`, addr: from });
    mime.setRecipient(to);
    // Reply-To must be a Mailbox instance in mimetext (a bare string throws),
    // so replying to a submission goes straight to the visitor.
    mime.setHeader('Reply-To', new Mailbox(email));
    mime.setSubject(`Portfolio contact — ${name}`);
    mime.addMessage({
      contentType: 'text/plain',
      data:
        `New message from the portfolio contact form\n\n` +
        `Name:    ${name}\n` +
        `Email:   ${email}\n` +
        `Lang:    ${lang}\n\n` +
        `${message}\n`,
    });

    const emailMessage = new EmailMessage(from, to, mime.asRaw());
    await cf.SEB.send(emailMessage);

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[contact] send failed:', err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
};

// A GET on the endpoint is not useful — make that explicit.
export const GET: APIRoute = () => json({ ok: false, error: 'method_not_allowed' }, 405);
