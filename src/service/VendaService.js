const ProdutoService = require("./ProdutoService.js");

const produtoService = new ProdutoService();

class VendaService{
    constructor(){
        super("Venda");
    }

    async verificarRegistroVenda(dadosVenda){
        const produto = produtoService.pegaUmRegistroPorId(dadosVenda.produtoId);
        //const usuario = 
        if(produto == null){
            console.log("Produto nao existe");
        }

        if(dados.preco < 0){
            console.log("Preco invalido.");
        }

        else{
            return await this.criaRegistro(dadosVenda);
        }
    }
}

module.exports = VendaService;