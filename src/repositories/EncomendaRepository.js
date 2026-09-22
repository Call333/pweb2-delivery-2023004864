import { Encomenda } from "../model/Encomenda.js";

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

    async create(dadosDaEncomenda) {
        const proximoId = this.database.proximo_id;

        this.db.proximo_id += 1;

        const novaEncomenda = new Encomenda({id: proximoId, ...dadosDaEncomenda})

        this.database.encomenda.push({
            id: novaEncomenda.id,
            descricao: novaEncomenda.descricao,
            origem: novaEncomenda.origem,
            destino: novaEncomenda.destino,
            status: novaEncomenda.status,
            motoristaId: novaEncomenda.motoristaId,
            historico: novaEncomenda.historico
        });
    }
}