'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venda.init({
    valor: DataTypes.FLOAT,
    cliente: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Venda',
    tableName: "vendas"
  });
  return Venda;
};