const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const usuarioService = new UsuarioService();

const dataSource = require("../models");
const ErroPersonalizado = require("../exceptions/ErroPersonalizado.js");

class ProdutoService extends Service{
    constructor(){
        super("Produto");
    }

    async atualizarEstoque(quantidadeAtualizada, id){

        if(quantidadeAtualizada < 0){
            throw new ErroPersonalizado("Quantidade do produto menor que 0", 400)
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
            throw new ErroPersonalizado("Quantidade nao pode ser atualizada.", 500)
        }
    }

    async verificarRegistroProduto(dadosDoRegistro, usuario){
        const dadoExistente = await this.pegaRegistroPorNome(dadosDoRegistro.nome);
        const usuarioEncontrado = await usuarioService.pegaUmRegistroPorId(usuario.id);

        console.log(usuarioEncontrado)

        if(usuarioEncontrado == null){
            throw new ErroPersonalizado("Operacao nao foi autorizada.", 403)
        }

        if(dadoExistente != null){
            throw new ErroPersonalizado("Produto ja existe.", 400)

        }

        if(dadosDoRegistro.preco < 0){
            throw new ErroPersonalizado("Preco menos que 0", 403);
        }

        if(dadosDoRegistro.quantidade < 0){
            throw new ErroPersonalizado("Estoque menor que 0", 403);
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
            throw new ErroPersonalizado("Erro na atualizacao do produto.", 400);        
        }
    }

    async resgataMaiorEstoque(usuario){
        const todosProdutos = await this.pegaTodosPorIdUsuario(usuario.id);

        const maiorEstoque = todosProdutos.sort((a, b) => b.quantidade - a.quantidade);

        return maiorEstoque;
    }
}

module.exports = ProdutoService;