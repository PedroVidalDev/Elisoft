const express = require("express");

const produtos = require("./ProdutoRoutes.js");
const vendas = require("./VendaRoutes.js");
const usuarios = require("./UsuarioRoutes.js");

module.exports = app => {
    app.use(
        express.json(),
        produtos,
        vendas,
        usuarios
    )
}