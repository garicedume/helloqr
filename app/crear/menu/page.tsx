"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Utensils, ArrowRight, ShieldCheck, QrCode, Upload } from "lucide-react";
import QRCodeCanvas from "../../components/QRCodeCanvas";

export default function CrearMenuPage() {
  const [menuName, setMenuName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 3) {
      setFileUploadError("El menú en PDF no debe superar los 3 MB.");
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'pdf') {
      setFileUploadError("Por favor, sube un archivo en formato PDF.");
      return;
    }

    setFileUploadError(null);
    setUploadedFile({
      name: file.name,
      size: `${fileSizeMB.toFixed(2)} MB`
    });
  };

  const menuPayload = uploadedFile 
    ? `https://supabase.helloqr.com/storage/v1/object/public/uploads/menus/${uploadedFile.name}`
    : "https://helloqr.com/menu-ejemplo";

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      {/* Encabezado SEO optimizado */}
      <div className="text-center max-w-3xl mx-auto mb-14 select-none cursor-default">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFC] border border-gray-200/85 mb-4 shadow-sm">
          <Utensils className="w-4 h-4 text-[#A0BE1B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
            Menú Digital para Restaurantes y Cafés
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1D1D1F]">
          Crea un Código QR para el <span className="text-[#A0BE1B]">Menú de tu Negocio</span>
        </h1>
        <p className="text-[#6E6E73] mt-3 text-base">
          Digitaliza la carta de tu restaurante, bar o cafetería. Sube tu menú en PDF y permite que tus comensales lo consulten directamente en sus celulares al escanear la mesa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Formulario Menú */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
            Detalles del Establecimiento
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Nombre del Restaurante</label>
              <input
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="Ej: Restaurante El Sabor Latino"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#1D1D1F]">Sube tu Menú en PDF (Máx. 3 MB)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="w-8 h-8 text-[#A0BE1B]" />
                  <p className="text-xs font-bold text-[#1D1D1F]">
                    {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu archivo PDF aquí"}
                  </p>
                  <span className="text-[10px] text-[#6E6E73]">Optimizado para carga rápida en mesas</span>
                </div>
              </div>
              {fileUploadError && <p className="text-xs text-red-500 font-medium">{fileUploadError}</p>}
            </div>
          </div>

          <button
            onClick={() => setIsGenerated(true)}
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#A0BE1B] text-[#1D1D1F] hover:bg-[#8fa716]"
          >
            <span>Generar QR de Menú Digital</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Panel de Vista Previa */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md sticky top-28 flex flex-col items-center text-center">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left">
            Vista Previa del Menú
          </h2>

          <div className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-gray-50/70 rounded-3xl border border-gray-200/80 min-h-64">
            {isGenerated && menuName ? (
              <QRCodeCanvas 
                value={menuPayload}
                qrColor="#1D1D1F"
                bgColor="#FFFFFF"
                dotStyle="square"
                hasLogo={false}
                selectedFormat="jpg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 bg-gray-200/70 rounded-full flex items-center justify-center text-[#6E6E73]">
                  <Utensils className="w-6 h-6 text-[#A0BE1B]" />
                </div>
                <p className="text-xs font-bold text-[#1D1D1F]">Configura tu menú digital</p>
                <p className="text-[11px] text-[#6E6E73]">Indica el nombre de tu local y adjunta tu archivo para renderizar el código QR.</p>
              </div>
            )}
          </div>

          <Link
            href="/crear"
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#1D1D1F] text-white hover:bg-black"
          >
            <QrCode className="w-4 h-4" />
            <span>Ir al Editor Maestro Completo</span>
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#6E6E73]">
            <ShieldCheck className="w-4 h-4 text-[#A0BE1B]" />
            <span>Ideal para impresión en acrílicos y calcomanías de mesa</span>
          </div>
        </div>
      </div>
    </div>
  );
}