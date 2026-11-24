import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { env } from "@/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [bearer()],
  session: {
    updateAge: 60 * 60 * 24, // 24h
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ],
});

export interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  nickname?: string;
  role?: string;
}

export interface SessionData {
  user: SessionUser;
  session?: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
  };
  token?: string;
}

/**
 * Retorna a sessão atual ou null caso o utilizador não esteja autenticado.
 */
export async function getSession(): Promise<SessionData | null> {
  if (env.USE_MOCKS) {
    return {
      user: {
        id: "u_8f2a9b3c-0192-7d4e-b5f1-3a2c4e5d6e7f",
        name: "User Mock",
        email: "user1@x.com",
        phoneNumber: "+244923456789",
        nickname: "Leopardo_21",
      },
      token: "mock-session-token",
    };
  }

  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      return null;
    }

    return session as unknown as SessionData;
  } catch {
    return null;
  }
}

/**
 * Retorna a sessão atual ou lança erro UNAUTHENTICATED.
 */
export async function requireSession(): Promise<SessionData> {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED: Valid session required");
  }
  return session;
}

/**
 * Helper para obter o ID do utilizador autenticado (ou undefined).
 */
export async function getSessionUserId(): Promise<string | undefined> {
  const session = await getSession();
  return session?.user?.id;
}
