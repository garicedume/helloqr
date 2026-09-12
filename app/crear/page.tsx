"use client";

import React, { useState } from "react";
import { 
  Download, ShieldCheck, Globe, Wifi, MessageCircle, 
  Smartphone, FileText, Image as ImageIcon, Play, Type, 
  Video, Camera, Share2, Send, MapPin, Headphones, Mail, Calendar, Phone, Presentation, Link2, AlertCircle, Lock
} from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import QRCodeCanvas from "../components/QRCodeCanvas";
import LogoColorExtractor from "../components/LogoColorExtractor";
import { COUNTRIES, checkEmailTypo } from "../utils/helpers";

export default function CrearQRPage() {
  const [contentType, setContentType] = useState("url");
  
  const [urlInput, setUrlInput] = useState("https://helloqr.com");
  const [textInput, setTextInput] = useState("Hola mundo");
  
  const [waCountryCode, setWaCountryCode] = useState("+1");
  const [waPhone, setWaPhone] = useState("");
  const [waMessage, setWaMessage] = useState("");

  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");

  const [vCardData, setVCardData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+1",
    phone: "",
    email: "",
    company: "",
    website: ""
  });
  const [vCardEmailWarning, setVCardEmailWarning] = useState<string | null>(null);

  const [emailTo, setEmailTo] = useState("");
  const [emailEmailWarning, setEmailEmailWarning] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [phoneNum, setPhoneNum] = useState("");

  const [qrColor, setQrColor] = useState("#1D1D1F");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [dotStyle, setDotStyle] = useState("square");
  const [hasLogo, setHasLogo] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState("square");
  const [frameTemplate, setFrameTemplate] = useState("none");
  const [frameText, setFrameText] = useState("¡Escanéame!");
  const [frameColor, setFrameColor] = useState("#1D1D1F");
  const [selectedFormat, setSelectedFormat] = useState("jpg");

  // Estado para abrir la ventana/modal de cobro al intentar descargar algo personalizado
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isCustomized = 
    qrColor !== "#1D1D1F" || 
    bgColor !== "#FFFFFF" || 
    dotStyle !== "square" || 
    hasLogo || 
    frameTemplate !== "none" ||
    selectedFormat !== "jpg";

  const handleEmailChange = (val: string, type: 'email' | 'vcard') => {
    if (type === 'email') {
      setEmailTo(val);
      const suggestion = checkEmailTypo(val);
      setEmailEmailWarning(suggestion);
    } else {
      setVCardData({...vCardData, email: val});
      const suggestion = checkEmailTypo(val);
      setVCardEmailWarning(suggestion);
    }
  };

  const getQrPayload = () => {
    switch (contentType) {
      case "whatsapp":
        const cleanWaPhone = waPhone.replace(/\D/g, '');
        const fullWaNum = waCountryCode.replace('+', '') + cleanWaPhone;
        return `https://wa.me/${fullWaNum}?text=${encodeURIComponent(waMessage)}`;
      case "wifi":
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPass};;`;
      case "vcard":
        const cleanVCardPhone = vCardData.phone.replace(/\D/g, '');
        const fullVCardPhone = vCardData.countryCode.replace('+', '') + cleanVCardPhone;
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vCardData.lastName};${vCardData.firstName}\nFN:${vCardData.firstName} ${vCardData.lastName}\nORG:${vCardData.company}\nTEL:${fullVCardPhone}\nEMAIL:${vCardData.email}\nURL:${vCardData.website}\nEND:VCARD`;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "phone":
        const cleanPhone = phoneNum.replace(/\D/g, '');
        const fullPhoneNum = phoneCountryCode.replace('+', '') + cleanPhone;
        return `tel:+${fullPhoneNum}`;
      case "text":
        return textInput;
      default:
        return urlInput;
    }
  };

  const contentTypesList = [
    { id: "url", name: "URL / Link", icon: Globe },
    { id: "pdf", name: "PDF", icon: FileText },
    { id: "image", name: "Imagen", icon: ImageIcon },
    { id: "app", name: "Play / App Store", icon: Play },
    { id: "text", name: "Texto plano", icon: Type },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
    { id: "youtube", name: "YouTube", icon: Video },
    { id: "instagram", name: "Instagram", icon: Camera },
    { id: "facebook", name: "Facebook", icon: Share2 },
    { id: "telegram", name: "Telegram", icon: Send },
    { id: "vcard", name: "vCard Contacto", icon: Smartphone },
    { id: "map", name: "Ubicación Mapa", icon: MapPin },
    { id: "wifi", name: "Red WiFi", icon: Wifi },
    { id: "audio", name: "Audio MP3", icon: Headphones },
    { id: "email", name: "E-mail", icon: Mail },
    { id: "booking", name: "Booking / Reservas", icon: Calendar },
    { id: "phone", name: "Llamada Teléfono", icon: Phone },
    { id: "pptx", name: "PowerPoint PPTX", icon: Presentation },
    { id: "dynamic", name: "URL Dinámica", icon: Link2 },
  ];

  const handleDownloadAction = () => {
    if (!isCustomized) {
      alert("¡Descargando tu código QR básico en formato JPG de forma gratuita!");
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      {/* TÍTULO BLINDADO CONTRA SELECCIÓN */}
      <div className="text-center max-w-2xl mx-auto mb-14 select-none cursor-default">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
          Editor Maestro <span className="text-[#A0BE1B]">HelloQR</span>
        </h1>
        <p className="text-[#6E6E73] mt-3 text-sm md:text-base">
          Personaliza tu código libremente. El formato JPG estándar sin marco es totalmente gratis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* PANEL IZQUIERDO */}
        <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <div className="select-none cursor-default">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
              1. Selecciona el tipo de contenido ({contentTypesList.length} opciones)
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-2">
              {contentTypesList.map((type) => {
                const Icon = type.icon;
                const active = contentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                      active 
                        ? "border-[#A0BE1B] bg-[#A0BE1B]/10 text-[#1D1D1F] font-bold shadow-sm" 
                        : "border-gray-200/80 hover:border-gray-300 text-[#6E6E73] bg-[#F5F5F7]/40"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-[#A0BE1B]" : "text-[#1D1D1F]"}`} />
                    <span className="text-[11px] text-center leading-tight">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] select-none cursor-default">
              Configuración para: <span className="text-[#A0BE1B] uppercase">{contentType}</span>
            </h2>

            {["url", "pdf", "image", "app", "youtube", "instagram", "facebook", "telegram", "map", "audio", "booking", "pptx", "dynamic"].includes(contentType) && (
              <div>
                <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Enlace o URL de destino</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://tu-sitio.com"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                />
              </div>
            )}

            {contentType === "text" && (
              <div>
                <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Mensaje o texto plano</label>
                <textarea
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                />
              </div>
            )}

            {contentType === "whatsapp" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Número de WhatsApp</label>
                  <div className="grid grid-cols-12 gap-2">
                    <select
                      value={waCountryCode}
                      onChange={(e) => setWaCountryCode(e.target.value)}
                      className="col-span-5 px-3 py-3.5 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                    >
                      {COUNTRIES.map((c, idx) => (
                        <option key={idx} value={c.dial_code}>
                          {c.name} ({c.dial_code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      placeholder="8095551234"
                      className="col-span-7 px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Mensaje predefinido (Opcional)</label>
                  <input
                    type="text"
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    placeholder="Hola, quiero más información..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
              </div>
            )}

            {contentType === "wifi" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Nombre de la red (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="MiRedWiFi"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Contraseña</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="ContraseñaDeRed"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Tipo de Encriptación</label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Sin contraseña</option>
                  </select>
                </div>
              </div>
            )}

            {contentType === "vcard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 select-none">
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Nombre</label>
                  <input
                    type="text"
                    value={vCardData.firstName}
                    onChange={(e) => setVCardData({...vCardData, firstName: e.target.value})}
                    placeholder="Juan"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Apellido</label>
                  <input
                    type="text"
                    value={vCardData.lastName}
                    onChange={(e) => setVCardData({...vCardData, lastName: e.target.value})}
                    placeholder="Pérez"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Teléfono</label>
                  <div className="grid grid-cols-12 gap-2">
                    <select
                      value={vCardData.countryCode}
                      onChange={(e) => setVCardData({...vCardData, countryCode: e.target.value})}
                      className="col-span-5 px-2 py-3 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                    >
                      {COUNTRIES.map((c, idx) => (
                        <option key={idx} value={c.dial_code}>
                          {c.name} ({c.dial_code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={vCardData.phone}
                      onChange={(e) => setVCardData({...vCardData, phone: e.target.value})}
                      placeholder="8095551234"
                      className="col-span-7 px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Correo Electrónico</label>
                  <input
                    type="email"
                    value={vCardData.email}
                    onChange={(e) => handleEmailChange(e.target.value, 'vcard')}
                    placeholder="juan@correo.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                  />
                  {vCardEmailWarning && (
                    <div className="mt-2 flex items-center justify-between bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs text-amber-800">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        ¿Quisiste decir <strong className="font-mono">{vCardEmailWarning}</strong>?
                      </span>
                      <button 
                        onClick={() => {
                          setVCardData({...vCardData, email: vCardEmailWarning});
                          setVCardEmailWarning(null);
                        }}
                        className="underline font-bold text-[#1D1D1F] hover:text-[#A0BE1B]"
                      >
                        Corregir
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Empresa</label>
                  <input
                    type="text"
                    value={vCardData.company}
                    onChange={(e) => setVCardData({...vCardData, company: e.target.value})}
                    placeholder="Mi Empresa SRL"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 cursor-default">Sitio Web</label>
                  <input
                    type="text"
                    value={vCardData.website}
                    onChange={(e) => setVCardData({...vCardData, website: e.target.value})}
                    placeholder="https://miempresa.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                  />
                </div>
              </div>
            )}

            {contentType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Correo destinatario</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => handleEmailChange(e.target.value, 'email')}
                    placeholder="contacto@dominio.com"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                  {emailEmailWarning && (
                    <div className="mt-2 flex items-center justify-between bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs text-amber-800">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        ¿Quisiste decir <strong className="font-mono">{emailEmailWarning}</strong>?
                      </span>
                      <button 
                        onClick={() => {
                          setEmailTo(emailEmailWarning);
                          setEmailEmailWarning(null);
                        }}
                        className="underline font-bold text-[#1D1D1F] hover:text-[#A0BE1B]"
                      >
                        Corregir
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Asunto</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Asunto del mensaje..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Cuerpo del mensaje</label>
                  <textarea
                    rows={2}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Escribe tu correo..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
              </div>
            )}

            {contentType === "phone" && (
              <div>
                <label className="block text-xs font-medium text-[#6E6E73] mb-1.5 select-none cursor-default">Número de teléfono</label>
                <div className="grid grid-cols-12 gap-2">
                  <select
                    value={phoneCountryCode}
                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                    className="col-span-5 px-3 py-3.5 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                  >
                    {COUNTRIES.map((c, idx) => (
                      <option key={idx} value={c.dial_code}>
                        {c.name} ({c.dial_code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="8095551234"
                    className="col-span-7 px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. PERSONALIZACIÓN VISUAL */}
          <div className="pt-6 border-t border-gray-100 space-y-5 select-none cursor-default">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
              2. Personalización Visual
            </h2>
            
            <LogoColorExtractor 
              onColorExtracted={(color) => setQrColor(color)}
              onLogoUploaded={(url) => {
                setLogoImage(url);
                setHasLogo(true);
              }}
              logoShape={logoShape}
              onLogoShapeChange={(shape) => setLogoShape(shape)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#6E6E73] mb-1.5">Color del QR</label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-11 h-11 rounded-2xl border border-gray-200 cursor-pointer p-1 bg-white shadow-sm"
                  />
                  <span className="text-xs font-mono font-bold text-[#1D1D1F] select-auto">{qrColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#6E6E73] mb-1.5">Forma de Puntos</label>
                <select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl border border-gray-200 text-xs bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                >
                  <option value="square">Cuadrado clásico</option>
                  <option value="dots">Puntos redondeados</option>
                  <option value="classy">Estilo orgánico / Art</option>
                </select>
              </div>
            </div>

            {/* MARCOS */}
            <div className="space-y-3.5 pt-3 border-t border-gray-100">
              <label className="block text-xs font-bold text-[#1D1D1F]">Plantilla de Marco Decorativo</label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "none", label: "Sin Marco" },
                  { id: "classic", label: "Clásico" },
                  { id: "modern", label: "Moderno" },
                  { id: "pill", label: "Cápsula" },
                  { id: "badge", label: "Insignia" },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setFrameTemplate(tpl.id)}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all ${
                      frameTemplate === tpl.id
                        ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-md"
                        : "border-gray-200 bg-white text-[#6E6E73] hover:border-gray-300"
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>

              {frameTemplate !== "none" && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-[#6E6E73] mb-1.5">Texto del Marco</label>
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="Ej: ¡Escanéame!"
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-[#F5F5F7]/40 select-auto"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6E6E73] mb-1.5">Color del Marco</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={frameColor}
                        onChange={(e) => setFrameColor(e.target.value)}
                        className="w-10 h-10 rounded-2xl border border-gray-200 cursor-pointer p-1 bg-white shadow-sm"
                      />
                      <span className="text-xs font-mono font-bold text-[#1D1D1F] select-auto">{frameColor}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. FORMATO DE EXPORTACIÓN */}
          <div className="pt-6 border-t border-gray-100 select-none cursor-default">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-4">
              3. Formato de Exportación
            </h2>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: "jpg", label: "JPG (Gratis)" },
                { id: "png", label: "PNG" },
                { id: "svg", label: "SVG" },
                { id: "pdf", label: "PDF" },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`py-3 rounded-2xl border text-xs font-bold uppercase transition-all ${
                    selectedFormat === fmt.id
                      ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-md"
                      : "border-gray-200 text-[#6E6E73] hover:border-gray-300 bg-white"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: VISTA PREVIA Y BOTÓN DESCARGAR LIMPIO */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.03)] sticky top-28 flex flex-col items-center text-center">
          
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left select-none cursor-default">
            Vista Previa en Vivo
          </h2>

          <div className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-[#F5F5F7]/40 rounded-[2rem] border border-gray-200/60">
            <QRCodeCanvas 
              value={getQrPayload()}
              qrColor={qrColor}
              bgColor={bgColor}
              dotStyle={dotStyle}
              hasLogo={hasLogo}
              logoImage={logoImage}
              logoShape={logoShape}
              frameTemplate={frameTemplate}
              frameText={frameText}
              frameColor={frameColor}
              selectedFormat={selectedFormat}
            />
          </div>

          <p className="text-xs text-[#6E6E73] mb-6 px-2 select-none cursor-default">
            Personaliza tu código QR con total libertad. El formato JPG básico sin marco es 100% gratuito.
          </p>

          {/* BOTÓN ÚNICO QUE DICE "Descargar" */}
          <button
            onClick={handleDownloadAction}
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#1D1D1F] text-white hover:bg-black hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Descargar</span>
          </button>

          {/* VENTANA EMERGENTE (MODAL) QUE APARECE UNICAMENTE AL DARLE A DESCARGAR SI ESTÁ PERSONALIZADO */}
          {showPaymentModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in select-none">
              <div className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1D1D1F]">Descarga de Archivo Profesional</h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Has aplicado personalizaciones avanzadas o formatos profesionales a tu código QR. Para completar la descarga en alta resolución, realiza un pago único de <strong className="text-[#1D1D1F]">$5.00 USD</strong>.
                  </p>
                </div>

                {/* BOTÓN PAYPAL OFICIAL DENTRO DEL MODAL DE PAGO */}
                <div className="pt-2">
                  <PayPalButtons 
                    style={{ layout: "vertical", shape: "rect", label: "pay" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: "5.00",
                            },
                            description: "HelloQR — Descarga de Código QR Profesional",
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions?.order) {
                        const details = await actions.order.capture();
                        setShowPaymentModal(false);
                        alert(`¡Pago exitoso completado por ${details.payer?.name?.given_name || "Cliente"}! Tu archivo se está descargando.`);
                      }
                    }}
                    onError={(err) => {
                      console.error("Error en la pasarela de PayPal:", err);
                      alert("Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.");
                    }}
                  />
                </div>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] font-semibold underline pt-2"
                >
                  Seguir editando
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#6E6E73] select-none cursor-default">
            <ShieldCheck className="w-4 h-4 text-[#A0BE1B]" />
            <span>Transacciones cifradas y protegidas por PayPal</span>
          </div>

        </div>

      </div>
    </div>
  );
}