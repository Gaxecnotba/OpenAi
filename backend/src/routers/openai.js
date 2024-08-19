import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { insertMessage } from "../functions/TranslateF.js";
import { getTranslation } from "../functions/deepl.js";
import { translateText } from "../functions/geminiAi.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.use(bodyParser.json());

router.get("/openAi/example", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
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
  const { language, message, model, version, languageselected } = req.body;
  if (model == "deepl") {
    try {
      const response = await getTranslation(
        language,
        message,
        languageselected
      );
      console.log("Translation Response:", JSON.stringify(response, null, 2));
      if (response) {
        await insertMessage(
          message,
          response,
          language,
          model,
          languageselected,
          version
        );
        const translatedText = response;
        res.json({ translatedText });
      } else {
        console.error("Unexpected API response structure:", response);
        res.status(500).send("Unexpected response structure from Deepl API.");
      }
    } catch (err) {
      console.error("Error with Deepl API:", err);
      res.status(500).send("An error occurred while translating.");
    }
  }
  if (model == "geminiAi") {
    try {
      const response = await translateText(
        message,
        language,
        version,
        languageselected
      );
      console.log("Translation Response:", JSON.stringify(response, null, 2));
      if (response) {
        await insertMessage(
          message,
          response,
          language,
          model,
          languageselected,
          version
        );
        const translatedText = response;
        res.json({ translatedText });
      } else {
        console.error("Unexpected API response structure:", response);
        res
          .status(500)
          .send("Unexpected response structure from GeminiAi API.");
      }
    } catch (err) {
      console.error("Error with GeminiAi API:", err);
      res.status(500).send("An error occurred while translating.");
    }
  }
  if (model == "gpt") {
    try {
      const response = await openai.chat.completions.create({
        model: version,
        messages: [
          {
            role: "user",
            content: `Translate this ${languageselected} text into ${language}: ${message}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
      });

      console.log("API Response:", JSON.stringify(response, null, 2));
      if (response?.choices?.length > 0) {
        const translatedText = response.choices[0].message.content.trim();
        await insertMessage(
          message,
          response,
          language,
          model,
          languageselected,
          version
        );
        res.json({ translatedText });
      } else {
        console.error("Unexpected API response structure:", response);
        res.status(500).send("Unexpected response structure from OpenAI API.");
      }
    } catch (err) {
      console.error("Error with OpenAI API:", err);
      res.status(500).send("An error occurred while translating.");
    }
  }
});

export default router;
