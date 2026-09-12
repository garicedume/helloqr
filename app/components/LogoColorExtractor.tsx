"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

interface LogoColorExtractorProps {
  onColorExtracted: (color: string) => void;
  onLogoUploaded: (url: string) => void;
  logoShape: string;
  onLogoShapeChange: (shape: string) => void;
}

export default function LogoColorExtractor({ 
  onColorExtracted, 
  onLogoUploaded, 
  logoShape, 
  onLogoShapeChange 
}: LogoColorExtractorProps) {
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [logoName, setLogoName] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      
      onLogoUploaded(event.target?.result as string);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);

        const imageData = ctx.getImageData(0, 0, 50, 50).data;
        const colorCounts: { [key: string]: number } = {};

        for (let i = 0; i < imageData.length; i += 16) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const alpha = imageData[i + 3];

          if (alpha < 128) continue;
          if (r > 240 && g > 240 && b > 240) continue;
          if (r < 15 && g < 15 && b < 15) continue;

          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }

        const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
        const topColors = sortedColors.slice(0, 3);
        const finalPalette = topColors.length > 0 ? topColors : ["#1D1D1F", "#A0BE1B", "#0066CC"];
        
        setExtractedPalette(finalPalette);
        setLoading(false);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-5 rounded-2xl border border-gray-200 bg-[#F5F5F7]/40 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#1D1D1F]">Logotipo Central y Extracción de Color</span>
      </div>

      <div className="flex flex-col gap-3">
        <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-[#1D1D1F] hover:bg-gray-50 transition-all shadow-sm">
          <Upload className="w-4 h-4 text-[#6E6E73]" />
          <span>{logoName ? `Logo: ${logoName}` : "Subir logotipo de la empresa"}</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        {logoName && (
          <div className="space-y-2 pt-2">
            <label className="block text-[11px] font-semibold text-[#6E6E73]">Forma del logotipo:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "circle", label: "Circular" },
                { id: "rounded", label: "Redondeado" },
                { id: "square", label: "Cuadrado" },
              ].map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => onLogoShapeChange(shape.id)}
                  className={`py-2 rounded-xl border text-[11px] font-semibold transition-all ${
                    logoShape === shape.id
                      ? "border-[#1D1D1F] bg-[#1D1D1F] text-white"
                      : "border-gray-200 bg-white text-[#6E6E73] hover:border-gray-300"
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <p className="text-[11px] text-[#6E6E73] text-center animate-pulse">Analizando píxeles y extrayendo paleta de marca...</p>}

        {extractedPalette.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-semibold text-[#6E6E73] block">Paletas sugeridas automáticamente para tu QR:</span>
            <div className="flex items-center gap-3">
              {extractedPalette.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => onColorExtracted(color)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:scale-105 transition-transform text-xs shadow-sm"
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[10px] text-[#1D1D1F]">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}