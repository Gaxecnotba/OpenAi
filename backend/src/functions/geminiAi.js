import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.KEY_GEMINI);

export async function translateText(text, language, version, languageselected) {
  const model = genAi.getGenerativeModel({
    model: version,
  });
  const prompt = `Translate the following ${languageselected} text to ${language}: ${text}, just give the translation.`;
  try {
    const result = await model.generateContent(prompt);
    console.log("Response from GeminiAi API:", JSON.stringify(result));

    if (result) {
      const translatedText = result.response.text();
      return translatedText;
    } else {
      throw new Error(
        "Unexpected API response structure: No 'candidates' found"
      );
    }
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
}

// // Example usage
// translateText("Hello, world!", "es")
//   .then((translatedText) => console.log(translatedText))
//   .catch((error) => console.error(error));
