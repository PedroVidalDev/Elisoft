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

    async pegaTodosPopulado(where = {}){
        return dataSource[this.nomeDoModel].findAll(
            {
                where: {...where},
                include: [
                    {
                        model: Produto,
                        attributes: ['nome', 'descricao', 'preco', 'quantidade']
                    },
                    {
                        model: Usuario,
                        attributes: ['nome', 'email']
                    }
                ]
            },
        )
    }

    async verificarRegistroVenda(dadosVenda, usuario){
        const produto = await produtoService.pegaUmRegistroPorId(dadosVenda.produto);
        const usuarioEncontrado = await usuarioService.pegaUmRegistroPorId(usuario.id);

        console.log(produto)

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
            return {
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

    async resgatarLucro(){
        let vendas = await this.pegaTodosPopulado();
        console.log(JSON.stringify(vendas))
    }
}

module.exports = VendaService;