import Link from "next/link";
import AdBanner from "./components/AdBanner";
import { QrCode, ArrowRight, Globe, Smartphone, FileText, Wifi, MessageCircle, MapPin, CheckCircle2, ShieldCheck, Palette, Utensils, ScanLine, Shapes } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1F] select-none">
      
      {/* 1. HERO SECTION DE ALTO IMPACTO (MOCKUP REAL DE MENÚ Y MÓVIL MODERNIZADO) */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA: TITULARES Y CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge superior moderno */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFC] border border-gray-200/85 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
                Rápido <span className="text-gray-300 mx-1">•</span> Fácil <span className="text-gray-300 mx-1">•</span> Sin límites
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#1D1D1F] leading-[1.05]">
              Crea códigos QR únicos, <br className="hidden md:block" />
              <span className="text-[#A0BE1B]">con tu propio estilo.</span>
            </h1>

            <p className="text-base md:text-lg text-[#6E6E73] max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              Diseña códigos QR atractivos con colores, formas, marcos y tu propio logo. Potencia tu marca destacando desde el primer escaneo.
            </p>

            {/* CTA con texto secundario de estilo */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link
                href="/crear"
                className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-[#1D1D1F] rounded-full hover:bg-black hover:scale-[1.02] shadow-[0_12px_35px_rgba(0,0,0,0.2)]"
              >
                <span>Crear mi QR ahora</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#A0BE1B] italic font-serif">
                <span>Tu idea, en un QR</span>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: MOCKUP DE IPHONE MODERNO CON MENÚ DIGITAL REAL */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Resplandor ambiental verde de fondo */}
            <div className="absolute w-[340px] h-[340px] bg-[#A0BE1B]/15 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="relative w-full max-w-sm flex items-center justify-center py-6">
              
              {/* Tarjeta flotante izquierda: Identidad / Logo (Cero estrellas) */}
              <div className="absolute -left-2 md:-left-6 top-1/4 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-[#FAFAFC] flex items-center justify-center border border-gray-100 text-[#1D1D1F]">
                  <QrCode className="w-4 h-4 text-[#A0BE1B]" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#1D1D1F]">Tu marca</p>
                  <p className="text-[10px] text-[#6E6E73]">en el código</p>
                </div>
              </div>

              {/* Tarjeta flotante derecha superior: Colores */}
              <div className="absolute -right-2 md:-right-4 top-12 bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center z-20">
                <div className="w-8 h-8 rounded-xl bg-[#FAFAFC] flex items-center justify-center mx-auto mb-1 text-[#1D1D1F] border border-gray-100">
                  <Palette className="w-4 h-4 text-[#A0BE1B]" />
                </div>
                <p className="text-[11px] font-bold text-[#1D1D1F]">Colores Pro</p>
              </div>

              {/* Tarjeta flotante derecha inferior: Formas */}
              <div className="absolute right-0 md:-right-2 bottom-16 bg-white p-3 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-center z-20">
                <div className="w-8 h-8 rounded-xl bg-[#FAFAFC] flex items-center justify-center mx-auto mb-1 text-[#1D1D1F] border border-gray-100">
                  <Shapes className="w-4 h-4 text-[#A0BE1B]" />
                </div>
                <p className="text-[11px] font-bold text-[#1D1D1F]">Marcos</p>
              </div>

              {/* Silueta de Celular Moderna Estilo iPhone con Pantalla de Menú Digital */}
              <div className="w-[280px] h-[520px] bg-[#0A0A0C] rounded-[3rem] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-gray-700/80 relative z-10 flex flex-col items-center rotate-[3deg]">
                
                {/* Isla Dinámica / Notch de iPhone */}
                <div className="absolute top-4 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-800" />
                </div>

                {/* Pantalla QR: el producto es el protagonista */}
                <div className="w-full h-full bg-white rounded-[2.5rem] pt-12 pb-6 px-5 flex flex-col items-center justify-between relative overflow-hidden border border-gray-200">
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#A0BE1B]/20 blur-2xl" />
                  <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#A0BE1B]/10 blur-2xl" />

                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F7E9] border border-[#A0BE1B]/20 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A0BE1B]" />
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#1D1D1F]">HelloQR</span>
                    </div>
                    <p className="text-sm font-bold text-[#1D1D1F]">Escanéame</p>
                  </div>

                  <div className="relative z-10 w-[205px] h-[205px] bg-white rounded-[2rem] border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.08)] flex items-center justify-center p-4">
                    <div className="absolute inset-3 rounded-[1.4rem] border-[3px] border-[#A0BE1B]/80 pointer-events-none" />
                    <QrCode className="w-full h-full text-[#1D1D1F]" strokeWidth={1.8} />
                    <div className="absolute w-11 h-11 rounded-xl bg-[#A0BE1B] border-4 border-white shadow-md flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="w-7 h-px bg-[#A0BE1B]" />
                      <span className="text-[10px] font-semibold text-[#6E6E73]">Tu marca. Tu estilo.</span>
                      <span className="w-7 h-px bg-[#A0BE1B]" />
                    </div>
                    <div className="bg-[#1D1D1F] text-white text-center py-3 rounded-xl text-[10px] font-bold tracking-wider uppercase">
                      Escanear QR
                    </div>
                  </div>
                </div>              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. TARJETAS DE ESTILOS INFERIORES CON ICONOS VARIADOS Y ÚNICOS */}
      <section className="pb-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "Estándar", desc: "Clásico y simple", icon: QrCode },
            { title: "Redondeado", desc: "Suave y moderno", icon: Shapes },
            { title: "Con Logotipo", desc: "Identidad de marca", icon: QrCode },
            { title: "Art / Orgánico", desc: "Estilo vanguardista", icon: ScanLine },
            { title: "Gradientes", desc: "Efecto premium", icon: Palette },
          ].map((item, index) => {
            const IconComp = item.icon;
            return (
              <div key={index} className="bg-[#FAFAFC] p-6 rounded-[2rem] border border-gray-200/70 shadow-xs flex flex-col items-center text-center hover:border-[#A0BE1B] hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 border border-gray-100 shadow-inner text-[#1D1D1F]">
                  <IconComp className="w-7 h-7 text-[#1D1D1F]" />
                </div>
                <span className="font-bold text-sm text-[#1D1D1F]">{item.title}</span>
                <span className="text-[11px] text-[#6E6E73] mt-0.5">{item.desc}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* BANNER #1 */}
      <div className="max-w-7xl mx-auto px-6 w-full my-4">
        <AdBanner type="top" />
      </div>

      {/* 3. SECCIÓN: IMPORTANCIA DEL QR */}
      <section className="py-24 px-6 bg-[#FAFAFC] border-y border-gray-200/60 w-full">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
              ¿Por qué destacar con un diseño profesional?
            </h2>
            <p className="text-[#6E6E73] text-sm md:text-base leading-relaxed">
              Los códigos en blanco y negro tradicionales pasan desapercibidos. Personalizar tus códigos con colores corporativos, marcos y tu logotipo incrementa de forma directa la confianza y las interacciones de tus clientes.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm font-medium text-[#1D1D1F]">
                <CheckCircle2 className="w-5 h-5 text-[#A0BE1B]" /> Mayor tasa de escaneo e identificación de marca
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-[#1D1D1F]">
                <CheckCircle2 className="w-5 h-5 text-[#A0BE1B]" /> Formatos vectoriales de alta resolución para imprenta
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-[#1D1D1F]">
                <CheckCircle2 className="w-5 h-5 text-[#A0BE1B]" /> Compatible con más de 19 tipos de contenido diferentes
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between h-56">
              <ShieldCheck className="w-10 h-10 text-[#A0BE1B]" />
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-base">Calidad Garantizada</h3>
                <p className="text-xs text-[#6E6E73] mt-1">Archivos listos para uso comercial y digital.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between h-56 mt-8">
              <QrCode className="w-10 h-10 text-[#A0BE1B]" />
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-base">Diseño a Medida</h3>
                <p className="text-xs text-[#6E6E73] mt-1">Control total sobre formas, colores y logotipos.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BANNER #2 */}
      <div className="max-w-7xl mx-auto px-6 w-full my-4">
        <AdBanner type="middle" />
      </div>

      {/* 4. SECCIÓN FORMATOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">Todo lo que puedes convertir en QR</h2>
          <p className="text-[#6E6E73] mt-3 text-sm md:text-base">Selecciona el tipo de destino que necesites para tu negocio o proyecto.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "URL / Link", icon: Globe },
            { name: "WhatsApp", icon: MessageCircle },
            { name: "WiFi", icon: Wifi },
            { name: "vCard Contacto", icon: Smartphone },
            { name: "PDF / Archivo", icon: FileText },
            { name: "Ubicación Mapa", icon: MapPin },
          ].map((format, idx) => {
            const IconComponent = format.icon;
            return (
              <Link
                key={idx}
                href="/crear"
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col items-center text-center hover:border-[#A0BE1B] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#A0BE1B] group-hover:text-white transition-colors mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#1D1D1F]">{format.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BANNER #3 */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-16">
        <AdBanner type="bottom" />
      </div>

    </div>
  );
}