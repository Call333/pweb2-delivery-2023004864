import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const MotoristaModel = sequelize.define('Motorista', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    cpf: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },

    placaVeiculo: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },

    status: { 
        type: DataTypes.STRING, 
        defaultValue: 'ATIVO' 
    }

}, {
tableName: 'motoristas',
timestamps: false
}

);