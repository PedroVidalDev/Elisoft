const { Router } = require("express");
const ProdutoController = require("../controllers/ProdutoController.js");

const router = Router();

const produtoController = new ProdutoController();

router.get("/produtos", (req, res) => produtoController.pegaTodos(req, res));
router.get("/produtos/:id", (req, res) => produtoController.pegaUmPorId(req, res))
router.post("/produtos", (req, res) => produtoController.criarProduto(req, res));
router.delete("/produtos/:id", (req, res) => produtoController.exclui(req, res));

module.exports = router;