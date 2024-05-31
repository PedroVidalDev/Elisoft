const ProdutoService = require("./ProdutoService.js");
const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const produtoService = new ProdutoService();
const usuarioService = new UsuarioService();

const dataSource = require("../models");

class VendaService extends Service{
    constructor(){
        super("Venda");
    }

    async pegaTodosPopulado(usuario){
        return dataSource[this.nomeDoModel].findAll(
            {
                where: {usuario_id: usuario.id},
                include: [
                    {
                        model: dataSource['Produto'],
                        attributes: ['nome', 'descricao', 'preco', 'quantidade']
                    },
                    {
                        model: dataSource['Usuario'],
                        attributes: ['nome', 'email']
                    }
                ]
            },
        )
    }

    async verificarRegistroVenda(dadosVenda, usuario){
        const produto = await produtoService.pegaUmRegistroPorId(dadosVenda.produto);
        const usuarioEncontrado = await usuarioService.pegaUmRegistroPorId(usuario.id);

        if(usuarioEncontrado == null){
            console.log("Usuario nao existe");
            return null;
        }
        
        if(produto == null){
            console.log("Produto nao existe");
            return null;
        }

        if(dadosVenda.valor < 0){
            console.log("Preco invalido.");
            return null;
        }

        else{
            const resultadoEstoque = await produtoService.atualizarEstoque(
                produto.quantidade - 1,
                produto.id
            );

            if(resultadoEstoque){
                return {
                    mensagem: "Venda registrada com sucesso.", 
                    objeto: await this.criaRegistro({
                        usuario_id: usuarioEncontrado.id,
                        produto_id: produto.id,
                        valor: dadosVenda.valor,
                        cliente: dadosVenda.cliente
                    })
                };
            } else{
                return null;
            }      
        }
    }

    async resgatarLucro(usuario){

        let vendasLista = await this.pegaTodosPopulado(usuario);
        let produtosLista = await produtoService.pegaTodosPorIdUsuario(usuario.id);

        let dados = {          
            vendas: vendasLista,
            produtos: produtosLista
        }

        return dados;
    }

    async excluiVenda(usuario, vendaId){
        let venda = await this.pegaUmRegistroPorId(Number(vendaId));
        await this.excluiRegistro(
            {
                where: {
                    id:venda.id
                }
            }
        );

        let produto = await produtoService.pegaUmRegistroPorId(Number(venda.produto_id));
        
        await produtoService.atualizarEstoque(
            produto.quantidade + 1,
            produto.id
        );
    }

    async resetarVendasUsuario(usuario){
        await this.excluiRegistro(
            {
                where: {
                    usuario_id: usuario.id
                }
            }
        );
    }
}

module.exports = VendaService;