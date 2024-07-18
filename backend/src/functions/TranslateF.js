import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB,
});

export const connectPosgrest = async () => {
  try {
    if (!client._connected) {
      await client.connect();
      client._connected = true;
    }
    return client;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export const getMessages = async () => {
  const client = await connectPosgrest();
  try {
    const res = await client.query('SELECT * FROM "Chatgpt"."Translate"');
    return res.rows;
  } catch (err) {
    console.error("Error executing the query:", err);
    throw err;
  }
};

export const insertMessage = async (message, translation, language, model) => {
  const client = await connectPosgrest();
  try {
    const query = `INSERT INTO "Chatgpt"."Translate" (message, translation, language, model) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const values = [message, translation, language, model];
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error executing the query:", err);
    throw err;
  }
};

export const saveTranslation = async () => {
  const message = "Hello, how are you?";
  const translation = "Bonjour, comment ça va?";
  const model = "gpt-4o";
  const language = "French";

  try {
    const insertedMessage = await insertMessage(
      message,
      translation,
      language,
      model
    );
    console.log("Message inserted:", insertedMessage);
  } catch (error) {
    console.error(
      "Something happened when trying to insert the message:",
      error
    );
    throw error;
  }
};
