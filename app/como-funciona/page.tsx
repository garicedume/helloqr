import Link from "next/link";
import { ArrowRight, CreditCard, QrCode, Sliders, ShieldCheck, Layers } from "lucide-react";

export default function ComoFuncionaPage() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      
      {/* Encabezado limpio sin bordes molestos */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
          ¿Cómo funciona <span className="text-[#A0BE1B]">HelloQR</span>?
        </h1>
        <p className="text-[#6E6E73] mt-4 text-lg">
          Un proceso ágil, transparente y diseñado bajo la filosofía minimalista de Apple para que destaques al instante.
        </p>
      </div>

      {/* Tarjetas de Pasos (Cero estrellitas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {[
          {
            num: "01",
            title: "Selecciona el tipo de contenido",
            desc: "Elige entre más de 19 opciones: URLs web, PDFs, tarjetas vCard profesionales, accesos WiFi, redes sociales o WhatsApp.",
            icon: QrCode
          },
          {
            num: "02",
            title: "Personaliza tu diseño exclusivo",
            desc: "Modifica colores, formas de puntos, añade un marco con llamadas a la acción ('Escanéame') e inserta el logo de tu empresa.",
            icon: Sliders
          },
          {
            num: "03",
            title: "Modelo Freemium inteligente",
            desc: "El QR básico en blanco y negro (JPG) es 100% gratis. Cualquier personalización o formato avanzado (PNG, SVG, PDF) requiere pago.",
            icon: Layers
          },
          {
            num: "04",
            title: "Pago seguro y descarga inmediata",
            desc: "Procesa tu pago de forma cifrada mediante PayPal (tarjeta o cuenta) y descarga tus archivos listos para imprenta o web.",
            icon: ShieldCheck
          }
        ].map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-[#A0BE1B]">{step.num}</span>
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{step.title}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabla de Precios Estilizada */}
      <div className="bg-white rounded-3xl border border-gray-200/60 p-8 md:p-12 shadow-sm mb-20">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">Tabla de Precios y Lógica de Cobro</h2>
          <p className="text-[#6E6E73] text-sm mt-2">Transparencia absoluta: pagas una sola vez por descarga cuando personalizas.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-[#6E6E73]">
                <th className="py-4 px-4">Característica</th>
                <th className="py-4 px-4 text-center">Versión Gratis</th>
                <th className="py-4 px-4 text-center">Versión Personalizada</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4 font-medium text-[#1D1D1F]">Código QR estándar (Blanco y negro)</td>
                <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Gratis</td>
                <td className="py-4 px-4 text-center text-gray-400">—</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-[#1D1D1F]">Formato de exportación JPG básico</td>
                <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Gratis</td>
                <td className="py-4 px-4 text-center">✓ Incluido</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-[#1D1D1F]">Colores personalizados, degradados y formas</td>
                <td className="py-4 px-4 text-center text-gray-400">✕</td>
                <td className="py-4 px-4 text-center text-[#A0BE1B] font-semibold">✓ Desbloquea pago</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-[#1D1D1F]">Inserción de logo y marcos con texto</td>
                <td className="py-4 px-4 text-center text-gray-400">✕</td>
                <td className="py-4 px-4 text-center text-[#A0BE1B] font-semibold">✓ Desbloquea pago</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-[#1D1D1F]">Formatos profesionales (PNG transparente, SVG, PDF)</td>
                <td className="py-4 px-4 text-center text-gray-400">✕</td>
                <td className="py-4 px-4 text-center text-[#A0BE1B] font-semibold">✓ Desbloquea pago</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center gap-4 bg-[#F5F5F7] p-5 rounded-2xl text-xs text-[#6E6E73] border border-gray-200/40">
          <CreditCard className="w-6 h-6 text-[#1D1D1F] shrink-0" />
          <span>Pagos 100% seguros procesados a través de la pasarela oficial de PayPal. Aceptamos tarjetas de crédito, débito y saldo de PayPal sin almacenar información financiera en nuestros servidores.</span>
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center">
        <Link
          href="/crear"
          className="inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white bg-[#1D1D1F] rounded-full hover:bg-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_35px_rgba(160,190,27,0.6)]"
        >
          <span>Crear mi QR personalizado ahora</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}