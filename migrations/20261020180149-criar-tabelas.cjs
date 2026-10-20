'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('motoristas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },

            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            placaVeiculo: {
                type: Sequelize.STRING,
                allowNull: true
            },

            status: {
                type: Sequelize.STRING,
                defaultValue: 'ATIVO'
            }
        });

        await queryInterface.createTable('encomendas', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            descricao: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            origem: {
                type: Sequelize.STRING,
                allowNull: false
            },

            destino: {
                type: Sequelize.STRING,
                allowNull: false
            },

            status: {
                type: Sequelize.STRING,
                defaultValue: 'CRIADA'
            },

            motoristaId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            historico: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    },


    async down(queryInterface, Sequelize) {
        // Primeiro encomendas, para evitar erros de integridade no banco de dados.
        await queryInterface.dropTable('encomendas');
        await queryInterface.dropTable('motoristas');
    }
};
