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
        await this.validacaoProduto(dadosDoRegistro);

        return {
            status: 201,
            mensagem: "Produto criado com sucesso!", 
            objeto: await this.criaRegistro({                    
                nome: dadosDoRegistro.nome,
                descricao: dadosDoRegistro.descricao,
                preco: dadosDoRegistro.preco,
                quantidade: dadosDoRegistro.quantidade,
                usuario_id: usuario.id
            })};
        

    }

    async atualizaProduto(id, dadosAtualizados){
        await this.validacaoProduto(dadosAtualizados);

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

    async validacaoProduto(produto){
        const dadoExistente = await this.pegaRegistroPorNome(produto.nome);

        if(dadoExistente != null){
            throw new ErroPersonalizado("Produto ja existe.", 400)
        }

        else if(produto.preco < 0){
            throw new ErroPersonalizado("Preco menos que 0", 403);
        }

        else if(produto.quantidade < 0){
            throw new ErroPersonalizado("Estoque menor que 0", 403);
        }
    }
}

module.exports = ProdutoService;