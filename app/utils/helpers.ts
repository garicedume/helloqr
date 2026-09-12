export interface Country {
  name: string;
  code: string;
  dial_code: string;
}

// Listado global basado en los países oficiales reconocidos por la ONU
export const COUNTRIES: Country[] = [
  { name: "República Dominicana", code: "DO", dial_code: "+1" },
  { name: "Estados Unidos", code: "US", dial_code: "+1" },
  { name: "Afganistán", code: "AF", dial_code: "+93" },
  { name: "Albania", code: "AL", dial_code: "+355" },
  { name: "Alemania", code: "DE", dial_code: "+49" },
  { name: "Andorra", code: "AD", dial_code: "+376" },
  { name: "Angola", code: "AO", dial_code: "+244" },
  { name: "Argentina", code: "AR", dial_code: "+54" },
  { name: "Australia", code: "AU", dial_code: "+61" },
  { name: "Austria", code: "AT", dial_code: "+43" },
  { name: "Bélgica", code: "BE", dial_code: "+32" },
  { name: "Bolivia", code: "BO", dial_code: "+591" },
  { name: "Brasil", code: "BR", dial_code: "+55" },
  { name: "Canadá", code: "CA", dial_code: "+1" },
  { name: "Chile", code: "CL", dial_code: "+56" },
  { name: "China", code: "CN", dial_code: "+86" },
  { name: "Colombia", code: "CO", dial_code: "+57" },
  { name: "Costa Rica", code: "CR", dial_code: "+506" },
  { name: "Cuba", code: "CU", dial_code: "+53" },
  { name: "Ecuador", code: "EC", dial_code: "+593" },
  { name: "Egipto", code: "EG", dial_code: "+20" },
  { name: "El Salvador", code: "SV", dial_code: "+503" },
  { name: "España", code: "ES", dial_code: "+34" },
  { name: "Francia", code: "FR", dial_code: "+33" },
  { name: "Guatemala", code: "GT", dial_code: "+502" },
  { name: "Haití", code: "HT", dial_code: "+509" },
  { name: "Honduras", code: "HN", dial_code: "+504" },
  { name: "India", code: "IN", dial_code: "+91" },
  { name: "Italia", code: "IT", dial_code: "+39" },
  { name: "Japón", code: "JP", dial_code: "+81" },
  { name: "México", code: "MX", dial_code: "+52" },
  { name: "Nicaragua", code: "NI", dial_code: "+505" },
  { name: "Panamá", code: "PA", dial_code: "+507" },
  { name: "Paraguay", code: "PY", dial_code: "+595" },
  { name: "Perú", code: "PE", dial_code: "+51" },
  { name: "Puerto Rico", code: "PR", dial_code: "+1" },
  { name: "Reino Unido", code: "GB", dial_code: "+44" },
  { name: "Rusia", code: "RU", dial_code: "+7" },
  { name: "Uruguay", code: "UY", dial_code: "+598" },
  { name: "Venezuela", code: "VE", dial_code: "+58" },
];

// Validador inteligente de dominios de correo populares (Typos comunes)
const COMMON_DOMAINS: { [key: string]: string } = {
  "gmil.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmial.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahor.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "hotmai.com": "hotmail.com",
  "hotmaill.com": "hotmail.com",
};

export function checkEmailTypo(email: string): string | null {
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const domain = parts[1].toLowerCase();
  if (COMMON_DOMAINS[domain]) {
    return `${parts[0]}@${COMMON_DOMAINS[domain]}`;
  }
  return null;
}