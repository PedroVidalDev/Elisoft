const Service = require("./Service.js");
const bcrypt = require('bcrypt');
const dataSource = require("../models");

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

    async pegaRegistroPorEmail(email){
        return dataSource[this.nomeDoModel].findOne({where: {email: email}});
    }
}

module.exports = UsuarioService;