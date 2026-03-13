// src/proxy.ts
export { auth as proxy } from "./auth"

export const config = {
  // api/auth yollarını ve statik dosyaları kesinlikle hariç tutuyoruz
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}