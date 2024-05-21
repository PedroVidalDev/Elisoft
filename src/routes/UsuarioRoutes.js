const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController.js");

const usuarioController = new UsuarioController();
const router = Router();

router.post("/registrar", (req, res) => usuarioController.registrar(req, res));
router.post("/login", (req, res) => usuarioController.logar(req, res))

module.exports = router;