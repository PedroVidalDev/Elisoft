require('dotenv').config();

const express = require("express");
const routes = require("./routes");
const path = require("path");

const caminhoAtual = __dirname;
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

const app = express();

routes(app);

app.use(express.static(diretorioPublico));

module.exports = app;