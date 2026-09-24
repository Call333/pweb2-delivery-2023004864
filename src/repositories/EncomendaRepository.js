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

        this.database.proximo_id += 1;

        const novaEncomenda = new Encomenda({id: proximoId, ...dadosDaEncomenda})

        this.database.encomendas.push({
            id: novaEncomenda.id,
            descricao: novaEncomenda.descricao,
            origem: novaEncomenda.origem,
            destino: novaEncomenda.destino,
            status: novaEncomenda.status,
            motoristaId: novaEncomenda.motoristaId,
            historico: novaEncomenda.historico
        });

        return novaEncomenda;
    }

    async findByDescricao(descricao) {
        return this.database.encomendas.find(
            e => e.descricao === descricao
        ) || null;
    }
}