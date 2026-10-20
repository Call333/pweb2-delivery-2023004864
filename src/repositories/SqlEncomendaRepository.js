export class SqlEncomendaRepository {
    // O constructor já não precisa de receber o "database" em memória
    constructor(encomendaModel) {
        this.encomendaModel = encomendaModel;
    }

    async findAll() {
        const encomendas = await this.encomendaModel.findAll();
        return encomendas.map(e => e.toJSON());
    }

    async findById(id) {
        const encomenda = await this.encomendaModel.findByPk(Number(id));
        return encomenda ? encomenda.toJSON() : null;
    }

    async create(dadosDaEncomenda) {
        console.log("=== REPOSITÓRIO: A tentar inserir esta encomenda no SQL ===", dadosDaEncomenda);

        // O Sequelize cria o registo e o banco gera o ID automaticamente
        const novaEncomenda = await this.encomendaModel.create({
            descricao: dadosDaEncomenda.descricao,
            origem: dadosDaEncomenda.origem,
            destino: dadosDaEncomenda.destino,
            status: dadosDaEncomenda.status,
            motoristaId: dadosDaEncomenda.motoristaId,
            historico: dadosDaEncomenda.historico
        });

        return novaEncomenda.toJSON();
    }

    async findByDescricao(descricao) {
        const encomenda = await this.encomendaModel.findOne({
            where: { descricao: descricao }
        });
        return encomenda ? encomenda.toJSON() : null;
    }

    async update(encomendaAlterada) {
        const encomenda = await this.encomendaModel.findByPk(Number(encomendaAlterada.id));

        if (encomenda) {
            await encomenda.update({
                descricao: encomendaAlterada.descricao,
                origem: encomendaAlterada.origem,
                destino: encomendaAlterada.destino,
                status: encomendaAlterada.status,
                motoristaId: encomendaAlterada.motoristaId ? Number(encomendaAlterada.motoristaId) : null,
                historico: encomendaAlterada.historico
            });

            return encomenda.toJSON();
        }

        console.error(`=== REPOSITÓRIO ERRO: Não foi possível encontrar a encomenda com ID ${encomendaAlterada.id} para atualizar. ===`);
        return null;
    }

    async findByMotoristaId(motoristaId) {
        const encomendas = await this.encomendaModel.findAll({
            where: { motoristaId: Number(motoristaId) }
        });
        return encomendas.map(e => e.toJSON());
    }
}
