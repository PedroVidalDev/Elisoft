require('dotenv').config();

const express = require("express");
const routes = require("./routes");
const path = require("path");

const caminhoAtual = __dirname;
console.log(caminhoAtual)
const diretorioPublico = path.join(caminhoAtual, "..", "public");
console.log(diretorioPublico)

const app = express();

routes(app);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(
        {
            status: err.status,
            mensagem: err.message
        }
    );
})

app.use(express.static(diretorioPublico));

module.exports = app;