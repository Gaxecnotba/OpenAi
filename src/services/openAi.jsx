import OpenAI from "openai";

const key = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export async function getTranslation(language, message, model) {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Translate this into ${language}: ${message}`,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.choices[0].message.content.trim();
}
