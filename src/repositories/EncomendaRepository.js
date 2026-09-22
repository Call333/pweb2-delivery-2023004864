export class EncomendaRepository {
    constructor(database) {
        this.database = database;
    }

    async findAll() {
        return this.database.encomendas;
    }

    async findById(id) {
        return this.database.find(encomenda => encomenda.id === id);
    }

    async create() {
        
    }
}