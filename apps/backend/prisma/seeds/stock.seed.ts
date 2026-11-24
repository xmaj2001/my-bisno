import { prisma, faker } from "./_client";
import type { User } from "../../src/generated/prisma/client";

export interface SeedStockOptions {
  itemsPerUser?: number;
}

/**
 * Associa produtos ao stock de afiliados de cada utilizador (StockAfiliate).
 */
export async function seedStockAfiliates(
  users: User[],
  products: { id: string; name: string }[],
  options: SeedStockOptions = {},
) {
  const itemsPerUser = options.itemsPerUser ?? 25;
  console.log(
    `📊 A associar stock de afiliados (${itemsPerUser} produtos por utilizador)...`,
  );

  if (users.length === 0 || products.length === 0) {
    console.log(
      "⚠️ Nenhum utilizador ou produto disponível para associar stock.",
    );
    return [];
  }

  const stockRecords: {
    userId: string;
    productId: string;
    coupon: string;
    isActive: boolean;
  }[] = [];

  let couponCounter = 1;

  for (const user of users) {
    // Escolhe aleatoriamente produtos para este utilizador sem duplicados
    const chosenProducts = faker.helpers.arrayElements(
      products,
      Math.min(itemsPerUser, products.length),
    );

    for (const product of chosenProducts) {
      const sanitizedName = user.name
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 6);

      const coupon = `BISNO-${sanitizedName}-${couponCounter.toString().padStart(4, "0")}`;
      couponCounter++;

      stockRecords.push({
        userId: user.id,
        productId: product.id,
        coupon,
        isActive: true,
      });
    }
  }

  // Limpar stock antigo dos utilizadores para evitar conflito de cupões ou chaves
  await prisma.stockAfiliate.deleteMany({
    where: {
      userId: { in: users.map((u) => u.id) },
    },
  });

  const created = await prisma.stockAfiliate.createMany({
    data: stockRecords,
    skipDuplicates: true,
  });

  console.log(
    `✅ ${created.count} produtos adicionados ao stock dos afiliados com cupões únicos!`,
  );
  return created;
}
