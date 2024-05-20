const { Router } = require("express");
const VendaController = require("../controllers/VendaController.js");

const router = Router();

const vendaController = new VendaController();

router.get("/vendas", (req, res) => vendaController.pegaTodos(req, res));
router.get("/vendas/:id", (req, res) => vendaController.pegaUmPorId(req, res))
router.post("/vendas", (req, res) => vendaController.criarVenda(req, res));
router.delete("/vendas/:id", (req, res) => vendaController.exclui(req, res));

module.exports = router;