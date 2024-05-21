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

}

module.exports = ProdutoController;