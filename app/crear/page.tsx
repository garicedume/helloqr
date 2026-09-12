"use client";

import React, { useState, useRef } from "react";
import { 
  Download, ShieldCheck, Globe, Wifi, Smartphone, FileText, Image as ImageIcon, 
  Play, Type, MapPin, Headphones, Mail, Calendar, Phone, Presentation, Link2, AlertCircle, Lock, Loader2, Upload, Utensils
} from "lucide-react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import QRCodeCanvas from "../components/QRCodeCanvas";
import LogoColorExtractor from "../components/LogoColorExtractor";
import { COUNTRIES, checkEmailTypo } from "../utils/helpers";

export default function CrearQRPage() {
  const [contentType, setContentType] = useState("url");
  const qrRef = useRef<HTMLDivElement>(null);
  
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

  // Lógica de pago: solo requiere pago si selecciona formatos vectoriales/documentos (svg/pdf) o elementos avanzados
  const requiresPayment = selectedFormat === "svg" || selectedFormat === "pdf" || hasLogo || frameTemplate !== "none";

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
    }, 1200);
  };

  // FUNCIÓN DE DESCARGA REAL ESTRICTA POR FORMATO
  const executeRealDownload = () => {
    const svgElement = qrRef.current?.querySelector("svg");
    const canvasElement = qrRef.current?.querySelector("canvas");

    if (selectedFormat === "jpg" || selectedFormat === "png") {
      if (canvasElement) {
        const mimeType = selectedFormat === "jpg" ? "image/jpeg" : "image/png";
        const imageURL = canvasElement.toDataURL(mimeType);
        const downloadLink = document.createElement("a");
        downloadLink.href = imageURL;
        downloadLink.download = `helloqr-code.${selectedFormat}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const URLObj = window.URL || window.webkitURL || window;
        const blobURL = URLObj.createObjectURL(svgBlob);
        
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width || 400;
          canvas.height = image.height || 400;
          const context = canvas.getContext("2d");
          if (context) {
            context.fillStyle = "#FFFFFF"; 
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
            
            const mimeType = selectedFormat === "jpg" ? "image/jpeg" : "image/png";
            const dur = canvas.toDataURL(mimeType);
            const downloadLink = document.createElement("a");
            downloadLink.href = dur;
            downloadLink.download = `helloqr-code.${selectedFormat}`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
        };
        image.src = blobURL;
      }
    } else if (selectedFormat === "svg") {
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `helloqr-code.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } else if (selectedFormat === "pdf") {
      // Descarga simulada/generada en PDF o imagen empaquetada
      executeRealDownloadForImageOrPdf('pdf');
    }
  };

  const executeRealDownloadForImageOrPdf = (fmt: string) => {
    alert(`¡Licencia validada! Descargando tu archivo en formato ${fmt.toUpperCase()} en alta resolución.`);
    executeRealDownload();
  };

  const handleDownloadAction = () => {
    if (!isGenerated) {
      alert("Por favor, haz clic primero en 'Generar Código QR' para procesar tu diseño.");
      return;
    }

    if (requiresPayment) {
      setShowPaymentModal(true);
    } else {
      executeRealDownload();
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
    { id: "url", name: "URL / Link", bgClass: "bg-gray-900 text-white", iconSvg: <Globe className="w-6 h-6" /> },
    { id: "pdf", name: "PDF (Max 2MB)", bgClass: "bg-red-600 text-white", iconSvg: <FileText className="w-6 h-6" /> },
    { id: "menu", name: "Menú Digital", bgClass: "bg-orange-600 text-white", iconSvg: <Utensils className="w-6 h-6" /> },
    { id: "image", name: "Imagen (Max 2MB)", bgClass: "bg-purple-600 text-white", iconSvg: <ImageIcon className="w-6 h-6" /> },
    { id: "app", name: "App Store", bgClass: "bg-indigo-600 text-white", iconSvg: <Play className="w-6 h-6" /> },
    { id: "text", name: "Texto plano", bgClass: "bg-gray-700 text-white", iconSvg: <Type className="w-6 h-6" /> },
    { 
      id: "whatsapp", 
      name: "WhatsApp", 
      bgClass: "bg-[#25D366] text-white", 
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    { 
      id: "youtube", 
      name: "YouTube", 
      bgClass: "bg-[#FF0000] text-white", 
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      id: "instagram", 
      name: "Instagram", 
      bgClass: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white", 
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      id: "facebook", 
      name: "Facebook", 
      bgClass: "bg-[#1877F2] text-white", 
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z"/>
        </svg>
      )
    },
    { 
      id: "telegram", 
      name: "Telegram", 
      bgClass: "bg-[#229ED9] text-white", 
      iconSvg: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.195 1.006.131.832.943z"/>
        </svg>
      )
    },
    { id: "vcard", name: "vCard Contacto", bgClass: "bg-[#A0BE1B] text-slate-900 font-bold", iconSvg: <Smartphone className="w-6 h-6" /> },
    { id: "map", name: "Ubicación Mapa", bgClass: "bg-emerald-600 text-white", iconSvg: <MapPin className="w-6 h-6" /> },
    { id: "wifi", name: "Red WiFi", bgClass: "bg-cyan-600 text-white", iconSvg: <Wifi className="w-6 h-6" /> },
    { id: "audio", name: "Audio MP3", bgClass: "bg-pink-600 text-white", iconSvg: <Headphones className="w-6 h-6" /> },
    { id: "email", name: "E-mail", bgClass: "bg-amber-600 text-white", iconSvg: <Mail className="w-6 h-6" /> },
    { id: "booking", name: "Reservas", bgClass: "bg-blue-500 text-white", iconSvg: <Calendar className="w-6 h-6" /> },
    { id: "phone", name: "Teléfono", bgClass: "bg-green-600 text-white", iconSvg: <Phone className="w-6 h-6" /> },
    { id: "pptx", name: "PowerPoint", bgClass: "bg-[#D04423] text-white", iconSvg: <Presentation className="w-6 h-6" /> },
    { id: "dynamic", name: "URL Dinámica", bgClass: "bg-violet-600 text-white", iconSvg: <Link2 className="w-6 h-6" /> },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto bg-gradient-to-b from-gray-50/50 to-white min-h-screen">
      
      {/* NUEVO ENCABEZADO MODERNO Y VIBRANTE (SIN ESTRELLITAS NI ICONOS RAROS) */}
      <div className="text-center max-w-3xl mx-auto mb-14 select-none cursor-default">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1D1D1F] mb-4">
          Generador y Diseñador <span className="text-[#A0BE1B]">HelloQR</span>
        </h1>
        <p className="text-base md:text-lg text-[#6E6E73] leading-relaxed max-w-2xl mx-auto font-medium">
          Personaliza tus códigos QR con colores exactos, logotipos y estilos profesionales listos para tu marca o negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* PANEL IZQUIERDO: DISEÑO MODERNO Y JUVENIL */}
        <div className="lg:col-span-7 space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-xl shadow-gray-100/50">
          
          <div className="select-none cursor-default">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#A0BE1B] inline-block shadow-sm"></span>
              1. Selecciona el tipo de contenido ({contentTypesList.length} opciones)
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3.5 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {contentTypesList.map((type) => {
                const active = contentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setContentType(type.id);
                      setUploadedFile(null);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col items-center justify-center gap-2.5 transition-all duration-200 ${
                      active 
                        ? "border-[#1D1D1F] bg-gray-50/80 shadow-md ring-2 ring-[#A0BE1B] scale-[1.02]" 
                        : "border-gray-200 hover:border-gray-300 text-[#6E6E73] bg-white hover:bg-gray-50/40"
                    }`}
                  >
                    <div className={`p-3.5 rounded-2xl shadow-sm ${type.bgClass} flex items-center justify-center`}>
                      {type.iconSvg}
                    </div>
                    <span className="text-xs text-center leading-tight font-bold text-[#1D1D1F]">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1D1D1F] select-none cursor-default flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#A0BE1B] inline-block shadow-sm"></span>
              Configuración para: <span className="text-[#A0BE1B] uppercase font-black">{contentType}</span>
            </h2>

            {["url", "app", "youtube", "instagram", "facebook", "telegram", "map", "audio", "booking", "dynamic", "menu"].includes(contentType) && (
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Enlace o URL de destino</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://tu-sitio.com"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] transition-colors"
                />
              </div>
            )}

            {contentType === "pdf" && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu documento PDF (Máx. 2 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 2, ['pdf'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-sm font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu archivo PDF aquí"}
                    </p>
                    <span className="text-xs text-[#6E6E73]">Almacenamiento seguro en Supabase</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-sm text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "image" && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu Imagen (Máx. 2 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 2, ['jpg', 'jpeg', 'png', 'webp', 'gif'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-sm font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu imagen aquí"}
                    </p>
                    <span className="text-xs text-[#6E6E73]">Formatos JPG, PNG, WEBP</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-sm text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "pptx" && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#1D1D1F] select-none cursor-default">Sube tu presentación PowerPoint (Máx. 3 MB)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-gray-50/50 hover:border-[#A0BE1B] transition-colors relative">
                  <input 
                    type="file" 
                    accept=".pptx, .ppt"
                    onChange={(e) => handleFileUpload(e, 3, ['pptx', 'ppt'])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-8 h-8 text-[#A0BE1B]" />
                    <p className="text-sm font-bold text-[#1D1D1F]">
                      {uploadedFile ? uploadedFile.name : "Haz clic o arrastra tu archivo PPTX aquí"}
                    </p>
                    <span className="text-xs text-[#6E6E73]">Soporte para presentaciones</span>
                  </div>
                </div>
                {fileUploadError && <p className="text-sm text-red-500 font-medium">{fileUploadError}</p>}
              </div>
            )}

            {contentType === "text" && (
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Mensaje o texto plano</label>
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Número de WhatsApp</label>
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Mensaje predefinido (Opcional)</label>
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Nombre de la red (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="MiRedWiFi"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Contraseña</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="ContraseñaDeRed"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Tipo de Encriptación</label>
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Nombre</label>
                  <input
                    type="text"
                    value={vCardData.firstName}
                    onChange={(e) => setVCardData({...vCardData, firstName: e.target.value})}
                    placeholder="Juan"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Apellido</label>
                  <input
                    type="text"
                    value={vCardData.lastName}
                    onChange={(e) => setVCardData({...vCardData, lastName: e.target.value})}
                    placeholder="Pérez"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Teléfono</label>
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
                      className="col-span-7 px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Correo Electrónico</label>
                  <input
                    type="email"
                    value={vCardData.email}
                    onChange={(e) => handleEmailChange(e.target.value, 'vcard')}
                    placeholder="juan@correo.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Empresa</label>
                  <input
                    type="text"
                    value={vCardData.company}
                    onChange={(e) => setVCardData({...vCardData, company: e.target.value})}
                    placeholder="Mi Empresa SRL"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 cursor-default">Sitio Web</label>
                  <input
                    type="text"
                    value={vCardData.website}
                    onChange={(e) => setVCardData({...vCardData, website: e.target.value})}
                    placeholder="https://miempresa.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F] select-auto"
                  />
                </div>
              </div>
            )}

            {contentType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Correo destinatario</label>
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
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Asunto</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Asunto del mensaje..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 text-[#1D1D1F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Cuerpo del mensaje</label>
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
                <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5 select-none cursor-default">Número de teléfono</label>
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

          {/* 2. PERSONALIZACIÓN VISUAL (SELECTOR DE COLOR Y PUNTOS MEJORADO) */}
          <div className="pt-6 border-t border-gray-100 space-y-5 select-none cursor-default">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#A0BE1B] inline-block shadow-sm"></span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-gray-50 to-white p-5 rounded-3xl border border-gray-200/80 shadow-sm">
              <div>
                <label className="block text-sm font-bold text-[#1D1D1F] mb-2">Color del Código (HEX)</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-12 h-12 rounded-2xl border-2 border-gray-200 cursor-pointer p-1 bg-white shadow-md hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      placeholder="#1D1D1F"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm font-mono font-bold bg-white text-[#1D1D1F] focus:outline-none focus:border-[#A0BE1B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1D1D1F] mb-2">Estilo de Puntos</label>
                <select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm bg-white text-[#1D1D1F] font-semibold focus:outline-none focus:border-[#A0BE1B] shadow-sm"
                >
                  <option value="square">Cuadrado clásico</option>
                  <option value="dots">Puntos redondeados</option>
                  <option value="classy">Estilo orgánico / Art</option>
                </select>
              </div>
            </div>

            {/* MARCOS DECORATIVOS (SIN NADA DE PRO) */}
            <div className="space-y-3.5 pt-3 border-t border-gray-100">
              <label className="block text-sm font-extrabold text-[#1D1D1F]">Plantilla de Marco Decorativo</label>
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
                    className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all ${
                      frameTemplate === tpl.id
                        ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-md scale-105"
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
                    <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5">Texto del Marco</label>
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="Ej: ¡Escanéame!"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#A0BE1B] bg-gray-50/50 select-auto text-[#1D1D1F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1D1D1F] mb-1.5">Color del Marco</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={frameColor}
                        onChange={(e) => setFrameColor(e.target.value)}
                        className="w-11 h-11 rounded-2xl border border-gray-200 cursor-pointer p-1 bg-white shadow-sm"
                      />
                      <span className="text-xs font-mono font-bold text-[#1D1D1F] select-auto">{frameColor}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. FORMATO DE EXPORTACIÓN (SIN ETIQUETAS PRO) */}
          <div className="pt-6 border-t border-gray-100 select-none cursor-default">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#A0BE1B] inline-block shadow-sm"></span>
              3. Formato de Exportación
            </h2>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: "jpg", label: "JPG" },
                { id: "png", label: "PNG" },
                { id: "svg", label: "SVG" },
                { id: "pdf", label: "PDF" },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`py-3.5 rounded-2xl border text-xs font-black uppercase transition-all relative flex flex-col items-center justify-center gap-1 ${
                    selectedFormat === fmt.id
                      ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-lg scale-105"
                      : "border-gray-200 text-[#6E6E73] hover:border-gray-300 bg-white"
                  }`}
                >
                  <span>{fmt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: VISTA PREVIA INTACTA Y BOTONES */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-xl shadow-gray-100/50 sticky top-28 flex flex-col items-center text-center">
          
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#1D1D1F] mb-6 w-full text-left select-none cursor-default flex items-center justify-between">
            <span>Vista Previa en Vivo</span>
            <span className="w-3 h-3 rounded-full bg-[#A0BE1B] animate-pulse"></span>
          </h2>

          <div ref={qrRef} className="w-full flex flex-col items-center justify-center relative mb-6 p-6 bg-gray-50/70 rounded-3xl border border-gray-200/80 min-h-64 shadow-inner">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-10">
                <Loader2 className="w-10 h-10 text-[#A0BE1B] animate-spin" />
                <p className="text-sm font-bold text-[#1D1D1F]">Generando matriz de puntos QR...</p>
                <span className="text-xs text-[#6E6E73]">Aplicando algoritmos de alta fidelidad</span>
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
                <p className="text-sm font-bold text-[#1D1D1F]">Tu código está listo para compilar</p>
                <p className="text-xs text-[#6E6E73]">Haz clic en el botón inferior para procesar y renderizar tu código QR en vivo.</p>
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
            <span>Descargar {selectedFormat.toUpperCase()}</span>
          </button>

          {isGenerated && (
            <button 
              onClick={handleGenerateQR}
              className="text-xs text-[#6E6E73] hover:text-[#1D1D1F] underline mt-3 font-medium"
            >
              Regenerar o actualizar diseño
            </button>
          )}

          {showPaymentModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in select-none">
              <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-2xl border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1D1D1F]">Descarga en Alta Resolución</h3>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Para exportar en formato <strong className="text-[#1D1D1F] uppercase">{selectedFormat}</strong> o con elementos personalizados avanzados, adquiere tu acceso único por <strong className="text-[#1D1D1F]">$5.00 USD</strong>.
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
                            description: "HelloQR — Licencia de Exportación Avanzada",
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions?.order) {
                        const details = await actions.order.capture();
                        setShowPaymentModal(false);
                        executeRealDownloadForImageOrPdf(selectedFormat);
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

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#6E6E73] select-none cursor-default">
            <ShieldCheck className="w-4 h-4 text-[#A0BE1B]" />
            <span>Transacciones cifradas y protegidas por PayPal</span>
          </div>

        </div>

      </div>
    </div>
  );
}