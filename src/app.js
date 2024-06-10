require('dotenv').config();

const express = require("express");
const routes = require("./routes");
const path = require("path");
const { Sequelize } = require('sequelize');

const caminhoAtual = __dirname;
console.log(caminhoAtual)
const diretorioPublico = path.join(caminhoAtual, "..", "public");
console.log(diretorioPublico)

const app = express();

const sequelize = new Sequelize(process.env.DB_DATABASE || "ElisoftAPI", process.env.DB_USER || "root", process.env.DB_PASSWORD || "root", {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql"
});

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