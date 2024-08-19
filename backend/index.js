import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import openai from "./src/routers/openai.js";
// import postgres from "./src/routers/Postgres.js";
import renderopenai from "./src/routers/PostgresRender.js";

const port = process.env.GPORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Working" });
});

app.use("/", openai);
app.use("/", renderopenai);
app.use("/", postgres);

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Something was wrong, please check the code",
    reqMethod: req.method,
    reqPath: req.path,
    reqQuery: req.query,
    reqBody: req.body,
  });
});

const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).r.json({
    msg: "Internal server error",
  });
};
app.use(handleError);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
