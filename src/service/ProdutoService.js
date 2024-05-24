const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const usuarioService = new UsuarioService();

class ProdutoService extends Service{
    constructor(){
        super("Produto");
    }

    async atualizarEstoque(id){
        
    }

    async verificarRegistroProduto(dadosDoRegistro, usuario){
        const dadoExistente = await this.pegaRegistroPorNome(dadosDoRegistro.nome);
        const usuarioEncontrado = await usuarioService.pegaUmRegistroPorId(usuario.id);

        console.log(usuarioEncontrado)

        if(usuarioEncontrado == null){
            console.log("Usuario nao existe.")
            return null
        }

        if(dadoExistente != null){
            console.log("Produto ja existe.")
            return null
        }

        if(dadosDoRegistro.preco < 0){
            console.log("Preco menos que 0");
            return null
        }

        if(dadosDoRegistro.quantidade < 0){
            console.log("Estoque menor que 0");
            return null
        }

        else{
            return {
                mensagem: "Produto criado com sucesso!", 
                objeto: await this.criaRegistro({                    
                    nome: dadosDoRegistro.nome,
                    descricao: dadosDoRegistro.descricao,
                    preco: dadosDoRegistro.preco,
                    quantidade: dadosDoRegistro.quantidade,
                    usuario_id: usuarioEncontrado.id
                })};
        } 

    }
}

module.exports = ProdutoService;