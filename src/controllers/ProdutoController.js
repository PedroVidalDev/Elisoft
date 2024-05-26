const ProdutoService = require("../service/ProdutoService.js");
const Controller = require("./Controller.js");

const produtoService = new ProdutoService();

class ProdutoController extends Controller{
    constructor(){
        super(produtoService);
    }

    async criarProduto(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.verificarRegistroProduto(dados, req.user);
        return res.status(201).json(novoRegistro);

    }

    async editarProduto(req, res){
        const {id} = req.params;
        const dadosAtualizados = req.body;

        const foiAtualizado = await this.service.atualizaProduto(id, dadosAtualizados);

        if(foiAtualizado){
            return res.status(200).json({
                mensagem: "Produto foi atualizado."
            });
        } else{
            return res.status(400).json({
                message: "Produto nao pode ser atualizado. Erro."
            });
        }
    }

}

module.exports = ProdutoController;