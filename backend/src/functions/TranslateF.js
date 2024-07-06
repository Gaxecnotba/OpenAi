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

  try {
    // Adjust the query to include the correct schema and table name
    const res = await client.query('SELECT * FROM "Chatgpt"."Translate"');
    const result = res.rows;
    return result;
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    await client.end();
  }
};
connectPosgrest().then((result) => {
  console.log(result);
});
