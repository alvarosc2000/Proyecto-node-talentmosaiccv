import { GraphQLResolveInfo } from "graphql";
import db from "../config/db";
import "dotenv/config"; // Para leer variables de entorno

const resolvers = {
    Query: {
        // Obtener ranking de candidatos para un trabajo específico
        getRanking: async (_: any, { jobId }: { jobId: string }) => {
            const result = await db.query(
                "SELECT * FROM candidate_rankings WHERE job_id = $1 ORDER BY score DESC",
                [jobId]
            );
            return result.rows;
        },

        // Obtener el ranking de un candidato específico
        getCandidateRanking: async (_: any, { candidateId }: { candidateId: string }) => {
            const result = await db.query(
                "SELECT * FROM candidate_rankings WHERE candidate_id = $1",
                [candidateId]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        }
    },

    Mutation: {
        // Generar ranking de candidatos para un jobId
        createRanking: async (_: any, { input }: { input: { jobId: string } }) => {
            try {
                console.log(`🔹 Iniciando ranking para jobId: ${input.jobId}`);

                // 1️⃣ Obtener la oferta de trabajo
                const job = await db.query(
                    "SELECT job_title, description, skills_required, location FROM jobs WHERE id = $1",
                    [input.jobId]
                );
                if (job.rowCount === 0) throw new Error("❌ Job not found");

                const { job_title, description, skills_required, location: jobLocation } = job.rows[0];

                // 2️⃣ Obtener los dos primeros candidatos con su información
                const candidates = await db.query(
                    "SELECT id, resume, skills, experience, education, location FROM candidates LIMIT 2"
                );
                if (candidates.rowCount === 0) throw new Error("❌ No candidates found");

                // 3️⃣ Generar ranking basado en pesos
                const rankedCandidates = candidates.rows.map(candidate => {
                    let score = 0;

                    // 🛠️ Tecnologías (50%)
                    const jobSkills: string[] = skills_required.split(", ").map((s: string) => s.toLowerCase());
                    const candidateSkills: string[] = candidate.skills.split(", ").map((s: string) => s.toLowerCase());
                    const matchedSkills: number = jobSkills.filter((skill: string) => candidateSkills.includes(skill)).length;
                    const techScore: number = (matchedSkills / jobSkills.length) * 50;
                    score += techScore;


                    // 📍 Localización (20%)
                    const locationScore = candidate.location === jobLocation ? 20 : 0;
                    score += locationScore;

                    // 🏆 Experiencia (20%)
                    const experienceScore = Math.min(candidate.experience * 2, 20); // Máx 10 años de experiencia = 20 pts
                    score += experienceScore;

                    // 🎓 Educación (10%)
                    const educationScore = candidate.education.includes("Computer Science") ? 10 : 5;
                    score += educationScore;

                    // Compatibilidad en porcentaje
                    const compatibility = score / 100;

                    return {
                        id: candidate.id,
                        score: Math.round(score),
                        compatibility: compatibility.toFixed(2),
                        status: "pending"
                    };
                });

                // 4️⃣ Guardar ranking en la base de datos
                console.log(`✅ Guardando ranking en BD...`);
                await Promise.all(
                    rankedCandidates.map(({ id, score, compatibility, status }) =>
                        db.query(
                            `INSERT INTO candidate_rankings (candidate_id, job_id, score, compatibility, status) 
                             VALUES ($1, $2, $3, $4, $5) 
                             ON CONFLICT (candidate_id, job_id) 
                             DO UPDATE SET score = EXCLUDED.score, compatibility = EXCLUDED.compatibility, status = EXCLUDED.status`,
                            [id, input.jobId, score, compatibility, status]
                        )
                    )
                );

                console.log(`🎉 Ranking generado con éxito.`);
                return rankedCandidates;
            } catch (error) {
                console.error("❌ Error en createRanking:", error);
                throw new Error("No se pudo generar el ranking.");
            }
        },

        // Actualizar el score de un candidato en el ranking
        updateRanking: async (_: any, { id, score }: { id: string, score: number }) => {
            try {
                await db.query(
                    "UPDATE candidate_rankings SET score = $1 WHERE candidate_id = $2",
                    [score, id]
                );
                return { id, score };
            } catch (error) {
                console.error("❌ Error en updateRanking:", error);
                throw new Error("No se pudo actualizar el ranking.");
            }
        },

        // Eliminar un ranking de un candidato
        deleteRanking: async (_: any, { id }: { id: string }) => {
            try {
                await db.query("DELETE FROM candidate_rankings WHERE candidate_id = $1", [id]);
                return true;
            } catch (error) {
                console.error("❌ Error en deleteRanking:", error);
                throw new Error("No se pudo eliminar el ranking.");
            }
        }
    }
};

export default resolvers;
