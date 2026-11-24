import "dotenv/config";
import { prisma } from "./seeds/_client";
import { seedUsers } from "./seeds/users.seed";
import { seedStore } from "./seeds/stores.seed";
import { seedCategories } from "./seeds/categories.seed";
import { seedProducts } from "./seeds/products.seed";
import { seedStockAfiliates } from "./seeds/stock.seed";

async function main() {
  console.log("🌱 A iniciar Seed da base de dados...\n");

  // 1. Criar utilizadores de teste
  const users = await seedUsers();

  // 2. Criar a loja única "Bisno"
  const store = await seedStore();

  // 3. Criar categorias de produtos
  const categories = await seedCategories();

  // 4. Criar produtos pertencentes à loja Bisno
  // Pode ser configurado pela variável de ambiente SEED_PRODUCTS_COUNT (padrão: 1000)
  const productCount = process.env.SEED_PRODUCTS_COUNT
    ? parseInt(process.env.SEED_PRODUCTS_COUNT, 10)
    : 1000;

  const products = await seedProducts(store.id, categories, {
    count: productCount,
  });

  // 5. Associar produtos ao stock dos afiliados (StockAfiliate)
  await seedStockAfiliates(users, products, {
    itemsPerUser: 25,
  });

  console.log("\n🚀 Todos os seeds foram executados com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
