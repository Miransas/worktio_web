import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, getDictionary, isValidLocale, localeCookieName } from "@/lib/lang";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale = cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: getDictionary(locale),
  };
});
