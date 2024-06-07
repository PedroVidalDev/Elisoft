const VendaService = require("../service/VendaService.js");
const Controller = require("./Controller.js");

const vendaService = new VendaService();

class VendaController extends Controller{
    constructor(){
        super(vendaService);
    }

    async criarVenda(req, res, next){
        try {
            const dados = req.body;

            const novoRegistro = await this.service.verificarRegistroVenda(dados, req.user);
    
            return res.status(201).json(novoRegistro);   
        } 
        
        catch (error) {
            next(error);
        }

    }

    async resgatarFluxoDeCaixa(req, res, next){
        try {
            const dados = await this.service.resgatarLucro(req.user);

            return res.status(200).json(dados);  
        } 
        
        catch (error) {
            next(error);
        }

    }

    async pegarTodosComEntidadesRelacionadas(req, res, next){
        try {
            const listaRegistros = await this.service.pegaTodosPopulado(req.user);
            return res.status(200).json(listaRegistros);  
        } 
        
        catch (error) {
            next(error);
        }

    }

    async excluiVenda(req, res, next){
        try {
            const {id} = req.params;

            await this.service.excluiVenda(req.user, id);
            return res.status(204); 
        } 
        
        catch (error) {
            next(error);
        }

    }

    async resetarVendas(req, res, next){
        try {
            await this.service.resetarVendasUsuario(req.user);
            return res.status(200).json({
                mensagem: "Vendas restauradas!"
            }) 
        } catch (error) {
            next(error);
        }
        
    }
}

module.exports = VendaController;