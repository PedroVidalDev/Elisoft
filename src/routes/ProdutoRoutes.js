const { Router } = require("express");
const ProdutoController = require("../controllers/ProdutoController.js");
const autenticarToken = require("../middlewares/autenticacao.js");

const router = Router();

const produtoController = new ProdutoController();

router.get("/produtos", autenticarToken, (req, res) => produtoController.pegaTodos(req, res));
router.get("/produtos/:id", autenticarToken, (req, res) => produtoController.pegaUmPorId(req, res))
router.post("/produtos", autenticarToken, (req, res) => produtoController.criarProduto(req, res));
router.put("/produtos/:id", autenticarToken, (req, res) => produtoController.editarProduto(req, res));
router.delete("/produtos/:id", autenticarToken, (req, res) => produtoController.exclui(req, res));

module.exports = router;