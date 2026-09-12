"use client";

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeCanvasProps {
  value: string;
  qrColor: string;
  bgColor: string;
  dotStyle: string;
  hasLogo: boolean;
  logoImage?: string | null;
  logoShape?: string;
  frameTemplate?: string;
  frameText?: string;
  frameColor?: string;
  selectedFormat: string;
}

export default function QRCodeCanvas({
  value,
  qrColor,
  bgColor,
  dotStyle,
  hasLogo,
  logoImage,
  logoShape = "square",
  frameTemplate = "none",
  frameText = "¡Escanéame!",
  frameColor = "#1D1D1F",
  selectedFormat,
}: QRCodeCanvasProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width: 190,
      height: 190,
      type: "svg",
      data: value || "https://helloqr.com",
      dotsOptions: {
        color: qrColor,
        type: dotStyle === "dots" ? "dots" : dotStyle === "classy" ? "classy" : "square",
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.38,
        margin: 4,
      },
      qrOptions: {
        errorCorrectionLevel: hasLogo ? "H" : "M",
      },
      image: hasLogo && logoImage ? logoImage : undefined,
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCodeInstance.current.append(qrRef.current);
    }
  }, [value, qrColor, bgColor, dotStyle, hasLogo, logoImage]);

  // Contenedores con padding generoso para que los marcos jamás corten el QR
  const getFrameContainerStyle = () => {
    switch (frameTemplate) {
      case "classic":
        return `border-[5px] rounded-3xl p-5 shadow-xl bg-white`;
      case "modern":
        return `border-2 rounded-2xl p-6 shadow-2xl bg-gradient-to-b from-white via-gray-50/50 to-white`;
      case "pill":
        return `border-[5px] rounded-[2.5rem] px-6 py-7 shadow-xl bg-white`;
      case "badge":
        return `border-2 rounded-3xl p-6 shadow-2xl ring-8 ring-gray-100/80 bg-white`;
      default:
        return `border border-gray-200/80 rounded-3xl p-5 shadow-sm bg-white`;
    }
  };

  const getLogoShapeClass = () => {
    switch (logoShape) {
      case "circle":
        return "rounded-full";
      case "rounded":
        return "rounded-xl";
      default:
        return "rounded-md";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div 
        className={`flex flex-col items-center justify-center transition-all relative ${getFrameContainerStyle()}`}
        style={{ 
          borderColor: frameTemplate !== "none" ? frameColor : undefined,
          backgroundColor: frameTemplate !== "none" ? undefined : bgColor 
        }}
      >
        {frameTemplate !== "none" && frameText && (
          <span 
            className="text-[11px] font-bold uppercase tracking-widest mb-3.5 px-4 py-1 text-white rounded-full shadow-md"
            style={{ backgroundColor: frameColor }}
          >
            {frameText}
          </span>
        )}

        <div className="flex flex-col items-center justify-center relative">
          <div ref={qrRef} className="overflow-hidden rounded-xl" />
          
          {hasLogo && logoImage && (
            <div className={`absolute w-12 h-12 bg-white shadow-lg border-2 border-white flex items-center justify-center overflow-hidden ${getLogoShapeClass()}`}>
              <img src={logoImage} alt="Logo" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}