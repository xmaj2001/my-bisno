import { faker } from "@faker-js/faker";
import type {
  StockDetailsResponse,
  StockItem,
  StockItemDetails,
} from "../types";

const MOCK_TIMESTAMP = "2026-11-05T00:00:00.000Z";

export function getMockStock(count = 16): StockItem[] {
  faker.seed(123); // Seed determinístico para evitar erros de hidratação

  return Array.from({ length: count }, (_, index) => {
    const priceNum = Number.parseFloat(
      faker.commerce.price({ min: 1000, max: 50000, dec: 0 }),
    );
    const statuses: ("disponivel" | "baixo" | "esgotado")[] = [
      "disponivel",
      "baixo",
      "esgotado",
    ];
    const status = faker.helpers.arrayElement(statuses);

    return {
      id: `stock-${index + 1}`,
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: `${priceNum.toLocaleString()} Kz`,
      stock:
        status === "esgotado"
          ? 0
          : status === "baixo"
            ? 2
            : faker.number.int({ min: 10, max: 100 }),
      commission: `${(priceNum * 0.1).toFixed(0)} Kz`,
      status,
      image: `https://picsum.photos/seed/stock-${index + 1}/600/600`,
    };
  });
}

export function getMockStockSlug(slug: string): StockDetailsResponse {
  const allProducts = getMockStock(24);
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

  const stockDetails: StockItemDetails = {
    ...found,
    slug: `${faker.helpers.slugify(found.name).toLowerCase()}-${found.id}`,
    description: "ww",
    images: mockImages,
    category: "Eletrónicos & Utilidades",
    specs: mockSpecs,
    earning: "50",
    coupon: `BISNO-${found.id.toUpperCase()}`,
    store: {
      name: "Bisno",
      logoUrl: null,
      whatsapp: "+244944083160",
    },
  };

  return {
    success: true,
    data: stockDetails,
    ts: MOCK_TIMESTAMP,
  };
}
