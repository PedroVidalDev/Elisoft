const Service = require("./Service.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dataSource = require("../models");
const ErroPersonalizado = require("../exceptions/ErroPersonalizado.js");

const CHAVE = process.env.CHAVE;

class UsuarioService extends Service{
    constructor(){
        super("Usuario");
    }

    async verificarRegistroUsuario(dados){
        const usuarioExistente = await this.pegaRegistroPorEmail(dados.email);

        if(usuarioExistente == null){
            const senhaCodificada = await bcrypt.hash(dados.senha, 10);

            return {
                status: 201,
                mensagem: "Usuario criado com sucesso!",
                objeto: await this.criaRegistro({
                    nome: dados.nome,
                    email: dados.email,
                    senha: senhaCodificada
                })
            } 
        } else{
            throw new ErroPersonalizado("Usuario inserido ja existe no banco de dados.", 400);
        }
    }

    async verificarLogin(dados){
        const usuarioExistente = await this.pegaRegistroPorEmail(dados.email);
        if(!usuarioExistente || !await bcrypt.compare(dados.senha, usuarioExistente.senha)){
            throw new ErroPersonalizado("Login nao autorizado. Favor verificar os campos.", 403);
        }
        const token = jwt.sign({id: usuarioExistente.id, email: usuarioExistente.email}, CHAVE, {expiresIn: '3h'});
        return {
            mensagem: "Sucesso.", 
            token
        };
    }

    async pegaRegistroPorEmail(email){
        return dataSource[this.nomeDoModel].findOne({where: {email: email}});
    }
}

module.exports = UsuarioService;