const ProdutoService = require("../service/ProdutoService.js");
const Controller = require("./Controller.js");

const produtoService = new ProdutoService();

class ProdutoController extends Controller{
    constructor(){
        super(produtoService);
    }

    async criarProduto(req, res, next){
        try {
            const dados = req.body;

            const novoRegistro = await this.service.verificarRegistroProduto(dados, req.user);
            return res.status(201).json(novoRegistro);
        } 
        
        catch (error) {
            next(error);
        }


    }

    async editarProduto(req, res, next){
        try {
            const {id} = req.params;
            const dadosAtualizados = req.body;
    
            const foiAtualizado = await this.service.atualizaProduto(id, dadosAtualizados);
    
            return res.status(200).json({
                status: 200,
                mensagem: "Produto foi atualizado."
            });
        } 
        
        catch (error) {
            next(error);
        }

    }

    async pegaMaiorEstoque(req, res, next){
        try {
            const produtos = await this.service.resgataMaiorEstoque(req.user);

            return res.status(200).json(produtos);  
        } 
        
        catch (error) {
            next(error);
        }

    }

}

module.exports = ProdutoController;