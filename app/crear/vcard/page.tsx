"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Smartphone, ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import QRCodeCanvas from "../../components/QRCodeCanvas";

export default function CrearVCardPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const vCardPayload = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\nORG:${company}\nTEL:${phone}\nEMAIL:${email}\nURL:${website}\nEND:VCARD`;

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      {/* Encabezado SEO optimizado */}
      <div className="text-center max-w-3xl mx-auto mb-14 select-none cursor-default">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFC] border border-gray-200/85 mb-4 shadow-sm">
          <Smartphone className="w-4 h-4 text-[#A0BE1B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
            Tarjetas de Presentación Digitales
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1D1D1F]">
          Crea un Código QR para tu <span className="text-[#A0BE1B]">vCard / Contacto</span>
        </h1>
        <p className="text-[#6E6E73] mt-3 text-base">
          Comparte tu información profesional al instante. Al escanear el código, tus clientes podrán guardar tu teléfono, correo y empresa directamente en la agenda de su teléfono con un solo clic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Formulario vCard */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
            Información de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Juan"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Apellido</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Pérez"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Teléfono Móvil</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+18095551234"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@empresa.com"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Empresa u Organización</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Mi Empresa SRL"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Sitio Web Personal o Corporativo</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://miempresa.com"
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
              />
            </div>
          </div>

          <button
            onClick={() => setIsGenerated(true)}
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#A0BE1B] text-[#1D1D1F] hover:bg-[#8fa716]"
          >
            <span>Generar vCard QR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Panel de Vista Previa */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-md sticky top-28 flex flex-col items-center text-center">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left">
            Vista Previa de Contacto
          </h2>

          <div className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-gray-50/70 rounded-3xl border border-gray-200/80 min-h-64">
            {isGenerated && firstName ? (
              <QRCodeCanvas 
                value={vCardPayload}
                qrColor="#1D1D1F"
                bgColor="#FFFFFF"
                dotStyle="square"
                hasLogo={false}
                selectedFormat="jpg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 bg-gray-200/70 rounded-full flex items-center justify-center text-[#6E6E73]">
                  <Smartphone className="w-6 h-6 text-[#A0BE1B]" />
                </div>
                <p className="text-xs font-bold text-[#1D1D1F]">Introduce tus datos de contacto</p>
                <p className="text-[11px] text-[#6E6E73]">Rellena al menos tu nombre y haz clic en generar para obtener tu código QR profesional.</p>
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
            <span>Compatible con iOS, Android y lectores de agenda</span>
          </div>
        </div>
      </div>
    </div>
  );
}