import pdfParse from "pdf-parse";

export const processCV = async (buffer: Buffer, mimetype: string) => {
  if (mimetype !== "application/pdf") {
    throw new Error("Formato no soportado. Solo se aceptan archivos PDF.");
  }

  const data = await pdfParse(buffer);
  const text = data.text.toLowerCase();

  // Extraer datos usando RegEx mejoradas
  const nameMatch = text.match(/nombre[:\s]+([\p{L}\s-]+)/ui);
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  const experienceMatch = text.match(/experiencia[:\s]+(\d+)\s*(?:años|año)?/i);
  const educationMatch = text.match(/educación[:\s]+([\p{L}\d\s,.-]+)/ui);
  const skillsMatch = text.match(/habilidades[:\s]+([\p{L}\d\s,.-]+)/ui);

  return {
      name: nameMatch ? nameMatch[1].trim() : "Desconocido",
      email: emailMatch ? emailMatch[0] : "No especificado",
      experience: experienceMatch ? parseInt(experienceMatch[1]) : 0,
      education: educationMatch ? educationMatch[1].trim() : "No especificado",
      skills: skillsMatch ? skillsMatch[1].split(",").map(skill => skill.trim()) : [],
  };

};
