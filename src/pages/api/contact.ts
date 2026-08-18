import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';

// On-demand (Cloudflare Worker) — the one non-static route in the project.
export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Abuse limits.
const MAX = { name: 100, email: 254, message: 5000 };
const RL_LIMIT = 5; // accepted submissions per IP…
const RL_WINDOW = 600; // …per 10-minute window (seconds)
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface Payload {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
  token?: string; // Cloudflare Turnstile response
  lang?: string;
}

// Minimal KV surface (the SESSION namespace the Cloudflare adapter injects).
interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

// Shape of the Cloudflare bindings/vars this route needs (from wrangler.jsonc
// + adapter-injected bindings + the Turnstile secret).
interface CfEnv {
  /** send_email binding, restricted to the verified destination address. */
  SEB: { send(message: EmailMessage): Promise<void> };
  /** Envelope sender — a bare address on the verified domain. */
  CONTACT_FROM: string;
  /** Recipient — must be a verified destination address in Email Routing. */
  CONTACT_TO: string;
  /** Turnstile secret key — set with `wrangler secret put TURNSTILE_SECRET`. */
  TURNSTILE_SECRET: string;
  /** KV namespace the adapter injects; reused here for rate limiting. */
  SESSION?: KV;
}
const cf = env as unknown as CfEnv;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Strip control chars so a name can't smuggle extra mail headers into the
// subject / sender line.
const headerSafe = (s: string) => s.replace(/[\x00-\x1f\x7f]/g, ' ').trim();

// Verify a Turnstile token against Cloudflare. Fails closed on any error.
async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  if (!secret || !token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body: form });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// Best-effort per-IP limiter on the SESSION KV. KV isn't atomic, so this is
// intentionally lenient — Turnstile is the primary bot defense. Returns true
// when the caller is over the limit (and should be rejected).
async function overRateLimit(kv: KV | undefined, ip: string): Promise<boolean> {
  if (!kv || !ip) return false;
  const key = `rl:${ip}`;
  const count = Number((await kv.get(key)) ?? '0') || 0;
  if (count >= RL_LIMIT) return true;
  await kv.put(key, String(count + 1), { expirationTtl: RL_WINDOW });
  return false;
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
  const token = (body.token ?? '').trim();
  const lang = body.lang === 'es' ? 'es' : 'en';

  // Honeypot filled → a bot. Accept silently, send nothing.
  if (company) return json({ ok: true }, 200);

  // Re-validate server-side: required + format + length bounds (upper bounds
  // matter even though the client caps them — direct API calls don't).
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'required';
  else if (name.length > MAX.name) errors.name = 'long';
  if (!email) errors.mail = 'required';
  else if (!emailRe.test(email)) errors.mail = 'invalid';
  else if (email.length > MAX.email) errors.mail = 'long';
  if (!message) errors.message = 'required';
  else if (message.length < 10) errors.message = 'short';
  else if (message.length > MAX.message) errors.message = 'long';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const ip = request.headers.get('CF-Connecting-IP') ?? '';

  // Turnstile — reject bots before doing any real work.
  if (!(await verifyTurnstile(cf.TURNSTILE_SECRET, token, ip))) {
    return json({ ok: false, errors: { captcha: 'failed' } }, 422);
  }

  // Rate limit accepted (bot-verified) submissions per IP.
  if (await overRateLimit(cf.SESSION, ip)) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  try {
    const from = cf.CONTACT_FROM;
    const to = cf.CONTACT_TO;
    const safeName = headerSafe(name);

    const mime = createMimeMessage();
    mime.setSender({ name: `Portfolio — ${safeName}`, addr: from });
    mime.setRecipient(to);
    // Reply-To must be a Mailbox instance in mimetext (a bare string throws),
    // so replying to a submission goes straight to the visitor.
    mime.setHeader('Reply-To', new Mailbox(email));
    mime.setSubject(`Portfolio contact — ${safeName}`);
    mime.addMessage({
      contentType: 'text/plain',
      data:
        `New message from the portfolio contact form\n\n` +
        `Name:    ${safeName}\n` +
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
