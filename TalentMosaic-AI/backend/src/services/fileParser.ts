import pdfParse from "pdf-parse";
import mammoth from "mammoth"; // Para DOCX

export const extractTextFromFile = async (buffer: Buffer, fileType: string) => {
  if (fileType.includes("pdf")) {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (fileType.includes("word") || fileType.includes("msword") || fileType.includes("officedocument")) {
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  } else {
    throw new Error("Formato de archivo no soportado");
  }
};
