import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { contact } from "@/lib/content";

export const runtime = "nodejs";

// Rate limiting best-effort en memoria (por instancia). Para producción con
// múltiples instancias, respaldar con un store compartido (p. ej. Upstash).
const HITS = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const MAX_TRACKED_IPS = 5_000;
let lastCleanup = 0;

function cleanRateLimitEntries(now: number) {
  if (now - lastCleanup < WINDOW_MS && HITS.size < MAX_TRACKED_IPS) return;
  lastCleanup = now;

  for (const [key, entry] of HITS) {
    if (now - entry.ts > WINDOW_MS) HITS.delete(key);
  }

  if (HITS.size <= MAX_TRACKED_IPS) return;
  const overflow = HITS.size - MAX_TRACKED_IPS;
  let removed = 0;
  for (const key of HITS.keys()) {
    HITS.delete(key);
    removed += 1;
    if (removed >= overflow) break;
  }
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  cleanRateLimitEntries(now);
  const entry = HITS.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    HITS.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

async function sendViaResend(input: {
  nombre: string;
  email: string;
  telefono: string;
  pais?: string;
  mensaje: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return false;

  const text = [
    `Nombre: ${input.nombre}`,
    `Correo: ${input.email}`,
    `Teléfono: ${input.telefono}`,
    `País: ${input.pais || "—"}`,
    "",
    "Mensaje:",
    input.mensaje,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(8_000),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: input.email,
      subject: `Nuevo contacto — ${input.nombre}`,
      text,
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta en un minuto." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revisa los campos del formulario." },
      { status: 422 },
    );
  }

  // Honeypot activado → responder OK sin procesar (no alertar al bot).
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const { consent: _consent, website: _website, ...payload } = parsed.data;

  try {
    const delivered = await sendViaResend(payload);
    if (!delivered) {
      // No hay proveedor de correo configurado: NO simulamos un envío exitoso.
      console.info(
        "[contacto] Solicitud válida recibida (sin proveedor de correo configurado):",
        { nombre: payload.nombre, email: payload.email },
      );
    }
    return NextResponse.json({ ok: true, delivered });
  } catch (err) {
    console.error("[contacto] Error al enviar:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos procesar el envío. Intenta de nuevo." },
      { status: 502 },
    );
  }
}
