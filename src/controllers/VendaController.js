const VendaService = require("../service/VendaService.js");
const Controller = require("./Controller.js");

const vendaService = new VendaService();

class VendaController extends Controller{
    constructor(){
        super(vendaService);
    }

    async criarVenda(req, res){
        try {
            const dados = req.body;

            const novoRegistro = await this.service.verificarRegistroVenda(dados, req.user);
    
            return res.status(201).json(novoRegistro);   
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro na criacao de venda."
            })
        }

    }

    async resgatarFluxoDeCaixa(req, res){
        try {
            const dados = await this.service.resgatarLucro(req.user);

            return res.status(200).json(dados);  
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro no resgate de fluxo de caixa."
            })
        }

    }

    async pegarTodosComEntidadesRelacionadas(req, res){
        try {
            const listaRegistros = await this.service.pegaTodosPopulado(req.user);
            return res.status(200).json(listaRegistros);  
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro no resgate de vendas."
            })
        }

    }

    async excluiVenda(req, res){
        try {
            const {id} = req.params;

            await this.service.excluiVenda(req.user, id);
            return res.status(204); 
        } 
        
        catch (error) {
            return res.status(400).json({
                mensagem: "Erro na exclusao de venda."
            })
        }

    }

    async resetarVendas(req, res){
        try {
            await this.service.resetarVendasUsuario(req.user);
            return res.status(200).json({
                mensagem: "Vendas restauradas!"
            }) 
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro no reset de vendas."
            })
        }
        
    }
}

module.exports = VendaController;