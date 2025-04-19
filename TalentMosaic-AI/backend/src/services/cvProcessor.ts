import pdfParse from "pdf-parse";
import { franc } from "franc";
import translate from "google-translate-api-x";

// 📌 Diccionario ampliado de sinónimos para cada sección del CV
const sectionAliases: Record<string, string[]> = {
    resume: [
        "resumen", "perfil", "sobre mí", "introducción", "summary", "about me", "profile", "biografía", 
        "career summary", "Perfil Profesional", "professional summary", "personal statement", "objectives", "goal", "objetivos"
    ],
    education: [
        "educación", "datos académicos", "formación académica", "estudios", "títulos", "academic background",
        "education", "qualifications", "certificaciones", "diplomas", "estudios realizados", "titulación", 
        "credenciales", "nivel académico", "preparación académica"
    ],
    experience: [
        "experiencia", "historial laboral", "empleo", "trabajo", "work experience", "career", "job history",
        "experiencia profesional", "trayectoria", "empleador", "puestos desempeñados", "ocupación", "cargos previos",
        "experiencia en el sector", "experiencia en la industria", "historial de empleo"
    ],
    skills: [
        "habilidades", "destacados de habilidades", "competencias", "aptitudes", "skills", "strengths", "technical skills", "soft skills",
        "hard skills", "conocimientos", "capacidades", "destrezas", "experiencia técnica", "habilidades técnicas",
        "habilidades interpersonales", "fortalezas profesionales", "conocimientos adquiridos"
    ],
    location: [
        "ubicación", "dirección", "residencia", "país", "ciudad", "location", "address", "domicilio",
        "lugar de residencia", "zona de residencia", "lugar de trabajo", "país de residencia", "provincia", "estado"
    ],
    languages: [
        "idiomas", "languages", "lenguas", "conocimientos lingüísticos", "fluidez", "competencia lingüística"
    ]
};

// 📌 Expresiones regulares avanzadas para anonimizar datos sensibles
const personalDataPatterns = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /\b\d{9,15}\b/g,
    address: /\b(calle|av\.?|avenida|paseo|plaza|camino|carretera|edificio|torre)\s+([a-záéíóú]+\s?\d*\w*)\b/gi,
    social: /(linkedin\.com\/in\/[a-zA-Z0-9-]+|github\.com\/[a-zA-Z0-9-]+)/gi
};

// 📌 Función mejorada para extraer texto de una sección
const extractSection = (text: string, aliases: string[]): string => {
    const regex = new RegExp(`(?:${aliases.join("|")})[:\\s\\-\\n]*(.*?)(?=\\n\\n|$)`, "is");
    return text.match(regex)?.[1]?.trim() || "";
};

// 📌 Extracción mejorada de educación
const extractEducation = (text: string): string => {
    let education = extractSection(text, sectionAliases.education);

    if (!education) {
        const educationMatch = text.match(/\b(grado|ingeniería|universidad|máster|licenciatura)\b.*?(?=\n|$)/gi);
        if (educationMatch) {
            education = educationMatch.join(" ");
        }
    }

    return education || "Desconocido";
};

// 📌 Anonimización de datos personales
const anonymizeData = (text: string): string => {
    return text
        .replace(personalDataPatterns.email, "[EMAIL_ANONIMIZADO]")
        .replace(personalDataPatterns.phone, "[TELÉFONO_ANONIMIZADO]")
        .replace(personalDataPatterns.address, "[DIRECCIÓN_ANONIMIZADA]")
        .replace(personalDataPatterns.social, "[RED_SOCIAL_ANONIMIZADA]");
};

// 📌 Procesador de CVs en PDF
export const processCV = async (buffer: Buffer): Promise<any> => {
    try {
        const data = await pdfParse(buffer);
        let text: string = data.text.toLowerCase().replace(/\s+/g, " ");

        console.log("📌 Texto extraído antes de parsear:\n", text);

        // 🔹 Detectar idioma y traducir si es necesario
        const detectedLang: string = franc(text);
        if (detectedLang !== "spa" && detectedLang !== "und") {
            console.log("🌍 Traduciendo CV...");
            const translated = await translate(text, { to: "es" });
            text = translated.text.toLowerCase();
        }

        // 🔹 Extraer información estructurada
        const sections = Object.fromEntries(
            Object.entries(sectionAliases).map(([key, aliases]) => [key, extractSection(text, aliases)])
        );

        // 🔹 Extraer educación
        sections.education = extractEducation(text);

        // 🔹 Anonimizar datos personales
        sections.resume = anonymizeData(sections.resume);

        // 📅 Calcular años de experiencia
        let experienceYears = 0;
        const experienceMatches = [...sections.experience.matchAll(/(\d{4})\s*-\s*(\d{4}|actualidad|presente)/gi)];
        if (experienceMatches.length > 0) {
            experienceYears = experienceMatches.reduce((total, match) => {
                const startYear = parseInt(match[1], 10);
                const endYear = match[2] === "actualidad" || match[2] === "presente"
                    ? new Date().getFullYear()
                    : parseInt(match[2], 10);
                return total + (endYear - startYear);
            }, 0);
        }
        if (experienceYears === 0 && experienceMatches.length > 0) experienceYears = 1;

        // 🛠 Convertir habilidades en lista formateada
        const skillsList = sections.skills
            ? sections.skills.split(/[,.-]/).map(skill => skill.trim()).filter(skill => skill.length > 2)
            : ["No especificadas"];

        // 📍 Extraer ubicación
        let location = sections.location.trim();
        if (!location) {
            const cityMatch = text.match(/\b(madrid|barcelona|londres|nueva york|parís|berlín|buenos aires|bogotá|lima|mexico city)\b/i);
            if (cityMatch) location = cityMatch[0].trim();
        }
        if (!location) location = "Desconocida";

        // 🔹 Extraer idiomas
        const languages = extractSection(text, sectionAliases.languages);

        // 🚨 Detectar secciones faltantes
        const missingFields: string[] = Object.entries(sections).filter(([_, value]) => !value).map(([key]) => key);

        // 📌 Retornar JSON estructurado
        return {
            message: "CV procesado exitosamente",
            candidate: {
                resume: sections.resume || "No especificado",
                skills: skillsList,
                experience: experienceYears,
                education: sections.education,
                location,
                languages: languages || "No especificados",
                missingSections: missingFields.length > 0 ? missingFields : null
            }
        };

    } catch (error) {
        console.error("❌ Error al procesar el CV:", error);
        return { error: "No se pudo procesar el CV correctamente" };
    }
};
