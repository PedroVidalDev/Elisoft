const ProdutoService = require("../service/ProdutoService.js");
const Controller = require("./Controller.js");

const produtoService = new ProdutoService();

class ProdutoController extends Controller{
    constructor(){
        super(produtoService);
    }

    async criarProduto(req, res){
        const dados = req.body;

        const novoRegistro = await this.service.verificarRegistroProduto(dados);
        return res.status(200).json(novoRegistro);

    }

}

module.exports = ProdutoController;