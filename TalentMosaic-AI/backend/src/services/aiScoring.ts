import axios from 'axios';
import db from '../config/db';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Asegúrate de colocar tu clave de OpenAI

export const rankCandidates = async (jobDescription: string) => {
    try {
        // Obtener todos los candidatos de la base de datos
        const candidates = await db.query("SELECT * FROM candidates");

        // Definir los pesos para cada criterio
        const weights = {
            skills: 0.4, // 40%
            experience: 0.3, // 30%
            education: 0.2, // 20%
            certifications: 0.1 // 10%
        };

        // Construir el prompt para OpenAI
        const prompt = `
            Eres un experto en recursos humanos. A continuación se proporciona una descripción del trabajo:
            
            ${jobDescription}

            Los siguientes criterios deben ser considerados con las siguientes ponderaciones:
            - Habilidades (40%)
            - Experiencia (30%)
            - Educación (20%)
            - Certificaciones (10%)

            Clasifica a los siguientes candidatos en orden de relevancia, considerando su experiencia, habilidades y formación. 
            Proporciona una lista de candidatos recomendados con un puntaje (del 1 al 10) basado en su adecuación a la descripción del trabajo.

            Candidatos:
            ${candidates.rows.map(candidate => 
                `Candidato ID: ${candidate.id}, Resumen: ${candidate.resume.about}, Skills: ${candidate.skills.join(', ')}, Experience: ${candidate.experience} años, Education: ${candidate.education}`).join('\n')}
        `;

        // Hacer la llamada a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5, // Controlar la creatividad de la respuesta
            max_tokens: 500, // Limitar la longitud de la respuesta
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Procesar la respuesta y devolver los candidatos clasificados
        const rankedCandidates = response.data.choices[0].message.content;
        return rankedCandidates;

    } catch (error) {
        console.error("Error al clasificar candidatos:", error);
        throw new Error("No se pudo clasificar a los candidatos");
    }
};
