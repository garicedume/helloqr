"use client";

import Link from "next/link";
import { HelpCircle, Send, ShieldAlert } from "lucide-react";

export default function AyudaPage() {
  return (
    <div className="py-20 px-6 max-w-5xl mx-auto">
      
      {/* Encabezado limpio */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
          ¿Cómo podemos <span className="text-[#A0BE1B]">ayudarte</span>?
        </h1>
        <p className="text-[#6E6E73] mt-4 text-lg">
          Encuentra soluciones inmediatas o repórtanos cualquier inconveniente con tus pagos o descargas.
        </p>
      </div>

      {/* Formulario de Reclamo de Pago */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.04)] mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#A0BE1B]/10 flex items-center justify-center text-[#A0BE1B]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F]">¿Pagaste y no pudiste descargar tu QR?</h2>
        </div>
        <p className="text-sm text-[#6E6E73] mb-8 leading-relaxed">
          Si realizaste tu pago en PayPal pero la ventana se cerró o falló la red antes de descargar, completa este formulario para verificar tu transacción de inmediato y habilitar tus archivos.
        </p>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("¡Solicitud enviada con éxito! Te contactaremos en menos de 24 horas."); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2">Correo asociado a PayPal</label>
              <input type="email" required placeholder="tucorreo@dominio.com" className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2">ID de Transacción PayPal (Opcional)</label>
              <input type="text" placeholder="Ej: 8X382910..." className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/50 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2">Descripción del problema</label>
            <textarea rows={4} required placeholder="Cuéntanos brevemente qué sucedió con tu pago..." className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/50 transition-colors"></textarea>
          </div>
          <button type="submit" className="px-8 py-4 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full hover:bg-black transition-all shadow-md flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>Enviar reporte de soporte</span>
          </button>
        </form>
      </div>

      {/* Sección FAQ */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-bold text-[#1D1D1F] mb-8">Preguntas Frecuentes</h2>
        {[
          {
            q: "¿Los códigos QR generados en HelloQR caducan?",
            a: "No, los códigos QR estáticos estándar funcionan de por vida. Una vez impresos o guardados, nunca expiran porque la información reside directamente en los módulos del código."
          },
          {
            q: "¿Qué formato de archivo debo elegir para imprimir?",
            a: "Para imprenta profesional a gran escala (vallas, pancartas, tarjetas de presentación), te recomendamos encarecidamente utilizar el formato SVG o PDF, ya que son vectoriales y no pierden calidad sin importar cuánto zoom se les aplique."
          },
          {
            q: "¿Por qué se cobra por la personalización y los formatos avanzados?",
            a: "El formato JPG en blanco y negro es completamente gratuito para uso básico. Cobramos un monto único muy accesible por la personalización profunda (colores, marcos, logos) y formatos vectoriales para mantener la plataforma y ofrecer soporte técnico continuo."
          },
          {
            q: "¿Puedo solicitar un reembolso si ya descargué mis archivos?",
            a: "Debido a la naturaleza digital de los archivos entregados de forma instantánea, no se admiten reembolsos una vez que la descarga se ha completado con éxito."
          }
        ].map((faq, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-gray-300 transition-all">
            <h3 className="text-lg font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
              {faq.q}
            </h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed pl-4">{faq.a}</p>
          </div>
        ))}
      </div>

    </div>
  );
}