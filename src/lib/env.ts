import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
});

// Some Postgres marketplace integrations (e.g. older Neon<->Vercel setups)
// only inject POSTGRES_URL / POSTGRES_PRISMA_URL, not a plain DATABASE_URL.
const resolvedEnv = {
  ...process.env,
  DATABASE_URL:
    process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL,
};

const parsed = envSchema.safeParse(resolvedEnv);

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;
