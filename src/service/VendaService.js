const ProdutoService = require("./ProdutoService.js");
const Service = require("./Service.js");
const UsuarioService = require("./UsuarioService.js");

const produtoService = new ProdutoService();
const usuarioService = new UsuarioService();

const dataSource = require("../models");
const ErroPersonalizado = require("../exceptions/ErroPersonalizado.js");

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
            throw new ErroPersonalizado("Usuario nao existe", 400);
        }
        
        if(produto == null){
            throw new ErroPersonalizado("Produto nao existe", 400);
        }

        if(dadosVenda.valor < 0){
            throw new ErroPersonalizado("Preco invalido.", 400);
        }

        else{
            const resultadoEstoque = await produtoService.atualizarEstoque(
                produto.quantidade - 1,
                produto.id
            );

            return {
                status: 200,
                mensagem: "Venda registrada com sucesso.", 
                objeto: await this.criaRegistro({
                    usuario_id: usuarioEncontrado.id,
                    produto_id: produto.id,
                    valor: dadosVenda.valor,
                    cliente: dadosVenda.cliente
                })
            }; 
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
        try{
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

        catch(error){
            throw new ErroPersonalizado("Erro ao excluir venda.", 400);
        }

    }

    async resetarVendasUsuario(usuario){
        try{
            await this.excluiRegistro(
                {
                    where: {
                        usuario_id: usuario.id
                    }
                }
            );
    
            await produtoService.excluiRegistro(
                {
                    where: {
                        usuario_id: usuario.id
                    }
                }
            );
        }
        catch(error){
            throw new ErroPersonalizado("Erro ao resetar vendas.", 400);
        }

    }
}

module.exports = VendaService;