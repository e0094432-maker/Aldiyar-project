import type { LeadErrorCode, LeadField } from "@/lib/lead";
import { leadSchema } from "@/lib/lead-schema";
import { sendLead } from "@/lib/mailer";

/**
 * POST /api/lead — приём заявки с формы.
 * Ответы: 200 { ok: true } · 400 { ok: false, errors } · 429 / 500 { ok: false }.
 */

// Простой лимит частоты на инстанс: не больше 5 заявок с IP за 10 минут.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Partial<Record<LeadField, LeadErrorCode>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as LeadField;
      if (field && !errors[field]) {
        errors[field] =
          issue.message === "email" || issue.message === "consent"
            ? issue.message
            : "required";
      }
    }
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  // Бот заполнил скрытое поле — делаем вид, что всё хорошо.
  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  try {
    await sendLead(parsed.data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[lead] Ошибка отправки заявки", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
