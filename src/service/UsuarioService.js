const Service = require("./Service.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dataSource = require("../models");

const CHAVE = process.env.CHAVE;

class UsuarioService extends Service{
    constructor(){
        super("Usuario");
    }

    async verificarRegistroUsuario(dados){
        const usuarioExistente = await this.pegaRegistroPorEmail(dados.email);

        if(usuarioExistente == null){
            const senhaCodificada = await bcrypt.hash(dados.senha, 10);

            return await this.criaRegistro({
                nome: dados.nome,
                email: dados.email,
                senha: senhaCodificada
            })
        }
    }

    async verificarLogin(dados){
        const usuarioExistente = await this.pegaRegistroPorEmail(dados.email);
        if(!usuarioExistente || !await bcrypt.compare(dados.senha, usuarioExistente.senha)){
            return null;
        }
        const token = jwt.sign({id: usuarioExistente.id, usuario: usuarioExistente.email}, CHAVE, {expiresIn: '3h'});
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