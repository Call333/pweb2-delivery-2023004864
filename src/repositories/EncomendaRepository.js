import { Encomenda } from "../model/Encomenda.js";

export class EncomendaRepository {
    constructor(database) {
        this.database = database;
    }

    async findAll() {
        return this.database.encomendas;
    }

    async findById(id) {
        return this.database.encomendas.find(encomenda => encomenda.id === Number(id) || null);
    }

    async create(dadosDaEncomenda) {
        const proximoId = this.database.proximo_id;

        this.database.proximo_id += 1;

        const novaEncomenda = new Encomenda({
            id: proximoId,
            descricao: dadosDaEncomenda.descricao,
            origem: dadosDaEncomenda.origem,
            destino: dadosDaEncomenda.destino,
            status: dadosDaEncomenda.status,
            motoristaId: dadosDaEncomenda.motoristaId,
            historico: dadosDaEncomenda.historico
        });

        console.log("=== REPOSITÓRIO: A tentar inserir esta encomenda ===", novaEncomenda);

        this.database.encomendas.push({
            id: novaEncomenda.id,
            descricao: novaEncomenda.descricao,
            origem: novaEncomenda.origem,
            destino: novaEncomenda.destino,
            status: novaEncomenda.status,
            motoristaId: novaEncomenda.motoristaId,
            historico: novaEncomenda.historico
        });

        console.log("=== REPOSITÓRIO: Estado atual do banco mock ===", this.database.encomendas);
        console.log(`=== REPOSITÓRIO: Total de itens guardados: ${this.database.encomendas.length} ===`);

        return novaEncomenda;
    }

    async findByDescricao(descricao) {
        return this.database.encomendas.find(
            e => e.descricao === descricao
        ) || null;
    }

    async update(encomendaAlterada) {
        const index = this.database.encomendas.findIndex(e => e.id === Number(encomendaAlterada.id));

        if(index !== -1) {
            this.database.encomendas[index] = {
                id: encomendaAlterada.id,
                descricao: encomendaAlterada.descricao,
                origem: encomendaAlterada.origem,
                destino: encomendaAlterada.destino,
                status: encomendaAlterada.status,
                motoristaId: encomendaAlterada.motoristaId,
                historico: encomendaAlterada.historico
            };

            return encomendaAlterada;
        }

        return null;
    }
}