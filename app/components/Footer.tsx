import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#E8E8ED] border-t border-gray-300/60 text-[#6E6E73] text-sm py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <span className="font-bold text-lg text-[#1D1D1F]">Hello<span className="text-[#A0BE1B]">QR</span></span>
          <p className="mt-2 text-xs leading-relaxed">
            Herramienta web profesional para crear códigos QR únicos, personalizados y con estilo propio.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#1D1D1F] mb-3">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-[#1D1D1F]">Inicio</Link></li>
            <li><Link href="/como-funciona" className="hover:text-[#1D1D1F]">Cómo Funciona</Link></li>
            <li><Link href="/ayuda" className="hover:text-[#1D1D1F]">Ayuda y Soporte</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#1D1D1F] mb-3">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/terminos" className="hover:text-[#1D1D1F]">Términos y Condiciones</Link></li>
            <li><Link href="/privacidad" className="hover:text-[#1D1D1F]">Política de Privacidad</Link></li>
            <li><Link href="/reembolso" className="hover:text-[#1D1D1F]">Política de Reembolso</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#1D1D1F] mb-3">Pagos</h4>
          <p className="text-xs">Pagos seguros y globales procesados a través de Paddle (Apple Pay, Google Pay y Tarjetas).</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-300/40 text-center text-xs">
        © {new Date().getFullYear()} HelloQR. Todos los derechos reservados.
      </div>
    </footer>
  );
}