import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n/config";

const protectedPaths = ["/system"];
const authPaths = ["/auth/login", "/auth/register"];

const BOT_USER_AGENTS = [
  "facebookexternalhit",
  "whatsapp",
  "twitterbot",
  "telegrambot",
  "linkedinbot",
  "pinterest",
  "slackbot",
  "discordbot",
  "applebot",
  "googlebot",
  "bingbot",
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

function splitLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  const locale = i18n.locales.find((l) => l === first);
  return {
    locale,
    path: locale ? `/${rest.join("/")}` : pathname,
  };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = splitLocale(pathname);

  // Redirecionamento amigável para bots de redes sociais (WhatsApp, Twitter, Facebook, etc.)
  // Se um afiliado partilhar o link do dashboard (/system/product/[slug]), redireciona o bot para a página pública
  // para que o crawler consiga extrair a imagem, título e dados OpenGraph do produto sem cair no login.
  if (path.startsWith("/system/product/")) {
    const userAgent = request.headers.get("user-agent");
    if (isBot(userAgent)) {
      const slug = path.replace("/system/product/", "");
      const publicUrl = new URL(
        `/${locale ?? i18n.defaultLocale}/products/${slug}`,
        request.url,
      );
      // Preservar query params (ex: ?coupon=...)
      publicUrl.search = request.nextUrl.search;
      return NextResponse.redirect(publicUrl, 308);
    }
  }

  const isProtected = protectedPaths.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );

  const isAuthPath = authPaths.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );

  const session = getSessionCookie(request);

  if (isProtected && !session) {
    const loginUrl = new URL(
      `/${locale ?? i18n.defaultLocale}/auth/login`,
      request.url,
    );
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  } else if (isAuthPath && session) {
    const callback = request.nextUrl.searchParams.get("callbackUrl");
    const systemUrl = new URL(
      callback || `/${locale ?? i18n.defaultLocale}/system`,
      request.url,
    );
    return NextResponse.redirect(systemUrl);
  }

  if (locale) return NextResponse.next();

  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
