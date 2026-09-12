"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wifi, ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import QRCodeCanvas from "../../components/QRCodeCanvas";

export default function CrearWifiPage() {
  const [ssid, setSsid] = useState("");
  const [pass, setPass] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [isGenerated, setIsGenerated] = useState(false);

  const wifiPayload = `WIFI:S:${ssid};T:${encryption};P:${pass};;`;

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      {/* Encabezado SEO optimizado */}
      <div className="text-center max-w-3xl mx-auto mb-14 select-none cursor-default">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFC] border border-gray-200/85 mb-4 shadow-sm">
          <Wifi className="w-4 h-4 text-[#A0BE1B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
            Generador Especializado para Redes Inalámbricas
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1D1D1F]">
          Crea un Código QR para tu <span className="text-[#A0BE1B]">Red WiFi</span> al Instante
        </h1>
        <p className="text-[#6E6E73] mt-3 text-base">
          Permite que tus clientes, visitas o familiares se conecten a tu red de forma automática con solo escanear con la cámara de su celular. Sin escribir contraseñas largas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Formulario de Configuración WiFi */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
            Configuración de la Red
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Nombre de la Red (SSID)</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                placeholder="Ej: Mi_Cafeteria_Invitados"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Contraseña de la Red</label>
              <input
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Ej: claveSegura123"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Tipo de Encriptación</label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="w-full px-3.5 py-3.5 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
              >
                <option value="WPA">WPA / WPA2 (Recomendado)</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sin contraseña (Abierta)</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsGenerated(true)}
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#A0BE1B] text-[#1D1D1F] hover:bg-[#8fa716]"
          >
            <span>Generar QR de WiFi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Panel de Vista Previa */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md sticky top-28 flex flex-col items-center text-center">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left">
            Vista Previa de Conexión
          </h2>

          <div className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-gray-50/70 rounded-3xl border border-gray-200/80 min-h-64">
            {isGenerated && ssid ? (
              <QRCodeCanvas 
                value={wifiPayload}
                qrColor="#1D1D1F"
                bgColor="#FFFFFF"
                dotStyle="square"
                hasLogo={false}
                selectedFormat="jpg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 bg-gray-200/70 rounded-full flex items-center justify-center text-[#6E6E73]">
                  <Wifi className="w-6 h-6 text-[#A0BE1B]" />
                </div>
                <p className="text-xs font-bold text-[#1D1D1F]">Introduce los datos de tu red</p>
                <p className="text-[11px] text-[#6E6E73]">Rellena los campos y haz clic en generar para obtener tu código QR de acceso rápido.</p>
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
            <span>Conexión segura y directa al dispositivo</span>
          </div>
        </div>
      </div>
    </div>
  );
}