import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const authkey = process.env.DEEPL_AUTH_KEY;

const translator = new deepl.Translator(authkey);

// async function translateText() {
//   const result = await translator.translateText("Hello, world!", "en", "fr");
//   console.log(result.text);
// }
// //translateText(text, input language "en" or "pt", output language can be"fr")
// translateText();
const languages = {
  English: "en",
  French: "fr",
  Spanish: "es",
  Italian: "it",
  Portuguese_PT: "pt-PT", // European Portuguese
  Portuguese_BR: "pt-BR", // Brazilian Portuguese
  Portuguese: "pt",
  Japanese: "ja",
};

export const getTranslation = async (language, message, languageselected) => {
  const sourceLang = languages[languageselected];
  const target_lang = languages[language];
  try {
    const response = await translator.translateText(
      message,
      sourceLang,
      target_lang
    );
    return response.text;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
};
