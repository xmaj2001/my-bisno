import { prisma } from "./_client";
import type { Category } from "../../src/generated/prisma/client";

export const DEFAULT_CATEGORIES = [
  {
    name: "Eletrónicos & Informática",
    slug: "eletronicos-e-informatica",
    description: "Computadores, acessórios, áudio e dispositivos eletrónicos.",
  },
  {
    name: "Smartphones & Telefonia",
    slug: "smartphones-e-telefonia",
    description: "Telemóveis, capas, carregadores e acessórios inteligentes.",
  },
  {
    name: "Moda & Acessórios",
    slug: "moda-e-acessorios",
    description: "Roupas, sapatos, relógios e malas de homem e mulher.",
  },
  {
    name: "Casa & Eletrodomésticos",
    slug: "casa-e-eletrodomesticos",
    description: "Tudo para a sua casa, cozinha e decoração.",
  },
  {
    name: "Beleza, Perfumes & Saúde",
    slug: "beleza-perfumes-e-saude",
    description: "Cosméticos, maquilhagem, fragrâncias e cuidados diários.",
  },
  {
    name: "Desporto & Fitness",
    slug: "desporto-e-fitness",
    description:
      "Equipamentos de treino, vestuário desportivo e suplementação.",
  },
  {
    name: "Bebé & Criança",
    slug: "bebe-e-crianca",
    description: "Artigos infantis, brinquedos e puericultura.",
  },
  {
    name: "Automóvel & Ferramentas",
    slug: "automovel-e-ferramentas",
    description: "Acessórios para veículos, mecânica e ferramentas gerais.",
  },
];

export async function seedCategories() {
  console.log("📂 A criar categorias de produtos...");
  const categories: Category[] = [];

  for (const cat of DEFAULT_CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    });
    categories.push(category);
  }

  console.log(
    `✅ ${categories.length} categorias criadas/atualizadas com sucesso.`,
  );
  return categories;
}
