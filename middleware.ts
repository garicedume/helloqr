import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Cabeceras de seguridad estrictas anti-tampering y anti-inspección maliciosa
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Detección y restricción básica de cabeceras asociadas a proxys / VPNs comerciales
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for") || "";

  // Bloqueo preventivo de firmas de bots o herramientas de manipulación de código conocidas
  if (userAgent.includes("Brave") === false && (userAgent.includes("curl") || userAgent.includes("Postman") || userAgent.includes("sqlmap"))) {
    return new NextResponse("Acceso bloqueado por políticas de seguridad de HelloQR.", { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};