import { faker } from "@faker-js/faker";
import type { StockItem } from "../types";

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
