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
        const produto = await produtoService.pegaUmRegistroPorId(dadosVenda.produtoId);
        const usuarioEncontrado = await usuarioService.pegaRegistroPorEmail(usuario);

        if(usuarioEncontrado == null){
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

    async resgatarLucro(){
        let vendas = await this.pegaTodosPopulado();
        console.log(JSON.stringify(vendas))
    }
}

module.exports = VendaService;