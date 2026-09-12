import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "HelloQR — Generador Profesional y Gratuito de Códigos QR",
  description: "Crea códigos QR únicos, personalizados con tu propio logotipo, colores exactos y marcos profesionales. Generación rápida, segura y gratuita en formato JPG.",
  keywords: ["generador de codigo qr", "crear qr gratis", "qr con logo", "helloqr", "qr para wifi", "qr para whatsapp", "codigo qr profesional"],
  authors: [{ name: "HelloQR Team" }],
  creator: "HelloQR",
  publisher: "HelloQR",
  robots: "index, follow",
  verification: {
    google: "u93xcLB6AXteGaL2GMybV63dICGBjkiw1WinJ0Q9-ZI",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://helloqr.vercel.app",
    title: "HelloQR — Generador Profesional y Gratuito de Códigos QR",
    description: "Crea códigos QR únicos, personalizados con tu propio logotipo y colores exactos para tu negocio.",
    siteName: "HelloQR",
  },
  twitter: {
    card: "summary_large_image",
    title: "HelloQR — Generador Profesional y Gratuito de Códigos QR",
    description: "Crea códigos QR únicos, personalizados con tu propio logotipo y colores exactos para tu negocio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HelloQR",
    "operatingSystem": "All",
    "applicationCategory": "DesignApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Herramienta web profesional para generar códigos QR personalizados con logotipos, colores y múltiples formatos de exportación."
  };

  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className="font-sans bg-white text-[#1D1D1F] antialiased select-none">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}