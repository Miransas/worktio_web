import { NextResponse } from "next/server";
import { isValidLocale, localeCookieName } from "@/lib/lang";

export async function POST(request: Request) {
  const body = await request.json();
  const locale = typeof body?.locale === "string" && isValidLocale(body.locale) ? body.locale : null;

  if (!locale) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(localeCookieName, locale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
