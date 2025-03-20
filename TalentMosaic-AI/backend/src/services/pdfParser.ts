import pdfParse from "pdf-parse";
import { franc } from "franc";
import translate from "google-translate-api-x";  // 📌 Traducción automática

export class PDFParser {
    static async extractTextFromBuffer(buffer: Buffer) {
        const data = await pdfParse(buffer);
        let text = data.text.toLowerCase().replace(/\s+/g, " ");

        console.log("📌 Texto extraído del PDF:\n", text);

        // 🔹 Eliminar emails
        text = text.replace(/\S+@\S+\.\S+/g, "[EMAIL REMOVIDO]");
        
        // 🔹 Anonimizar nombres cuando aparece "actualidad"
        text = text.replace(/(\b[a-z]+\s+[a-z]+\b)(?=\s+actualidad)/gi, "[NOMBRE REMOVIDO]");

        // 🔹 Detectar idioma del CV
        const detectedLang = franc(text);
        console.log("🌍 Idioma detectado:", detectedLang);

        // 🗣 Traducir a español si no está en español
        if (detectedLang !== "spa") {
            console.log("🔄 Traduciendo a español...");
            const translated = await translate(text, { to: "es" });
            text = translated.text.toLowerCase();
            console.log("✅ Texto traducido:\n", text);
        }

        // 🔹 Diccionario de secciones
        const keywords = {
            about: ["sobre mí", "resumen"],
            education: ["educación", "formación académica"],
            experience: ["experiencia laboral", "historial laboral"],
            skills: ["habilidades", "competencias"],
            languages: ["idiomas", "lenguas"],
            location: ["ubicación", "dirección"]
        };

        // 🔹 Función para extraer secciones
        function buscarSeccion(texto: string, keywords: string[]): string {
            const regex = new RegExp(`(?:${keywords.join("|")})(.*?)(?=\\n\\n|$)`, "is");
            return texto.match(regex)?.[1]?.trim() || "";
        }

        // 🔹 Extraer información clave
        const sections = {
            about: buscarSeccion(text, keywords.about),
            education: buscarSeccion(text, keywords.education),
            experience: buscarSeccion(text, keywords.experience),
            skills: buscarSeccion(text, keywords.skills),
            languages: buscarSeccion(text, keywords.languages),
            location: buscarSeccion(text, keywords.location)
        };

        // 🎓 Extraer educación (evitar "No especificado")
        let education = sections.education.trim();
        if (!education || education.length < 5) education = "Desconocido";

        // 📅 Extraer experiencia como número
        let experience = 0;
        const experienceMatches = [...sections.experience.matchAll(/(\d{4})\s*-\s*(\d{4}|actualidad|presente)/gi)];
        if (experienceMatches.length > 0) {
            experience = experienceMatches.reduce((total, match) => {
                const startYear = parseInt(match[1], 10);
                const endYear = match[2] === "actualidad" || match[2] === "presente" ? new Date().getFullYear() : parseInt(match[2], 10);
                return total + (endYear - startYear);
            }, 0);
        }
        if (experience === 0 && experienceMatches.length > 0) experience = 1;

        // 🛠 Extraer habilidades (lista limpia)
        let skillsList: string[] = [];
        if (sections.skills) {
            skillsList = sections.skills.split(/[,.-]/).map(skill => skill.trim()).filter(skill => skill.length > 2);
        }

        // 📍 Extraer ubicación (evitar "No especificado")
        let location = sections.location.trim();
        if (!location) {
            const cityMatch = text.match(/\b(madrid|barcelona|málaga|valencia|sevilla|bilbao|granada|zaragoza|murcia|alicante|córdoba|valladolid|santander|toledo|salamanca|vigo|gijón|la coruña|oviedo|almería)\b/i);
            if (cityMatch) location = cityMatch[0].trim();
        }
        if (!location) location = "Desconocida";

        // 📌 Datos extraídos finales (evitando errores)
        const extractedData = {
            about: sections.about || "Desconocido",
            experience,
            education,
            skills: skillsList.length > 0 ? skillsList : ["Desconocidas"],
            location,
            languages: sections.languages || "Desconocidos"
        };

        console.log("📌 Datos extraídos:", extractedData);

        return extractedData;
    }
}
