export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1F]">Términos y Condiciones</h1>
        <p className="text-sm text-[#6E6E73] mt-2">Última actualización: Septiembre de 2026</p>
      </div>

      <div className="space-y-6 text-sm text-[#6E6E73] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">1. Introducción</h2>
          <p>
            Bienvenido a HelloQR. Al acceder y utilizar nuestra plataforma para la generación y personalización de códigos QR, aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">2. Uso del Servicio</h2>
          <p>
            HelloQR ofrece herramientas de creación tanto gratuitas (formatos estándar en JPG sin marco) como de pago (formatos avanzados, personalización de colores, logotipos y marcos decorativos). El usuario se compromete a no utilizar el servicio para fines ilícitos o fraudulentos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">3. Propiedad Intelectual y Enlaces</h2>
          <p>
            Los códigos QR generados apuntan directamente a la información o enlaces provistos por el usuario. HelloQR no se hace responsable por el contenido de los sitios web de destino configurados por los usuarios en sus códigos QR.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#1D1D1F]">4. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}