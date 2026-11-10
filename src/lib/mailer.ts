import "server-only";
import nodemailer from "nodemailer";
import { getDictionaryFor } from "@/content/dictionaries";
import type { Lead } from "./lead-schema";

/**
 * Отправка заявки на почту компании + автоответ клиенту.
 * Настройки SMTP — в переменных окружения (см. .env.example).
 * Если SMTP не настроен, заявка просто пишется в лог сервера (удобно для разработки).
 */

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Письмо менеджеру всегда на русском — с подписями полей из ru-словаря. */
function leadRows(lead: Lead): [string, string][] {
  const ru = getDictionaryFor("ru");
  const f = ru.form.fields;
  return [
    [f.name, lead.name],
    [f.phone, lead.phone],
    [f.email, lead.email ?? "—"],
    [f.role, ru.form.roles[lead.role]],
    [f.stage, lead.stage ? ru.form.stages[lead.stage] : "—"],
    [f.city, lead.city ?? "—"],
    [f.message, lead.message ?? "—"],
    ["Язык сайта", lead.locale.toUpperCase()],
    ["Страница", lead.page ?? "—"],
  ];
}

export type DeliveryResult = { delivered: boolean };

export async function sendLead(lead: Lead): Promise<DeliveryResult> {
  const transport = getTransport();
  const rows = leadRows(lead);

  if (!transport) {
    console.info(
      "[lead] SMTP не настроен — заявка не отправлена на почту:\n" +
        rows.map(([k, v]) => `  ${k}: ${v}`).join("\n"),
    );
    return { delivered: false };
  }

  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER!;
  const to = process.env.LEADS_TO ?? from;

  await transport.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: `Новая заявка с сайта: ${lead.name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#667085;vertical-align:top">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}</table>`,
  });

  if (lead.email) {
    const m = getDictionaryFor(lead.locale).mail;
    const text = `${m.autoReplyGreeting}, ${lead.name}!\n\n${m.autoReplyBody}\n\n${m.autoReplySignature}`;
    try {
      await transport.sendMail({
        from,
        to: lead.email,
        subject: m.autoReplySubject,
        text,
        html: text
          .split("\n\n")
          .map((p) => `<p>${escapeHtml(p)}</p>`)
          .join(""),
      });
    } catch (error) {
      // Заявка уже ушла менеджеру — ошибку автоответа только логируем.
      console.error("[lead] Не удалось отправить автоответ", error);
    }
  }

  return { delivered: true };
}
