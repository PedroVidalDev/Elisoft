const express = require("express");

const produtos = require("./ProdutoRoutes.js");

module.exports = app => {
    app.use(
        express.json(),
        produtos
    )
}