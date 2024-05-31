'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
      })
      Produto.hasMany(models.Venda, {
        foreignKey: "produto_id",
        onDelete: 'cascade'
      })
    }
  }
  Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    quantidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: "produtos"
  });
  return Produto;
};