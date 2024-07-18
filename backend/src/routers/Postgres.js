import express from "express";
import {
  saveTranslation,
  getMessages,
  connectPosgrest,
} from "../functions/TranslateF.js";

const router = express.Router();

router.get("/postgresSQL/connect", async (req, res) => {
  try {
    await connectPosgrest();
    res.json({ message: "Successfully connected to Postgres DB" });
  } catch (err) {
    console.error("[router.get.postgresSQL] Error:", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.get("/postgresSQL/test", async (req, res) => {
  try {
    await saveTranslation();
    res.json({ message: "The values have been inserted successfully." });
  } catch (err) {
    console.error("[router.get.postgresSQL.test] Error:", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.get("/postgresSQL/messages", async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    console.error("[router.get.postgresSQL.messages] Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
