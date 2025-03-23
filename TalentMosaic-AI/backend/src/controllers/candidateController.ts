import db from "../config/db";
import { PDFParser } from "../services/pdfParser";

class CandidateController {
    serialize(candidate: any) {
        return {
            id: candidate.id,
            companyId: candidate.companyId,
            source: candidate.source,
            linkedinProfile: candidate.linkedinProfile,
            resume: candidate.resume,
            skills: candidate.skills,
            experience: candidate.experience,
            education: candidate.education,
            location: candidate.location,
            createdAt: candidate.createdAt ? candidate.createdAt.toISOString() : null,
            updatedAt: candidate.updatedAt ? candidate.updatedAt.toISOString() : null,
        };
    }

    deserialize(row: any) {
        return {
            id: row.id,
            companyId: row.company_id,
            source: row.source,
            linkedinProfile: row.linkedin_profile,
            resume: row.resume,
            skills: row.skills,
            experience: row.experience,
            education: row.education,
            location: row.location,
            createdAt: row.created_at ? new Date(row.created_at) : null,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
        };
    }

    async getAllCandidates() {
        const query = "SELECT * FROM candidates";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }

    async getCandidateById(id: string) {
        const query = "SELECT * FROM candidates WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }

    async createCandidate(candidate: any) {
        const serializedCandidate = this.serialize(candidate);
        const query = `
            INSERT INTO candidates (company_id, source, linkedin_profile, resume, skills, experience, education, location, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) 
            RETURNING *`;
        
        const { rows } = await db.query(query, [
            serializedCandidate.companyId,
            serializedCandidate.source,
            serializedCandidate.linkedinProfile,
            serializedCandidate.resume,
            serializedCandidate.skills,
            serializedCandidate.experience,
            serializedCandidate.education,
            serializedCandidate.location,
        ]);
        return rows[0];
    }

    async updateCandidate(id: string, candidate: any) {
        const serializedCandidate = this.serialize(candidate);
        const query = `
            UPDATE candidates SET 
                company_id = COALESCE($1, company_id), 
                source = COALESCE($2, source), 
                linkedin_profile = COALESCE($3, linkedin_profile), 
                resume = COALESCE($4, resume), 
                skills = COALESCE($5, skills), 
                experience = COALESCE($6, experience), 
                education = COALESCE($7, education), 
                location = COALESCE($8, location), 
                updated_at = NOW()
            WHERE id = $9 
            RETURNING *`;
        
        const { rows } = await db.query(query, [
            serializedCandidate.companyId,
            serializedCandidate.source,
            serializedCandidate.linkedinProfile,
            serializedCandidate.resume,
            serializedCandidate.skills,
            serializedCandidate.experience,
            serializedCandidate.education,
            serializedCandidate.location,
            id,
        ]);
        return rows[0];
    }

    async deleteCandidate(id: string) {
        const query = "DELETE FROM candidates WHERE id = $1 RETURNING *";
        const { rows } = await db.query(query, [id]);
        return rows[0]; // Retorna el candidato eliminado
    }

    private SECTION_KEYWORDS: Record<string, string[]> = {
        experience: [
            "experience", "work experience", "employment history", "career history",
            "job experience", "professional experience", "work history", "relevant experience",
            "background", "historial laboral", "experiencia profesional", "empleo",
            "trayectoria profesional", "historia laboral", "vida laboral", "historial de trabajo",
            "carrera profesional", "puestos desempeñados", "proyectos profesionales", "mis trabajos"
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

    private mapSections(text: string): Record<string, string | string[]> {
        if (typeof text !== "string") {
            console.error("Error: El texto no es un string", text);
            return {};
        }
    
        const sections: Record<string, string | string[]> = {
            about: "",
            experience: "",
            education: "",
            skills: [],
            location: "",
            languages: "",
            certifications: "",
            projects: "",
            academic_data: "",
        };
    
        const lines = text.split("\n").map(line => line.trim().toLowerCase());
        let currentSection: string | null = null;
    
        for (const line of lines) {
            for (const [section, keywords] of Object.entries(this.SECTION_KEYWORDS)) {
                if (keywords.some((keyword) => line.includes(keyword.toLowerCase()))) {
                    currentSection = section;
                    break;
                }
            }
    
            if (currentSection) {
                if (Array.isArray(sections[currentSection])) {
                    (sections[currentSection] as string[]).push(line);
                } else {
                    sections[currentSection] = (sections[currentSection] as string) + "\n" + line;
                }
            }
        }
    
        return sections;
    }

    async processCandidateCV(fileBuffer: Buffer) {
        try {
            const extractedData = await PDFParser.extractTextFromBuffer(fileBuffer);
    
            if (!extractedData || extractedData.error) {
                throw new Error("No se pudo extraer información válida del CV.");
            }
    
            console.log("📌 Datos extraídos y organizados:", extractedData);
    
            const newCandidate = await db.query(`
                INSERT INTO candidates (company_id, source, resume, skills, experience, education, location, created_at)
                VALUES (NULL, 'cv_upload', $1, $2, $3, $4, $5, NOW()) RETURNING *`,
                [
                    JSON.stringify(extractedData),
                    extractedData.skills.join(", "),
                    extractedData.experience,
                    extractedData.education,
                    extractedData.location
                ]
            );
    
            console.log("✅ Candidato creado con éxito:", newCandidate.rows[0]);
            return newCandidate.rows[0];
    
        } catch (error) {
            console.error("❌ Error procesando el CV:", error);
            throw new Error("No se pudo procesar el CV");
        }
    }
    
    
}

export const candidateController = new CandidateController();
