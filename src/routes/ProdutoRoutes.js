const { Router } = require("express");
const ProdutoController = require("../controllers/ProdutoController.js");
const autenticarToken = require("../middlewares/autenticacao.js");

const router = Router();

const produtoController = new ProdutoController();

router.get("/produtos", autenticarToken, (req, res, next) => produtoController.pegaTodos(req, res, next));
router.get("/produtos/maiorEstoque", autenticarToken, (req, res, next) => produtoController.pegaMaiorEstoque(req, res, next));
router.get("/produtos/:id", autenticarToken, (req, res, next) => produtoController.pegaUmPorId(req, res, next))
router.post("/produtos", autenticarToken, (req, res, next) => produtoController.criarProduto(req, res, next));
router.put("/produtos/:id", autenticarToken, (req, res, next) => produtoController.editarProduto(req, res, next));
router.delete("/produtos/:id", autenticarToken, (req, res, next) => produtoController.exclui(req, res, next));

module.exports = router;