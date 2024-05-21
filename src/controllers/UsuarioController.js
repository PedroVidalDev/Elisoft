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
    
        if(novoRegistro != null){
            return res.status(201).json(novoRegistro);
        } else{
            return res.status(400);
        } 
    }

    async logar(req, res){
        const dados = req.body;

        const novoLogin = await this.service.verificarLogin(dados);

        if(novoLogin != null){
            return res.status(200).json(novoLogin);
        } else{
            return res.status(400);
        }
    }
}

module.exports = UsuarioController;