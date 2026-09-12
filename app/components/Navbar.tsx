import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        
        {/* Logo de Hello QR (+50% más grande) */}
        <Link href="/" className="group font-extrabold text-3xl md:text-4xl tracking-tight text-[#1D1D1F] flex items-center gap-1.5">
          <span>Hello</span>
          <span className="text-[#A0BE1B] group-hover:scale-105 transition-transform">QR</span>
        </Link>

        {/* Menú de Navegación Más Grande y Pro */}
        <nav className="hidden md:flex items-center gap-10 text-base font-semibold text-[#4A4A4F]">
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A0BE1B] hover:after:w-full after:transition-all">
            Inicio
          </Link>
          <Link href="/como-funciona" className="hover:text-[#1D1D1F] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A0BE1B] hover:after:w-full after:transition-all">
            Cómo Funciona
          </Link>
          <Link href="/ayuda" className="hover:text-[#1D1D1F] transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A0BE1B] hover:after:w-full after:transition-all">
            Ayuda
          </Link>
        </nav>

        {/* Botón CREAR QR (+40% más grande y llamativo) */}
        <div>
          <Link 
            href="/crear" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-[#1D1D1F] rounded-full hover:bg-black hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_35px_rgba(160,190,27,0.6)]"
          >
            <span>Crear QR</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>

      </div>
    </header>
  );
}