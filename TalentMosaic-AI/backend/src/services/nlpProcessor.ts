import { pipeline, TokenClassificationPipeline } from "@huggingface/transformers";

let nerPipeline: TokenClassificationPipeline;

const initializeNerPipeline = async () => {
  nerPipeline = (await pipeline("ner")) as TokenClassificationPipeline;
};

initializeNerPipeline();

interface NEREntity {
  entity: string;
  score: number;
  index: number;
  word: string;
  start?: number; // Allow undefined to prevent type errors
  end?: number;
}

// Ensure that we always work with an array
const ensureArray = (output: any): NEREntity[] => {
  return Array.isArray(output) ? output : [output];
};

export const analyzeCV = async (text: string) => {
  if (!nerPipeline) {
    throw new Error("NER pipeline is not initialized yet.");
  }

  const rawEntities = await nerPipeline(text);
  const entities: NEREntity[] = ensureArray(rawEntities); // Ensure it's always an array

  const experience = entities.find((e) => e.entity.includes("EXPERIENCE"))?.word || "No especificado";
  const education = entities.find((e) => e.entity.includes("EDUCATION"))?.word || "No especificado";
  const skills = entities.filter((e) => e.entity.includes("SKILL")).map((s) => s.word);

  return { experience, education, skills };
};
