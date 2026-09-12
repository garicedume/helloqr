"use client";

import React, { useState } from "react";
import { 
  Download, ShieldCheck, Globe, Wifi, MessageCircle, 
  Smartphone, FileText, Image as ImageIcon, Play, Type, 
  Video, Camera, Share2, Send, MapPin, Headphones, Mail, Calendar, Phone, Presentation, Link2, AlertCircle, Lock, Loader2, Upload, Twitter
} from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import QRCodeCanvas from "../components/QRCodeCanvas";
import LogoColorExtractor from "../components/LogoColorExtractor";
import { COUNTRIES, checkEmailTypo } from "../utils/helpers";

export default function CrearQRPage() {
  const [contentType, setContentType] = useState("url");
  
  const [urlInput, setUrlInput] = useState("https://helloqr.com");
  const [textInput, setTextInput] = useState("Hola mundo");
  
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

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

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const requiresPayment = hasLogo || frameTemplate !== "none" || selectedFormat !== "jpg";

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, maxMB: number, allowedExts: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxMB) {
      setFileUploadError(`El archivo supera el límite permitido de ${maxMB} MB.`);
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !allowedExts.includes(fileExt)) {
      setFileUploadError(`Formato no válido. Extensiones permitidas: ${allowedExts.join(', ')}`);
      return;
    }

    setFileUploadError(null);
    setUploadedFile({
      name: file.name,
      size: `${fileSizeMB.toFixed(2)} MB`,
      type: file.type
    });
    setUrlInput(`https://supabase.helloqr.com/storage/v1/object/public/uploads/${file.name}`);
  };

  const handleGenerateQR = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const handleDownloadAction = () => {
    if (!isGenerated) {
      alert("Por favor, haz clic primero en 'Generar Código QR' para procesar tu diseño.");
      return;
    }

    if (requiresPayment) {
      setShowPaymentModal(true);
    } else {
      alert(`¡Descargando tu código QR en formato ${selectedFormat.toUpperCase()} de forma totalmente gratuita!`);
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

  // Tipos de contenido con los estilos y colores oficiales exactos inspirados en tu referencia visual
  const contentTypesList = [
    { id: "url", name: "URL / Link", icon: Globe, bgClass: "bg-gray-900 text-white" },
    { id: "pdf", name: "PDF (Max 2MB)", icon: FileText, bgClass: "bg-red-600 text-white" },
    { id: "image", name: "Imagen (Max 2MB)", icon: ImageIcon, bgClass: "bg-purple-600 text-white" },
    { id: "app", name: "App Store", icon: Play, bgClass: "bg-indigo-600 text-white" },
    { id: "text", name: "Texto plano", icon: Type, bgClass: "bg-gray-700 text-white" },
    { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, bgClass: "bg-[#25D366] text-white" }, // Verde WhatsApp oficial
    { id: "youtube", name: "YouTube", icon: Video, bgClass: "bg-[#FF0000] text-white" }, // Rojo YouTube oficial
    { id: "instagram", name: "Instagram", icon: Camera, bgClass: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white" }, // Degradado Instagram oficial
    { id: "facebook", name: "Facebook", icon: Share2, bgClass: "bg-[#1877F2] text-white" }, // Azul Facebook oficial
    { id: "twitter", name: "Twitter / X", icon: Twitter, bgClass: "bg-[#1DA1F2] text-white" }, // Celeste Twitter oficial
    { id: "telegram", name: "Telegram", icon: Send, bgClass: "bg-[#229ED9] text-white" },
    { id: "vcard", name: "vCard Contacto", icon: Smartphone, bgClass: "bg-[#A0BE1B] text-slate-900 font-bold" },
    { id: "map", name: "Ubicación Mapa", icon: MapPin, bgClass: "bg-emerald-600 text-white" },
    { id: "wifi", name: "Red WiFi", icon: Wifi, bgClass: "bg-cyan-600 text-white" },
    { id: "audio", name: "Audio MP3", icon: Headphones, bgClass: "bg-pink-600 text-white" },
    { id: "email", name: "E-mail", icon: Mail, bgClass: "bg-amber-600 text-white" },
    { id: "booking", name: "Reservas", icon: Calendar, bgClass: "bg-blue-500 text-white" },
    { id: "phone", name: "Teléfono", icon: Phone, bgClass: "bg-green-600 text-white" },
    { id: "pptx", name: "PowerPoint", icon: Presentation, bgClass: "bg-[#D04423] text-white" },
    { id: "dynamic", name: "URL Dinámica", icon: Link2, bgClass: "bg-violet-600 text-white" },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 select-none cursor-default">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F]">
          Editor Maestro <span className="text-[#A0BE1B]">HelloQR</span>
        </h1>
        <p className="text-[#6E6E73] mt-3 text-sm md:text-base">
          Personaliza colores y descarga en JPG de forma 100% gratuita. Botones oficiales y diseño profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* PANEL IZQUIERDO */}
        <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="select-none cursor-default">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
              1. Selecciona el tipo de contenido y redes ({contentTypesList.length} opciones)
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {contentTypesList.map((type) => {
                const Icon = type.icon;
                const active = contentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setContentType(type.id);
                      setUploadedFile(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition-all ${
                      active 
                        ? "border-[#1D1D1F] bg-gray-50 shadow-md ring-2 ring-[#A0BE1B]" 
                        : "border-gray-200 hover:border-gray-300 text-[#6E6E73] bg-white"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl shadow-sm ${type.bgClass} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] text-center leading-tight font-bold text-[#1D1D1F]">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] select-none cursor-default flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
              Configuración para: <span className="text-[#A0BE1B] uppercase">{contentType}</span>
            </h2>

            {["url", "app", "youtube", "instagram", "facebook", "twitter", "telegram", "map", "audio", "booking", "dynamic"].includes(contentType) && (
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Enlace o URL de destino</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://tu-sitio.com"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                />
              </div>
            )}

            {contentType === "pdf" && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu documento PDF (Máx. 2 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 2, ['pdf'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-xs font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu archivo PDF aquí"}
                    </p>
                    <span className="text-[10px] text-[#6E6E73]">Almacenamiento en Supabase</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-xs text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "image" && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu Imagen (Máx. 2 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 2, ['jpg', 'jpeg', 'png', 'webp', 'gif'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-xs font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu imagen aquí"}
                    </p>
                    <span className="text-[10px] text-[#6E6E73]">Formatos JPG, PNG, WEBP</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-xs text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "pptx" && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu presentación PowerPoint (Máx. 3 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept=".pptx, .ppt"
                    onChange={(e) => handleFileUpload(e, 3, ['pptx', 'ppt'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-xs font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu archivo PPTX aquí"}
                    </p>
                    <span className="text-[10px] text-[#6E6E73]">Soporte para presentaciones</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-xs text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "text" && (
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Mensaje o texto plano</label>
                <textarea
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                />
              </div>
            )}

            {contentType === "whatsapp" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Número de WhatsApp</label>
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
                      className="col-span-7 px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Mensaje predefinido (Opcional)</label>
                  <input
                    type="text"
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    placeholder="Hola, quiero más información..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
              </div>
            )}

            {contentType === "wifi" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Nombre de la red (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="MiRedWiFi"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Contraseña</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="ContraseñaDeRed"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Tipo de Encriptación</label>
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
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Nombre</label>
                  <input
                    type="text"
                    value={vCardData.firstName}
                    onChange={(e) => setVCardData({...vCardData, firstName: e.target.value})}
                    placeholder="Juan"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Apellido</label>
                  <input
                    type="text"
                    value={vCardData.lastName}
                    onChange={(e) => setVCardData({...vCardData, lastName: e.target.value})}
                    placeholder="Pérez"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Teléfono</label>
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
                      className="col-span-7 px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Correo Electrónico</label>
                  <input
                    type="email"
                    value={vCardData.email}
                    onChange={(e) => handleEmailChange(e.target.value, 'vcard')}
                    placeholder="juan@correo.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
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
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Empresa</label>
                  <input
                    type="text"
                    value={vCardData.company}
                    onChange={(e) => setVCardData({...vCardData, company: e.target.value})}
                    placeholder="Mi Empresa SRL"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Sitio Web</label>
                  <input
                    type="text"
                    value={vCardData.website}
                    onChange={(e) => setVCardData({...vCardData, website: e.target.value})}
                    placeholder="https://miempresa.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
              </div>
            )}

            {contentType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Correo destinatario</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => handleEmailChange(e.target.value, 'email')}
                    placeholder="contacto@dominio.com"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
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
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Asunto</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Asunto del mensaje..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Cuerpo del mensaje</label>
                  <textarea
                    rows={2}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Escribe tu correo..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
              </div>
            )}

            {contentType === "phone" && (
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Número de teléfono</label>
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
                    className="col-span-7 px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. PERSONALIZACIÓN VISUAL (Selector de Color Pro estilo Photoshop) */}
          <div className="pt-6 border-t border-gray-100 space-y-5 select-none cursor-default">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
              2. Personalización Visual (Color Gratis)
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/60 p-4 rounded-3xl border border-gray-200/60">
              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-2">Selector de Color Exacto (HEX)</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-12 h-12 rounded-2xl border border-gray-300 cursor-pointer p-1 bg-white shadow-sm hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      placeholder="#1D1D1F"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono font-bold bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-[#6E6E73] mt-1 block">Cambiar el color del QR es 100% gratuito</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1D1D1F] mb-2">Forma de Puntos</label>
                <select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl border border-gray-300 text-xs bg-white text-[#1D1D1F] font-semibold focus:outline-none focus:border-[#A0BE1B]"
                >
                  <option value="square">Cuadrado clásico</option>
                  <option value="dots">Puntos redondeados</option>
                  <option value="classy">Estilo orgánico / Art</option>
                </select>
              </div>
            </div>

            {/* MARCOS (PREMIUM) */}
            <div className="space-y-3.5 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold text-[#1D1D1F]">Plantilla de Marco Decorativo (Requiere Licencia)</label>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Pro</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
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
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Texto del Marco</label>
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="Ej: ¡Escanéame!"
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 select-auto text-[#1D1D1F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">Color del Marco</label>
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
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A0BE1B]"></span>
              3. Formato de Exportación
            </h2>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: "jpg", label: "JPG (Gratis)", badge: null },
                { id: "png", label: "PNG", badge: "Pro" },
                { id: "svg", label: "SVG", badge: "Pro" },
                { id: "pdf", label: "PDF", badge: "Pro" },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`py-3 rounded-2xl border text-xs font-bold uppercase transition-all relative flex flex-col items-center justify-center gap-1 ${
                    selectedFormat === fmt.id
                      ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-md"
                      : "border-gray-200 text-[#6E6E73] hover:border-gray-300 bg-white"
                  }`}
                >
                  <span>{fmt.label}</span>
                  {fmt.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${selectedFormat === fmt.id ? "bg-[#A0BE1B] text-[#1D1D1F]" : "bg-amber-100 text-amber-800"}`}>
                      {fmt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: VISTA PREVIA Y BOTÓN DE GENERACIÓN */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] sticky top-28 flex flex-col items-center text-center">
          
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left select-none cursor-default flex items-center justify-between">
            <span>Vista Previa en Vivo</span>
            <span className="w-2 h-2 rounded-full bg-[#A0BE1B] animate-pulse"></span>
          </h2>

          <div className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-gray-50/70 rounded-[2rem] border border-gray-200/80 min-h-[260px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-10">
                <Loader2 className="w-10 h-10 text-[#A0BE1B] animate-spin" />
                <p className="text-xs font-bold text-[#1D1D1F]">Generando matriz de puntos QR...</p>
                <span className="text-[10px] text-[#6E6E73]">Aplicando algoritmos de alta fidelidad</span>
              </div>
            ) : isGenerated ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 bg-gray-200/70 rounded-full flex items-center justify-center text-[#6E6E73]">
                  <Globe className="w-6 h-6 text-[#A0BE1B]" />
                </div>
                <p className="text-xs font-bold text-[#1D1D1F]">Tu código está listo para compilar</p>
                <p className="text-[11px] text-[#6E6E73]">Haz clic en el botón inferior para procesar y renderizar tu código QR en vivo.</p>
              </div>
            )}
          </div>

          {!isGenerated && !isGenerating && (
            <button
              onClick={handleGenerateQR}
              className="w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg bg-[#A0BE1B] text-[#1D1D1F] hover:bg-[#8fa716] hover:scale-[1.02] mb-3"
            >
              <span>Generar Código QR</span>
            </button>
          )}

          <button
            onClick={handleDownloadAction}
            className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
              isGenerated 
                ? "bg-[#1D1D1F] text-white hover:bg-black hover:scale-[1.02]" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Descargar {selectedFormat.toUpperCase()} {requiresPayment ? "(Pro)" : "(Gratis)"}</span>
          </button>

          {isGenerated && (
            <button 
              onClick={handleGenerateQR}
              className="text-[11px] text-[#6E6E73] hover:text-[#1D1D1F] underline mt-3 font-medium"
            >
              Regenerar o actualizar diseño
            </button>
          )}

          {showPaymentModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in select-none">
              <div className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1D1D1F]">Licencia Profesional HelloQR</h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Has incorporado elementos avanzados (marcos, logotipos o formatos vectoriales profesionales). Adquiere tu licencia única por <strong className="text-[#1D1D1F]">$5.00 USD</strong> para habilitar la descarga en máxima resolución.
                  </p>
                </div>

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
                            description: "HelloQR — Licencia de Código QR Profesional",
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions?.order) {
                        const details = await actions.order.capture();
                        setShowPaymentModal(false);
                        alert(`¡Pago exitoso completado por ${details.payer?.name?.given_name || "Cliente"}! Tu archivo en alta calidad se está descargando.`);
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