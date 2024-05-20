const express = require("express");

const produtos = require("./ProdutoRoutes.js");
const vendas = require("./VendaRoutes.js");

module.exports = app => {
    app.use(
        express.json(),
        produtos,
        vendas
    )
}