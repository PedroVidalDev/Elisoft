const UsuarioService = require("../service/UsuarioService.js");
const Controller = require("./Controller.js");

const usuarioService = new UsuarioService();

class UsuarioController extends Controller{
    constructor(){
        super(usuarioService);
    }

    async registrar(req, res, next){
        try{
            const dados = req.body;

            const novoRegistro = await this.service.verificarRegistroUsuario(dados);
        
            return res.status(201).json(novoRegistro);
        }
        catch(error){
            next(error);
        }
    }

    async logar(req, res, next){
        try{
            const dados = req.body;

            const novoLogin = await this.service.verificarLogin(dados);

            return res.status(200).json(novoLogin);

        } catch(error){
            next(error);
        }
        
    }
}

module.exports = UsuarioController;