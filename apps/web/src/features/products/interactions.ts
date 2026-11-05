"use server";

import { revalidatePath } from "next/cache";
import { addToCartInputSchema } from "./schemas";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function addToCartAction(
  rawInput: unknown,
): Promise<ActionResult<{ productId: string; quantity: number }>> {
  const parsed = addToCartInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  // Simulate server mutation / cart persistence
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Invalidate affected paths/tags
  revalidatePath("/[lang]", "page");

  return {
    success: true,
    data: parsed.data,
  };
}
