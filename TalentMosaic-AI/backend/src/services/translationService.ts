import { Translator, TargetLanguageCode } from "deepl-node";

const translator = new Translator("YOUR_DEEPL_API_KEY");

export const detectLanguage = async (text: string) => {
  const detectedLang = await translator.translateText(text, null, "en" as TargetLanguageCode);
  return detectedLang.detectedSourceLang;
};

export const translateText = async (text: string, targetLang: TargetLanguageCode) => {
  const translated = await translator.translateText(text, null, targetLang);
  return translated.text;
};
