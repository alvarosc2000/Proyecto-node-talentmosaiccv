import pdfParse from "pdf-parse";
import { franc } from "franc";
import translate from "google-translate-api-x";

export class PDFParser {
    static async extractTextFromBuffer(buffer: Buffer): Promise<any> {
        try {
            const data = await pdfParse(buffer);
            let text: string = data.text.toLowerCase().trim();

            if (!text || text.length < 20) {
                throw new Error("El texto extraído es demasiado corto o no es válido");
            }

            console.log("📌 Texto extraído del PDF:\n", text);

            // 🔹 Eliminar emails y números de teléfono
            text = text.replace(/\S+@\S+\.\S+/g, "[EMAIL REMOVIDO]");
            text = text.replace(/\+?\d[\d\s\-\(\)]{8,}/g, "[TELÉFONO REMOVIDO]");

            // 🔹 Detectar idioma
            const detectedLang: string = franc(text);
            console.log("🌍 Idioma detectado:", detectedLang);

            // 🔹 Traducir si no está en español
            if (detectedLang !== "spa") {
                console.log("🔄 Traduciendo a español...");
                const translated = await translate(text, { to: "es" });
                text = translated.text.toLowerCase();
                console.log("✅ Texto traducido:\n", text);
            }

            // 🔹 Extraer información clave
            const aboutMatch = text.match(/resumen\s+([\s\S]*?)(?=\n\w+:|\neducación|$)/);
            const experienceMatch = text.match(/experiencia laboral\s+([\s\S]*?)(?=\neducación|$)/);
            const educationMatch = text.match(/educación\s+([\s\S]*?)(?=\nidiomas|$)/);
            const skillsMatch = text.match(/habilidades\s+([\s\S]*?)(?=\nexperiencia|$)/);
            const languagesMatch = text.match(/idiomas\s+([\s\S]*?)(?=\ncertificaciones|$)/);
            const certificationsMatch = text.match(/certificaciones\s+([\s\S]*?)(?=$|\n)/);

            // 🎓 Extraer educación correctamente
            let education = educationMatch ? educationMatch[1].replace(/\n/g, " ").trim() : "Desconocida";

            // 📅 Extraer años de experiencia correctamente
            let experience = 0;
            const yearMatches = [...(experienceMatch ? experienceMatch[1].matchAll(/(\d{4})\s*-\s*(\d{4}|actualidad|presente)/gi) : [])];
            if (yearMatches.length > 0) {
                experience = yearMatches.reduce((total, match) => {
                    const startYear = parseInt(match[1], 10);
                    const endYear = match[2] === "actualidad" || match[2] === "presente" ? new Date().getFullYear() : parseInt(match[2], 10);
                    return total + (endYear - startYear);
                }, 0);
            }
            if (experience === 0 && experienceMatch) experience = 1; // Si hay experiencia pero no detecta años, asumimos mínimo 1 año.

            // 🏠 Extraer ubicación (si menciona una ciudad o país)
            const locationMatch = text.match(/(nueva york|madrid|londres|parís|berlín|barcelona|tokio|méxico df|são paulo)/i);
            const location = locationMatch ? locationMatch[1] : "Desconocida";

            // 🛠️ Extraer habilidades como lista limpia
            let skills = skillsMatch ? skillsMatch[1].split(/•|\n|,/).map(s => s.trim()).filter(s => s.length > 2) : ["Desconocidas"];

            // 🌍 Extraer idiomas correctamente
            let languages = languagesMatch ? languagesMatch[1].split(/\n|•/).map(l => l.trim()).filter(l => l.length > 2) : ["Desconocidos"];

            // 📜 Extraer certificaciones correctamente
            let certifications = certificationsMatch ? certificationsMatch[1].split(/\n|•/).map(c => c.trim()).filter(c => c.length > 2) : ["Desconocidas"];

            // 📌 Datos extraídos finales
            const extractedData = {
                about: aboutMatch ? aboutMatch[1].replace(/\n/g, " ").trim() : "No disponible",
                experience,
                education,
                skills,
                location,
                languages,
                certifications,
            };

            console.log("📌 Datos extraídos:", extractedData);
            return extractedData;
        } catch (error) {
            console.error("❌ Error al procesar el PDF:", error);
            return { error: "No se pudo procesar el PDF" };
        }
    }
}
