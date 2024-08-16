import pool from "../renderdb/extarnalDB.js";

// async function createTable() {
//   const TranslateTable = pool.query(
//     "CREATE TABLE public.Translaterender (ID SERIAL PRIMARY KEY, message TEXT NOT NULL, language TEXT NOT NULL, translation TEXT, model TEXT NOT NULL, languageselected TEXT NOT NULL, version TEXT NOT NULL)"
//   );
//   return TranslateTable;
// }

// createTable();

export async function getMessages() {
  try {
    const res = await pool.query("SELECT * FROM public.Translaterender");
    return res.rows;
  } catch (err) {
    console.error("Error executing the query:", err);
  }
}
// getMessages();
export async function insertMessage(
  message,
  response,
  language,
  model,
  languageselected,
  version
) {
  try {
    const res = await pool.query(
      "INSERT INTO public.Translaterender (message, language, translation, model,languageselected,version) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [message, response, language, model, languageselected, version]
    );
    return res.rows[0];
  } catch (err) {
    console.error("Error happened, pls check:", err);
  }
}
