import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PayPalProvider from "./components/PayPalProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "HelloQR — Generador Profesional de Códigos QR",
  description: "Crea códigos QR únicos, personalizados y con estilo propio para tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans bg-white text-[#1D1D1F] antialiased select-none">
        <PayPalProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PayPalProvider>
      </body>
    </html>
  );
}