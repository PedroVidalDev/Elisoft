const UsuarioService = require("../service/UsuarioService.js");
const Controller = require("./Controller.js");

const usuarioService = new UsuarioService();

class UsuarioController extends Controller{
    constructor(){
        super(usuarioService);
    }

    async registrar(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.verificarRegistroUsuario(dados);
    
        return res.status(200).json(novoRegistro);
    }

    async logar(req, res){

    }
}

module.exports = UsuarioController;