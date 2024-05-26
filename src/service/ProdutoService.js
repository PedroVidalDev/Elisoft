const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const usuarioService = new UsuarioService();

const dataSource = require("../models");

class ProdutoService extends Service{
    constructor(){
        super("Produto");
    }

    async atualizarEstoque(quantidadeAtualizada, id){

        if(quantidadeAtualizada < 0){
            return false;
        }

        const listaDeRegistroAtualizado = dataSource[this.nomeDoModel].update(
            {
                quantidade: quantidadeAtualizada
            }, 
            {
                where: {
                    id: id
                }
            }
        );

        if(listaDeRegistroAtualizado[0] == 0){
            return false;
        } else{
            return true;
        }
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

    async atualizaProduto(id, dadosAtualizados){
        const listaDeRegistroAtualizado = dataSource[this.nomeDoModel].update(
            dadosAtualizados, 
            {
                where: {
                    id: id
                }
            }
        );

        if(listaDeRegistroAtualizado[0] == 0){
            return false;
        } else{
            return true;
        }
    }
}

module.exports = ProdutoService;