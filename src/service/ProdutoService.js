const Service = require("./Service.js");

class ProdutoService extends Service{
    constructor(){
        super("Produto");
    }

    async verificarRegistroProduto(dadosDoRegistro){
        const dadoExistente = await this.pegaRegistroPorNome(dadosDoRegistro.nome);
        console.log(dadoExistente)

        if(dadoExistente == null && dadosDoRegistro.preco >= 0 && dadosDoRegistro.quantidade >= 0){
            console.log("salvado")

            return await this.criaRegistro(dadosDoRegistro);
        }

    }
}

module.exports = ProdutoService;