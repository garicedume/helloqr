import Link from "next/link";
import { FileText, ArrowRight, QrCode } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      slug: "como-crear-codigo-qr-menu-restaurante",
      title: "Cómo crear un código QR para el menú de tu restaurante gratis",
      description: "Aprende a digitalizar la carta de tu local en formato PDF para que tus clientes puedan escanearla desde la mesa al instante.",
      date: "Septiembre 2026",
      readTime: "4 min de lectura"
    },
    {
      slug: "guia-compartir-wifi-codigo-qr",
      title: "Guía definitiva: Cómo compartir tu red WiFi con un código QR sin decir la contraseña",
      description: "Olvídate de dictar claves complicadas a tus visitas. Genera un QR de acceso inalámbrico seguro para tu hogar u oficina.",
      date: "Septiembre 2026",
      readTime: "3 min de lectura"
    },
    {
      slug: "tarjetas-de-presentacion-digitales-vcard",
      title: "Tarjetas de presentación digitales: Qué es una vCard y cómo hacerla en segundos",
      description: "Comparte tu teléfono, correo y sitio web directamente a la agenda de los teléfonos de tus clientes con un solo escaneo.",
      date: "Septiembre 2026",
      readTime: "5 min de lectura"
    }
  ];

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto">
      {/* Encabezado del Blog */}
      <div className="text-center max-w-2xl mx-auto mb-16 select-none cursor-default">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFC] border border-gray-200/85 mb-4 shadow-sm">
          <FileText className="w-4 h-4 text-[#A0BE1B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
            Blog Oficial HelloQR
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1D1D1F]">
          Guías, Consejos y <span className="text-[#A0BE1B]">Estrategias QR</span>
        </h1>
        <p className="text-[#6E6E73] mt-3 text-base">
          Aprende a sacarle el máximo partido a los códigos QR para potenciar la visibilidad y las ventas de tu negocio.
        </p>
      </div>

      {/* Lista de Artículos SEO */}
      <div className="space-y-6">
        {articles.map((art, idx) => (
          <article 
            key={idx}
            className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:border-[#A0BE1B] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-[#6E6E73] font-medium">
                <span>{art.date}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#1D1D1F] tracking-tight">
                {art.title}
              </h2>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {art.description}
              </p>
            </div>

            <Link
              href={`/crear`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1D1D1F] text-white text-xs font-bold hover:bg-black transition-colors shrink-0"
            >
              <span>Probar Herramienta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}
      </div>

      {/* Banner inferior de llamada a la acción */}
      <div className="mt-16 bg-[#FAFAFC] border border-gray-200/80 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-extrabold text-[#1D1D1F]">¿Listo para crear tu propio código QR?</h3>
        <p className="text-xs text-[#6E6E73] max-w-md mx-auto">Personaliza colores, añade tu logotipo y descárgalo de inmediato.</p>
        <Link
          href="/crear"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#A0BE1B] text-[#1D1D1F] text-sm font-bold hover:bg-[#8fa716] transition-colors shadow-sm"
        >
          <QrCode className="w-4 h-4" />
          <span>Ir al Editor Maestro</span>
        </Link>
      </div>
    </div>
  );
}