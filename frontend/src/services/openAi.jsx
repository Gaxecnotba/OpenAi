import OpenAI from "openai";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const key = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export async function getTranslation(
  language,
  message,
  model,
  version,
  languageselected
) {
  try {
    const response = await fetch(`${backend_url}/api/render/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        message,
        model,
        version,
        languageselected,
      }),
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
