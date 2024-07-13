import express from "express";
import {
  connectPosgrest,
  saveTranslation,
  getMessages,
} from "../functions/TranslateF.js";

const router = express.Router();

router.get("/postgresSQL/connect", async (req, res) => {
  try {
    const client = await connectPosgrest();
    if (client) {
      res.json({ message: "Successfully connected to Postgres DB" });
      client.end();
    } else {
      res.status(400).json({ message: "Unable to connect to DB" });
    }
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
    console.error("[rotuer.get.podtgresSQL.test]:", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

router.get("/postgresSQL/messages", async (req, res) => {
  try {
    const respond = await getMessages();
    res.json({ message: respond });
  } catch (err) {
    console.error("[rotuer.get.podtgresSQL.messages]:", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

export default router;
