import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const authkey =
  process.env.DEEPL_AUTH_KEY || "1447a693-e32d-5521-f9ae-10442fb4a1ab:fx";

const translator = new deepl.Translator(authkey);

// async function translateText() {
//   const result = await translator.translateText("Hello, world!", "en", "fr");
//   console.log(result.text);
// }
// //translateText(text, input language "en" or "pt", output language can be"fr")
// translateText();

export const getTranslation = async (language, message) => {
  let target_lang;
  if (language === "French") {
    target_lang = "fr";
  }
  if (language === "Spanish") {
    target_lang = "es";
  }
  if (language === "Italian") {
    target_lang = "it";
  }
  if (language === "Portuguese") {
    target_lang = "pt";
  }
  if (language === "Japanese") {
    target_lang = "ja";
  }
  try {
    const response = await translator.translateText(message, "en", target_lang);
    return response.text;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
};
