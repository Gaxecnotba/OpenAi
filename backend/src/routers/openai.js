import express from "express";
import { OpenAI } from "openai";
require("dotenv").config();

const router = express.Router();

const {
  connectPosgrest,
  saveTranslation,
  getMessages,
  insertMessage,
} = require("../functions/TranslateF");

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "sk-proj-UshssxCUzfHhdcY6GKJKT3BlbkFJNCvJWUaUSuE1Q7gVhhwB",
});

// Root route
router.get("/", (req, res) => {
  res.json({ message: "Working" });
});

// Example route for OpenAI translation
router.get("/openAi/example", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a sentence in English, and your task is to translate it into French.",
        },
        {
          role: "user",
          content: "My name is Jane. What is yours?",
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    if (response?.choices?.length > 0) {
      const translatedText = response.choices[0].message.content.trim();
      res.json({ translatedText });
    } else {
      console.error("Unexpected API response structure:", response);
      res.status(500).send("Unexpected response structure from OpenAI API.");
    }
  } catch (err) {
    console.error("Something went wrong", err);
    res.status(500).send("An error occurred while processing your request.");
  }
});

router.post("/api/translate", async (req, res) => {
  const { language, message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Translate this into ${language}: ${message}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    if (response?.choices?.length > 0) {
      const translatedText = response.choices[0].message.content.trim();
      res.json({ translatedText });
    } else {
      console.error("Unexpected API response structure:", response);
      res.status(500).send("Unexpected response structure from OpenAI API.");
    }
  } catch (err) {
    console.error("Error with OpenAI API:", err);
    res.status(500).send("An error occurred while translating.");
  }
});

export default router;
