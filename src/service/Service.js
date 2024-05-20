const dataSource = require("../models");

class Service{
    constructor(nomeDoModel){
        this.nomeDoModel = nomeDoModel;
    }

    async pegaTodos(where = {}){
        return dataSource[this.nomeDoModel].findAll({where: {...where}})
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

    async excluiRegistro(id){
        return dataSource[this.nomeDoModel].destroy({where: {id: id}});
    }
}

module.exports = Service;