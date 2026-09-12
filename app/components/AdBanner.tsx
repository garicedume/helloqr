"use client";

import React from "react";

interface AdBannerProps {
  type: "top" | "middle" | "bottom";
  className?: string;
}

export default function AdBanner({ type, className = "" }: AdBannerProps) {
  const configs = {
    top: {
      src: "/ads/banner-top.gif",
      label: "Espacio Publicitario Destacado",
      fileHint: "banner-top.gif"
    },
    middle: {
      src: "/ads/banner-middle.gif",
      label: "Espacio Publicitario Patrocinado",
      fileHint: "banner-middle.gif"
    },
    bottom: {
      src: "/ads/banner-bottom.gif",
      label: "Espacio Publicitario Inferior",
      fileHint: "banner-bottom.gif"
    },
  };

  const config = configs[type];

  return (
    <div className={`my-12 flex justify-center items-center w-full ${className}`}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-3 md:p-5 flex flex-col items-center justify-center transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] w-full">
        
        {/* Contenedor adaptado de forma fluida para que la imagen cubra todo el espacio sin bordes grises */}
        <div className="relative w-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
          
          <img
            src={config.src}
            alt={config.label}
            className="w-full h-auto block transition-transform duration-500 hover:scale-[1.01]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback) (fallback as HTMLElement).style.display = 'flex';
            }}
          />

          {/* Fallback profesional si el banner no ha sido subido todavía */}
          <div className="absolute inset-0 hidden flex-col items-center justify-center p-6 text-center bg-[#F5F5F7]">
            <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#1D1D1F] mb-1.5">
              {config.label} — Formato Panorámico Pro
            </span>
            <p className="text-xs text-[#6E6E73] font-normal max-w-md">
              Sube tu anuncio (Recomendado 1920x440 px) a la carpeta <code className="bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-[#1D1D1F] font-mono shadow-sm">/public/ads/</code> con el nombre: <strong className="text-[#A0BE1B] font-mono">{config.fileHint}</strong>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}