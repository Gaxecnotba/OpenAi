import OpenAI from "openai";

const key = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export async function getTranslation(language, message, model) {
  try {
    const response = await fetch("http://localhost:3100/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language, message, model }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw error;
  }
}
