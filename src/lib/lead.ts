/** Общие для формы и API значения полей заявки. */

export const leadRoles = ["company", "university", "other"] as const;
export const leadStages = [
  "idea",
  "negotiating",
  "draft",
  "preparing",
] as const;

export type LeadRole = (typeof leadRoles)[number];
export type LeadStage = (typeof leadStages)[number];

export const leadLimits = {
  name: 120,
  phone: 40,
  email: 160,
  city: 80,
  message: 2000,
} as const;

/** Поля, по которым API может вернуть ошибку. */
export type LeadField = "name" | "phone" | "email" | "role" | "consent";
export type LeadErrorCode = "required" | "email" | "consent";
