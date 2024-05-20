import express from "express";
import url from "url";
import path from "path";

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

const app = express();

app.use(express.static(diretorioPublico));

export default app;