const VendaService = require("../service/VendaService.js");
const Controller = require("./Controller.js");

const vendaService = new VendaService();

class VendaController extends Controller{
    constructor(){
        super(vendaService);
    }

    async criarVenda(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.verificarRegistroVenda(dados, req.usuario);

        return res.status(201).json(novoRegistro);
    }
}

module.exports = VendaController;