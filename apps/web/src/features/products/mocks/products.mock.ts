import { faker } from "@faker-js/faker";
import type {
  APIProductDetails,
  FeaturedProduct,
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
  const baseProducts = generateMockProducts(4);

  const featuredProducts: FeaturedProduct[] = baseProducts.map((p, idx) => ({
    id: `feat-${idx + 1}`,
    title: `Destaque Especial #${idx + 1}`,
    subtitle: "Oportunidade Limitada",
    description: p.description,
    backdrop: `https://picsum.photos/seed/backdrop-${idx + 1}/1200/600`,
    aspectRatio: 16 / 9,
    specifications: [
      { key: "Comissão", value: p.earning },
      { key: "Preço Base", value: p.price },
      { key: "Garantia", value: "Oficial da Marca" },
    ],
    product: p,
  }));

  return {
    success: true,
    data: featuredProducts,
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

  // Gerar algumas especificações técnicas realistas para o mock
  const mockSpecs: { label: string; value: string }[] = [
    { label: "Garantia", value: "1 Ano pelo Fabricante" },
    { label: "Disponibilidade", value: "Em Stock" },
    { label: "Envio", value: "Para toda Luanda e Províncias" },
    { label: "Condição", value: "Novo e Original" },
  ];

  // Simular múltiplas imagens para a galeria de detalhes
  const mockImages = [
    found.image,
    `https://picsum.photos/seed/${found.id}-2/800/800`,
    `https://picsum.photos/seed/${found.id}-3/800/800`,
  ];

  const productDetails: APIProductDetails = {
    ...found,
    images: mockImages,
    category: "Eletrónicos & Utilidades",
    specs: mockSpecs,
    affiliateInfo: {
      coupon: `BISNO-${found.id.toUpperCase()}`,
      isActive: true,
    },
  };

  return {
    success: true,
    data: productDetails,
    ts: MOCK_TIMESTAMP,
  };
}
