// const { db } = require("./init");

// async function insertData(message) {
//   const stmnt = db.prepare("INSERT INTO Messages(language, message) VALUES (?, ?)");

// }
require("dotenv").config();
const { Client } = require("pg");

const connectPosgrest = async () => {
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

const getMessages = async () => {
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

const insertMessage = async (message, translation, language) => {
  const client = await connectPosgrest();
  try {
    const query = `
      INSERT INTO "Chatgpt"."Translate" (message, translation, language, timestamp)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [message, translation, language];
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error happened, pls check:", err);
  } finally {
    await client.end();
  }
};

const saveTranslation = async () => {
  const message = "Hello, how are you?";
  const translation = "Bonjour, comment ça va?";
  const language = "French";

  try {
    const insertedMessage = await insertMessage(message, translation, language);
    console.log("Message inserted:", insertedMessage);
  } catch (error) {
    console.error("Something happened when try to insert the message:", error);
  }
};

module.exports = {
  connectPosgrest,
  saveTranslation,
  getMessages,
  insertMessage,
};
