import { prisma, faker, slugify } from "./_client";
import type { Category, Prisma } from "../../src/generated/prisma/client";

export interface SeedProductsOptions {
  count?: number;
  batchSize?: number;
}

/**
 * Cria produtos em lote para a loja Bisno distribuídos pelas categorias fornecidas.
 * O utilizador pode definir a quantidade de produtos via parâmetro ou variável de ambiente.
 */
export async function seedProducts(
  storeId: string,
  categories: Category[],
  options: SeedProductsOptions = {},
) {
  const totalCount =
    options.count ??
    (process.env.SEED_PRODUCTS_COUNT
      ? parseInt(process.env.SEED_PRODUCTS_COUNT, 10)
      : 1000);

  const batchSize = options.batchSize ?? 200;

  console.log(
    `📦 A gerar ${totalCount} produtos para a loja Bisno (lotes de ${batchSize})...`,
  );

  // Limpar produtos anteriores da loja se necessário ou limpar antes
  const existingCount = await prisma.product.count({ where: { storeId } });
  if (existingCount > 0) {
    console.log(
      `ℹ️ Já existem ${existingCount} produtos na base de dados. A limpar produtos anteriores da loja...`,
    );
    await prisma.product.deleteMany({ where: { storeId } });
  }

  const allCreatedProducts: { id: string; name: string; slug: string }[] = [];

  for (let batchStart = 0; batchStart < totalCount; batchStart += batchSize) {
    const currentBatchCount = Math.min(batchSize, totalCount - batchStart);
    const batchData: Prisma.ProductCreateManyInput[] = [];

    for (let i = 0; i < currentBatchCount; i++) {
      const globalIndex = batchStart + i + 1;
      const category = faker.helpers.arrayElement(categories);

      const productName = faker.commerce.productName();
      const baseSlug = slugify(productName);
      const slug = `${baseSlug}-${globalIndex}`;

      // Preço realista em Kwanzas (Kz)
      const priceValue = faker.number.int({ min: 3500, max: 480000 });
      const price = `${priceValue.toLocaleString("pt-PT")} Kz`;

      // Stock de 0 a 120 (alguns esgotados, alguns baixos, a maioria disponível)
      const stock = faker.helpers.weightedArrayElement([
        { weight: 1, value: 0 },
        { weight: 2, value: faker.number.int({ min: 1, max: 5 }) },
        { weight: 7, value: faker.number.int({ min: 6, max: 120 }) },
      ]);

      const rating = faker.number.float({
        min: 3.2,
        max: 5.0,
        fractionDigits: 1,
      });
      const reviewsCount = faker.number.int({ min: 0, max: 180 });

      // Comissão realista entre 5% e 25%
      const commission = faker.helpers.arrayElement([5, 8, 10, 12, 15, 18, 20, 25]);

      // Imagens realistas de placeholder
      const images = [
        `https://picsum.photos/seed/bisno-prod-${globalIndex}-1/800/800`,
        `https://picsum.photos/seed/bisno-prod-${globalIndex}-2/800/800`,
        `https://picsum.photos/seed/bisno-prod-${globalIndex}-3/800/800`,
      ];

      batchData.push({
        name: productName,
        slug,
        description: faker.commerce.productDescription(),
        price,
        commission,
        rating,
        reviewsCount,
        stock,
        categoryId: category.id,
        storeId,
        images,
      });
    }

    const created = await prisma.product.createManyAndReturn({
      data: batchData,
      select: { id: true, name: true, slug: true },
    });

    allCreatedProducts.push(...created);
    console.log(
      `   ↳ ${allCreatedProducts.length}/${totalCount} produtos inseridos...`,
    );
  }

  // Criar especificações técnicas para os primeiros 50 produtos
  console.log("⚙️ A adicionar especificações técnicas aos produtos...");
  const specsData: { productId: string; label: string; value: string }[] = [];
  const sampleForSpecs = allCreatedProducts.slice(0, 50);

  for (const product of sampleForSpecs) {
    specsData.push(
      {
        productId: product.id,
        label: "Garantia",
        value: faker.helpers.arrayElement(["6 Meses", "1 Ano", "2 Anos"]),
      },
      {
        productId: product.id,
        label: "Disponibilidade",
        value: "Pronta Entrega em Luanda",
      },
      {
        productId: product.id,
        label: "Condição",
        value: faker.helpers.arrayElement(["Novo e Selado", "Original"]),
      },
      {
        productId: product.id,
        label: "Entrega",
        value: "Disponível para todas as províncias",
      },
    );
  }

  if (specsData.length > 0) {
    await prisma.productSpec.createMany({ data: specsData });
  }

  // Criar banners de destaque (Featured Products) para os primeiros 6 produtos
  console.log("🌟 A configurar produtos em destaque...");
  const sampleForFeatured = allCreatedProducts.slice(0, 6);
  const featuredData = sampleForFeatured.map((p, index) => ({
    productId: p.id,
    title: `Destaque Bisno: ${p.name}`,
    subtitle: "Comissões exclusivas e alta conversão para afiliados",
    description:
      "Produto de alta procura com entrega rápida e suporte garantido.",
    textColor: index % 2 === 0 ? "light" : "dark",
    bannerDesktop: `https://picsum.photos/seed/banner-desktop-${index + 1}/1920/600`,
    bannerMobile: `https://picsum.photos/seed/banner-mobile-${index + 1}/800/800`,
    aspectRatio: 3.2,
  }));

  await prisma.featuredProduct.createMany({
    data: featuredData,
    skipDuplicates: true,
  });

  console.log(
    `✅ ${allCreatedProducts.length} produtos criados com sucesso na loja Bisno!`,
  );
  return allCreatedProducts;
}
