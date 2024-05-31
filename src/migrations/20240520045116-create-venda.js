'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'usuarios', key: 'id'}
      },
      produto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'produtos', key: 'id'},
        onDelete: 'CASCADE'
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      cliente: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vendas');
  }
};