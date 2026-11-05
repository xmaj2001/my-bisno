import { z } from "zod";

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
  category: z.string(),
  imageUrl: z.string().url(),
});

export const productFiltersSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStockOnly: z.boolean().optional(),
});

export const addToCartInputSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
export type ProductFiltersSchemaType = z.infer<typeof productFiltersSchema>;
export type AddToCartInput = z.infer<typeof addToCartInputSchema>;
