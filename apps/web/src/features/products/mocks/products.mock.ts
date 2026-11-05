import { faker } from "@faker-js/faker";
import type { Product } from "../types";

// Seed ensures deterministic data across server and hydration
faker.seed(42);

export function generateMockProducts(count = 6): Product[] {
  // Reset seed so repeated calls in same process remain deterministic
  faker.seed(42);

  return Array.from({ length: count }, (_, index) => ({
    id: `prod-${index + 1}`,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number.parseFloat(
      faker.commerce.price({ min: 10, max: 250, dec: 2 }),
    ),
    inStock: index % 4 !== 0,
    category: faker.commerce.department(),
    imageUrl: `https://picsum.photos/seed/${index + 1}/600/400`,
  }));
}
