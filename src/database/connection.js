import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false // Evita poluir o terminal de testes
});

export async function initDatabase() {
    try {
        await sequelize.sync({ alter: true }); // Cria tabelas, caso elas não existam.
        console.log('=== BANCO DE DADOS: Tabelas sincronizadas com sucesso (SQLite) ===');
    } catch (error) {
        console.error('=== BANCO DE DADOS ERRO: Falha ao sincronizar as tabelas ===', error);
        process.exit(1); // Fecha a aplicação caso o banco não consiga iniciar
    }
}