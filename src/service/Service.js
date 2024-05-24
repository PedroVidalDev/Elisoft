const dataSource = require("../models");

class Service{
    constructor(nomeDoModel){
        this.nomeDoModel = nomeDoModel;
    }

    async pegaTodos(id){
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

    async excluiRegistro(id){
        return dataSource[this.nomeDoModel].destroy({where: {id: id}});
    }
}

module.exports = Service;