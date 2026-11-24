"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/features/auth/auth";

export interface AddToStockResult {
  success: boolean;
  coupon: string;
  productId: string;
}

/**
 * Server Action — Adiciona um produto ao stock do utilizador autenticado.
 */
export async function addToStockAction(
  productId: string,
): Promise<AddToStockResult> {
  const session = await requireSession();
  const userId = session.user.id;

  // Verifica se o produto existe
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true },
  });

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  // Verifica se já está no stock (unique constraint [userId, productId])
  const existing = await prisma.stockAfiliate.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    throw new Error("Este produto já está no teu stock.");
  }

  // Gera um cupão único para este afiliado
  const shortUser = userId.replace(/-/g, "").slice(0, 6).toUpperCase();
  const shortProd = productId.replace(/-/g, "").slice(0, 4).toUpperCase();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const coupon = `BISNO-${shortUser}-${shortProd}-${rand}`;

  const record = await prisma.stockAfiliate.create({
    data: { userId, productId, coupon, isActive: true },
    select: { id: true, coupon: true, isActive: true, productId: true },
  });

  revalidatePath("/", "layout");

  return {
    success: true,
    coupon: record.coupon,
    productId: record.productId,
  };
}
