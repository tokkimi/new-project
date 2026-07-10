import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(254)
  .email();

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(200);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(200),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const shelfItemSchema = z.object({
  productId: z.string().trim().min(1).max(100),
});

export const SKIN_TYPES = ["oily", "dry", "combination", "normal", "sensitive"] as const;
export const AGE_RANGES = ["teens", "20s", "30s", "40s", "50plus"] as const;
export const CLIMATES = ["humid", "dry", "temperate", "cold"] as const;
export const BUDGETS = ["low", "mid", "high"] as const;
export const CONCERNS = [
  "acne",
  "aging",
  "hydration",
  "redness",
  "pigmentation",
  "pores",
  "dullness",
  "barrier",
] as const;
export const SENSITIVITIES = ["fragrance", "essential-oils", "alcohol", "silicones"] as const;

export const skinProfileSchema = z.object({
  skinType: z.enum(SKIN_TYPES),
  concerns: z.array(z.enum(CONCERNS)).max(8),
  ageRange: z.enum(AGE_RANGES).optional(),
  sensitivities: z.array(z.enum(SENSITIVITIES)).max(8),
  climate: z.enum(CLIMATES).optional(),
  goals: z.array(z.string().trim().min(1).max(60)).max(10),
  budget: z.enum(BUDGETS).optional(),
});
