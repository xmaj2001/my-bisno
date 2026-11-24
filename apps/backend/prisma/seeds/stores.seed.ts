import { prisma } from "./_client";

export const BISNO_STORE_SLUG = "bisno";

export async function seedStore() {
  console.log("🏪 A criar loja principal Bisno...");

  const store = await prisma.store.upsert({
    where: { slug: BISNO_STORE_SLUG },
    update: {
      name: "Bisno",
      logoUrl: "https://picsum.photos/seed/bisno-store/400/400",
      description:
        "Loja Oficial Bisno — A maior rede de produtos para afiliados em Angola.",
      whatsapp: "+244944083160",
    },
    create: {
      name: "Bisno",
      slug: BISNO_STORE_SLUG,
      logoUrl: "https://picsum.photos/seed/bisno-store/400/400",
      description:
        "Loja Oficial Bisno — A maior rede de produtos para afiliados em Angola.",
      whatsapp: "+244944083160",
    },
  });

  console.log(
    `✅ Loja "${store.name}" criada/atualizada com sucesso (ID: ${store.id}).`,
  );
  return store;
}
