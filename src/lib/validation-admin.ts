import { z } from "zod";

export const productAdminSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  name: z.string().trim().min(1).max(200),
  brand: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(40),
  ingredientIds: z.array(z.string().trim().min(1).max(60)).max(20),
  fullIngredients: z.string().trim().max(4000).optional().or(z.literal("")),
  origin: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  usageSteps: z.array(z.string().trim().min(1).max(300)).max(10),
  imageUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  officialUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  price: z.coerce.number().min(0).max(10000).optional(),
  currency: z.string().trim().max(10).optional().or(z.literal("")),
  skinTypes: z.array(z.string().trim().min(1).max(40)).max(10),
  concerns: z.array(z.string().trim().min(1).max(40)).max(10),
  featured: z.boolean().optional(),
});

export const newsItemAdminSchema = z.object({
  category: z.enum(["innovation", "launch", "ingredient-trend", "brand-news", "award"]),
  title: z.string().trim().min(1).max(300),
  summary: z.string().trim().min(1).max(1000),
  sourceName: z.string().trim().max(120).optional().or(z.literal("")),
  sourceUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  imageUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  featured: z.boolean().optional(),
  publishedAt: z.string().trim().min(1),
});

export const seoMetaAdminSchema = z.object({
  path: z.string().trim().min(1).max(200),
  locale: z.enum(["en", "ko"]),
  title: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  ogImage: z.string().trim().url().max(500).optional().or(z.literal("")),
});
