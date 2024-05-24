const { Router } = require("express");
const VendaController = require("../controllers/VendaController.js");
const autenticarToken = require("../middlewares/autenticacao.js");

const router = Router();

const vendaController = new VendaController();

router.get("/vendas", autenticarToken, (req, res) => vendaController.pegaTodos(req, res));
router.get("/vendas/:id", autenticarToken, (req, res) => vendaController.pegaUmPorId(req, res))
router.get("/vendas/fluxo", autenticarToken, (req, res) => vendaController.resgatarFluxoDeCaixa(req, res));

router.post("/vendas", autenticarToken, (req, res) => vendaController.criarVenda(req, res));
router.delete("/vendas/:id", autenticarToken, (req, res) => vendaController.exclui(req, res));

module.exports = router;