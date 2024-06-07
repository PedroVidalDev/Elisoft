const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController.js");

const usuarioController = new UsuarioController();
const router = Router();

router.post("/registrar", (req, res, next) => usuarioController.registrar(req, res, next));
router.post("/login", (req, res, next) => usuarioController.logar(req, res, next))

module.exports = router;