export class SqlMotoristaRepository {
    // Injeção do Modelo do Sequelize via construtor
    constructor(motoristaModel) {
        this.motoristaModel = motoristaModel;
    }

    async create(dadosMotorista) {
        console.log("=== REPOSITÓRIO: A tentar inserir este motorista no SQL ===", dadosMotorista);

        const novoMotorista = await this.motoristaModel.create({
            nome: dadosMotorista.nome,
            cpf: dadosMotorista.cpf,
            placaVeiculo: dadosMotorista.placaVeiculo,
            status: dadosMotorista.status,
        });

        return novoMotorista.toJSON();
    }

    async findAll() {
        const motoristas = await this.motoristaModel.findAll();
        return motoristas.map(m => m.toJSON());
    }

    async findById(id) {
        const motorista = await this.motoristaModel.findByPk(Number(id));
        return motorista ? motorista.toJSON() : null;
    }

    async findByCpf(cpf) {
        const motorista = await this.motoristaModel.findOne({
            where: { cpf: cpf }
        });
        return motorista ? motorista.toJSON() : null;
    }
}
