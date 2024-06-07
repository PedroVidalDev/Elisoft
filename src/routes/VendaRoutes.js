const { Router } = require("express");
const VendaController = require("../controllers/VendaController.js");
const autenticarToken = require("../middlewares/autenticacao.js");

const router = Router();

const vendaController = new VendaController();

router.get("/vendas", autenticarToken, (req, res, next) => vendaController.pegarTodosComEntidadesRelacionadas(req, res, next));
router.get("/vendas/fluxo", autenticarToken, (req, res, next) => vendaController.resgatarFluxoDeCaixa(req, res, next));
router.get("/vendas/:id", autenticarToken, (req, res, next) => vendaController.pegaUmPorId(req, res, next))

router.post("/vendas", autenticarToken, (req, res, next) => vendaController.criarVenda(req, res, next));
router.post("/vendas/resetar", autenticarToken, (req, res, next) => vendaController.resetarVendas(req, res, next));
router.delete("/vendas/:id", autenticarToken, (req, res, next) => vendaController.excluiVenda(req, res, next));

module.exports = router;