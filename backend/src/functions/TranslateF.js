import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Client } = pkg;

export const connectPosgrest = async () => {
  const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB,
  });
  await client.connect();
  return client;
};

export const getMessages = async () => {
  const client = await connectPosgrest();
  try {
    const res = await client.query('SELECT * FROM "Chatgpt"."Translate"');
    return res.rows;
  } catch (err) {
    console.error("Error executing the query:", err);
  } finally {
    await client.end();
  }
};

export const insertMessage = async (message, translation, language, model) => {
  const client = await connectPosgrest();
  try {
    const query = `INSERT INTO "Chatgpt"."Translate" ( message, language, translation, model) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const values = [message, language, translation, model];
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error happened, pls check:", err);
  } finally {
    await client.end();
  }
};

export const saveTranslation = async () => {
  // const message = "Hello, how are you?";
  // const translation = "Bonjour, comment ça va?";
  // const language = "French";

  try {
    const insertedMessage = await insertMessage(
      message,
      translation,
      language,
      model
    );
    console.log("Message inserted:", insertedMessage);
  } catch (error) {
    console.error("Something happened when try to insert the message:", error);
  }
};
