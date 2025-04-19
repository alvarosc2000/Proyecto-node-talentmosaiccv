import pdfParse from "pdf-parse";
import { franc } from "franc";
import translate from "google-translate-api-x";

export class PDFParser {
    static sectionSynonyms = {
        about: [
            "resumen", "sobre mí", "perfil profesional", "perfil", "acerca de mí", "presentación", "bio"
        ],
        experience: [
            "experience", "work experience", "employment history", "career history",
            "job experience", "professional experience", "work history", "relevant experience",
            "background", "historial laboral", "experiencia profesional", "empleo",
            "trayectoria profesional", "historia laboral", "vida laboral", "historial de trabajo",
            "carrera profesional", "Perfil Profesional", "puestos desempeñados", "proyectos profesionales", "mis trabajos"
        ],
        education: [
            "education", "academic background", "studies", "educational background",
            "schooling", "academic history", "training", "educational qualifications",
            "formation", "diplomas", "certificaciones académicas", "titulaciones", "nivel educativo",
            "grados obtenidos", "carrera universitaria", "universidad", "institución académica",
            "preparación académica", "postgrados", "doctorados", "formación complementaria"
        ],
        skills: [
            "skills", "technical skills", "competencies", "abilities", "capabilities",
            "hard skills", "soft skills", "aptitudes", "expertise", "tech stack",
            "tools used", "habilidades", "conocimientos", "aptitudes técnicas",
            "capacidades", "conocimientos técnicos", "habilidades digitales",
            "habilidades profesionales", "software manejado", "conocimientos específicos",
            "tecnologías manejadas", "frameworks", "librerías", "lenguajes de programación"
        ],
        languages: [
            "languages", "spoken languages", "language proficiency", "linguistic abilities",
            "bilingual", "multilingual", "fluency", "idiomas", "lenguas habladas",
            "conocimientos de idiomas", "competencias lingüísticas", "idiomas dominados",
            "idiomas hablados", "idiomas conocidos", "lenguas extranjeras", "fluidez en idiomas",
            "niveles de idioma", "idiomas nativos", "lenguaje de negocios"
        ],
        certifications: [
            "certifications", "certs", "diplomas", "professional certifications",
            "training", "credentials", "licenses", "accreditations", "certifications obtained",
            "certificaciones", "cursos", "diplomados", "títulos", "licencias profesionales",
            "habilitaciones", "formación especializada", "certificados de competencia",
            "cursos aprobados", "certificados oficiales"
        ],
        projects: [
            "projects", "portfolio", "side projects", "freelance work", "research projects",
            "trabajos freelance", "proyectos personales", "colaboraciones", "investigaciones",
            "desarrollo de proyectos", "trabajos previos", "implementaciones"
        ],
        personal_info: [
            "personal information", "contact details", "profile", "perfil",
            "información personal", "datos personales", "contacto",
            "nombre", "correo electrónico", "dirección", "teléfono",
            "perfil profesional", "resumen personal", "bio", "sobre mí"
        ],
        academic_data: [
            "degrees", "diplomas", "postgraduate", "phd", "masters", "doctorate",
            "títulos universitarios", "estudios superiores", "especializaciones",
            "maestrías", "doctorados", "grados académicos", "investigaciones académicas"
        ]
    };

    static cities = [
        // **España**
        "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "málaga", "murcia", "palma de mallorca", "las palmas de gran canaria", 
        "bilbao", "alicante", "córdoba", "vigo", "valladolid", "a coruña", "granada", "oviedo", "san sebastián", "toledo", "salamanca", 
        "león", "santiago de compostela", "burgos", "gijón", "cádiz", "tarragona", "alcoy", "pamplona", "huelva", "girona", 
        "fuenlabrada", "lérida", "sabadell", "badalona", "hospitalet de llobregat",
    
        // **Europa (ajustado a ciudades relevantes para desarrolladores de software y tecnología)**
    
        // **Reino Unido**
        "londres", "manchester", "birmingham", "glasgow", "edinburgo",
    
        // **Alemania**
        "berlín", "munich", "hamburgo", "fráncfort", "stuttgart",
    
        // **Francia**
        "parís", "lyon", "toulouse",
    
        // **Países Bajos (Holanda)**
        "Ámsterdam", "rotterdam", "utrecht",
    
        // **España**
        "madrid", "barcelona",
    
        // **Suecia**
        "estocolmo", "gotemburgo",
    
        // **Irlanda**
        "dublín", // Un hub clave para el desarrollo de software, con muchas empresas de tecnología
    
        // **Finlandia**
        "helsinki",
    
        // **Suiza**
        "zúrich", "ginebra",
    
        // **Estonia**
        "tallin", // Reconocida por su ecosistema de startups y su gobierno digital
    
        // **Portugal**
        "lisboa", "porto",
    
        // **Polonia**
        "varsovia", "cracovia", "wroclaw", "poznan", // Con un crecimiento tecnológico significativo
    
        // **Hungría**
        "budapest",
    
        // **Rumanía**
        "bucarest", "cluj-napoca", // Hubs tecnológicos en Europa del Este
    
        // **Serbia**
        "belgrado",
    
        // **Rest of the World (Resto del Mundo)**
    
        // **América del Norte**
        "nueva york", "los ángeles", "san francisco", "miami", "toronto", "montreal", "vancouver", "chicago", "boston", "dallas", "austin",
    
        // **América Latina**
        "sao paulo", "buenos aires", "méxico df", "santiago de chile", "bogotá", "rio de janeiro", "lima", "quito", "caracas", "monterrey",
    
        // **Asia**
        "tokio", "shanghái", "beijing", "singapur", "bangkok", "mumbai", "delhi", "seúl", "manila", "dubai", "ho chi minh", "kuala lumpur", "jakarta", "seúl", "hong kong", "taipei", "dhaka", "karachi", "ho chi minh city", "islamabad", "chennai", "mumbai", "bengaluru", "chandigarh",
    
        // **Oceanía**
        "sídney", "melbourne", "auckland", "wellington", "brisbane", 
    
        // **África**
        "johannesburgo", "cairo", "lagos", "nairobi", "cape town", "abidjan", "addis abeba", "casablanca", "tunis", "dakar", "accra", "kinshasa",
    
        // **Oceanía**
        "sídney", "melbourne", "auckland", "wellington", "brisbane", "perth", 
    
        // **Medio Oriente**
        "dubai", "riyad", "tel aviv", "amman", "beirut", "doha", "abu dhabi"
    ];
    
    
    static async extractTextFromBuffer(buffer: Buffer): Promise<any> {
        try {
            const data = await pdfParse(buffer);
            let text = data.text.toLowerCase().trim();

            if (!text || text.length < 20) throw new Error("El texto extraído es demasiado corto");

            // 🔹 Limpieza de texto
            text = text
                .replace(/\S+@\S+\.\S+/g, "[EMAIL REMOVIDO]")
                .replace(/\+?\d[\d\s\-().]{8,}/g, "[TELÉFONO REMOVIDO]");

            // 🔹 Traducción si es necesario
            const detectedLang = franc(text);
            if (detectedLang !== "spa") {
                const translated = await translate(text, { to: "es" });
                text = translated.text.toLowerCase();
            }

            // 🔍 Helper para encontrar sección por sinónimos
            const extractSection = (text: string, keywords: string[]): string => {
                const regex = new RegExp(
                    `(${keywords.join("|")})\\s*[:\\-\\n]?\\s*([\\s\\S]*?)(?=\\n\\s*(${Object.values(this.sectionSynonyms).flat().join("|")})\\s*[:\\-\\n]|$)`,
                    "i"
                );
                const match = text.match(regex);
                return match ? match[2].trim() : "";
            };

            // 📍 Ubicaciones comunes (ahora ciudades principales)
            const locationMatch = text.match(
                new RegExp(`(${this.cities.join("|")})`, "i")
            );
            const location = locationMatch ? locationMatch[1] : "Desconocida";

            // 🔍 Extraer secciones
            const aboutRaw = extractSection(text, this.sectionSynonyms.about);
            const experienceRaw = extractSection(text, this.sectionSynonyms.experience);
            let educationRaw = extractSection(text, this.sectionSynonyms.education);
            let skillsRaw = extractSection(text, this.sectionSynonyms.skills);
            const languagesRaw = extractSection(text, this.sectionSynonyms.languages);
            const certificationsRaw = extractSection(text, this.sectionSynonyms.certifications);

            // ✂️ Cortar educación si contiene otras secciones
            educationRaw = educationRaw.split(/(idiomas|certificaciones|proyectos personales)/i)[0]?.trim() || educationRaw;

            // 🛠 Parseadores comunes
            const listFromRaw = (raw: string): string[] =>
                raw.split(/•|\n|,|;|\|/).map(s => s.trim()).filter(s => s.length > 2);

            const skills = skillsRaw ? listFromRaw(skillsRaw) : ["Desconocidas"];
            const languages = languagesRaw ? listFromRaw(languagesRaw) : ["Desconocidos"];
            const certifications = certificationsRaw ? listFromRaw(certificationsRaw) : ["Desconocidas"];

            // ⏳ Extraer años de experiencia si hay
            let experience = 0;
            const yearMatches = [...experienceRaw.matchAll(/(\d{4})\s*[-–]\s*(\d{4}|actualidad|presente)/gi)];
            console.log("Años de experiencia encontrados:", yearMatches);  // Debugging line
            if (yearMatches.length) {
                experience = yearMatches.reduce((acc, match) => {
                    const start = parseInt(match[1]);
                    const end = match[2].match(/actualidad|presente/i) ? new Date().getFullYear() : parseInt(match[2]);
                    return acc + (end - start);
                }, 0);
            } else {
                // Si no se encuentran rangos de fechas explícitos, intentamos buscar experiencias relacionadas con roles
                const estimatedRoles = experienceRaw.split(/\n/).filter(line =>
                    /(desarrollador|engineer|programador|analista|consultor|cto|freelance|intern)/i.test(line)
                );
                console.log("Roles estimados:", estimatedRoles);  // Debugging line
                if (estimatedRoles.length) {
                    experience = estimatedRoles.length;
                } else {
                    // Si no encontramos coincidencias claras, se intenta estimar experiencia de alguna otra forma,
                    // como un valor predeterminado o la cantidad de líneas que coinciden con ciertos patrones.
                    experience = experienceRaw.split(/\n/).length; // Esto podría no ser perfecto, pero es una aproximación
                }
            }

            const extractedData = {
                about: aboutRaw || "No disponible",
                experience,
                education: educationRaw || "No disponible",
                skills,
                location,
                languages,
                certifications
            };

            console.log("📦 Datos extraídos:", extractedData);
            return extractedData;
        } catch (err) {
            console.error("❌ Error al procesar el PDF:", err);
            return { error: "No se pudo procesar el PDF" };
        }
    }
}
