import "server-only";
import { z } from "zod";
import { locales } from "@/i18n/config";
import { leadLimits, leadRoles, leadStages } from "./lead";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const leadSchema = z.object({
  name: z.string().trim().min(1, "required").max(leadLimits.name),
  phone: z
    .string()
    .trim()
    .min(5, "required")
    .max(leadLimits.phone)
    .regex(/^[+\d\s()-]+$/, "required"),
  email: z
    .union([z.literal(""), z.email("email").max(leadLimits.email)])
    .optional()
    .transform((v) => (v ? v : undefined)),
  role: z.enum(leadRoles, "required"),
  stage: z
    .union([z.literal(""), z.enum(leadStages)])
    .optional()
    .transform((v) => (v ? v : undefined)),
  city: optionalText(leadLimits.city),
  message: optionalText(leadLimits.message),
  consent: z.literal(true, "consent"),
  locale: z.enum(locales),
  /** Страница, с которой пришла заявка (например, /ru/services/negotiations). */
  page: z.string().max(200).optional(),
  /** Ловушка для ботов: настоящие пользователи это поле не видят. */
  website: z.string().max(500).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
