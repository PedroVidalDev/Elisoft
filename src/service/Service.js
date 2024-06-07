const dataSource = require("../models");

class Service{
    constructor(nomeDoModel){
        this.nomeDoModel = nomeDoModel;
    }

    async pegaTodosPorIdUsuario(id){
        return dataSource[this.nomeDoModel].findAll({where: {usuario_id: id}})
    }

    async pegaUmRegistroPorId(id){
        return dataSource[this.nomeDoModel].findByPk(id);
    }

    async pegaRegistroPorNome(nome){
        return dataSource[this.nomeDoModel].findOne({where: {nome: nome}});
    }

    async criaRegistro(dadosDoRegistro){
        return dataSource[this.nomeDoModel].create(dadosDoRegistro);
    }
    
    async excluiRegistro(query){
        return dataSource[this.nomeDoModel].destroy({where : query});
    }
}

module.exports = Service;