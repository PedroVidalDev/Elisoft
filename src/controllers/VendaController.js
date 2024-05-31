const VendaService = require("../service/VendaService.js");
const Controller = require("./Controller.js");

const vendaService = new VendaService();

class VendaController extends Controller{
    constructor(){
        super(vendaService);
    }

    async criarVenda(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.verificarRegistroVenda(dados, req.user);

        return res.status(201).json(novoRegistro);
    }

    async resgatarFluxoDeCaixa(req, res){
        const dados = await this.service.resgatarLucro(req.user);

        return res.status(200).json(dados);
    }

    async pegarTodosComEntidadesRelacionadas(req, res){
        const listaRegistros = await this.service.pegaTodosPopulado(req.user);
        return res.status(200).json(listaRegistros);
    }

    async excluiVenda(req, res){
        const {id} = req.params;

        await this.service.excluiVenda(req.user, id);
        return res.status(204);
    }

    async resetarVendas(req, res){
        await this.service.resetarVendasUsuario(req.user);
        return res.status(200).json({
            mensagem: "Vendas restauradas!"
        })
    }
}

module.exports = VendaController;