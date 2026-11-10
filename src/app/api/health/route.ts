/**
 * GET /api/health — лёгкий ответ для мониторинга (UptimeRobot и т.п.).
 * Не рендерит страниц, поэтому пинг каждые 5 минут почти ничего не стоит.
 */
export function GET() {
  return Response.json({ ok: true });
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
