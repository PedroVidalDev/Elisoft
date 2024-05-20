const express = require("express");
const path = require("path");

const caminhoAtual = __dirname;
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

const app = express();

app.use(express.static(diretorioPublico));

module.exports = app;