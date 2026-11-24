import { prisma } from "./_client";
import { authServer } from "../../src/shared/auth/betterAuth/betterAuth";

export const DEFAULT_USER_PASSWORD = "Senha@1234";

export async function seedUsers() {
  console.log("👥 A criar utilizadores (user1@x.com até user8@x.com)...");
  const createdUsers: any[] = [];

  for (let i = 1; i <= 8; i++) {
    const email = `user${i}@x.com`;
    const name = `User ${i}`;

    // Se já existir, remove registos associados e o utilizador para garantir a senha correta
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await prisma.stockAfiliate.deleteMany({ where: { userId: existing.id } });
      await prisma.session.deleteMany({ where: { userId: existing.id } });
      await prisma.account.deleteMany({ where: { userId: existing.id } });
      await prisma.user.delete({ where: { id: existing.id } });
    }

    // Regista com o Better Auth gerando o hash correto e a conta com providerId 'credential'
    await authServer.api.signUpEmail({
      body: {
        email,
        password: DEFAULT_USER_PASSWORD,
        name,
      },
    });

    // Marca como verificado para login imediato sem necessidade de confirmação por email
    const updated = await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    });

    createdUsers.push(updated);
  }

  console.log(
    `✅ ${createdUsers.length} utilizadores criados com sucesso com a senha "${DEFAULT_USER_PASSWORD}".`,
  );
  return createdUsers;
}
