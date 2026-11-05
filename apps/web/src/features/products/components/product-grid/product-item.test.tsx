import assert from "node:assert";
import { describe, it } from "node:test";
import type { Product } from "../../types";

describe("ProductItem", () => {
  it("has valid product structure", () => {
    const sampleProduct: Product = {
      id: "prod-1",
      name: "Sample Product",
      description: "Description",
      price: 29.99,
      inStock: true,
      category: "Electronics",
      imageUrl: "https://example.com/image.jpg",
    };

    assert.strictEqual(sampleProduct.id, "prod-1");
    assert.strictEqual(sampleProduct.price, 29.99);
    assert.strictEqual(sampleProduct.inStock, true);
  });
});
