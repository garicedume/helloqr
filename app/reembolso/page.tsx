export default function ReembolsoPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F]">Política de Reembolso</h1>
        <p className="text-sm text-[#6E6E73] mt-2">Última actualización: Septiembre de 2026</p>
      </div>

      <div className="space-y-6 text-sm text-[#6E6E73] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">1. Naturaleza de los Bienes Digitales</h2>
          <p>
            Debido a que HelloQR proporciona archivos digitales de descarga inmediata (formatos PNG, SVG, PDF de alta resolución), todas las ventas correspondientes a diseños personalizados son definitivas.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">2. Excepciones para Reembolsos</h2>
          <p>
            Se evaluarán solicitudes de reembolso únicamente bajo circunstancias excepcionales, tales como:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Errores técnicos comprobables en la plataforma que impidieron la descarga del archivo adquirido.</li>
            <li>Cargos duplicados procesados por error a través de la pasarela de pagos de PayPal.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">3. Plazo de Solicitud</h2>
          <p>
            Cualquier reclamo o solicitud de revisión de pago deberá realizarse dentro de un plazo máximo de 48 horas posteriores a la transacción, contactando directamente a nuestro soporte técnico con los detalles de la orden de PayPal.
          </p>
        </section>
      </div>
    </div>
  );
}