"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, ExternalLink } from "lucide-react";

export default function RedirectionPage() {
  const params = useParams();
  const code = params.code;
  
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Simulación de registro de analíticas (dispositivo, timestamp, contador de escaneos)
    console.log(`[HelloQR Analytics] Escaneo registrado para el código dinámico: ${code}`);
    console.log(`[HelloQR Analytics] Dispositivo detectado: ${navigator.userAgent}`);

    // Simulamos un breve retraso de redirección para procesar la analítica
    const timer = setTimeout(() => {
      setRedirecting(false);
      // En producción, aquí harías un fetch a tu base de datos para buscar la URL real asociada a este `code`
      // Por ahora redirigimos a una URL de prueba o mostramos el éxito
      window.location.href = "https://helloqr.com"; 
    }, 1500);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] px-6 text-center">
      <div className="bg-white p-8 rounded-3xl border border-gray-200/60 shadow-sm max-w-md w-full flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-[#A0BE1B]/10 flex items-center justify-center text-[#A0BE1B] mb-6">
          {redirecting ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <ExternalLink className="w-8 h-8" />
          )}
        </div>
        <h1 className="text-xl font-bold text-[#1D1D1F] mb-2">Redirigiendo con HelloQR</h1>
        <p className="text-xs text-[#6E6E73] mb-6">
          Procesando analíticas de escaneo para el código ID: <strong className="font-mono text-[#1D1D1F]">{code}</strong>
        </p>
        <div className="w-full bg-[#F5F5F7] p-4 rounded-2xl text-[11px] text-[#6E6E73]">
          💡 <strong>Función Dinámica Activa:</strong> Este enlace puede ser modificado en cualquier momento sin necesidad de reimprimir tu código QR físico.
        </div>
      </div>
    </div>
  );
}