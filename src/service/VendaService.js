const ProdutoService = require("./ProdutoService.js");
const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const produtoService = new ProdutoService();
const usuarioService = new UsuarioService();

class VendaService extends Service{
    constructor(){
        super("Venda");
    }

    async verificarRegistroVenda(dadosVenda, usuario){
        const produto = await produtoService.pegaUmRegistroPorId(dadosVenda.produtoId);
        const usuario = await usuarioService.pegaRegistroPorEmail(usuario);

        if(usuario == null){
            console.log("Usuario nao existe");
        }
        
        if(produto == null){
            console.log("Produto nao existe");
        }

        if(dados.preco < 0){
            console.log("Preco invalido.");
        }

        else{
            return {mensagem: "Venda registrada com sucesso.", objeto: await this.criaRegistro(dadosVenda)};
        }
    }
}

module.exports = VendaService;