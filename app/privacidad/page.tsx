export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F]">Política de Privacidad</h1>
        <p className="text-sm text-[#6E6E73] mt-2">Última actualización: Septiembre de 2026</p>
      </div>

      <div className="space-y-6 text-sm text-[#6E6E73] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">1. Recopilación de Información</h2>
          <p>
            En HelloQR valoramos tu privacidad. Recopilamos información básica necesaria para procesar tus consultas y la gestión de pagos digitales a través de plataformas seguras como Paddle. No almacenamos datos sensibles de tarjetas de crédito o métodos de pago.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">2. Uso de los Datos</h2>
          <p>
            La información recopilada se utiliza exclusivamente para facilitar la creación de tus códigos QR, mejorar la experiencia de usuario y gestionar el soporte técnico ante cualquier incidencia con tus descargas o licencias.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">3. Protección de la Información</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra acceso no autorizado, alteración o divulgación indebida.
          </p>
        </section>
      </div>
    </div>
  );
}