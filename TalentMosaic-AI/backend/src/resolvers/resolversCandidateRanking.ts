import { GraphQLResolveInfo } from "graphql";
import db from "../config/db";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Usa variables de entorno

const resolvers = {
    Query: {
        // Obtener ranking de candidatos para un trabajo específico
        getRanking: async (_: any, { jobId }: { jobId: string }) => {
            const result = await db.query("SELECT * FROM candidate_rankings WHERE job_id = $1 ORDER BY score DESC", [jobId]);
            return result.rows;
        },

        // Obtener el ranking de un candidato específico
        getCandidateRanking: async (_: any, { candidateId }: { candidateId: string }) => {
            const result = await db.query("SELECT * FROM candidate_rankings WHERE candidate_id = $1", [candidateId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        }
    },

    Mutation: {
        // Generar ranking de candidatos para un jobId usando IA
        createRanking: async (_: any, { input }: { input: { jobId: string } }) => {
            try {
                // 1️⃣ Obtener la oferta de trabajo
                const job = await db.query("SELECT job_title, description FROM jobs WHERE id = $1", [input.jobId]);
                if (job.rowCount === 0) throw new Error("Job not found");
        
                const { job_title, description } = job.rows[0];
        
                // 2️⃣ Obtener todos los candidatos
                const candidates = await db.query("SELECT id, resume FROM candidates");
                if (candidates.rowCount === 0) throw new Error("No candidates found");
        
                // 3️⃣ Construir el prompt para OpenAI
                const prompt = `
                    Oferta de trabajo:
                    - Título: ${job_title}
                    - Descripción: ${description}
        
                    A continuación, clasifica a los siguientes candidatos según su relevancia para esta oferta:
                    ${candidates.rows.map(c => `Candidato ID: ${c.id}, Resumen: ${JSON.stringify(c.resume)}`).join("\n")}
        
                    Devuelve una lista en formato JSON con "id" del candidato y "score" de relevancia entre 0 y 100.
                `;
        
                // Esperar antes de llamar a OpenAI
                await new Promise(resolve => setTimeout(resolve, 2000)); // Retraso de 2 segundos
        
                // 4️⃣ Llamar a OpenAI para generar el ranking
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                }, {
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                });
        
                // Esperar después de recibir la respuesta de OpenAI
                await new Promise(resolve => setTimeout(resolve, 2000)); // Retraso de 2 segundos
        
                // 5️⃣ Procesar respuesta de OpenAI
                const rankedCandidates = JSON.parse(response.data.choices[0].message.content);
        
                // 6️⃣ Guardar ranking en la base de datos
                for (const { id, score } of rankedCandidates) {
                    await db.query(
                        "INSERT INTO candidate_rankings (job_id, candidate_id, score) VALUES ($1, $2, $3) ON CONFLICT (candidate_id) DO UPDATE SET score = EXCLUDED.score",
                        [input.jobId, id, score]
                    );
        
                    // Esperar después de cada inserción para evitar sobrecarga
                    await new Promise(resolve => setTimeout(resolve, 10000)); // Retraso de 1 segundo
                }
        
                return rankedCandidates;
            } catch (error) {
                console.error("Error en createRanking:", error);
                throw new Error("No se pudo generar el ranking.");
            }
        },
        

        // Actualizar el score de un candidato en el ranking
        updateRanking: async (_: any, { id, score }: { id: string, score: number }) => {
            try {
                await db.query("UPDATE candidate_rankings SET score = $1 WHERE id = $2", [score, id]);
                return { id, score };
            } catch (error) {
                console.error("Error en updateRanking:", error);
                throw new Error("No se pudo actualizar el ranking.");
            }
        },

        // Eliminar un ranking de un candidato
        deleteRanking: async (_: any, { id }: { id: string }) => {
            try {
                await db.query("DELETE FROM candidate_rankings WHERE id = $1", [id]);
                return true;
            } catch (error) {
                console.error("Error en deleteRanking:", error);
                throw new Error("No se pudo eliminar el ranking.");
            }
        }
    }
};

export default resolvers;
