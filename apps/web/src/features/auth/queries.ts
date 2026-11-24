"use server"
import { cookies } from "next/headers";

export async function getSessionCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("better-auth.session_token");

  if (!token) {
    console.error("Session Not found");
    throw new Error("Sessão não encontrada no cliente.");
  }

  // Formata manualmente no padrão que o NestJS espera no cabeçalho Cookie
  return `better-auth.session_token=${token.value}`;
}
