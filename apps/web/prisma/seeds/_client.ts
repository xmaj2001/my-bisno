import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { fakerPT_PT as faker } from "@faker-js/faker";
import { hashPassword } from "better-auth/crypto";

// Garantir consistência nas execuções de seed se desejado
faker.seed(12345);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

export const prisma = new PrismaClient({ adapter });
export { faker, hashPassword };

// ── Províncias e Cidades de Angola ──────────────────────────────────────────
export const ANGOLA_LOCATIONS = [
  {
    province: "Luanda",
    cities: [
      "Luanda",
      "Viana",
      "Cacuaco",
      "Belas",
      "Kilamba Kiaxi",
      "Talatona",
    ],
  },
  {
    province: "Benguela",
    cities: ["Benguela", "Lobito", "Baía Farta", "Catumbela"],
  },
  { province: "Huambo", cities: ["Huambo", "Caála", "Bailundo"] },
  { province: "Huíla", cities: ["Lubango", "Humpata", "Chibia", "Matala"] },
  { province: "Cabinda", cities: ["Cabinda", "Cacongo", "Buco-Zau"] },
  { province: "Cuanza Sul", cities: ["Sumbe", "Porto Amboim", "Gabela"] },
  { province: "Malanje", cities: ["Malanje", "Calandula", "Cangandala"] },
  { province: "Uíge", cities: ["Uíge", "Negage", "Damba"] },
  { province: "Namibe", cities: ["Moçâmedes", "Tômbwa", "Virei"] },
] as const;

/**
 * Gera um número de telefone angolano realista (+244 9XX XXX XXX)
 */
export function generateAngolaPhone(): string {
  const prefixes = ["923", "924", "925", "934", "945", "991", "912", "951"];
  const prefix = faker.helpers.arrayElement(prefixes);
  const suffix = faker.string.numeric(6);
  return `+244${prefix}${suffix}`;
}

/**
 * Gera um IBAN bancário angolano realista (AO06 + 21 dígitos = 25 caracteres)
 */
export function generateAngolaIBAN(): string {
  return `AO06${faker.string.numeric(21)}`;
}

/**
 * Converte um texto num slug URL válido
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Limpa todas as tabelas da base de dados respeitando restrições de chaves estrangeiras
 */
export async function cleanDatabase(): Promise<void> {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "featured_products",
      "affiliate_products",
      "product_specs",
      "products",
      "categories",
      "stores",
      "session",
      "account",
      "verification",
      "oauthAccessToken",
      "oauthConsent",
      "oauthApplication",
      "users"
    CASCADE;
  `);
}
