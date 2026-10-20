import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

// Essa função esta recebendo 3 parâmetros*
export const EncomendaModel = sequelize.define('Encomenda', {
    id: { 
        type: 
        DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    descricao: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },

    origem: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    destino: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    status: { 
        type: DataTypes.STRING, 
        defaultValue: 'CRIADA' 
    },

    motoristaId: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },

    historico: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('historico');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('historico', JSON.stringify(value));
        }
    }
}, {
    tableName: 'encomendas',
    timestamps: false
}

);