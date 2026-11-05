import { faker } from "@faker-js/faker";
import type {
  APIProductDetails,
  FeaturedProductsResponse,
  GetProductsParams,
  NewProductsResponse,
  Product,
  ProductDetailsResponse,
  ProductSearchResponse,
  ProductsPageResponse,
} from "../types";

const MOCK_TIMESTAMP = "2026-11-05T00:00:00.000Z";

export function generateMockProducts(count = 24): Product[] {
  // Deterministic seed
  faker.seed(42);

  return Array.from({ length: count }, (_, index) => {
    const priceNum = Number.parseFloat(
      faker.commerce.price({ min: 10, max: 250, dec: 2 }),
    );
    const commission = 10;
    const earningNum = (priceNum * commission) / 100;
    const name = faker.commerce.productName();

    return {
      id: `prod-${index + 1}`,
      slug: `${faker.helpers.slugify(name).toLowerCase()}-${index + 1}`,
      name,
      description: faker.commerce.productDescription(),
      price: `${priceNum} Kz`,
      commission,
      earning: `${earningNum.toFixed(2)} Kz`,
      image: `https://picsum.photos/seed/${index + 1}/600/400`,
    };
  });
}

export function getMockNewProducts(): NewProductsResponse {
  const products = generateMockProducts(16);
  return {
    success: true,
    data: products,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockPaginatedProducts(
  params: GetProductsParams,
): ProductsPageResponse {
  let allProducts = generateMockProducts(1024);

  if (params.q) {
    const q = params.q.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  const limit = params.limit ? Math.max(1, Number(params.limit)) : 8;

  let startIndex = 0;
  if (params.cursor) {
    const cursorIndex = allProducts.findIndex((p) => p.id === params.cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const items = allProducts.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < allProducts.length;
  const nextCursor = hasMore ? (items[items.length - 1]?.id ?? null) : null;

  return {
    success: true,
    data: {
      items,
      nextCursor,
      nextCursorPublishedAt: null,
    },
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockFeaturedProducts(): FeaturedProductsResponse {
  const products = generateMockProducts(4).map((p, idx) => ({
    ...p,
    featured: true,
    rank: idx + 1,
  }));

  return {
    success: true,
    data: products,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockSearchProducts(
  query: string,
  limit = 8,
): ProductSearchResponse {
  const allProducts = generateMockProducts(24);
  const q = query.toLowerCase();
  const filtered = allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    )
    .slice(0, limit);

  return {
    success: true,
    data: filtered,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockProductBySlug(slug: string): ProductDetailsResponse {
  const allProducts = generateMockProducts(24);
  const found = allProducts.find((p) => p.slug === slug) ?? allProducts[0];

  const productDetails: APIProductDetails = {
    ...found,
    storeId: "store-1",
    storeName: "Loja Oficial Bisno",
    storeWhatsapp: "+244923000000",
    categoryId: "cat-1",
    categoryName: "Eletrónicos",
    stock: 25,
    publishedAt: MOCK_TIMESTAMP,
    createdAt: MOCK_TIMESTAMP,
    updatedAt: MOCK_TIMESTAMP,
  };

  return {
    success: true,
    data: productDetails,
    ts: MOCK_TIMESTAMP,
  };
}
